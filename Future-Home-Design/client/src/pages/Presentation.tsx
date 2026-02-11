import { useState, useEffect } from "react";
import { useSlides } from "@/hooks/use-slides";
import { BackgroundEffect } from "@/components/BackgroundEffect";
import { SlideControls } from "@/components/SlideControls";
import { CoverSlide } from "@/components/layouts/CoverSlide";
import { ContentSlide } from "@/components/layouts/ContentSlide";
import { ArchitectureSlide } from "@/components/layouts/ArchitectureSlide";
import { ComparisonSlide } from "@/components/layouts/ComparisonSlide";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, AlertCircle } from "lucide-react";

export default function Presentation() {
  const { data: slides, isLoading, error } = useSlides();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Keyboard navigation and custom events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "Space") {
        if (slides && currentIndex < slides.length - 1) {
          setCurrentIndex((prev) => prev + 1);
        }
      } else if (e.key === "ArrowLeft") {
        if (currentIndex > 0) {
          setCurrentIndex((prev) => prev - 1);
        }
      }
    };

    const handleGotoSlide = (e: any) => {
      if (typeof e.detail === 'number' && e.detail >= 0 && slides && e.detail < slides.length) {
        setCurrentIndex(e.detail);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("goto-slide", handleGotoSlide);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("goto-slide", handleGotoSlide);
    };
  }, [currentIndex, slides]);

  const handleNext = () => {
    if (slides && currentIndex < slides.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen w-screen bg-background flex flex-col items-center justify-center text-primary relative overflow-hidden">
        <BackgroundEffect />
        <Loader2 className="w-12 h-12 animate-spin mb-4" />
        <span className="font-mono text-sm tracking-[0.3em] animate-pulse">INITIALIZING SYSTEM...</span>
      </div>
    );
  }

  if (error || !slides || slides.length === 0) {
    return (
      <div className="h-screen w-screen bg-background flex flex-col items-center justify-center text-destructive relative">
        <BackgroundEffect />
        <AlertCircle className="w-16 h-16 mb-6 opacity-80" />
        <h1 className="text-3xl font-display mb-2">SYSTEM ERROR</h1>
        <p className="text-white/60 font-mono">Could not load presentation data.</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-8 px-6 py-2 border border-destructive/50 text-destructive hover:bg-destructive/10 rounded font-mono text-sm transition-colors uppercase tracking-wider"
        >
          Retry Connection
        </button>
      </div>
    );
  }

  const currentSlide = slides[currentIndex];

  const renderSlide = (slide: typeof slides[0]) => {
    // Cast content to any to access dynamic properties safely
    const content = slide.content as any;

    switch (slide.theme) {
      case "cover":
        return <CoverSlide title={slide.title} subtitle={content.subtitle} image={content.image} />;
      case "architecture":
        return <ArchitectureSlide title={slide.title} content={content} />;
      case "comparison":
        return <ComparisonSlide title={slide.title} content={content} />;
      default:
        return <ContentSlide title={slide.title} content={content} />;
    }
  };

  const handleDragEnd = (event: any, info: any) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) {
      handleNext();
    } else if (info.offset.x > swipeThreshold) {
      handlePrev();
    }
  };

  return (
    <div className="h-screen w-screen bg-background overflow-hidden relative selection:bg-primary/30 touch-none">
      <BackgroundEffect />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
          initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="h-full w-full cursor-grab active:cursor-grabbing"
        >
          {renderSlide(currentSlide)}
        </motion.div>
      </AnimatePresence>

      <SlideControls 
        current={currentIndex} 
        total={slides.length} 
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </div>
  );
}
