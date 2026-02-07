import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const gifts = [
  {
    id: 1,
    emoji: '🌹',
    title: 'Romantic Dinner',
    description: 'A candlelit dinner at your favorite restaurant, just the two of us.',
    color: 'from-primary to-burgundy',
  },
  {
    id: 2,
    emoji: '💆‍♀️',
    title: 'Spa Day',
    description: 'A full day of relaxation and pampering — you deserve it, my queen!',
    color: 'from-rose-gold to-accent',
  },
  {
    id: 3,
    emoji: '✈️',
    title: 'Surprise Trip',
    description: 'Pack your bags! We\'re going on an adventure to a place you\'ll love.',
    color: 'from-gold to-rose-gold',
  },
];

const GiftSelection = () => {
  const [selectedGift, setSelectedGift] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);

  const handleSelect = (id: number) => {
    if (selectedGift !== null) return;
    setSelectedGift(id);
    setTimeout(() => setRevealed(true), 600);
  };

  const chosen = gifts.find((g) => g.id === selectedGift);

  return (
    <div className="py-20 px-4">
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-3xl sm:text-5xl font-display font-bold text-primary mb-4 text-center"
      >
        Choose Your Gift 🎁
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center text-muted-foreground font-body mb-12 text-lg"
      >
        Pick one — but choose wisely! 😉
      </motion.p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
        {gifts.map((gift, i) => (
          <motion.div
            key={gift.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            whileHover={selectedGift === null ? { scale: 1.05, y: -5 } : {}}
            whileTap={selectedGift === null ? { scale: 0.97 } : {}}
            onClick={() => handleSelect(gift.id)}
            className={`relative rounded-2xl p-8 text-center cursor-pointer transition-all duration-500 shadow-lg ${
              selectedGift === null
                ? 'bg-card hover:shadow-2xl border-2 border-border'
                : selectedGift === gift.id
                ? 'bg-card shadow-2xl border-2 border-primary'
                : 'bg-muted/50 opacity-40 scale-95 border-2 border-transparent'
            }`}
          >
            {/* Mystery box or revealed content */}
            <AnimatePresence mode="wait">
              {selectedGift !== gift.id || !revealed ? (
                <motion.div
                  key="mystery"
                  exit={{ rotateY: 90, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-6xl mb-4">🎁</div>
                  <p className="font-display font-bold text-foreground text-lg">
                    Gift #{gift.id}
                  </p>
                  <p className="text-muted-foreground text-sm font-body mt-1">
                    Tap to choose
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="revealed"
                  initial={{ rotateY: -90, opacity: 0 }}
                  animate={{ rotateY: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <div className="text-6xl mb-4">{gift.emoji}</div>
                  <h3 className="font-display font-bold text-primary text-xl mb-2">
                    {gift.title}
                  </h3>
                  <p className="text-foreground/80 font-body text-sm leading-relaxed">
                    {gift.description}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {revealed && chosen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-10"
          >
            <p className="text-2xl font-display font-bold text-primary">
              You chose: {chosen.emoji} {chosen.title}!
            </p>
            <p className="text-muted-foreground font-body mt-2 text-lg">
              Get ready for something amazing! 🥰
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GiftSelection;
