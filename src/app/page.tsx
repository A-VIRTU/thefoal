"use client";

import React, { useRef, useState, useEffect } from "react";

const PLAYLIST = [
  "/assets/video/Epoxy_Resin_Macro_Shot_Generated.mp4",
  "/assets/video/Macro_Night_Grass_Tracking_Shot.mp4",
  "/assets/video/Abstract_Light_Caustics_Video_Generation.mp4",
  "/assets/video/Freezing_Water_Crystallization_Video.mp4",
  "/assets/video/Abstract_Monolith_Video_Generation.mp4",
];

export default function Home() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [systemText, setSystemText] = useState("[ SOUND OFF ]");

  // Handle Video End -> Glitch -> Next Video
  const handleVideoEnded = () => {
    if (!isPlaying || !videoRef.current) return;

    // 1. Cut to black
    videoRef.current.style.opacity = "0";

    // 2. Glitch pause (Random 0.5s - 2.0s)
    const glitchPause = Math.floor(Math.random() * 1500) + 500;

    setTimeout(() => {
      if (!isPlaying || !videoRef.current) return; // Check if still playing

      // 3. Next track index
      const nextIndex = (currentTrackIndex + 1) % PLAYLIST.length;
      setCurrentTrackIndex(nextIndex); // Triggers useEffect to load new source
      
      // Note: The unexpected play logic is handled in the useEffect below
      // to ensure state synchronization
    }, glitchPause);
  };

  // Effect to load and play video when track changes (only if system is active)
  useEffect(() => {
    if (isPlaying && videoRef.current) {
      videoRef.current.src = PLAYLIST[currentTrackIndex];
      videoRef.current.load();
      
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // 5. Fade in when actually playing
            if (videoRef.current) videoRef.current.style.opacity = "0.9";
          })
          .catch((error) => console.error("Video play error:", error));
      }
    }
  }, [currentTrackIndex, isPlaying]);

  const handleGateClick = () => {
    if (!audioRef.current || !videoRef.current) return;

    if (!isPlaying) {
      // START SYSTEM
      audioRef.current.play().catch((e) => console.error("Audio play failed", e));
      audioRef.current.volume = 0.5;
      
      setSystemText("[ LOADING DATA FRAGMENTS... ]");
      setIsPlaying(true);
      setCurrentTrackIndex(0); // Reset to first track

      // Initial visual state
      videoRef.current.style.opacity = "0.9";

      // Delayed status update
      setTimeout(() => {
        if (isPlaying) return; // Don't overwrite if stopped
        setSystemText("[ SYSTEM ACTIVE :: OBSERVING ]");
      }, 2000);

    } else {
      // SHUTDOWN
      audioRef.current.pause();
      videoRef.current.pause();
      
      setIsPlaying(false);
      setSystemText("[ SYSTEM OFFLINE ]");
      videoRef.current.style.opacity = "0.4"; // Dimmed but visible
    }
  };

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

        {/* VIDEO GATE */}
        <div 
          className="video-gate" 
          id="videoTrigger" 
          onClick={handleGateClick}
          style={{ borderColor: isPlaying ? '#00ff00' : '' }}
        >
          <video 
            ref={videoRef}
            muted // Muted needed for autoplay if we were auto-starting, but we are click-to-start. Kept for safety.
            playsInline 
            className="gate-video"
            onEnded={handleVideoEnded}
            style={{ opacity: isPlaying ? 0.9 : 0.6 }}
          >
            {/* Initial source, will be swapped by state */}
            <source src={PLAYLIST[0]} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          <div className="gate-overlay">
            <span className="play-text">Initiate Sequence</span>
            <span 
              className="sub-text"
              style={{ color: isPlaying ? '#00ff00' : 'var(--dim-color)' }}
            >
              {systemText}
            </span>
          </div>
        </div>

        <audio id="ambientAudio" loop ref={audioRef}>
            <source src="vacuum-sound.mp3" type="audio/mpeg" />
        </audio>
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
          <div className="footer-col" style={{ opacity: 0.8, color: "#fff" }}>
            <strong>Global Representation:</strong>
            <br />
            Karpuchina Gallery
            <br />
            Prague / Vienna
          </div>
        </div>
      </section>
    </>
  );
}
