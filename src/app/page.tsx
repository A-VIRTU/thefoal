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
  const [systemText, setSystemText] = useState("[ INITIATE SEQUENCE ]");

  // Handle Video End -> Glitch -> Next Video
  const handleVideoEnded = () => {
    if (!isPlaying || !videoRef.current) return;

    // 1. Cut to black
    videoRef.current.style.opacity = "0";

    // 2. Glitch pause (Random 0.5s - 2.0s)
    const glitchPause = Math.floor(Math.random() * 1500) + 500;

    setTimeout(() => {
      if (!isPlaying || !videoRef.current) return;

      // 3. Next track index
      const nextIndex = (currentTrackIndex + 1) % PLAYLIST.length;
      setCurrentTrackIndex(nextIndex); 
      // Triggers useEffect to load new source
      
    }, glitchPause);
  };

  // Effect to load and play video when track changes
  useEffect(() => {
    if (isPlaying && videoRef.current) {
      videoRef.current.src = PLAYLIST[currentTrackIndex];
      videoRef.current.load();
      
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
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
      
      setSystemText("[ LOADING FRAGMENTS... ]");
      setIsPlaying(true);
      setCurrentTrackIndex(0);

      // Initial visual state
      videoRef.current.style.opacity = "0.9";

      // Delayed status update
      setTimeout(() => {
        if (isPlaying) return;
        setSystemText("[ SYSTEM ACTIVE ]");
      }, 2000);

    } else {
      // SHUTDOWN
      audioRef.current.pause();
      videoRef.current.pause();
      
      setIsPlaying(false);
      setSystemText("[ INITIATE SEQUENCE ]");
      videoRef.current.style.opacity = "0.6"; // Dimmed state
    }
  };

  return (
    <div className="layout-wrapper" style={{ minHeight: "100vh" }}>
      <div className="golden-grid" style={{ minHeight: "100vh" }}>
        
        {/* SIDE COLUMN: STRICT METADATA */}
        <div 
            className="col-side" 
            style={{ 
                display: "flex", 
                flexDirection: "column", 
                justifyContent: "flex-end", 
                paddingBottom: "var(--u4)" 
            }}
        >
            <div style={{ 
                fontFamily: "var(--font-mono)", 
                fontSize: "0.75rem", 
                color: "var(--c-gray)", 
                lineHeight: "1.6", 
                textTransform: "uppercase", 
                letterSpacing: "0.1em" 
            }}>
                <strong style={{ color: "var(--c-ink)" }}>Margarita Ivy</strong><br />
                <span style={{ display: "block", marginTop: "var(--u7)" }}>Object No. 1</span>
                Status: <span style={{ color: isPlaying ? "var(--c-signal)" : "var(--c-gray)" }}>
                    {isPlaying ? "Active" : "Standby"}
                </span><br />
                Sector: Brno-Bystrc / C<br />
                Start: 01.05.2026
                <br /><br />
                <span style={{ opacity: 0.5 }}>Representation:</span><br />
                Karpuchina Gallery
            </div>
        </div>

        {/* MAIN COLUMN: POSTER TITLE + GATE */}
        <div 
            className="col-main" 
            style={{ 
                display: "flex", 
                flexDirection: "column", 
                justifyContent: "center" 
            }}
        >
            
            <h1 style={{ 
                fontSize: "var(--f-poster)", 
                margin: 0, 
                lineHeight: "0.8", 
                letterSpacing: "-0.04em", 
                color: "var(--c-ink)" 
            }}>
                THE<br />
                FOAL
            </h1>

            <div 
                className="video-gate" 
                id="videoTrigger" 
                onClick={handleGateClick}
                style={{ 
                    marginTop: "var(--u5)", 
                    borderColor: isPlaying ? "var(--c-line)" : "var(--c-line)" 
                }}
            >
                <video 
                    ref={videoRef}
                    muted 
                    playsInline 
                    className="gate-video"
                    onEnded={handleVideoEnded}
                    style={{ opacity: isPlaying ? 0.9 : 0.6 }}
                >
                    <source src={PLAYLIST[0]} type="video/mp4" />
                </video>
                
                <div className="gate-overlay">
                    <span 
                        className="play-text" 
                        style={{ 
                            fontFamily: "var(--font-mono)",
                            color: isPlaying ? "var(--c-signal)" : "var(--c-accent)",
                            borderColor: isPlaying ? "var(--c-signal)" : "var(--c-dim)"
                        }}
                    >
                        {systemText}
                    </span>
                </div>
            </div>

            <audio id="ambientAudio" loop ref={audioRef}>
                <source src="vacuum-sound.mp3" type="audio/mpeg" />
            </audio>

        </div>
        
      </div>
    </div>
  );
}
