import { motion } from "framer-motion";
import { Sparkles, Home } from "lucide-react";

interface CoverSlideProps {
  title: string;
  subtitle?: string;
  image?: string;
}

export function CoverSlide({ title, subtitle, image }: CoverSlideProps) {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center relative z-10 text-center px-6 overflow-hidden">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mb-6 md:mb-8 relative z-10"
      >
        <div className="absolute -inset-6 md:-inset-10 bg-primary/20 blur-[40px] md:blur-[60px] rounded-full animate-pulse" />
        <Home className="w-16 h-16 md:w-24 md:h-24 text-primary relative z-10 drop-shadow-[0_0_15px_rgba(0,243,255,0.8)]" />
      </motion.div>

      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="text-3xl md:text-8xl font-black text-white mb-4 md:mb-6 neon-text-primary tracking-tighter relative z-10"
      >
        {title}
      </motion.h1>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="text-lg md:text-3xl text-white font-medium max-w-3xl mx-auto relative z-10 mb-12 px-4 py-2 glass-panel rounded-xl"
      >
        {subtitle}
      </motion.p>

      {image && (
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="w-full max-w-4xl rounded-3xl overflow-hidden glass-panel border-white/20 shadow-[0_0_50px_rgba(0,0,0,0.5)] mb-12"
        >
          <img src={image} alt="Cover" className="w-full h-48 md:h-[350px] object-cover opacity-90" />
        </motion.div>
      )}
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-24 md:bottom-20 flex items-center gap-2 text-[10px] md:text-xs font-mono text-primary/60 uppercase tracking-[0.3em] z-10"
      >
        <Sparkles className="w-3 h-3" />
        Future Living Concepts
        <Sparkles className="w-3 h-3" />
      </motion.div>
    </div>
  );
}
