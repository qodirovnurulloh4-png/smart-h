import { motion } from "framer-motion";
import { Cpu, Wifi, Cloud, Smartphone, Shield, Zap, Home, Lightbulb, Thermometer, Camera, Sparkles } from "lucide-react";

interface ContentSlideProps {
  title: string;
  content: any; // Can be array of strings or objects
}

// Icon mapping helper
const getIcon = (key: string) => {
  const icons: Record<string, any> = {
    iot: Wifi,
    ai: Cpu,
    cloud: Cloud,
    mobile: Smartphone,
    security: Shield,
    energy: Zap,
    home: Home,
    light: Lightbulb,
    climate: Thermometer,
    cam: Camera
  };
  return icons[key.toLowerCase()] || Sparkles;
};

export function ContentSlide({ title, content }: ContentSlideProps) {
  // Determine if content is a simple list or structured grid
  const items = content.grid || content.list || content.features || (Array.isArray(content.points) ? content.points : []);
  const isStructured = Array.isArray(items) && items.length > 0 && typeof items[0] === 'object';

  return (
    <div className="h-full w-full flex flex-col p-6 md:p-20 relative z-10 overflow-hidden">
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8 md:mb-12 border-b-2 border-primary/30 pb-4 md:pb-6 relative z-10"
      >
        <h2 className="text-3xl md:text-6xl text-white neon-text-secondary font-black tracking-tight">{title}</h2>
      </motion.div>

      <div className="flex-1 overflow-y-auto pr-2 md:pr-4 pb-12 relative z-10">
        {isStructured ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12">
            {items.map((item: any, idx: number) => {
              const Icon = getIcon(item.icon || 'home');
              return (
                <motion.div
                  key={idx}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.1 + 0.3 }}
                  className="glass-panel p-6 md:p-8 rounded-2xl md:rounded-3xl hover:bg-white/15 transition-all duration-300 group hover:scale-[1.02] border-white/20"
                >
                  <div className="flex items-start gap-4 md:gap-6">
                    <div className="p-3 md:p-4 rounded-xl bg-primary/20 text-primary group-hover:bg-primary group-hover:text-black transition-all duration-300 shrink-0 shadow-[0_0_20px_rgba(0,243,255,0.3)]">
                      <Icon className="w-6 h-6 md:w-8 md:h-8" />
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl text-white mb-2 md:mb-3 font-display font-bold tracking-wide">{item.title}</h3>
                      <p className="text-white/80 text-sm md:text-base leading-relaxed font-medium">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="space-y-6 md:space-y-8 max-w-5xl mb-12">
            {Array.isArray(items) && items.map((text: string, idx: number) => (
              <motion.div
                key={idx}
                initial={{ x: 30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: idx * 0.1 + 0.3 }}
                className="flex items-center gap-6 md:gap-8 group bg-white/5 p-4 md:p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors"
              >
                <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-primary shadow-[0_0_15px_rgba(0,243,255,1)] group-hover:scale-150 transition-transform shrink-0" />
                <p className="text-lg md:text-3xl text-white font-medium tracking-wide">{text}</p>
              </motion.div>
            ))}
          </div>
        )}

        {content.image && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="w-full max-w-5xl mx-auto rounded-3xl overflow-hidden glass-panel border-white/20 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
          >
            <img src={content.image} alt="Smart House Visualization" className="w-full h-64 md:h-[400px] object-cover opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          </motion.div>
        )}
      </div>
    </div>
  );
}
