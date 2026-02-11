import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

interface ComparisonSlideProps {
  title: string;
  content: {
    pros: string[];
    cons: string[];
  };
}

export function ComparisonSlide({ title, content }: ComparisonSlideProps) {
  return (
    <div className="h-full w-full flex flex-col p-6 md:p-20 relative z-10 overflow-y-auto">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl md:text-5xl text-white mb-8 md:mb-12 text-center"
      >
        {title}
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 pb-24 md:pb-0">
        {/* Pros Column */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="glass-panel rounded-2xl p-6 md:p-8 border-l-4 border-l-secondary/50"
        >
          <h3 className="text-xl md:text-2xl font-bold text-secondary mb-6 md:mb-8 flex items-center gap-3 uppercase tracking-wider">
            <Check className="w-5 h-5 md:w-6 md:h-6" /> Advantages
          </h3>
          <ul className="space-y-4 md:space-y-6">
            {content.pros.map((item, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + idx * 0.1 }}
                className="flex items-start gap-3 md:gap-4 text-sm md:text-lg text-white/90"
              >
                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                {item}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Cons Column */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="glass-panel rounded-2xl p-6 md:p-8 border-l-4 border-l-destructive/50"
        >
          <h3 className="text-xl md:text-2xl font-bold text-destructive mb-6 md:mb-8 flex items-center gap-3 uppercase tracking-wider">
            <X className="w-5 h-5 md:w-6 md:h-6" /> Challenges
          </h3>
          <ul className="space-y-4 md:space-y-6">
            {content.cons.map((item, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + idx * 0.1 }}
                className="flex items-start gap-3 md:gap-4 text-sm md:text-lg text-white/90"
              >
                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-destructive shrink-0" />
                {item}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
