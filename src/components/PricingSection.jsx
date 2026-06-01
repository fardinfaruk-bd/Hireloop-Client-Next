"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  ArrowRight
} from "@gravity-ui/icons";

import {
  Crown,
  ChartNoAxesColumnIncreasing,
  Zap,
} from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "$0",
    icon: Crown,
    featured: false,
    features: [
      "Daily AI match brief (top 5)",
      "Verified salary bands",
      "Company insight dashboards",
      "1-click apply, unlimited",
    ],
  },
  {
    name: "Growth",
    price: "$17",
    icon: ChartNoAxesColumnIncreasing,
    featured: true,
    features: [
      "Daily AI match brief (top 5)",
      "Verified salary bands",
      "Company insight dashboards",
      "1-click apply, unlimited",
    ],
  },
  {
    name: "Premium",
    price: "$99",
    icon: Zap,
    featured: false,
    features: [
      "Everything in Pro",
      "Multi-profile career portfolios",
      "Shared talent rooms",
      "Recruiter view (read-only)",
    ],
  },
];

export default function PricingSection() {
  const [billing, setBilling] = useState("monthly");

  return (
    <section className="relative overflow-hidden bg-black py-28">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(91,76,247,0.15),transparent_35%)]" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <div className="h-1.5 w-1.5 rounded-full bg-violet-500" />

            <span className="text-xs uppercase tracking-[0.25em] text-white/60">
              Pricing
            </span>

            <div className="h-1.5 w-1.5 rounded-full bg-violet-500" />
          </div>

          <h2 className="mx-auto max-w-2xl text-5xl font-semibold leading-tight text-white">
            Pay for the leverage,
            <br />
            not the listings
          </h2>
        </motion.div>

        {/* Billing Toggle */}
        <div className="mb-14 flex justify-center">
          <div className="flex items-center rounded-full border border-white/10 bg-[#141416] p-1">
            <button
              onClick={() => setBilling("monthly")}
              className={`rounded-full px-5 py-2 text-sm transition ${
                billing === "monthly"
                  ? "bg-white text-black"
                  : "text-white/70"
              }`}
            >
              Monthly
            </button>

            <button
              onClick={() => setBilling("yearly")}
              className={`rounded-full px-5 py-2 text-sm transition ${
                billing === "yearly"
                  ? "bg-white text-black"
                  : "text-white/70"
              }`}
            >
              Yearly
            </button>

            <span className="ml-2 rounded-full bg-pink-500 px-2 py-1 text-xs text-white">
              25%
            </span>
          </div>
        </div>

        {/* Cards */}
        <div className="grid gap-6 lg:grid-cols-3">
          {plans.map((plan, index) => {
            const Icon = plan.icon;

            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.1,
                }}
                whileHover={{
                  y: -6,
                }}
                className={`group relative rounded-[28px] border p-7 transition-all duration-300 ${
                  plan.featured
                    ? "border-white/10 bg-gradient-to-b from-[#1a1a1d] to-[#111113] shadow-[0_0_50px_rgba(255,255,255,0.04)]"
                    : "border-white/5 bg-[#111113]"
                }`}
              >
                {/* Top */}
                <div className="mb-8 flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-black/30">
                      <Icon className="h-5 w-5 text-violet-400" />
                    </div>

                    <span className="text-2xl text-white">
                      {plan.name}
                    </span>
                  </div>

                  <div>
                    <span className="text-5xl font-semibold text-white">
                      {plan.price}
                    </span>

                    <span className="text-sm text-white/50">
                      /month
                    </span>
                  </div>
                </div>

                {/* Content */}
                <p className="mb-5 text-white">
                  Start building your insights hub:
                </p>

                <div className="space-y-4">
                  {plan.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-3 text-sm text-white/55"
                    >
                      <div className="flex h-5 w-5 items-center justify-center rounded bg-white/10 text-white">
                        +
                      </div>

                      {feature}
                    </div>
                  ))}
                </div>

                {/* Button */}
                <button
                  className={`mt-10 flex w-full items-center justify-between rounded-xl px-5 py-4 text-sm transition ${
                    plan.featured
                      ? "bg-white text-black"
                      : "bg-white/10 text-white hover:bg-white/15"
                  }`}
                >
                  Choose This Plan

                  <ArrowRight className="h-4 w-4" />
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}