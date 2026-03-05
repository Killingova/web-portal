import type { ReactElement } from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import wallpaper from "../../../assets/logo/wallpaperR.png";
import heroVideo from "../../../assets/video/GlowM_sharp.mp4";

const worldNames = [
  "der Schicksalsfäden",
  "des Seelenbaums",
  "der Chakra-Energie",
  "der kosmischen Weisheit",
  "der Herzensverbindungen",
  "des magischen Ursprungs",
  "der Elementarenergie",
  "der verborgenen Pfade",
  "der Weiten Erkenntnis",
];

// Zeiten in ms
const FADE_START = 7000;   // nach 7s beginnt der Übergang
const FADE_DURATION = 2000; // 2s sanfter Crossfade
const REMOVE_VIDEO = FADE_START + FADE_DURATION + 200;

export function HeroBereich(): ReactElement {
  const navigate = useNavigate();
  const [worldName, setWorldName] = useState<string>("");
  const [fading, setFading] = useState(false);
  const [videoRemoved, setVideoRemoved] = useState(false);

  useEffect(() => {
    const idx = Math.floor(Math.random() * worldNames.length);
    setWorldName(worldNames[idx]);
  }, []);

  useEffect(() => {
    const t1 = setTimeout(() => setFading(true), FADE_START);
    const t2 = setTimeout(() => setVideoRemoved(true), REMOVE_VIDEO);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const fadeDurationSec = FADE_DURATION / 1000;

  return (
    <div className="relative w-full h-screen overflow-hidden">

      {/* Wallpaper — liegt immer darunter */}
      <img
        src={wallpaper}
        alt="Hintergrund"
        className="absolute top-0 left-0 w-full h-full object-cover"
      />

      {/* Video — liegt darüber, blendet aus */}
      {!videoRemoved && (
        <motion.video
          key="hero-video"
          className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none"
          src={heroVideo}
          autoPlay
          muted
          playsInline
          animate={{ opacity: fading ? 0 : 1 }}
          transition={{ duration: fadeDurationSec, ease: "easeInOut" }}
        />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Inhalt */}
      <motion.section
        className="relative z-10 flex flex-col justify-start md:justify-center items-center md:items-end w-full h-full px-6 text-center md:text-right md:pr-20"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="w-full md:w-auto md:max-w-lg mt-20 sm:mt-24 md:mt-0">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold drop-shadow-lg leading-tight bg-clip-text text-transparent bg-gradient-to-r from-[#bba6ff] to-[#e2bf73]">
            Willkommen in der Welt
            <br />
            <span className="text-[#efe8ff]">{worldName}</span>
          </h1>
          <p className="text-lg text-white/90 mt-4 leading-relaxed">
            Erkunde die Tiefen moderner Erkenntnisse und lass dich inspirieren.
          </p>

          <motion.button
            onClick={() => navigate("/register")}
            className="hidden md:inline-block mt-8 border border-[#9b7fe8]/40 bg-[#6f52cc]/40 backdrop-blur-sm text-white py-3 px-8 rounded-lg font-semibold hover:bg-[#6f52cc]/65 transition-all duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Tauche ein!
          </motion.button>
        </div>
      </motion.section>

      <motion.button
        onClick={() => navigate("/register")}
        className="md:hidden fixed bottom-20 right-6 border border-[#9b7fe8]/40 bg-[#6f52cc]/40 backdrop-blur-sm text-white py-3 px-6 rounded-full font-semibold z-50 hover:bg-[#6f52cc]/65 transition-all duration-200"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Tauche ein!
      </motion.button>
    </div>
  );
}
