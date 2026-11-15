import { ImageResponse } from "next/og";

export const alt =
  "Commonplace — 编辑这个网站、添加文章与发布的操作教程";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#F7F7F5",
          padding: "64px 72px",
          color: "#191919",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 24,
            letterSpacing: "-0.02em",
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span
              style={{
                display: "flex",
                width: 36,
                height: 36,
                borderRadius: 9,
                background: "#191919",
                color: "#FFFFFF",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22,
              }}
            >
              +
            </span>
            Commonplace
          </span>
          <span style={{ color: "#777777", fontSize: 18, letterSpacing: "0.12em" }}>
            CURRENT PROJECT / MAINTENANCE GUIDE
          </span>
        </div>
        <div style={{ display: "flex", maxWidth: 960, flexDirection: "column" }}>
          <span
            style={{
              display: "flex",
              marginBottom: 26,
              color: "#3366CC",
              fontSize: 18,
              letterSpacing: "0.12em",
            }}
          >
            编辑、维护与发布说明
          </span>
          <span
            style={{
              display: "flex",
              fontSize: 74,
              fontWeight: 600,
              letterSpacing: "-0.055em",
              lineHeight: 1.02,
            }}
          >
            编辑这个网站，从这里开始。
          </span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid #DEDEDB",
            paddingTop: 22,
            color: "#777777",
            fontSize: 17,
          }}
        >
          <span>启动 · 文章增删 · Markdown · SEO · 发布</span>
          <span>commonplace.studio</span>
        </div>
      </div>
    ),
    size,
  );
}
