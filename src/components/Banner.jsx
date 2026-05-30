"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  Magnifier,
  Briefcase,
  MapPin,
} from "@gravity-ui/icons";

export default function HeroSection() {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const generatedStars = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: 10 + Math.random() * 80,
      duration: 2 + Math.random() * 4,
    }));

    setStars(generatedStars);
  }, []);

  const tags = [
    "Product Designer",
    "AI Engineering",
    "DevOps Engineer",
  ];

  return (
    <section className="relative overflow-hidden bg-black pt-24 md:pt-32">
      {/* Background */}
      <div className="absolute inset-0 -z-30 bg-black" />

      {/* Main Glow */}
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.12),transparent_45%)]" />

      {/* Purple Spotlight */}
      <div className="absolute left-1/2 top-48 -z-20 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-violet-600/10 blur-[160px]" />

      {/* Animated Stars */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {stars.map((star) => (
          <motion.span
            key={star.id}
            className="absolute h-[2px] w-[2px] rounded-full bg-indigo-400"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.8, 1],
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="mx-auto flex max-w-6xl flex-col items-center px-4 text-center"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-10 flex items-center gap-4"
        >
          <div className="h-px w-16 bg-linear-to-r from-transparent to-white/20" />

          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2 backdrop-blur-xl">
            <Briefcase className="h-4 w-4 text-orange-400" />

            <span className="font-semibold text-white">
              50,000+
            </span>

            <span className="text-xs uppercase tracking-[0.2em] text-white/50">
              New Jobs This Month
            </span>
          </div>

          <div className="h-px w-16 bg-gradient-to-l from-transparent to-white/20" />
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl text-5xl font-bold tracking-tight text-white md:text-7xl"
        >
          Find Your Dream Job Today
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 max-w-2xl text-lg leading-8 text-white/50"
        >
          HireLoop connects top talent with world-class companies.
          Browse thousands of curated opportunities and land your next role
          faster.
        </motion.p>

        {/* Search Box */}
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
            scale: 0.96,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            delay: 0.4,
            type: "spring",
            stiffness: 120,
          }}
          className="mt-14 w-full max-w-4xl"
        >
          <div className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d0f]/90 backdrop-blur-xl md:flex-row">
            {/* Job Input */}
            <div className="flex flex-1 items-center px-5">
              <Magnifier className="mr-3 h-5 w-5 text-white/40" />

              <input
                type="text"
                placeholder="Job title, skill or company"
                className="h-16 w-full bg-transparent text-sm text-white outline-none placeholder:text-white/35"
              />
            </div>

            <div className="hidden w-px bg-white/10 md:block" />

            {/* Location Input */}
            <div className="flex flex-1 items-center px-5">
              <MapPin className="mr-3 h-5 w-5 text-white/40" />

              <input
                type="text"
                placeholder="Location or Remote"
                className="h-16 w-full bg-transparent text-sm text-white outline-none placeholder:text-white/35"
              />
            </div>

            {/* Search Button */}
            <motion.button
              whileHover={{
                scale: 1.08,
                boxShadow:
                  "0px 0px 30px rgba(91,76,247,.55)",
              }}
              whileTap={{
                scale: 0.95,
              }}
              className="m-2 flex h-12 w-12 items-center justify-center self-center rounded-xl bg-[#5B4CF7]"
            >
              <Magnifier className="h-5 w-5 text-white" />
            </motion.button>
          </div>
        </motion.div>

        {/* Trending Tags */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-2"
        >
          <span className="mr-1 text-sm text-white/40">
            Trending Position
          </span>

          {tags.map((tag, index) => (
            <motion.button
              key={tag}
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.7 + index * 0.1,
              }}
              whileHover={{
                scale: 1.05,
                y: -2,
              }}
              whileTap={{
                scale: 0.98,
              }}
              className="rounded-full border border-white/10 bg-white/3 px-4 py-2 text-xs text-white/70 backdrop-blur-xl hover:bg-white/10"
            >
              {tag}
            </motion.button>
          ))}
        </motion.div>

        {/* Bottom Glow */}
        <motion.div
          animate={{
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
          className="absolute bottom-0 left-1/2 h-62.5 w-175 -translate-x-1/2 rounded-full bg-violet-600/20 blur-[150px]"
        />

        {/* Space for Globe */}
        <div className="h-44 md:h-60" />
      </motion.div>
    </section>
  );
}