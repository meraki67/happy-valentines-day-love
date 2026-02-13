import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function LoveLetterCard({ letter }) {
  return (
    <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7 }}
      className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-glow overflow-hidden"
    >
      <div className="absolute -inset-10 bg-gradient-to-r from-pink-500/20 via-rose-500/10 to-fuchsia-500/20 blur-3xl" />
      <div className="relative p-6 sm:p-8">
        <div className="flex items-center gap-2 text-white/70">
          <Heart className="size-4 text-pink-300" />
          <span className="text-sm">Love Letter</span>
        </div>

        <div className="mt-5 whitespace-pre-wrap leading-relaxed text-white/85">
          {letter}
        </div>
      </div>
    </motion.div>
  );
}
