import { motion } from "framer-motion";
import { MoveRight, Wifi, Cloud, Smartphone, Cpu } from "lucide-react";

interface ArchitectureSlideProps {
  title: string;
  content: {
    steps: Array<{ icon: string; label: string; targetSlide: number }>;
    description?: string;
  };
}

const iconMap: Record<string, any> = {
  Cpu,
  Wifi,
  Cloud,
  Smartphone
};

export function ArchitectureSlide({ title, content }: ArchitectureSlideProps) {
  const steps = content.steps.map(step => ({
    ...step,
    icon: iconMap[step.icon] || Cpu
  }));

  const handleNodeClick = (targetSlide: number) => {
    // This is a bit of a hack to communicate with the parent Presentation component
    // We'll dispatch a custom event that the parent can listen to
    window.dispatchEvent(new CustomEvent('goto-slide', { detail: targetSlide - 1 }));
  };

  return (
    <div className="h-full w-full flex flex-col p-6 md:p-20 relative z-10 overflow-y-auto">
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent animate-pulse" />
        <div className="absolute top-2/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary to-transparent animate-pulse delay-75" />
        <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent to-transparent animate-pulse delay-150" />
      </div>

      <motion.h2 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-2xl md:text-5xl text-white mb-8 md:mb-16 text-center neon-text-primary relative z-10"
      >
        {title}
      </motion.h2>

      <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-4 pb-20 md:pb-12 relative z-10">
        {steps.map((step, idx) => (
          <div key={idx} className="flex flex-col md:flex-row items-center flex-1 w-full md:w-auto">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: idx * 0.2 }}
              className="relative group w-full md:w-auto flex flex-col items-center"
            >
              <button
                onClick={() => handleNodeClick(step.targetSlide)}
                className="w-24 h-24 md:w-40 md:h-40 glass-panel rounded-full flex items-center justify-center mb-4 md:mb-6 group-hover:border-primary/50 transition-all hover:scale-110 active:scale-95 relative z-10 cursor-pointer overflow-visible"
              >
                <step.icon className="w-10 h-10 md:w-16 md:h-16 text-primary drop-shadow-lg" />
                <div className="absolute -bottom-2 px-2 py-0.5 bg-primary text-black text-[10px] font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  CLICK TO EXPLORE
                </div>
              </button>
              
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />

              <h3 className="text-center font-display text-sm md:text-xl text-foreground max-w-[150px] md:max-w-[200px]">
                {step.label}
              </h3>
            </motion.div>

            {idx < steps.length - 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: idx * 0.2 + 0.2, duration: 0.5 }}
                className="flex items-center justify-center md:flex-1 p-2 md:p-4"
              >
                <div className="h-0.5 bg-gradient-to-r from-transparent via-white/20 to-transparent w-full hidden md:block" />
                <MoveRight className="w-5 h-5 text-white/20 md:hidden rotate-90 my-1" />
              </motion.div>
            )}
          </div>
        ))}
      </div>

      {content.description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="text-center text-white/60 text-sm md:text-lg max-w-3xl mx-auto relative z-10 mt-8 font-light italic"
        >
          {content.description}
        </motion.p>
      )}
    </div>
  );
}
