"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, User, MessageSquare, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { saveContactMessage } from "@/lib/client-storage";
import { notifyAdmin } from "@/lib/notify-admin";

export function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSend =
    name.trim().length > 0 &&
    email.includes("@") &&
    message.trim().length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSend) return;
    const ok = saveContactMessage({
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
    });
    if (ok) {
      setSent(true);
      setName("");
      setEmail("");
      setMessage("");
    }
  };

  return (
    <section className="relative px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
      <div className="relative mx-auto max-w-xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55 }}
          className="mb-10 text-center"
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-600">
            Contact us
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold text-forest-950 sm:text-4xl">
            We&apos;d love to hear from you
          </h2>
          <p className="mt-4 text-base text-forest-600 sm:text-lg">
            Questions about your tree, pricing, or our full-service package?
            Send a message — we&apos;ll get back to you soon.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="relative rounded-2xl border border-brand-200/60 bg-white p-6 shadow-card sm:p-8"
        >
          <div className="space-y-5">
            <label className="block">
              <span className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-forest-600">
                <User className="h-3.5 w-3.5" />
                Name
              </span>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setSent(false);
                }}
                className="w-full rounded-xl border border-brand-100 bg-white px-4 py-3 text-sm text-forest-900 outline-none ring-brand-400 transition-shadow focus:border-brand-400 focus:ring-2"
                placeholder="Your name"
                autoComplete="name"
              />
            </label>

            <label className="block">
              <span className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-forest-600">
                <Mail className="h-3.5 w-3.5" />
                Email
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setSent(false);
                }}
                className="w-full rounded-xl border border-brand-100 bg-white px-4 py-3 text-sm text-forest-900 outline-none ring-brand-400 transition-shadow focus:border-brand-400 focus:ring-2"
                placeholder="you@example.com"
                autoComplete="email"
              />
            </label>

            <label className="block">
              <span className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-forest-600">
                <MessageSquare className="h-3.5 w-3.5" />
                Message
              </span>
              <textarea
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  setSent(false);
                }}
                rows={4}
                className="w-full resize-none rounded-xl border border-brand-100 bg-white px-4 py-3 text-sm text-forest-900 outline-none ring-brand-400 transition-shadow focus:border-brand-400 focus:ring-2"
                placeholder="Tell us about your family tree or how we can help…"
              />
            </label>

            {error && (
              <p className="text-center text-sm font-medium text-red-600">
                {error}
              </p>
            )}

            <Button
              type="submit"
              size="lg"
              className="w-full shadow-glow"
              disabled={!canSend || sent || submitting}
            >
              {sent ? (
                <>
                  <Check className="h-5 w-5" />
                  Message sent
                </>
              ) : submitting ? (
                "Sending…"
              ) : (
                "Send message"
              )}
            </Button>

            {sent && (
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center text-sm font-medium text-brand-700"
              >
                We emailed our team — we&apos;ll get back to you soon.
              </motion.p>
            )}
          </div>
        </motion.form>
      </div>
    </section>
  );
}
