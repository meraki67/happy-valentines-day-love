import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Music, Pause, Sparkles, Gift, X } from "lucide-react";
import HeartsBackground from "./components/HeartsBackground.jsx";
import LoveLetterCard from "./components/LoveLetterCard.jsx";
import Gallery from "./components/Gallery.jsx";
import RomanticParticles from "./components/RomanticParticles";
import hero1 from "./assets/hero/1.jpg";
import hero2 from "./assets/hero/3.mp4";
import hero3 from "./assets/hero/2.jpg";
import hero4 from "./assets/hero/4.jpg";
import hero5 from "./assets/hero/5.mp4";
import hero6 from "./assets/hero/6.jpg";

import song1 from "./assets/music/1.mp3";
import song3 from "./assets/music/3.mp3";


// ✅ Edit these (personalize)
const WEBSITE_SONGS = [song3]; // background songs only
const THEME_SONG = song1; // your real theme song
const GIRLFRIEND_NAME = "My Love Joan"; // e.g. "Angela"
const YOUR_NAME = "Dave"; // e.g. "Dave Kenneth"
const ANNIV_DATE = "March 08"; // optional
const LETTER = `Hi ${GIRLFRIEND_NAME},

Happy Valentine’s Day Love ko! ❤️

Hindi na ako gagawa ng long message kasi ito na yun eh hehehe, I just want to remind you how grateful I am for you. Thank you for being my peace, my best friend, and my favorite person.

Every moment with you feels special, and I’m excited for all the memories we’ll still create. Love I'm sorry if ito lang nakayanan kong ibigay sa iyo. A little effort but hoping still you gonna appreciate it I know malala na ung pinagdadaanan natin sa ngayon. Pasensya na love kung wala man lang akong gift or anything that would make your valentines day more special. All I have is this. A little simple website to express my feelings to you since all I have is this knowledge and effort to make this. For almost 2 years na nagkasama tayo marami na tayo nasubukang pagsubok, pero itong challenges na pinagdadaanan natin ang pinakamalala siguro. I know hindi madali ang pinagdadaanan natin ngayon, pero please know that I’m here for you, always. We can get through this together, just like we’ve overcome everything else. Alam kong hindi ito ang ideal na Valentine’s Day na gusto nating dalawa, pero sana maramdaman mo pa rin yung pagmamahal ko sa iyo kahit ganito ang setup natin ngayon. Babawi ako sa iyo as soon as possible I get my first salary. I promise to make it up to you and give you the love and care you deserve. I'm very sorry love if nangyayari sa atin ito ngayon. I just want you to know that I love you so much, and I’m committed to making things better between us. We’ve been through so much together, and I believe in us. Let’s keep supporting each other and working through this, because you mean the world to me. Realtak yun. It just I hope you can understand my situation and the fact that I’m doing my best, and I want to make things right. All I can do now is to apologize and accept the consequences of my actions. Whether you choose to leave me or not. I fully understand if you need time or space, but please know that I’m here whenever you’re ready to talk. I want to listen to your feelings and concerns, and work together to find a way forward. I love you so much, and I’m willing to do whatever it takes to make things right between us. Thank you for being patient with me, and for giving me the chance to apologize. I hope we can get through this together, and come out stronger on the other side. Pero syempre don't wag huwag ayoko! Anyways, Love I hope I'll make you a smile a little bit para sa araw na ito. I know this is simple but please. PLEASE accept this as a token of my love and effort for you. I know you didn't deserve all of this shits happening to us. But I believe this isn't too late love, I will make things right in the right time. I LOVE YOU SO MUCH LOVE and next month is our biggest day. Thank you so much love for the unwavering love, support, trust, believe, and care that you have given to me. I am so truly grateful to have you in my life. Pinakabiggest decision ko sa buhay ko? Choosing you. And I will keep choosing you, every single day, for the rest of my life. Kaya wag na wag mong sasabihin na mali ung mga nagiging decision ko. Dahil higit sa lahat, sa mga panahong sumusuko ako sa ugali mo, ikaw at ikaw parin ang pinipili kong makasama ang buhay dahil alam ko sa tamang panahon, mababago mo rin ung mga ayaw ko sa ugali mo, at gayun din ako mababago rin ung mga bagay na kinaiinisan mo at kinaayawan mo. hehehe I'll try ^_^. Love once again, Happy Valentine’s Day! I hope this day brings you as much happiness and love as you have brought into my life. You deserve all the love and happiness in the world, and I’m so lucky to be the one giving it to you. Thank you so much for being you, and for sharing your love with me. I can’t wait to see what the future holds for us, and to continue building our beautiful love story together. Mwah mwah 😘😘😘

I love you—today, always and forever.

PS: Please take care of yourself, and remember that I’m here for you no matter what. If you ever need anything, just let me know. I want to support you in any way I can, and be there for you through thick and thin. You’re not alone, love. We’re in this together, and I’m committed to making things better between us.

PPS: Check mo pa ibang website and enjoy viewing my valentines website for you. Feel free to record and post it into your tiktok hehehe to highlight how ka effort ang imong boyfriend.

Your Love,
${YOUR_NAME} ❤️😘
`;

export default function App() {
  const [surpriseOpen, setSurpriseOpen] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const websiteAudioRef = useRef(null);
  const galleryAudioRef = useRef(null);
  const [isThemePlaying, setIsThemePlaying] = useState(false);
  const [isWebsitePlaying, setIsWebsitePlaying] = useState(false);
  const playBtnRef = useRef(null);
  const [tooltipPos, setTooltipPos] = useState({ top: 0, left: 0 });


  const openSurprise = () => {
    setSurpriseOpen(true);
  };

  const reveal = () => {
    setRevealed(true);
  };

  const heroMedia = [
    hero1,
    hero2,
    hero3,
    hero4,
    hero5,
    hero6,
  ];

  const websiteMusic = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * WEBSITE_SONGS.length);
    return WEBSITE_SONGS[randomIndex];
  }, []);

  const memoryModules = import.meta.glob(
    "./assets/memories/*.{jpg,jpeg,png,mp4}",
    { eager: true }
  );

  const allMemories = Object.values(memoryModules).map(
    (module) => module.default
  );
  
  useEffect(() => {
    const gallerySection = document.getElementById("gallery");
    if (!gallerySection) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        const websiteAudio = websiteAudioRef.current;
        const galleryAudio = galleryAudioRef.current;

        if (!websiteAudio || !galleryAudio) return;

        if (entry.isIntersecting) {
          // ENTER GALLERY
          if (!websiteAudio.paused) {
            websiteAudio.pause();
          }

          if (galleryAudio.paused) {
            galleryAudio.play().catch(() => {});
          }

        } else {
          // LEAVE GALLERY
          if (!galleryAudio.paused) {
            galleryAudio.pause();
          }

          if (websiteAudio.paused) {
            websiteAudio.play().catch(() => {});
          }
        }
      },
      { threshold: 0.6 }
    );

    observer.observe(gallerySection);


    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updatePosition = () => {
      if (!playBtnRef.current) return;

      const rect = playBtnRef.current.getBoundingClientRect();

      setTooltipPos({
        top: rect.bottom + 10,
        left: rect.left + rect.width / 2,
      });
    };

    updatePosition();

    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition);
    };
  }, []);


  const toggleThemeSong = async () => {
    const websiteAudio = websiteAudioRef.current;
    const themeAudio = galleryAudioRef.current;

    if (!websiteAudio || !themeAudio) return;

    if (!isThemePlaying) {
      // Pause website music first
      if (!websiteAudio.paused) {
        websiteAudio.pause();
        setIsWebsitePlaying(false);
      }

      try {
        await themeAudio.play();
        setIsThemePlaying(true);
      } catch (err) {
        console.log("Theme play blocked:", err);
      }

    } else {
      // Pause theme
      themeAudio.pause();
      setIsThemePlaying(false);

      // Resume website music automatically
      try {
        await websiteAudio.play();
        setIsWebsitePlaying(true);
      } catch (err) {
        console.log("Website resume blocked:", err);
      }
    }
  };


  const toggleWebsiteMusic = async () => {
    const websiteAudio = websiteAudioRef.current;
    const themeAudio = galleryAudioRef.current;

    if (!websiteAudio || !themeAudio) return;

    if (!isWebsitePlaying) {
      // If theme song is playing → pause it
      if (!themeAudio.paused) {
        themeAudio.pause();
        setIsThemePlaying(false);
      }

      try {
        await websiteAudio.play();
        setIsWebsitePlaying(true);
      } catch (err) {
        console.log("Website play blocked:", err);
      }

    } else {
      // Pause only website music
      websiteAudio.pause();
      setIsWebsitePlaying(false);
    }
  };

  return (
    <div className="min-h-screen text-white font-body relative overflow-hidden bg-[#050507]">
      {/* Ambient Glow Background */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-pink-500/20 rounded-full blur-[160px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[700px] h-[700px] bg-rose-500/20 rounded-full blur-[180px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0b0b12] to-black" />
      </div>
      <HeartsBackground />

      <RomanticParticles />

      {/* Grain overlay */}
      <div className="grain absolute inset-0 -z-10" />

      {/* Audio element */}
      {/* Website Music */}
      <audio ref={websiteAudioRef} src={websiteMusic} loop preload="auto" />

      {/* Gallery Theme Song */}
      <audio ref={galleryAudioRef} src={THEME_SONG} loop preload="auto" />

      {/* Top bar */}
      <div className="sticky top-0 z-40 backdrop-blur-xl bg-black/20 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center size-9 rounded-2xl bg-white/5 border border-white/10 shadow-glow">
              <Heart className="size-5 text-pink-300" />
            </span>
            <div className="leading-tight">
              <div className="font-semibold tracking-tight">Valentine’s Surprise</div>
              <div className="text-xs text-white/60">for {GIRLFRIEND_NAME}</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative inline-flex">
              <button
                onClick={toggleWebsiteMusic}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
              >
                {isWebsitePlaying ? (
                  <>
                    <Pause className="size-4" />
                    <span className="text-sm">Pause</span>
                  </>
                ) : (
                  <>
                    <Music className="size-4" />
                    <span className="text-sm">Play</span>
                  </>
                )}
              </button>

              {!isWebsitePlaying && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: [0, -6, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                  className="
                    absolute
                    top-full
                    mt-2
                    left-[-15%]
                    -translate-x-[200%]
                    bg-gradient-to-r from-pink-600 to-fuchsia-600
                    text-white
                    text-xs
                    px-3
                    py-2
                    rounded-xl
                    shadow-lg
                    border border-white/20
                    text-center
                    z-50
                    min-w-[100px]
                  "
                >
                  Click to play<br />the music 🎵

                  <div
                    className="
                      absolute
                      -top-2
                      left-1/2
                      -translate-x-1/2
                      w-3 h-3
                      bg-pink-600
                      rotate-45
                    "
                  />
                </motion.div>
              )}
            </div>

            <a
              href="#letter"
              className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
            >
              <Sparkles className="size-4" />
              <span className="text-sm">Letter</span>
            </a>
          </div>
        </div>
      </div>

      {/* HERO */}
      <section className="relative">
        <div className="max-w-6xl mx-auto px-4 pt-16 pb-10 sm:pt-24 sm:pb-16">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10"
              >
                <Gift className="size-4 text-pink-300" />
                <span className="text-sm text-white/80">
                  A special surprise for you {GIRLFRIEND_NAME}
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="mt-6 font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05]"
              >
                Happy <span className="bg-gradient-to-r from-pink-400 via-rose-400 to-fuchsia-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(255,77,109,0.4)]">
                Valentine’s
                </span> Day,
                <br />
                <span className="text-white">{GIRLFRIEND_NAME}</span> ❤️
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mt-5 text-lg text-white/75 max-w-xl"
              >
                Every love story is beautiful — but ours is my favorite.
                {ANNIV_DATE ? ` (Since ${ANNIV_DATE})` : ""}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.28 }}
                className="mt-8 flex flex-wrap gap-3"
              >
                <button
                  onClick={openSurprise}
                  className="group relative inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-fuchsia-600 shadow-[0_0_40px_rgba(255,77,109,0.6)]
 hover:brightness-110 transition shadow-glow"
                >
                  <Sparkles className="size-5" />
                  <span className="font-semibold">Open the Surprise</span>
                  <span className="absolute -inset-0.5 rounded-2xl blur-xl bg-pink-500/20 opacity-0 group-hover:opacity-100 transition" />
                </button>

                <a
                  href="#letter"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
                >
                  <Heart className="size-5 text-pink-300" />
                  <span className="font-semibold">Read the Letter</span>
                </a>
              </motion.div>

              <div className="mt-10 text-xs text-white/50">
                Tip: <b>Click or Play</b> to start the theme song (browser requires tap/click).
              </div>
            </div>

            {/* Right card */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15 }}
              className="relative"
            >
              <div className="absolute -inset-10 rounded-3xl bg-gradient-to-r from-pink-500/40 via-rose-500/30 to-fuchsia-500/40 blur-[120px] animate-pulse" />
              <div className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-glow overflow-hidden">
                <div className="p-6 sm:p-8">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-white/60">Tonight’s mood</div>
                    <div className="inline-flex items-center gap-2 text-xs text-white/70 bg-black/30 border border-white/10 px-3 py-1.5 rounded-full">
                      <span className="size-2 rounded-full bg-pink-400 animate-pulse" />
                      Romantic Mode
                    </div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-5 space-y-2 text-white/80 leading-relaxed"
                  >
                    <p>
                      Today feels different — softer, warmer, and filled with love. Every moment with you makes my world brighter.
                    </p>
                    <p>
                      And I hope you won't just feel my love today, but every day. Because you deserve that and so much more.
                    </p>
                    <p>
                      I promise I'll keep doing my best to make you feel cherished, supported, and adored — not just on Valentine’s Day, but for all the days of our lives together.
                    </p>
                    <p className="text-pink-300 font-medium">
                      February is ours. ❤️
                    </p>
                  </motion.div>

                  <div className="mt-5 grid grid-cols-3 gap-3">
                    {heroMedia.map((media, i) => {
                      const isVideo = media.endsWith(".mp4");

                      return (
                        <div
                          key={i}
                          className="relative group aspect-square overflow-hidden rounded-2xl border border-white/10"
                        >
                          {isVideo ? (
                            <video
                              src={media}
                              autoPlay
                              muted
                              loop
                              playsInline
                              preload="auto"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <img
                              src={media}
                              alt={`hero-${i}`}
                              className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                            />
                          )}

                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60" />
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-2 text-sm text-white/70">
                    A small corner of the internet — made just for you.
                  </div>
                </div>

                <div className="px-6 sm:px-5 pb-6">
                  <div className="rounded-2xl bg-black/30 border border-white/10 p-4 flex items-center justify-between">
                    <div>
                      <div className="text-xs text-white/60">Theme Song</div>
                      <div className="font-semibold tracking-tight">Press play when you’re ready</div>
                    </div>
                    <button
                      onClick={toggleThemeSong}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
                    >
                      <Music className="size-4" />
                      <span className="text-sm">
                        {isThemePlaying ? "Pause Theme Song" : "Play Our Theme Song"}
                      </span>
                    </button>

                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* LETTER */}
      <section id="letter" className="relative">
        <div className="max-w-6xl mx-auto px-4 py-16 sm:py-20">
          <div className="flex items-end justify-between gap-4">
            <div>
              <div className="text-sm text-white/60">A letter from my heart</div>
              <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold tracking-tight">
                For <span className="text-pink-300">{GIRLFRIEND_NAME}</span>
              </h2>
            </div>
          </div>

          <div className="mt-8">
            <LoveLetterCard letter={LETTER} />
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="relative">
        <div className="max-w-6xl mx-auto px-4 pb-20">
          <div className="text-sm text-white/60">Memories</div>
          <h3 className="mt-2 font-display text-3xl sm:text-4xl font-bold tracking-tight">
            Little moments, <span className="text-pink-300">big love</span>
          </h3>
          <p className="mt-3 text-white/70 max-w-2xl">
            {/* Add your photos later. For now, the layout and effects are ready. */}
          </p>

          <div className="mt-8">
            <Gallery media={allMemories} />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/30">
        <div className="max-w-6xl mx-auto px-4 py-8 text-sm text-white/60 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
          <div>
            Made with ❤️ by <span className="text-white/80">{YOUR_NAME}</span> in February 14, 2026
          </div>
          <div className="text-xs text-white/50">
            {/* Tip: Deploy on Netlify → build: <b>npm run build</b>, publish: <b>dist</b> */}
          </div>
        </div>
      </footer>

      {/* SURPRISE MODAL */}
      <AnimatePresence>
        {surpriseOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/70 backdrop-blur-md"
              onClick={() => setSurpriseOpen(false)}
            />
            <motion.div
              initial={{ y: 30, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 140, damping: 18 }}
              className="relative w-full max-w-2xl rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-glow overflow-hidden"
            >
              <div className="p-4 sm:p-6 flex items-center justify-between border-b border-white/10">
                <div>
                  <div className="text-xs text-white/60">Surprise unlocked</div>
                  <div className="font-semibold tracking-tight">
                    For you, {GIRLFRIEND_NAME} 💖
                  </div>
                </div>
                <button
                  onClick={() => setSurpriseOpen(false)}
                  className="inline-flex items-center justify-center size-10 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
                >
                  <X className="size-4" />
                </button>
              </div>

              {/* Envelope + reveal */}
              <div className="p-6 sm:p-8">
                <div className="grid md:grid-cols-2 gap-6 items-center">
                  <div className="relative">
                    <div className="absolute -inset-6 rounded-3xl bg-gradient-to-r from-pink-500/25 via-rose-500/20 to-fuchsia-500/25 blur-3xl" />

                    <div className="relative rounded-3xl bg-black/30 border border-white/10 p-6 overflow-hidden">
                      {/* Envelope */}
                      <div className="relative mx-auto w-full max-w-sm">
                        <div className="relative rounded-2xl bg-gradient-to-b from-white/10 to-white/5 border border-white/10 p-6">
                          <div className="text-xs text-white/60">Tap to open</div>

                          <motion.div
                            className="mt-4 relative h-44 rounded-2xl border border-white/10 bg-white/5 overflow-hidden"
                            onClick={() => {
                              reveal();

                              // optionally start music when opening
                              // toggleMusic();
                            }}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                          >
                            {/* flap */}
                            <motion.div
                              className="absolute top-0 left-0 right-0 h-24 origin-top"
                              initial={{ rotateX: 0 }}
                              animate={{ rotateX: revealed ? 180 : 0 }}
                              transition={{ duration: 0.7, ease: [0.2, 0.9, 0.2, 1] }}
                              style={{
                                background:
                                  "linear-gradient(180deg, rgba(255,255,255,0.18), rgba(255,255,255,0.06))",
                                borderBottom: "1px solid rgba(255,255,255,0.10)",
                              }}
                            />
                            {/* letter */}
                            <motion.div
                              className="absolute left-4 right-4 bottom-4 rounded-xl bg-white/10 border border-white/10 p-4"
                              initial={{ y: 36, opacity: 0 }}
                              animate={{ y: revealed ? 0 : 36, opacity: revealed ? 1 : 0 }}
                              transition={{ duration: 0.6, delay: 0.2 }}
                            >
                              <div className="flex items-center gap-2">
                                <Heart className="size-4 text-pink-300" />
                                <div className="text-sm font-semibold">Open me ❤️</div>
                              </div>
                              <div className="mt-2 text-xs text-white/70">
                                Surprise message is ready.
                              </div>
                            </motion.div>
                          </motion.div>

                          <div className="mt-4 text-xs text-white/60">
                            Click the envelope to reveal the surprise.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-3xl bg-black/30 border border-white/10 p-6"
                    >
                      <div className="text-xs text-white/60">Your surprise</div>
                      <div className="mt-2 font-display text-2xl font-bold tracking-tight">
                        {revealed ? "You’re my forever." : "Tap the envelope first…"}
                      </div>

                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: revealed ? 1 : 0, y: revealed ? 0 : 8 }}
                        transition={{ duration: 0.45 }}
                        className="mt-4 text-white/75 leading-relaxed"
                      >
                        {revealed
                          ? `I made this just for you, ${GIRLFRIEND_NAME}. Thank you for choosing me, and for being my safest place. Happy Valentine’s Day ❤️`
                          : ""}
                      </motion.div>

                      <div className="mt-6 flex flex-wrap gap-3">
                        <button
                          onClick={() => {
                            reveal();
                          }}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
                        >
                          <Sparkles className="size-4 text-pink-300" />
                          <span className="text-sm">Play Song</span>
                        </button>

                        <button
                          onClick={() => setSurpriseOpen(false)}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-pink-500/80 via-rose-500/80 to-fuchsia-500/80 hover:brightness-110 transition"
                        >
                          <Heart className="size-4" />
                          <span className="text-sm font-semibold">Close</span>
                        </button>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
