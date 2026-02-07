import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const funnyMessages = [
  "Are you sure? 🥺",
  "Really?? My heart just cracked a little 💔",
  "Okay but... have you SEEN how cute we are together? 😢",
  "I'll learn to cook your favorite meal! 🍝",
  "I'll give you the TV remote forever! 📺",
  "Pretty please with a cherry on top? 🍒🙏",
  "Fine... but the YES button is RIGHT THERE 👉👉👉",
];

interface Props {
  onAccept: () => void;
}

const ValentineQuestion = ({ onAccept }: Props) => {
  const [noCount, setNoCount] = useState(0);

  const yesScale = 1 + noCount * 0.35;
  const noScale = Math.max(0.4, 1 - noCount * 0.08);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background relative overflow-hidden px-4">
      {/* Floating background hearts */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 25 }).map((_, i) => (
          <span
            key={i}
            className="absolute animate-float text-primary/10 select-none"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 35 + 15}px`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${Math.random() * 4 + 5}s`,
            }}
          >
            ❤️
          </span>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="text-center z-10 max-w-lg"
      >
        {/* Heartbeat emoji */}
        <motion.div
          className="text-7xl mb-6"
          animate={{ scale: [1, 1.2, 1, 1.15, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          💕
        </motion.div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-bold text-primary mb-4 leading-tight">
          Will you be my
        </h1>
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-display font-black bg-gradient-romantic bg-clip-text text-transparent mb-8">
          Valentine?
        </h1>

        <AnimatePresence mode="wait">
          {noCount > 0 && (
            <motion.p
              key={noCount}
              initial={{ opacity: 0, y: -15, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ duration: 0.4 }}
              className="text-lg sm:text-xl text-foreground/80 mb-8 font-body italic"
            >
              {funnyMessages[Math.min(noCount - 1, funnyMessages.length - 1)]}
            </motion.p>
          )}
        </AnimatePresence>

        <div className="flex items-center justify-center gap-4 flex-wrap">
          <motion.button
            animate={{ scale: yesScale }}
            whileHover={{ scale: yesScale * 1.08 }}
            whileTap={{ scale: yesScale * 0.95 }}
            onClick={onAccept}
            className="px-8 py-4 bg-gradient-romantic text-primary-foreground rounded-full font-display font-bold text-xl shadow-lg hover:shadow-2xl transition-shadow cursor-pointer"
          >
            Yes! 💕
          </motion.button>

          {noCount < 7 && (
            <motion.button
              animate={{ scale: noScale, opacity: Math.max(0.4, 1 - noCount * 0.1) }}
              whileHover={{ scale: noScale * 1.05 }}
              onClick={() => setNoCount((n) => n + 1)}
              className="px-6 py-3 bg-secondary text-secondary-foreground rounded-full font-body font-medium text-lg cursor-pointer"
            >
              No 😅
            </motion.button>
          )}
        </div>

        {noCount >= 7 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 text-muted-foreground font-body italic"
          >
            The "No" button ran away... I think that's a sign! 😏
          </motion.p>
        )}
      </motion.div>
    </div>
  );
};

export default ValentineQuestion;
