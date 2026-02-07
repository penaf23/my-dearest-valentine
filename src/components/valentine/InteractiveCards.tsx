import { useState } from 'react';
import { motion } from 'framer-motion';

const messages = [
  { front: '✨', back: 'You make every day brighter just by being you.' },
  { front: '🌙', back: 'I fall in love with you all over again every morning.' },
  { front: '🦋', back: 'You give me butterflies even after all this time.' },
  { front: '🌟', back: 'You are the best thing that ever happened to me.' },
  { front: '🔥', back: 'Our love story is my absolute favorite.' },
  { front: '🌈', back: 'With you, even rainy days feel colorful.' },
];

const InteractiveCards = () => {
  const [flipped, setFlipped] = useState<Set<number>>(new Set());

  const toggleFlip = (i: number) => {
    setFlipped((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  return (
    <div className="py-20 px-4">
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-3xl sm:text-5xl font-display font-bold text-primary mb-4 text-center"
      >
        Secret Messages 💌
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center text-muted-foreground font-body mb-12"
      >
        Tap each card to reveal a hidden message
      </motion.p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            onClick={() => toggleFlip(i)}
            className="cursor-pointer perspective-1000"
          >
            <motion.div
              animate={{ rotateY: flipped.has(i) ? 180 : 0 }}
              transition={{ duration: 0.6 }}
              style={{ transformStyle: 'preserve-3d' }}
              className="relative h-36 sm:h-44"
            >
              {/* Front */}
              <div
                className="absolute inset-0 rounded-xl bg-card border-2 border-border shadow-md flex flex-col items-center justify-center backface-hidden hover:shadow-lg transition-shadow"
              >
                <span className="text-4xl sm:text-5xl mb-2">{msg.front}</span>
                <span className="text-xs text-muted-foreground font-body">Tap me</span>
              </div>

              {/* Back */}
              <div
                className="absolute inset-0 rounded-xl bg-gradient-romantic flex items-center justify-center p-4 backface-hidden"
                style={{ transform: 'rotateY(180deg)' }}
              >
                <p className="text-primary-foreground font-body text-sm sm:text-base text-center leading-relaxed">
                  {msg.back}
                </p>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default InteractiveCards;
