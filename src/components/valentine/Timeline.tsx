import { motion } from 'framer-motion';

const milestones = [
  { date: 'The Beginning', icon: '💫', title: 'When We First Met', description: 'The moment that changed everything forever.' },
  { date: 'First Date', icon: '☕', title: 'Our First Date', description: 'Nervous butterflies and endless conversations.' },
  { date: 'First Kiss', icon: '💋', title: 'That Magical Moment', description: 'Time stood still and the world disappeared.' },
  { date: 'Together', icon: '💑', title: 'We Made It Official', description: 'The best decision we ever made.' },
  { date: 'Adventures', icon: '✨', title: 'Our Journey Together', description: 'Every day with you is a new adventure.' },
  { date: 'Forever', icon: '💕', title: 'Today & Always', description: 'Still falling more in love with you every single day.' },
];

const Timeline = () => {
  return (
    <div className="py-20 px-4">
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-3xl sm:text-5xl font-display font-bold text-primary mb-16 text-center"
      >
        Our Love Story 💕
      </motion.h2>

      <div className="max-w-2xl mx-auto relative">
        {/* Vertical line */}
        <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-0.5 bg-border sm:-translate-x-0.5" />

        {milestones.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className={`relative flex items-start mb-12 ${
              i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'
            } flex-row`}
          >
            {/* Dot */}
            <div className="absolute left-6 sm:left-1/2 w-4 h-4 bg-primary rounded-full -translate-x-1/2 z-10 mt-2 ring-4 ring-background" />

            {/* Content */}
            <div className={`ml-14 sm:ml-0 sm:w-[45%] ${i % 2 === 0 ? 'sm:pr-12 sm:text-right' : 'sm:pl-12'}`}>
              <span className="text-3xl">{item.icon}</span>
              <p className="text-sm text-rose-gold font-body font-semibold mt-1">{item.date}</p>
              <h3 className="text-xl font-display font-bold text-foreground mt-1">{item.title}</h3>
              <p className="text-muted-foreground font-body mt-1">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
