'use client';

import { motion } from 'framer-motion';
import React from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export const FadeInOnScroll: React.FC<Props> = ({ children, className }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
