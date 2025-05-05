"use client";

import type React from "react";

import { motion } from "framer-motion";

export const FadeIn = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 20 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);

export const StaggeredFadeIn = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <motion.div
    initial="hidden"
    animate="visible"
    variants={{
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          when: "beforeChildren",
          staggerChildren: 0.1,
        },
      },
    }}
  >
    {children}
  </motion.div>
);

export const StaggeredItem = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    }}
  >
    {children}
  </motion.div>
);
