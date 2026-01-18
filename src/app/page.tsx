"use client";

import React from "react";

export default function Home() {
  return (
    <>
      <section className="title-screen">
        <h1>Margarita Ivy's Concept</h1>
        <h2>THE FOAL</h2>
        <span>1. 5. — 15. 10. 2026</span>
        <div className="scroll-line"></div>
      </section>

      <section>
        <p>It is not a sculpture. It is a glitch in reality.</p>
        <p>
          Within the cyclic noise of the urban periphery,{" "}
          <span className="highlight">The Foal</span> creates a zone of absolute
          silence. A forensic record of time. 700 kilograms of transparent
          matter preserving a moment of interrupted life.
        </p>
        <p>An object that does not belong here, yet must be here.</p>

        <div
          className="video-gate"
          onClick={() =>
            alert(
              "Digital Access: Restricted area. Please visit the site for full context."
            )
          }
        >
          <span className="play-text">Initiate Sequence (Video Prequel)</span>
        </div>
      </section>

      <section
        style={{
          minHeight: "50vh",
          justifyContent: "flex-end",
          paddingBottom: "4rem",
        }}
      >
        <div className="footer-info">
          <div className="footer-col">
            <strong>Lokace:</strong>
            <br />
            Horní náměstí (Sektor C)
            <br />
            Brno-Bystrc, CZ
          </div>
          <div className="footer-col">
            <strong>Status:</strong>
            <br />
            Veřejná intervence
            <br />
            Sbírka TAECAR
          </div>
          <div className="footer-col">
            <strong>Produkce:</strong>
            <br />
            A Virtù Research
            <br />
            & Technologies
          </div>
        </div>
      </section>
    </>
  );
}
