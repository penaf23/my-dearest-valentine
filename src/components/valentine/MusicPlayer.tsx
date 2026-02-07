import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      {/* Add your own music file to public/music.mp3 */}
      <audio ref={audioRef} src={`${import.meta.env.BASE_URL}music.mp3`} loop />

      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2 }}
        onClick={togglePlay}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow cursor-pointer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title={isPlaying ? 'Pause music' : 'Play music'}
      >
        <motion.span
          className="text-2xl"
          animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
          transition={{ duration: 3, repeat: isPlaying ? Infinity : 0, ease: 'linear' }}
        >
          {isPlaying ? '🎵' : '🎶'}
        </motion.span>
      </motion.button>
    </>
  );
};

export default MusicPlayer;
