"use client";

import { motion } from "motion/react";
import {
  ArrowRight,
  MapPin,
  Briefcase,
} from "@gravity-ui/icons";
import { CircleDollarSign } from "lucide-react";

const jobs = Array(6).fill({
  title: "Frontend Developer",
  description:
    "Showcase your commitment to diversity and inclusion by highlighting initiatives",
  location: "New York, USA",
  type: "Hybrid",
  salary: "€25-€40/hour",
});

export default function FeaturedJobsSection() {
  return (
    <section className="relative bg-black py-28">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(91,76,247,0.08),transparent_40%)]" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <div className="mb-5 flex items-center justify-center gap-3">
            <div className="h-1.5 w-1.5 rounded-none bg-[#5C53FE]" />

            <span className="text-xs font-medium uppercase tracking-[0.25em] text-white/60">
              Smart Job Discovery
            </span>

            <div className="h-1.5 w-1.5 rounded- none bg-[#5C53FE]" />
          </div>

          <h2 className="mx-auto max-w-3xl text-4xl font-semibold leading-tight text-white md:text-6xl">
            The roles you'd never
            <br />
            find by searching
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {jobs.map((job, index) => (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
              }}
              whileHover={{
                y: -6,
              }}
              className="group rounded-3xl border border-white/5 bg-[#111113] p-8 transition-all duration-300 hover:border-white/10"
            >
              {/* Title */}
              <h3 className="text-3xl font-medium text-white">
                {job.title}
              </h3>

              {/* Description */}
              <p className="mt-5 text-sm leading-7 text-white/45">
                {job.description}
              </p>

              {/* Tags */}
              <div className="mt-8 flex flex-wrap gap-2">
                <div className="flex items-center gap-2 rounded-full bg-white/5 px-3 py-1.5 text-xs text-white/75">
                  <MapPin className="h-3.5 w-3.5 text-violet-400" />
                  {job.location}
                </div>

                <div className="flex items-center gap-2 rounded-full bg-white/5 px-3 py-1.5 text-xs text-white/75">
                  <Briefcase className="h-3.5 w-3.5 text-violet-400" />
                  {job.type}
                </div>

                <div className="flex items-center gap-2 rounded-full bg-white/5 px-3 py-1.5 text-xs text-white/75">
                  <CircleDollarSign className="h-3.5 w-3.5 text-violet-400" />
                  {job.salary}
                </div>
              </div>

              {/* Apply */}
              <button className="mt-12 flex items-center gap-2 text-sm font-medium text-white transition-all group-hover:gap-3">
                Apply Now
                <ArrowRight className="h-4 w-4" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Bottom Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-14 flex justify-center"
        >
          <button className="rounded-xl bg-white px-7 py-3 text-sm font-medium text-black transition hover:scale-105">
            View all job open
          </button>
        </motion.div>
      </div>
    </section>
  );
}