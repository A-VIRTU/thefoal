"use client";

import React, { useRef, useState, useEffect } from "react";

const PLAYLIST = [
  "/assets/video/Epoxy_Resin_Macro_Shot_Generated.mp4",
  "/assets/video/Macro_Night_Grass_Tracking_Shot.mp4",
  "/assets/video/Abstract_Light_Caustics_Video_Generation.mp4",
  "/assets/video/Freezing_Water_Crystallization_Video.mp4",
  "/assets/video/Abstract_Monolith_Video_Generation.mp4",
];

// STRICT MATH CONSTANTS
const PHI_INV = 0.618;

export default function Home() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [systemText, setSystemText] = useState("[ INITIATE SEQUENCE ]");

  // Handle Video End -> Glitch -> Next Video
  const handleVideoEnded = () => {
    if (!isPlaying || !videoRef.current) return;

    // 1. Cut to black (handled via opacity transition if needed, or conceptually)
    // For strict glitch, we might want to manually toggle a class or just let the switch happen.
    // Given the previous logic used opacity: 0, we can enforce that via inline ONLY for the glitch moment 
    // OR add a 'glitch' class. Let's keep it simple for now and rely on the natural cut.
    // Optimally, we'd add a 'is-glitching' state, but let's stick to the core requirement: NO MAGIC NUMBERS.
    
    videoRef.current.style.opacity = "0"; // Temporary glitch effect

    // 2. Glitch pause (Strict Phi-Based Timing)
    // TIMINGS: 382ms (Fast), 618ms (Base), 1618ms (Slow)
    const phiTimings = [382, 618, 1618];
    const glitchPause = phiTimings[Math.floor(Math.random() * phiTimings.length)];

    setTimeout(() => {
      if (!isPlaying || !videoRef.current) return;

      // 3. Next track index
      const nextIndex = (currentTrackIndex + 1) % PLAYLIST.length;
      setCurrentTrackIndex(nextIndex); 
      
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
            if (videoRef.current) videoRef.current.style.opacity = ""; // Remove inline override to revert to class
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
      audioRef.current.volume = PHI_INV;
      
      setSystemText("[ LOADING FRAGMENTS... ]");
      setIsPlaying(true);
      setCurrentTrackIndex(0);

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
    }
  };

  return (
    <div className="layout-wrapper">
      <div className="golden-grid">
        
        {/* SIDE COLUMN: STRICT METADATA */}
        <div className="col-side poster-sidebar">
            <div className="credits-block">
                <div className="mb-u5">
                    <strong className="credits-header">COORDINATES</strong><br />
                    LOC: BRNO-BYSTRC / SECTOR C<br />
                    {/* TODO: Update dates when provided by user (see docx/pdf) */}
                    DATE: [START DATE] — [END DATE]<br />
                    STATUS: <span className={isPlaying ? "status-active" : "status-standby"}>
                        {isPlaying ? "ACTIVE PHASE" : "STANDBY"}
                    </span>
                </div>

                <div className="mb-u5">
                    {/* TAECAR LOGO REMOVED AS REQUESTED */}
                    
                    <strong className="credits-header">PRODUCTION</strong><br />
                    TAECAR ARCHIVE<br />
                    COLL. A VIRTÙ RESEARCH & TECHNOLOGIES
                </div>

                <div>
                    <strong className="credits-header">PARTNERSHIP</strong><br />
                    SUPPORT: MČ BRNO-BYSTRC<br />
                    REPR.: KARPUCHINA GALLERY<br />
                    {/* KARPUCHINA LOGO PLACEHOLDER */}
                    {/* <img src="/assets/images/karpuchina-logo.png" alt="Karpuchina Gallery" className="partner-logo" /> */}
                </div>
            </div>
        </div>

        {/* MAIN COLUMN: POSTER TITLE + GATE */}
        <div className="col-main poster-main">
            
            <h3 className="poster-concept">
                MARGARITA IVY CONCEPT
            </h3>

            <h1 className="poster-headline">
                THE<br />
                FOAL
            </h1>

            <div 
                className={`video-gate video-gate-container ${isPlaying ? "is-active" : ""}`}
                id="videoTrigger" 
                onClick={handleGateClick}
            >
                <video 
                    ref={videoRef}
                    muted 
                    playsInline 
                    className="gate-video gate-video-element"
                    onEnded={handleVideoEnded}
                >
                    <source src={PLAYLIST[0]} type="video/mp4" />
                </video>
                
                <div className="gate-overlay">
                    <span className="play-text gate-text-overlay">
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
