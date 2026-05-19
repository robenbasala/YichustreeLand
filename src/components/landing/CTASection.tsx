"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FloatingLeaves } from "./FloatingLeaves";

export function CTASection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

  return (
    <section ref={ref} className="relative px-6 py-24 lg:px-12 lg:py-32">
      <FloatingLeaves count={4} className="opacity-50" />

      <motion.div
        className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl bg-cta-gradient p-10 text-center shadow-glow-lg sm:p-16"
        style={{ scale, opacity }}
      >
        {/* Shimmer overlay */}
        <motion.div
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          animate={{ x: ["-100%", "200%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
        />

        <motion.div
          className="relative z-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Sparkles className="h-7 w-7 text-white" />
          </motion.div>

          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl text-balance">
            Start building your family legacy today
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-lg text-white/85">
            Create a living family tree filled with names, stories, photos, and memories
            that will inspire generations to come.
          </p>

          <motion.div
            className="mt-8"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              size="lg"
              variant="outline"
              className="bg-white text-forest-700 hover:bg-forest-50 border-white shadow-lg h-14 px-8 text-base font-semibold"
            >
              Create My Family Tree
              <ArrowRight className="h-5 w-5" />
            </Button>
          </motion.div>
        </motion.div>

        {/* Decorative circles */}
        <div className="pointer-events-none absolute -left-20 -top-20 h-60 w-60 rounded-full bg-white/10 blur-2xl" />
        <motion.div
          className="pointer-events-none absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-white/10 blur-xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
      </motion.div>
    </section>
  );
}
