import { ImageResponse } from "next/og";

export const alt = "Growtion — Des créatives qui transforment le scroll en achat";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Branded share card rendered at build time — appears when the site is shared
// on WhatsApp / Instagram / Facebook.
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "linear-gradient(135deg, #4c1d95 0%, #6d28d9 55%, #7c3aed 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 18,
              background: "rgba(255,255,255,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 40,
              fontWeight: 900,
            }}
          >
            G
          </div>
          <div style={{ fontSize: 40, fontWeight: 900, letterSpacing: 8 }}>GROWTION</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ fontSize: 34, color: "#ddd6fe", fontWeight: 700 }}>
            SELL SMART · GROW FASTER
          </div>
          <div style={{ fontSize: 76, fontWeight: 900, lineHeight: 1.05, maxWidth: 980 }}>
            Des créatives qui transforment le scroll en achat
          </div>
        </div>

        <div style={{ display: "flex", gap: 48, fontSize: 30, color: "#ede9fe" }}>
          <span>Vidéos Pub</span>
          <span>UGC</span>
          <span>Landing Pages</span>
          <span>Filmage</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
