"use client";
import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Upload, Trash2, LogOut, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import type { AssetMap, AssetCategory } from "@/lib/assets";

type SlotState = "idle" | "uploading" | "success" | "error";

interface SlotStatus {
  state: SlotState;
  message?: string;
}

const SECTIONS: {
  category: AssetCategory;
  label: string;
  icon: string;
  count: number;
  hint: string;
}[] = [
  { category: "portfolio-video", label: "Vidéos Publicitaires", icon: "📹", count: 4, hint: "Thumbnails des vidéos pub (JPG, PNG, WebP)" },
  { category: "portfolio-ugc", label: "Vidéos UGC", icon: "🎯", count: 4, hint: "Thumbnails des vidéos UGC (JPG, PNG, WebP)" },
  { category: "portfolio-landing", label: "Landing Pages", icon: "🖥️", count: 6, hint: "Screenshots des landing pages (JPG, PNG, WebP)" },
  { category: "testimonials-review", label: "Avis Clients", icon: "💬", count: 5, hint: "Screenshots des avis WhatsApp/Insta (JPG, PNG)" },
];

export function DashboardClient({ initialAssets }: { initialAssets: AssetMap }) {
  const router = useRouter();
  const [assets, setAssets] = useState<AssetMap>(initialAssets);
  const [slotStatus, setSlotStatus] = useState<Record<string, SlotStatus>>({});
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  function slotKey(category: AssetCategory, index: number) {
    return `${category}-${index}`;
  }

  function setStatus(key: string, status: SlotStatus) {
    setSlotStatus((prev) => ({ ...prev, [key]: status }));
  }

  async function handleUpload(
    category: AssetCategory,
    index: number, // 1-based
    file: File
  ) {
    const key = slotKey(category, index);
    setStatus(key, { state: "uploading" });

    const formData = new FormData();
    formData.append("file", file);
    formData.append("category", category);
    formData.append("index", String(index));

    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();

      if (!res.ok) {
        setStatus(key, { state: "error", message: data.error ?? "Upload failed" });
        return;
      }

      // Update local state
      setAssets((prev) => {
        const updated = { ...prev };
        const arr = [...updated[category]] as (string | null)[];
        arr[index - 1] = data.url;
        updated[category] = arr;
        return updated;
      });
      setStatus(key, { state: "success" });
      setTimeout(() => setStatus(key, { state: "idle" }), 2500);
    } catch {
      setStatus(key, { state: "error", message: "Erreur réseau" });
    }
  }

  async function handleDelete(category: AssetCategory, index: number) {
    const key = slotKey(category, index);
    const currentUrl = assets[category][index - 1];
    if (!currentUrl) return;

    // Extract base key from URL pathname
    const urlPath = new URL(currentUrl).pathname;
    const assetKey = urlPath.split("/").pop() ?? "";

    setStatus(key, { state: "uploading" });
    try {
      const res = await fetch("/api/delete-asset", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: assetKey }),
      });

      if (!res.ok) {
        const data = await res.json();
        setStatus(key, { state: "error", message: data.error ?? "Delete failed" });
        return;
      }

      setAssets((prev) => {
        const updated = { ...prev };
        const arr = [...updated[category]] as (string | null)[];
        arr[index - 1] = null;
        updated[category] = arr;
        return updated;
      });
      setStatus(key, { state: "idle" });
    } catch {
      setStatus(key, { state: "error", message: "Erreur réseau" });
    }
  }

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin");
  }

  const onFileChange = useCallback(
    (category: AssetCategory, index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleUpload(category, index, file);
      // Reset input so same file can be re-uploaded
      e.target.value = "";
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <div
      className="min-h-screen pb-20"
      style={{ background: "linear-gradient(180deg, #0D0B2B 0%, #100d30 100%)" }}
    >
      {/* Header */}
      <header
        className="sticky top-0 z-30 flex items-center justify-between px-6 py-4"
        style={{
          background: "rgba(13,11,43,0.95)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(124,58,237,0.2)",
        }}
      >
        <div className="flex items-center gap-3">
          <Image src="/logo.svg" alt="Growtion" width={32} height={32} />
          <div>
            <span className="text-white font-black tracking-widest text-base">GROWTION</span>
            <span
              className="ml-2 text-xs font-bold px-2 py-0.5 rounded-full"
              style={{ background: "rgba(124,58,237,0.3)", color: "#a855f7" }}
            >
              Admin
            </span>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-gray-400 hover:text-white transition-colors"
          style={{ background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.2)" }}
        >
          <LogOut className="w-4 h-4" />
          Déconnexion
        </button>
      </header>

      <div className="max-w-6xl mx-auto px-6 pt-10 flex flex-col gap-10">
        {/* Welcome */}
        <div>
          <h1 className="text-3xl font-black text-white mb-1">Gestion des Assets</h1>
          <p className="text-gray-500 text-sm">
            Cliquez sur un slot pour uploader une image. Les changements sont visibles sur le site en moins d&apos;une minute.
          </p>
        </div>

        {/* Sections */}
        {SECTIONS.map((section) => {
          const currentAssets = assets[section.category];

          return (
            <div key={section.category} className="flex flex-col gap-4">
              {/* Section header */}
              <div className="flex items-center gap-3">
                <span className="text-2xl">{section.icon}</span>
                <div>
                  <h2 className="text-xl font-black text-white">{section.label}</h2>
                  <p className="text-gray-500 text-xs">{section.hint}</p>
                </div>
              </div>

              {/* Slots grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {Array.from({ length: section.count }, (_, i) => {
                  const index = i + 1; // 1-based
                  const key = slotKey(section.category, index);
                  const currentUrl = currentAssets[i];
                  const status = slotStatus[key] ?? { state: "idle" };

                  return (
                    <div key={key} className="flex flex-col gap-2">
                      {/* Slot label */}
                      <span className="text-gray-500 text-xs font-bold">Slot {index}</span>

                      {/* Upload zone */}
                      <div
                        className="relative rounded-2xl overflow-hidden cursor-pointer group"
                        style={{
                          aspectRatio: "3/4",
                          background: "rgba(20,17,50,0.95)",
                          border: currentUrl
                            ? "1px solid rgba(124,58,237,0.5)"
                            : "2px dashed rgba(124,58,237,0.3)",
                          transition: "border-color 0.2s",
                        }}
                        onClick={() => {
                          if (status.state !== "uploading") {
                            fileInputRefs.current[key]?.click();
                          }
                        }}
                      >
                        {/* Current image */}
                        {currentUrl && status.state !== "uploading" && (
                          <Image
                            src={currentUrl}
                            alt={`${section.label} ${index}`}
                            fill
                            className="object-cover"
                            sizes="200px"
                          />
                        )}

                        {/* Overlay states */}
                        {status.state === "uploading" && (
                          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2" style={{ background: "rgba(13,11,43,0.9)" }}>
                            <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
                            <span className="text-white text-xs font-bold">Upload...</span>
                          </div>
                        )}

                        {status.state === "success" && (
                          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2" style={{ background: "rgba(13,11,43,0.7)" }}>
                            <CheckCircle className="w-8 h-8 text-green-400" />
                            <span className="text-green-400 text-xs font-bold">Succès!</span>
                          </div>
                        )}

                        {status.state === "error" && (
                          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-2" style={{ background: "rgba(13,11,43,0.9)" }}>
                            <AlertCircle className="w-8 h-8 text-red-400" />
                            <span className="text-red-400 text-xs text-center">{status.message}</span>
                          </div>
                        )}

                        {/* Empty placeholder */}
                        {!currentUrl && status.state === "idle" && (
                          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 group-hover:opacity-80 transition-opacity">
                            <Upload className="w-8 h-8 text-purple-500" />
                            <span className="text-gray-500 text-xs text-center px-2">
                              Cliquer pour<br />uploader
                            </span>
                          </div>
                        )}

                        {/* Hover overlay for existing image */}
                        {currentUrl && status.state === "idle" && (
                          <div
                            className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
                            style={{ background: "rgba(13,11,43,0.7)" }}
                          >
                            <Upload className="w-7 h-7 text-white" />
                            <span className="text-white text-xs">Remplacer</span>
                          </div>
                        )}
                      </div>

                      {/* Delete button */}
                      {currentUrl && status.state === "idle" && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (confirm(`Supprimer le slot ${index}?`)) {
                              handleDelete(section.category, index);
                            }
                          }}
                          className="flex items-center justify-center gap-1 py-1.5 rounded-xl text-xs font-bold text-red-400 hover:text-red-300 transition-colors"
                          style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}
                        >
                          <Trash2 className="w-3 h-3" />
                          Supprimer
                        </button>
                      )}

                      {/* Hidden file input */}
                      <input
                        ref={(el) => { fileInputRefs.current[key] = el; }}
                        type="file"
                        accept="image/jpeg,image/png,image/webp,image/gif"
                        className="hidden"
                        onChange={onFileChange(section.category, index)}
                      />
                    </div>
                  );
                })}
              </div>

              {/* Divider */}
              <div className="h-px mt-2" style={{ background: "rgba(124,58,237,0.15)" }} />
            </div>
          );
        })}

        {/* Info box */}
        <div
          className="rounded-2xl p-5 flex gap-4 items-start"
          style={{ background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.2)" }}
        >
          <span className="text-2xl">💡</span>
          <div className="flex flex-col gap-1">
            <p className="text-white font-bold text-sm">Comment ça marche?</p>
            <ul className="text-gray-400 text-xs flex flex-col gap-1">
              <li>• Cliquez sur un slot vide pour uploader une nouvelle image (max 20 MB)</li>
              <li>• Cliquez sur une image existante pour la remplacer</li>
              <li>• Les images apparaissent sur le site en moins d&apos;une minute</li>
              <li>• Formats acceptés: JPG, PNG, WebP, GIF</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
