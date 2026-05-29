"use client";

import {
    Briefcase,
    Factory,
    Magnifier,
    Star,
} from "@gravity-ui/icons";

import { motion } from "motion/react";

export default function StatsSection() {

    const stats = [
        {
            id: 1,
            icon: <Briefcase className="h-5 w-5" />,
            value: "50K",
            label: "Active Jobs",
        },
        {
            id: 2,
            icon: <Factory className="h-5 w-5" />,
            value: "12K",
            label: "Companies",
        },
        {
            id: 3,
            icon: <Magnifier className="h-5 w-5" />,
            value: "2M",
            label: "Job Seekers",
        },
        {
            id: 4,
            icon: <Star className="h-5 w-5" />,
            value: "97%",
            label: "Satisfaction Rate",
        },
    ];

    return (
        <section className="relative overflow-hidden bg-black py-28 text-white">

            {/* Background Globe */}
            <motion.div
                initial={{ scale: 1.1, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 0.9 }}
                transition={{ duration: 1.2 }}
                viewport={{ once: true }}
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: "url('/images/globe.png')",
                }}
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/40" />

            {/* Animated Glow */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute left-1/2 top-[25%] h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-violet-600/30 blur-[140px]"
            />

            {/* Content */}
            <div className="relative z-10 mx-auto max-w-7xl px-6">

                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="mx-auto max-w-3xl text-center"
                >
                    <h2 className="text-2xl font-medium leading-relaxed text-white/90">
                        Assisting over 15,000 job seekers
                        <br />
                        find their dream positions.
                    </h2>

                    {/* Floating Text */}
                    <motion.div
                        className="mt-6 flex items-center justify-center gap-4 flex-wrap"
                    >
                        <motion.p
                            animate={{
                                y: [0, -10, 0],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm backdrop-blur-xl"
                        >
                            Remote Jobs
                        </motion.p>

                        <motion.p
                            animate={{
                                y: [0, 10, 0],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 0.4,
                            }}
                            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm backdrop-blur-xl"
                        >
                            On-site Jobs
                        </motion.p>

                        <motion.p
                            animate={{
                                y: [0, -8, 0],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 0.8,
                            }}
                            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm backdrop-blur-xl"
                        >
                            Hybrid Jobs
                        </motion.p>
                    </motion.div>
                </motion.div>

                {/* Stats Cards */}
                <div className="mt-20 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.6,
                                delay: index * 0.15,
                            }}
                            whileHover={{
                                y: -10,
                                scale: 1.03,
                            }}
                            viewport={{ once: true }}
                            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl transition duration-300 hover:border-violet-500/30"
                        >

                            {/* Card Glow */}
                            <motion.div
                                className="absolute bottom-0 right-0 h-32 w-32 rounded-full bg-white/10 blur-3xl"
                                whileHover={{
                                    scale: 1.5,
                                    opacity: 0.8,
                                }}
                                transition={{
                                    duration: 0.4,
                                }}
                            />

                            {/* Icon */}
                            <motion.div
                                whileHover={{
                                    rotate: 8,
                                    scale: 1.2,
                                }}
                                className="relative z-10 text-white/90"
                            >
                                {stat.icon}
                            </motion.div>

                            {/* Number */}
                            <motion.h3
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.2,
                                }}
                                viewport={{ once: true }}
                                className="relative z-10 mt-10 text-5xl font-bold tracking-tight"
                            >
                                {stat.value}
                            </motion.h3>

                            {/* Label */}
                            <p className="relative z-10 mt-4 text-base text-gray-300">
                                {stat.label}
                            </p>

                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}