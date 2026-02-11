import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { motion } from "framer-motion";

interface SlideControlsProps {
  current: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
}

export function SlideControls({ current, total, onPrev, onNext }: SlideControlsProps) {
  const progress = ((current + 1) / total) * 100;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-8 flex items-center justify-between pointer-events-none bg-gradient-to-t from-background via-background/50 to-transparent">
      <div className="flex items-center gap-3 md:gap-4 pointer-events-auto">
        <span className="font-mono text-[10px] md:text-sm text-primary tracking-widest shrink-0">
          {(current + 1).toString().padStart(2, '0')} <span className="text-muted-foreground">/</span> {total.toString().padStart(2, '0')}
        </span>
        <div className="h-0.5 md:h-1 w-16 md:w-32 bg-white/10 rounded-full overflow-hidden shrink-0">
          <motion.div 
            className="h-full bg-primary shadow-[0_0_10px_rgba(0,243,255,0.5)]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          />
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-3 pointer-events-auto">
        <button 
          onClick={onPrev}
          disabled={current === 0}
          className="p-2 md:p-3 rounded-full glass-panel hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95 group"
        >
          <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-foreground group-hover:text-primary transition-colors" />
        </button>
        <button 
          onClick={onNext}
          disabled={current === total - 1}
          className="p-2 md:p-3 rounded-full glass-panel hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95 group"
        >
          <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-foreground group-hover:text-primary transition-colors" />
        </button>
      </div>
    </div>
  );
}
