"use client";
import { motion } from "framer-motion";

export default function Reveal({ children, delay = 0, className }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut", delay } },
      }}
    >
      {children}
    </motion.div>
  );
}