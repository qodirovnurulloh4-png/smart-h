import { motion } from "framer-motion";

export function BackgroundEffect() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Grid Pattern */}
      <div className="absolute inset-0 grid-bg opacity-50" />
      
      {/* Floating Orbs */}
      <motion.div 
        className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-primary/5 blur-[100px]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, 50, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div 
        className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-secondary/5 blur-[120px]"
        animate={{
          scale: [1.1, 0.9, 1.1],
          opacity: [0.2, 0.4, 0.2],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Subtle Scanline */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] z-[1] background-size-[100%_2px,3px_100%] pointer-events-none opacity-20" />
    </div>
  );
}
