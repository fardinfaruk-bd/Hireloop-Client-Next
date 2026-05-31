"use client";

import { motion } from "motion/react";

import {
    Magnifier,
    Sparkles,
    ChartColumn,
    Person,
} from "@gravity-ui/icons";

import {
    Building2,
    Bookmark,
    Hexagon,
    TrendingUp,
} from "lucide-react";

const features = [
    {
        title: "Smart Search",
        description: "Find your ideal job with advanced filters.",
        icon: Magnifier,
    },
    {
        title: "Salary Insights",
        description: "Get real salary data to negotiate confidently.",
        icon: ChartColumn,
    },
    {
        title: "Top Companies",
        description: "Apply to vetted companies that are hiring.",
        icon: Building2,
    },
    {
        title: "Saved Jobs",
        description: "Manage apps & favorites on your dashboard.",
        icon: Bookmark,
    },
    {
        title: "One-Click Apply",
        description: "Simplify your job applications for an easier process!",
        icon: Sparkles,
    },
    {
        title: "Resume Builder",
        description: "Create professional resumes with modern templates.",
        icon: Person,
    },
    {
        title: "Skill-Based Matching",
        description: "Discover jobs that match your skills and experience.",
        icon: Hexagon,
    },
    {
        title: "Career Growth Resources",
        description: "Boost your career with quick interview tips.",
        icon: TrendingUp,
    },
];

const containerVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.08,
        },
    },
};

const itemVariants = {
    hidden: {
        opacity: 0,
        y: 30,
    },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut",
        },
    },
};

export default function FeaturesSection() {
    return (
        <section className="relative overflow-hidden bg-[#050505] py-16 md:py-24 lg:py-32">
            {/* Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.12),transparent_45%)]" />

            {/* Blur Glow */}
            <div className="absolute left-1/2 top-0 h-75 w-75 -translate-x-1/2 rounded-full bg-violet-600/10 blur-[120px]" />

            <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="mb-5 flex items-center justify-center gap-3 text-[11px] font-medium uppercase tracking-[0.3em] text-zinc-400"
                >
                    <span className="h-1 w-1 rounded-full bg-violet-500" />
                    Features Job
                    <span className="h-1 w-1 rounded-full bg-violet-500" />
                </motion.div>

                {/* Heading */}
                <motion.h2
                    className="mx-auto mb-12 max-w-xl text-center text-3xl font-semibold leading-tight text-white sm:text-4xl lg:mb-20 lg:text-5xl"
                >
                    Everything you need
                    <br />
                    to succeed
                </motion.h2>

                {/* Features Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    className="
            grid
            grid-cols-1
            gap-5
            sm:grid-cols-2
            sm:gap-8
            lg:grid-cols-4
            lg:gap-x-10
            lg:gap-y-12
          "
                >
                    {features.map((feature, index) => {
                        const Icon = feature.icon;

                        return (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                whileHover={{
                                    y: -6,
                                }}
                                transition={{
                                    duration: 0.2,
                                }}
                                className="
                  group
                  flex
                  items-start
                  gap-4

                  rounded-2xl
                  border
                  border-white/5
                  bg-white/2
                  p-4

                  sm:border-0
                  sm:bg-transparent
                  sm:p-0
                "
                            >
                                {/* Icon */}
                                <motion.div
                                    whileHover={{
                                        scale: 1.05,
                                    }}
                                    className="
                    flex
                    h-12
                    w-12
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-white/10

                    bg-linear-to-b
                    from-white/4
                    to-white/1
                    shadow-[0_0_25px_rgba(139,92,246,0.08)]

                    transition-all
                    duration-300

                    group-hover:border-violet-500/30
                    group-hover:shadow-[0_0_35px_rgba(139,92,246,0.18)]
                  "
                                >
                                    <Icon className="h-5 w-5 text-violet-300 transition-transform duration-300 group-hover:scale-110" />
                                </motion.div>

                                {/* Content */}
                                <div>
                                    <h3 className="mb-2 text-sm font-semibold text-white sm:text-base">
                                        {feature.title}
                                    </h3>

                                    <p className="text-sm leading-6 text-zinc-500">
                                        {feature.description}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}