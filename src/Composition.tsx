import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
} from "remotion";

const script = [
  { text: "STAY", sub: "Focused on the goal", start: 0, end: 45 },
  { text: "GRIND", sub: "Work while they sleep", start: 45, end: 90 },
  { text: "REPEAT", sub: "Success is a habit", start: 90, end: 135 },
];

export const GlassPodcast: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Background Blob Animation
  const blobMove = interpolate(frame, [0, 135], [0, 360]);

  return (
    <AbsoluteFill style={{ backgroundColor: "#0e0e0e", overflow: "hidden" }}>
      {/* 1. Animated Background Blobs */}
      <div style={{
        position: 'absolute',
        width: 600,
        height: 600,
        borderRadius: '50%',
        background: 'linear-gradient(to right, #6366f1, #a855f7)',
        filter: 'blur(80px)',
        opacity: 0.4,
        left: '10%',
        top: '20%',
        transform: `rotate(${blobMove}deg) translateX(100px)`,
      }} />

      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        {script.map((item, i) => {
          // Animation timing for each "div change"
          const isCurrent = frame >= item.start && frame < item.end;
          if (!isCurrent) return null;

          const entry = spring({
            frame: frame - item.start,
            fps,
            config: { damping: 12 },
          });

          // 2. The Glassmorphic Div
          return (
            <div
              key={i}
              style={{
                width: "80%",
                padding: "60px 40px",
                borderRadius: "32px",
                // Glassmorphism Core Properties
                background: "rgba(255, 255, 255, 0.08)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
                
                // Animation: Slide up and Scale
                transform: `scale(${interpolate(entry, [0, 1], [0.8, 1])}) translateY(${interpolate(entry, [0, 1], [50, 0])}px)`,
                opacity: entry,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <h1 style={{
                color: "white",
                fontSize: 110,
                margin: 0,
                fontWeight: 900,
                letterSpacing: "-2px",
                textShadow: "0 4px 10px rgba(0,0,0,0.5)"
              }}>
                {item.text}
              </h1>
              <p style={{
                color: "rgba(255,255,255,0.7)",
                fontSize: 40,
                marginTop: 20,
                fontWeight: 400
              }}>
                {item.sub}
              </p>
            </div>
          );
        })}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};