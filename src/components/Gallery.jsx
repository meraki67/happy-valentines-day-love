import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Gallery({ media }) {
  const [items, setItems] = useState([]);

  // Shuffle function
  const shuffle = () => {
    const shuffled = [...media].sort(() => 0.10 - Math.random());
    setItems(shuffled);
  };

  // Initial shuffle
  useEffect(() => {
    shuffle();
  }, [media]);

  // Shuffle every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      shuffle();
    }, 5000);

    return () => clearInterval(interval);
  }, [media]);

  return (
    <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 space-y-4">
      <AnimatePresence>
        {items.map((item) => {
          const isVideo = item.toLowerCase().endsWith(".mp4");

          return (
            <motion.div
              key={item}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="relative break-inside-avoid overflow-hidden rounded-2xl border border-white/10
              shadow-[0_0_25px_rgba(255,77,109,0.15)]"
            >
              {isVideo ? (
                <video
                  src={item}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={item}
                  alt=""
                  className="w-full h-full object-cover"
                />
              )}

              {/* Soft overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60" />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
