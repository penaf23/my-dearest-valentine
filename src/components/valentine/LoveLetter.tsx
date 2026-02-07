import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoveLetter = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-3xl sm:text-5xl font-display font-bold text-primary mb-12 text-center"
      >
        A Letter For You 💌
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative cursor-pointer w-full max-w-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* Envelope body */}
        <div className="relative bg-secondary rounded-xl shadow-2xl overflow-hidden">
          {/* Envelope flap */}
          <AnimatePresence>
            {!isOpen && (
              <motion.div
                initial={{ rotateX: 0 }}
                exit={{ rotateX: 180 }}
                transition={{ duration: 0.6 }}
                className="absolute top-0 left-0 right-0 h-24 bg-primary/90 envelope-flap z-10 origin-top"
              />
            )}
          </AnimatePresence>

          {/* Click hint */}
          {!isOpen && (
            <motion.div
              className="flex items-center justify-center py-16"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-muted-foreground font-body text-lg">
                Tap to open 💌
              </span>
            </motion.div>
          )}

          {/* Letter content */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="p-8 sm:p-10"
              >
                <p className="font-body text-foreground/90 text-lg leading-relaxed italic">
                  My Dearest Love,
                </p>
                <br />
                <p className="font-body text-foreground/80 leading-relaxed">
                  Every day with you feels like a beautiful dream I never want to wake up from.
                  You are my sunshine on cloudy days, my calm in the storm, and my favorite
                  person in the entire world.
                </p>
                <br />
                <p className="font-body text-foreground/80 leading-relaxed">
                  Thank you for choosing me, for loving me, and for making every moment
                  magical. I promise to keep making you laugh, to hold your hand through
                  everything, and to love you more with each passing day.
                </p>
                <br />
                <p className="font-body text-foreground/90 text-lg text-right italic">
                  Forever Yours ❤️
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {isOpen && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-6 text-muted-foreground font-body text-sm"
        >
          Tap the letter to close
        </motion.p>
      )}
    </div>
  );
};

export default LoveLetter;
