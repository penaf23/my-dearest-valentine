import { Suspense } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import HeroScene from './HeroScene';
import LoveLetter from './LoveLetter';
import GiftSelection from './GiftSelection';
import PhotoGallery from './PhotoGallery';
import Timeline from './Timeline';
import InteractiveCards from './InteractiveCards';
import MusicPlayer from './MusicPlayer';

const PetalsFalling = () => (
  <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
    {Array.from({ length: 12 }).map((_, i) => (
      <span
        key={i}
        className="absolute animate-petal-fall text-primary/20 select-none"
        style={{
          left: `${Math.random() * 100}%`,
          fontSize: `${Math.random() * 16 + 12}px`,
          animationDuration: `${Math.random() * 8 + 8}s`,
          animationDelay: `${Math.random() * 10}s`,
        }}
      >
        🌸
      </span>
    ))}
  </div>
);

const ValentineContent = () => {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div className="min-h-screen bg-background relative">
      <PetalsFalling />
      <MusicPlayer />

      {/* Hero Section with 3D Hearts */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0">
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="relative z-10 text-center px-4"
        >
          <motion.p
            className="text-rose-gold font-body text-lg sm:text-xl mb-4 tracking-widest uppercase"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Happy Valentine's Day
          </motion.p>
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-display font-black text-primary leading-tight mb-6">
            My Love
          </h1>
          <p className="text-xl sm:text-2xl text-foreground/70 font-body max-w-md mx-auto">
            Every love story is beautiful, but ours is my favorite ❤️
          </p>

          <motion.div
            className="mt-12"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-muted-foreground text-sm font-body">Scroll down ↓</span>
          </motion.div>
        </motion.div>
      </section>

      {/* Divider */}
      <div className="flex justify-center py-8">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          className="w-32 h-0.5 bg-gradient-romantic rounded-full"
        />
      </div>

      {/* Love Letter Section */}
      <section className="bg-blush/30">
        <LoveLetter />
      </section>

      {/* Divider */}
      <div className="flex justify-center py-8">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          className="w-32 h-0.5 bg-gradient-romantic rounded-full"
        />
      </div>

      {/* Gift Selection */}
      <section>
        <GiftSelection />
      </section>

      {/* Photo Gallery with parallax background */}
      <section className="bg-blush/30 relative overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'radial-gradient(circle, hsl(var(--primary)) 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
        />
        <PhotoGallery />
      </section>

      {/* Timeline */}
      <section>
        <Timeline />
      </section>

      {/* Interactive Cards */}
      <section className="bg-blush/30">
        <InteractiveCards />
      </section>

      {/* Footer */}
      <footer className="py-16 text-center bg-background">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-6xl mb-4">💕</p>
          <h3 className="text-3xl sm:text-4xl font-display font-bold text-primary mb-4">
            I Love You
          </h3>
          <p className="text-muted-foreground font-body text-lg max-w-sm mx-auto">
            Today, tomorrow, and every day after that.
            You are my forever Valentine.
          </p>
          <p className="text-muted-foreground/50 font-body text-sm mt-8">
            Made with ❤️ just for you
          </p>
        </motion.div>
      </footer>
    </div>
  );
};

export default ValentineContent;
