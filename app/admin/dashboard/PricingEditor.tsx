"use client";
import { useState } from "react";
import { Plus, Trash2, Save, CheckCircle, AlertCircle, Loader2, RotateCcw } from "lucide-react";
import { DEFAULT_PRICING, type PricingConfig, type PricingPlan } from "@/lib/pricing";

type SaveState = "idle" | "saving" | "success" | "error";

const inputStyle = {
  background: "rgba(124,58,237,0.1)",
  border: "1px solid rgba(124,58,237,0.3)",
} as const;

function TextInput({
  value,
  onChange,
  placeholder,
  className = "",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  className?: string;
}) {
  return (
    <input
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className={`px-3 py-2 rounded-lg text-white placeholder-gray-600 outline-none text-sm w-full ${className}`}
      style={inputStyle}
    />
  );
}

export function PricingEditor({ initialPricing }: { initialPricing: PricingConfig }) {
  const [config, setConfig] = useState<PricingConfig>(initialPricing);
  const [save, setSave] = useState<SaveState>("idle");
  const [error, setError] = useState<string>("");

  // Helpers that produce a new config immutably.
  function patch(p: Partial<PricingConfig>) {
    setConfig((c) => ({ ...c, ...p }));
  }
  function updatePlan(idx: number, updater: (p: PricingPlan) => PricingPlan) {
    setConfig((c) => ({
      ...c,
      plans: c.plans.map((p, i) => (i === idx ? updater(p) : p)),
    }));
  }

  function addPlan() {
    setConfig((c) => ({
      ...c,
      plans: [
        ...c.plans,
        { category: "Nouvelle catégorie", packages: [{ label: "Forfait", price: 0 }], features: [], msg: "" },
      ],
    }));
  }
  function removePlan(idx: number) {
    setConfig((c) => ({ ...c, plans: c.plans.filter((_, i) => i !== idx) }));
  }

  async function handleSave() {
    setSave("saving");
    setError("");
    try {
      const res = await fetch("/api/pricing", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Échec de l'enregistrement");
      }
      const data = await res.json();
      if (data.config) setConfig(data.config as PricingConfig);
      setSave("success");
      setTimeout(() => setSave("idle"), 2500);
    } catch (err) {
      setSave("error");
      setError(err instanceof Error ? err.message : "Erreur réseau");
    }
  }

  function resetToDefault() {
    if (confirm("Réinitialiser les tarifs aux valeurs par défaut? (non enregistré tant que vous ne cliquez pas sur Enregistrer)")) {
      setConfig(DEFAULT_PRICING);
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-black text-white mb-1">Gestion des Tarifs</h1>
          <p className="text-gray-500 text-sm">
            Modifiez les forfaits, prix et textes. Enregistrez pour publier — visible sur le site en moins d&apos;une minute.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={resetToDefault}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-gray-400 hover:text-white transition-colors"
            style={{ background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.2)" }}
          >
            <RotateCcw className="w-4 h-4" />
            Réinitialiser
          </button>
          <button
            onClick={handleSave}
            disabled={save === "saving"}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-black text-white transition-all disabled:opacity-60"
            style={{ background: "linear-gradient(135deg, #7C3AED, #9333EA)", boxShadow: "0 0 24px rgba(124,58,237,0.35)" }}
          >
            {save === "saving" ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {save === "saving" ? "Enregistrement..." : "Enregistrer"}
          </button>
        </div>
      </div>

      {save === "success" && (
        <div className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm" style={{ background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.3)", color: "#4ade80" }}>
          <CheckCircle className="w-4 h-4" /> Tarifs enregistrés avec succès.
        </div>
      )}
      {save === "error" && (
        <div className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm" style={{ background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.3)", color: "#f87171" }}>
          <AlertCircle className="w-4 h-4" /> {error}
        </div>
      )}

      {/* Global section settings */}
      <div className="rounded-2xl p-5 flex flex-col gap-4" style={{ background: "rgba(20,17,50,0.6)", border: "1px solid rgba(124,58,237,0.2)" }}>
        <h2 className="text-lg font-black text-white">Réglages de la section</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="flex flex-col gap-1.5">
            <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">Sur-titre</span>
            <TextInput value={config.eyebrow} onChange={(v) => patch({ eyebrow: v })} placeholder="Transparent & simple" />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">Titre</span>
            <TextInput value={config.title} onChange={(v) => patch({ title: v })} placeholder="NOS TARIFS" />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">Symbole de devise</span>
            <TextInput value={config.currencyLabel} onChange={(v) => patch({ currencyLabel: v })} placeholder="DT" />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">Note de devise</span>
            <TextInput value={config.currencyNote} onChange={(v) => patch({ currencyNote: v })} placeholder="Prix en DT (Dinar Tunisien)" />
          </label>
          <label className="flex flex-col gap-1.5 md:col-span-2">
            <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">Numéro WhatsApp (chiffres uniquement)</span>
            <TextInput value={config.whatsappNumber} onChange={(v) => patch({ whatsappNumber: v.replace(/[^\d]/g, "") })} placeholder="21656614879" />
          </label>
        </div>
      </div>

      {/* Plans */}
      <div className="flex flex-col gap-5">
        {config.plans.map((plan, pi) => (
          <div key={pi} className="rounded-2xl p-5 flex flex-col gap-4" style={{ background: "rgba(20,17,50,0.6)", border: "1px solid rgba(124,58,237,0.2)" }}>
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">Catégorie</span>
                <TextInput value={plan.category} onChange={(v) => updatePlan(pi, (p) => ({ ...p, category: v }))} placeholder="Nom de la catégorie" className="mt-1.5 font-bold" />
              </div>
              <button
                onClick={() => removePlan(pi)}
                className="self-end flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold text-red-400 hover:text-red-300 transition-colors"
                style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}
              >
                <Trash2 className="w-3.5 h-3.5" /> Supprimer
              </button>
            </div>

            {/* Packages */}
            <div className="flex flex-col gap-2">
              <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">Forfaits</span>
              {plan.packages.map((pkg, ki) => (
                <div key={ki} className="flex items-center gap-2">
                  <TextInput
                    value={pkg.label}
                    onChange={(v) =>
                      updatePlan(pi, (p) => ({ ...p, packages: p.packages.map((x, j) => (j === ki ? { ...x, label: v } : x)) }))
                    }
                    placeholder="Description du forfait"
                  />
                  <div className="flex items-center gap-1 shrink-0" style={{ width: 130 }}>
                    <input
                      type="number"
                      min={0}
                      value={pkg.price}
                      onChange={(e) =>
                        updatePlan(pi, (p) => ({
                          ...p,
                          packages: p.packages.map((x, j) => (j === ki ? { ...x, price: Number(e.target.value) || 0 } : x)),
                        }))
                      }
                      className="px-3 py-2 rounded-lg text-white outline-none text-sm w-full"
                      style={inputStyle}
                    />
                    <span className="text-gray-500 text-xs font-bold">{config.currencyLabel}</span>
                  </div>
                  <button
                    onClick={() => updatePlan(pi, (p) => ({ ...p, packages: p.packages.filter((_, j) => j !== ki) }))}
                    className="shrink-0 p-2 rounded-lg text-red-400 hover:text-red-300 transition-colors"
                    style={{ background: "rgba(239,68,68,0.1)" }}
                    aria-label="Supprimer le forfait"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
              <button
                onClick={() => updatePlan(pi, (p) => ({ ...p, packages: [...p.packages, { label: "", price: 0 }] }))}
                className="self-start flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-purple-300 hover:text-purple-200 transition-colors"
                style={{ background: "rgba(124,58,237,0.12)", border: "1px solid rgba(124,58,237,0.25)" }}
              >
                <Plus className="w-3.5 h-3.5" /> Ajouter un forfait
              </button>
            </div>

            {/* Features */}
            <div className="flex flex-col gap-2">
              <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">Avantages</span>
              {plan.features.map((f, fi) => (
                <div key={fi} className="flex items-center gap-2">
                  <TextInput
                    value={f}
                    onChange={(v) => updatePlan(pi, (p) => ({ ...p, features: p.features.map((x, j) => (j === fi ? v : x)) }))}
                    placeholder="Ex: Montage pro"
                  />
                  <button
                    onClick={() => updatePlan(pi, (p) => ({ ...p, features: p.features.filter((_, j) => j !== fi) }))}
                    className="shrink-0 p-2 rounded-lg text-red-400 hover:text-red-300 transition-colors"
                    style={{ background: "rgba(239,68,68,0.1)" }}
                    aria-label="Supprimer l'avantage"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
              <button
                onClick={() => updatePlan(pi, (p) => ({ ...p, features: [...p.features, ""] }))}
                className="self-start flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-purple-300 hover:text-purple-200 transition-colors"
                style={{ background: "rgba(124,58,237,0.12)", border: "1px solid rgba(124,58,237,0.25)" }}
              >
                <Plus className="w-3.5 h-3.5" /> Ajouter un avantage
              </button>
            </div>

            {/* WhatsApp message */}
            <label className="flex flex-col gap-1.5">
              <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">Message WhatsApp pré-rempli</span>
              <TextInput value={plan.msg} onChange={(v) => updatePlan(pi, (p) => ({ ...p, msg: v }))} placeholder="Bonjour! Je suis intéressé(e) par..." />
            </label>
          </div>
        ))}

        <button
          onClick={addPlan}
          className="flex items-center justify-center gap-2 py-4 rounded-2xl text-sm font-black text-purple-300 hover:text-purple-200 transition-colors"
          style={{ background: "rgba(124,58,237,0.08)", border: "2px dashed rgba(124,58,237,0.3)" }}
        >
          <Plus className="w-5 h-5" /> Ajouter une catégorie
        </button>
      </div>
    </div>
  );
}
