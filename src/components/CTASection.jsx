"use client";

import { motion } from "motion/react";
import Image from "next/image";

export default function CTASection() {
  return (
    <section className="relative overflow-hidden bg-black py-24 md:py-32">
      {/* Background Image */}
      <div className="absolute inset-0 flex items-center justify-center">
        <Image
          src="/images/cta-bg.png"
          width={1920}
          height={1080}
          alt=""
          className="h-full w-full object-cover opacity-90"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl text-4xl font-semibold leading-tight text-white sm:text-5xl md:text-6xl"
        >
          Your next role is
          <br />
          already looking for you
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="mt-6 max-w-2xl text-base text-white/50 md:text-lg"
        >
          Build a profile in three minutes. The matches start
          arriving tomorrow morning.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-10 flex flex-col gap-4 sm:flex-row"
        >
          <button className="rounded-xl bg-white px-8 py-4 font-medium text-black transition-all duration-300 hover:scale-105">
            Create a free account
          </button>

          <button className="rounded-xl border border-white/10 bg-white/5 px-8 py-4 font-medium text-white backdrop-blur-md transition-all duration-300 hover:bg-white/10">
            View pricing
          </button>
        </motion.div>
      </div>
    </section>
  );
}