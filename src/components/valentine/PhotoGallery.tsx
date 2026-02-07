import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gallery1 from '@/assets/gallery-1.jpg';
import gallery2 from '@/assets/gallery-2.jpg';
import gallery3 from '@/assets/gallery-3.jpg';
import gallery4 from '@/assets/gallery-4.jpg';

const photos = [
  { src: gallery1, caption: 'Our first sunset together 🌅' },
  { src: gallery2, caption: 'You deserve all the roses 🌹' },
  { src: gallery3, caption: 'Walking through life with you 🍂' },
  { src: gallery4, caption: 'Our special dinner nights 🕯️' },
];

const PhotoGallery = () => {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="py-20 px-4">
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-3xl sm:text-5xl font-display font-bold text-primary mb-12 text-center"
      >
        Our Memories 📸
      </motion.h2>

      <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
        {photos.map((photo, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.03 }}
            onClick={() => setSelected(i)}
            className="relative rounded-xl overflow-hidden shadow-lg cursor-pointer aspect-square group"
          >
            <img
              src={photo.src}
              alt={photo.caption}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <p className="text-primary-foreground font-body text-sm">{photo.caption}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-50 bg-foreground/80 flex items-center justify-center p-4 cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              className="max-w-lg w-full"
            >
              <img
                src={photos[selected].src}
                alt={photos[selected].caption}
                className="w-full rounded-2xl shadow-2xl"
              />
              <p className="text-center text-primary-foreground font-body mt-4 text-lg">
                {photos[selected].caption}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PhotoGallery;
