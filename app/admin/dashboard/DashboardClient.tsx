"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { upload as uploadToBlob } from "@vercel/blob/client";
import { Upload, Trash2, LogOut, AlertCircle, Loader2, Play, ImageIcon, Tag } from "lucide-react";
import type { AssetMap, AssetCategory, AssetItem } from "@/lib/assets";
import type { PricingConfig } from "@/lib/pricing";
import { isVideoAsset } from "@/lib/media";
import { PricingEditor } from "./PricingEditor";

type AddState = "idle" | "uploading" | "error";
interface AddStatus { state: AddState; message?: string; }

const isVideo = isVideoAsset;

// Any video format or image, on any section.
const ACCEPT_ANY_MEDIA = "video/*,image/*";

/** Client-side unique id so every upload is its own item (never overwrites). */
function uid() {
  return `${Date.now()}-${Math.floor(Math.random() * 1_000_000)}`;
}

const SECTIONS: {
  category: AssetCategory;
  label: string;
  icon: string;
  hint: string;
}[] = [
  { category: "results-screenshot", label: "Résultats (Campagnes)", icon: "📊", hint: "Screenshots de campagnes Facebook Ads (JPG, PNG, WebP)" },
  { category: "portfolio-video",    label: "Vidéos Publicitaires",  icon: "📹", hint: "Fichiers vidéo MP4 de vos pubs (MP4 — jusqu'à 200 MB)" },
  { category: "portfolio-ugc",      label: "Vidéos UGC",            icon: "🎯", hint: "Fichiers vidéo MP4 UGC (MP4 — jusqu'à 200 MB)" },
  { category: "filming-video",      label: "Vidéos Tournage",       icon: "🎬", hint: "Vidéos de tournage / behind-the-scenes (MP4 — jusqu'à 200 MB)" },
  { category: "testimonials-review",label: "Results",               icon: "💬", hint: "Screenshots des avis WhatsApp / Instagram (JPG, PNG)" },
];

export function DashboardClient({
  initialAssets,
  initialPricing,
}: {
  initialAssets: AssetMap;
  initialPricing: PricingConfig;
}) {
  const router = useRouter();
  const [tab, setTab] = useState<"assets" | "pricing">("assets");
  const [assets, setAssets] = useState<AssetMap>(initialAssets);
  const [addStatus, setAddStatus] = useState<Record<string, AddStatus>>({});
  const [deleting, setDeleting] = useState<Record<string, boolean>>({});
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  function setStatus(category: AssetCategory, status: AddStatus) {
    setAddStatus((prev) => ({ ...prev, [category]: status }));
  }

  async function handleAdd(category: AssetCategory, file: File) {
    setStatus(category, { state: "uploading" });
    try {
      const ext = file.name.split(".").pop() ?? "bin";
      const pathname = `${category}-${uid()}.${ext}`;

      const blob = await uploadToBlob(pathname, file, {
        access: "public",
        handleUploadUrl: "/api/upload",
        clientPayload: JSON.stringify({ category }),
      });

      const item: AssetItem = {
        url: blob.url,
        pathname: blob.pathname,
        uploadedAt: new Date().toISOString(),
      };
      setAssets((prev) => ({ ...prev, [category]: [...prev[category], item] }));
      setStatus(category, { state: "idle" });
    } catch (err) {
      setStatus(category, {
        state: "error",
        message: err instanceof Error ? err.message : "Upload échoué",
      });
    }
  }

  async function handleDelete(category: AssetCategory, item: AssetItem) {
    if (!confirm("Supprimer ce fichier?")) return;
    setDeleting((prev) => ({ ...prev, [item.pathname]: true }));
    try {
      const res = await fetch("/api/delete-asset", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: item.pathname }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        alert(data.error ?? "Suppression échouée");
        return;
      }
      setAssets((prev) => ({
        ...prev,
        [category]: prev[category].filter((a) => a.pathname !== item.pathname),
      }));
    } catch {
      alert("Erreur réseau");
    } finally {
      setDeleting((prev) => ({ ...prev, [item.pathname]: false }));
    }
  }

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin");
  }

  return (
    <div className="min-h-screen pb-20" style={{ background: "linear-gradient(180deg, #0D0B2B 0%, #100d30 100%)" }}>
      {/* Header */}
      <header className="sticky top-0 z-30 flex items-center justify-between px-6 py-4"
        style={{ background: "rgba(13,11,43,0.95)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(124,58,237,0.2)" }}>
        <div className="flex items-center gap-3">
          <Image src="/logo.svg" alt="Growtion" width={32} height={32} />
          <div>
            <span className="text-white font-black tracking-widest text-base">GROWTION</span>
            <span className="ml-2 text-xs font-bold px-2 py-0.5 rounded-full"
              style={{ background: "rgba(124,58,237,0.3)", color: "#a855f7" }}>Admin</span>
          </div>
        </div>
        <button onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-gray-400 hover:text-white transition-colors"
          style={{ background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.2)" }}>
          <LogOut className="w-4 h-4" />
          Déconnexion
        </button>
      </header>

      {/* Tab bar */}
      <div className="max-w-6xl mx-auto px-6 pt-8 w-full">
        <div className="flex gap-2 p-1 rounded-2xl w-fit" style={{ background: "rgba(20,17,50,0.7)", border: "1px solid rgba(124,58,237,0.2)" }}>
          {([
            { id: "assets", label: "Assets", Icon: ImageIcon },
            { id: "pricing", label: "Tarifs", Icon: Tag },
          ] as const).map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all"
              style={
                tab === id
                  ? { background: "linear-gradient(135deg, #7C3AED, #9333EA)", color: "#fff" }
                  : { background: "transparent", color: "#9ca3af" }
              }
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {tab === "pricing" && (
        <div className="max-w-6xl mx-auto px-6 pt-8 w-full">
          <PricingEditor initialPricing={initialPricing} />
        </div>
      )}

      {tab === "assets" && (
      <div className="max-w-6xl mx-auto px-6 pt-8 flex flex-col gap-10">
        <div>
          <h1 className="text-3xl font-black text-white mb-1">Gestion des Assets</h1>
          <p className="text-gray-500 text-sm">
            Ajoutez autant de fichiers que vous voulez par catégorie. Tout ce que vous ajoutez s&apos;affiche sur le site en moins d&apos;une minute.
          </p>
        </div>

        {SECTIONS.map((section) => {
          const items = assets[section.category];
          const status = addStatus[section.category] ?? { state: "idle" };

          return (
            <div key={section.category} className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{section.icon}</span>
                <div>
                  <h2 className="text-xl font-black text-white">
                    {section.label}
                    <span className="ml-2 text-xs font-bold text-purple-400">{items.length}</span>
                  </h2>
                  <p className="text-gray-500 text-xs">{section.hint}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {items.map((item) => {
                  const isDeleting = deleting[item.pathname];
                  return (
                    <div key={item.pathname} className="flex flex-col gap-2">
                      <div
                        className="relative rounded-2xl overflow-hidden"
                        style={{
                          aspectRatio: "3/4",
                          background: "rgba(20,17,50,0.95)",
                          border: "1px solid rgba(124,58,237,0.5)",
                        }}
                      >
                        {isVideo(item.url) ? (
                          <>
                            <video src={`${item.url}#t=0.1`} muted playsInline preload="metadata"
                              className="absolute inset-0 w-full h-full object-cover" />
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "rgba(124,58,237,0.85)" }}>
                                <Play className="w-4 h-4 text-white ml-0.5" fill="white" />
                              </div>
                            </div>
                          </>
                        ) : (
                          <Image src={item.url} alt="" fill className="object-cover" sizes="200px" />
                        )}
                        {isDeleting && (
                          <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(13,11,43,0.85)" }}>
                            <Loader2 className="w-6 h-6 text-purple-400 animate-spin" />
                          </div>
                        )}
                      </div>

                      <button
                        onClick={() => handleDelete(section.category, item)}
                        disabled={isDeleting}
                        className="flex items-center justify-center gap-1 py-1.5 rounded-xl text-xs font-bold text-red-400 hover:text-red-300 transition-colors disabled:opacity-50"
                        style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}>
                        <Trash2 className="w-3 h-3" />
                        Supprimer
                      </button>
                    </div>
                  );
                })}

                {/* Add tile */}
                <div className="flex flex-col gap-2">
                  <div
                    className="relative rounded-2xl overflow-hidden cursor-pointer group flex items-center justify-center"
                    style={{
                      aspectRatio: "3/4",
                      background: "rgba(20,17,50,0.95)",
                      border: "2px dashed rgba(124,58,237,0.4)",
                    }}
                    onClick={() => { if (status.state !== "uploading") fileInputRefs.current[section.category]?.click(); }}
                  >
                    {status.state === "uploading" ? (
                      <div className="flex flex-col items-center gap-2">
                        <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
                        <span className="text-white text-xs font-bold">Upload...</span>
                      </div>
                    ) : status.state === "error" ? (
                      <div className="flex flex-col items-center gap-2 p-2">
                        <AlertCircle className="w-8 h-8 text-red-400" />
                        <span className="text-red-400 text-xs text-center">{status.message}</span>
                        <span className="text-purple-400 text-xs font-bold">Réessayer</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2 group-hover:opacity-80 transition-opacity">
                        <div className="w-11 h-11 rounded-full flex items-center justify-center" style={{ background: "rgba(124,58,237,0.25)" }}>
                          <Upload className="w-6 h-6 text-purple-400" />
                        </div>
                        <span className="text-gray-400 text-xs text-center px-2">Ajouter</span>
                      </div>
                    )}
                  </div>
                  <input
                    ref={(el) => { fileInputRefs.current[section.category] = el; }}
                    type="file"
                    accept={ACCEPT_ANY_MEDIA}
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleAdd(section.category, file);
                      e.target.value = "";
                    }}
                  />
                </div>
              </div>
              <div className="h-px mt-2" style={{ background: "rgba(124,58,237,0.15)" }} />
            </div>
          );
        })}

        <div className="rounded-2xl p-5 flex gap-4 items-start"
          style={{ background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.2)" }}>
          <span className="text-2xl">💡</span>
          <div className="flex flex-col gap-1">
            <p className="text-white font-bold text-sm">Comment ça marche?</p>
            <ul className="text-gray-400 text-xs flex flex-col gap-1">
              <li>• Cliquez sur « Ajouter » pour uploader un fichier — autant que vous voulez par catégorie</li>
              <li>• Tout fichier ajouté s&apos;affiche sur le site (pas de limite de nombre)</li>
              <li>• Cliquez sur « Supprimer » pour retirer un fichier</li>
              <li>• Les changements sont visibles sur le site en moins d&apos;une minute</li>
              <li>• Images: JPG, PNG, WebP — Vidéos: MP4 (jusqu&apos;à 200 MB)</li>
            </ul>
          </div>
        </div>
      </div>
      )}
    </div>
  );
}
