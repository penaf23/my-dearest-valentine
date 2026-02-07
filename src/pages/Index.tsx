import { lazy, Suspense, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ValentineQuestion from '@/components/valentine/ValentineQuestion';

const ValentineContent = lazy(() => import('@/components/valentine/ValentineContent'));

const Index = () => {
  const [accepted, setAccepted] = useState(false);

  return (
    <AnimatePresence mode="wait">
      {!accepted ? (
        <motion.div
          key="question"
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.6 }}
        >
          <ValentineQuestion onAccept={() => setAccepted(true)} />
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Suspense fallback={<div className="min-h-screen bg-background" />}>
            <ValentineContent />
          </Suspense>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Index;
