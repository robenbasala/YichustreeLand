"use client";

import { motion } from "framer-motion";
import { ScanLine, Images, CalendarHeart, LayoutDashboard } from "lucide-react";
import { AppointmentBooking } from "./AppointmentBooking";
import { BrandLogo } from "./BrandLogo";
import { FloatingLeaves } from "./FloatingLeaves";

const SERVICES = [
  { type: "logo" as const, text: "We build your family tree with you" },
  { type: "icon" as const, icon: ScanLine, text: "We scan your old photos" },
  { type: "icon" as const, icon: Images, text: "We organize your new photos" },
  {
    type: "icon" as const,
    icon: CalendarHeart,
    text: "We define your family events",
  },
  {
    type: "icon" as const,
    icon: LayoutDashboard,
    text: "We deliver a complete panel for you",
  },
] as const;

function ServiceIcon({
  item,
}: {
  item: (typeof SERVICES)[number];
}) {
  return (
    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-50 shadow-[0_0_16px_rgba(46,184,184,0.22)]">
      {item.type === "logo" ? (
        <BrandLogo height={34} />
      ) : (
        <item.icon className="h-5 w-5 text-brand-600" strokeWidth={1.8} />
      )}
    </span>
  );
}

export function AppointmentSection() {
  return (
    <section
      id="appointment"
      className="relative flex min-h-screen flex-col justify-start px-5 pb-16 pt-28 sm:px-8 sm:pb-20 lg:px-12"
    >
      <div className="pointer-events-none absolute inset-0 bg-radial-green" />
      <FloatingLeaves count={5} className="opacity-40" />

      <div className="relative mx-auto w-full max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 text-center lg:mb-12"
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-600">
            Full-service support
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-forest-950 sm:text-4xl">
            We are here to help
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-forest-600 sm:text-lg">
            We can build your family tree, scan and organize your photos, set up
            your events, and hand you a complete panel — then save your
            appointment date and time below.
          </p>
        </motion.div>

        <motion.ul
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="mb-12 grid gap-3 sm:grid-cols-2 lg:mb-14"
        >
          {SERVICES.map((item, i) => (
            <motion.li
              key={item.text}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 * i, duration: 0.45 }}
              className="flex items-center gap-3 rounded-xl border border-brand-100/80 bg-white/80 px-4 py-3.5 shadow-sm backdrop-blur-sm"
            >
              <ServiceIcon item={item} />
              <span className="text-sm font-semibold leading-snug text-forest-800">
                {item.text}
              </span>
            </motion.li>
          ))}
        </motion.ul>

        <p className="mb-6 text-center text-sm font-medium text-forest-500">
          Save your appointment date and time
        </p>

        <AppointmentBooking />
      </div>
    </section>
  );
}
