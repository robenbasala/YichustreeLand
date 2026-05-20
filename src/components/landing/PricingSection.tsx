"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  TreePine,
  Sparkles,
  Camera,
  Bell,
  Users,
  Wand2,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const PLANS = [
  {
    id: "starter",
    name: "Starter",
    price: "Free",
    period: "",
    description: "Begin your yichus with one name and grow from there.",
    icon: TreePine,
    featured: false,
    cta: "Start free",
    href: "/",
    features: [
      "Start with one name",
      "Couple & children tree",
      "Multi-generation branches",
      "Animated tree growth",
    ],
  },
  {
    id: "heritage",
    name: "Heritage",
    price: "$12",
    period: "/ month",
    description: "Jewish milestones, photos, and memories on every branch.",
    icon: Camera,
    featured: true,
    cta: "Choose Heritage",
    href: "/contact",
    features: [
      "Everything in Starter",
      "Jewish life events (Bar Mitzvah, Chuppah, Brit Milah…)",
      "Photo galleries on events",
      "Parashah & Hebrew dates",
    ],
  },
  {
    id: "family",
    name: "Family Circle",
    price: "$24",
    period: "/ month",
    description: "Reminders and secure sharing for the whole mishpacha.",
    icon: Users,
    featured: false,
    cta: "Choose Family Circle",
    href: "/contact",
    features: [
      "Everything in Heritage",
      "Birthday & yahrzeit reminders",
      "Invite relatives securely",
      "Guest trees & connect requests",
    ],
  },
  {
    id: "white-glove",
    name: "White Glove",
    price: "Custom",
    period: "",
    description: "We build your tree, scan photos, and deliver your panel.",
    icon: Wand2,
    featured: false,
    cta: "Book a session",
    href: "/#appointment",
    features: [
      "Dedicated family historian",
      "Old photo scanning & organization",
      "Events setup on your tree",
      "Full dashboard handoff",
    ],
  },
] as const;

export function PricingSection() {
  return (
    <section className="relative px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
      <div className="pointer-events-none absolute inset-0 bg-radial-green opacity-60" />

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55 }}
          className="mb-12 text-center"
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-600">
            Pricing
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold text-forest-950 sm:text-4xl">
            Plans for every family
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-forest-600 sm:text-lg">
            From your first name to shared guest trees and full-service setup —
            choose what fits your family&apos;s story.
          </p>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {PLANS.map((plan, i) => (
            <motion.article
              key={plan.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              className={cn(
                "relative flex flex-col rounded-2xl border bg-white/90 p-6 shadow-sm backdrop-blur-sm",
                plan.featured
                  ? "border-brand-400 shadow-[0_0_28px_rgba(46,184,184,0.22)]"
                  : "border-brand-100/80",
              )}
            >
              {plan.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-500 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                  Popular
                </span>
              )}

              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50">
                <plan.icon className="h-5 w-5 text-brand-600" strokeWidth={1.8} />
              </div>

              <h3 className="font-display text-xl font-bold text-forest-950">
                {plan.name}
              </h3>
              <p className="mt-1 text-sm text-forest-600">{plan.description}</p>

              <p className="mt-4 font-display text-3xl font-bold text-forest-950">
                {plan.price}
                {plan.period && (
                  <span className="text-base font-medium text-forest-500">
                    {plan.period}
                  </span>
                )}
              </p>

              <ul className="mt-5 flex-1 space-y-2.5">
                {plan.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2 text-sm text-forest-700"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                    {f}
                  </li>
                ))}
              </ul>

              <Button
                className={cn(
                  "mt-6 w-full",
                  plan.featured && "shadow-glow",
                )}
                variant={plan.featured ? "default" : "outline"}
                asChild
              >
                <Link href={plan.href}>
                  {plan.id === "starter" && (
                    <Sparkles className="h-4 w-4" />
                  )}
                  {plan.id === "family" && <Bell className="h-4 w-4" />}
                  {plan.cta}
                </Link>
              </Button>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
