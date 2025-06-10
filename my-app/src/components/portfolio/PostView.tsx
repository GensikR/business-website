"use client";

import React from "react";
import { WorkPost } from "@/types";

type PostViewProps = {
  post: WorkPost;
};

export default function PostView({ post }: PostViewProps) {
  const {
    title,
    intro,
    body1,
    body2,
    conclusion,
    img_srcs,
    created_time,
    permalink,
  } = post;

  const formattedDate = new Date(created_time).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article
      style={{
        maxWidth: 800,
        margin: "2rem auto",
        fontFamily: "'Georgia', serif",
        lineHeight: 1.65,
        color: "#333",
        padding: "0 1rem",
      }}
    >
      <header style={{ marginBottom: "1.5rem", textAlign: "center" }}>
        <h1
          style={{
            fontSize: "2.75rem",
            fontWeight: "bold",
            marginBottom: "0.25rem",
            color: "#1a1a1a",
            lineHeight: 1.2,
          }}
        >
          {title}
        </h1>
        <p
          style={{
            color: "#888",
            fontSize: "0.9rem",
            fontStyle: "italic",
            marginBottom: "0.75rem",
          }}
        >
          {formattedDate}
        </p>
        <a
          href={permalink}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            textDecoration: "none",
            color: "#0070f3",
            fontWeight: "600",
            fontSize: "0.9rem",
            borderBottom: "1px solid transparent",
            transition: "border-color 0.3s ease",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.borderBottomColor = "#0070f3")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.borderBottomColor = "transparent")
          }
        >
          View Original Post on Facebook
        </a>
      </header>

      {img_srcs.length > 0 && (
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "1rem",
            marginBottom: "2rem",
            borderRadius: 12,
            overflow: "hidden",
          }}
        >
          {img_srcs.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`${title} image ${i + 1}`}
              loading="lazy"
              style={{
                width: "100%",
                height: "auto",
                borderRadius: 8,
                objectFit: "cover",
                boxShadow:
                  "0 8px 15px rgba(0, 0, 0, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08)",
                transition: "transform 0.3s ease",
                cursor: "zoom-in",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            />
          ))}
        </section>
      )}

      <section style={{ marginBottom: "1.5rem" }}>
        <p
          style={{
            fontWeight: "600",
            fontSize: "1.25rem",
            marginBottom: "0.75rem",
          }}
        >
          {intro}
        </p>
        <p style={{ marginBottom: "1rem" }}>{body1}</p>
        <p style={{ marginBottom: "1rem" }}>{body2}</p>
        <p
          style={{
            fontWeight: "600",
            fontStyle: "italic",
            borderLeft: "4px solid #0070f3",
            paddingLeft: "1rem",
            color: "#444",
          }}
        >
          {conclusion}
        </p>
      </section>
    </article>
  );
}
