'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Crown, Sparkles, X, Zap } from "lucide-react";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { AmbientBg } from "@/components/shared/ambient-bg";

const plans = [
  {
    name: "Starter",
    icon: Sparkles,
    price: { monthly: 9, yearly: 90 },
    description: "Perfect for exploring AI music creation",
    color: "#3D7CFF",
    popular: false,
    features: [
      { text: "50 generations per month", included: true },
      { text: "Basic voice library", included: true },
      { text: "10 genre styles", included: true },
      { text: "MP3 downloads", included: true },
      { text: "Personal use license", included: true },
      { text: "MIDI export", included: false },
      { text: "Multi-track editing", included: false },
      { text: "API access", included: false },
      { text: "Commercial license", included: false },
    ],
  },
  {
    name: "Creator",
    icon: Zap,
    price: { monthly: 29, yearly: 290 },
    description: "For serious creators and professionals",
    color: "#8A3DFF",
    popular: true,
    features: [
      { text: "Unlimited generations", included: true },
      { text: "Full voice library (200+)", included: true },
      { text: "All 50+ genre styles", included: true },
      { text: "WAV & MP3 downloads", included: true },
      { text: "Commercial license", included: true },
      { text: "MIDI export", included: true },
      { text: "Multi-track editing", included: true },
      { text: "Priority processing", included: true },
      { text: "API access", included: false },
    ],
  },
  {
    name: "Pro",
    icon: Crown,
    price: { monthly: 79, yearly: 790 },
    description: "Enterprise-grade for teams and studios",
    color: "#FF3D9A",
    popular: false,
    features: [
      { text: "Everything in Creator", included: true },
      { text: "Team collaboration (5 seats)", included: true },
      { text: "API access (10k calls/month)", included: true },
      { text: "Custom voice training", included: true },
      { text: "White-label options", included: true },
      { text: "Priority support", included: true },
      { text: "Extended commercial rights", included: true },
      { text: "Custom integration", included: true },
      { text: "Dedicated account manager", included: true },
    ],
  },
];

const faqs = [
  {
    question: "Can I cancel my subscription anytime?",
    answer:
      "Yes, you can cancel at any time. You will continue to have access until the end of your billing period.",
  },
  {
    question: "What happens to my songs if I cancel?",
    answer: "All songs you have created are yours to keep forever. You can download them anytime.",
  },
  {
    question: "Do you offer refunds?",
    answer: "We offer a 14-day money-back guarantee on all plans.",
  },
  {
    question: "Can I upgrade or downgrade my plan?",
    answer:
      "Absolutely. Upgrades take effect immediately, while downgrades apply at the next billing cycle.",
  },
  {
    question: "Is there a free trial?",
    answer: "Yes. You can create 5 songs for free before choosing a plan.",
  },
];

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly");

  return (
    <div className="relative z-10 min-h-screen bg-transparent">
      <Navigation />
      <main className="pt-16">
        <section className="relative section-spacing overflow-hidden">
          <AmbientBg variant="1" opacity={0.55} blur="blur-[85px]" />
          <AmbientBg variant="2" opacity={0.35} blur="blur-[100px]" />
          <div className="relative z-10 content-container container-padding">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mx-auto max-w-[900px] text-center"
            >
              <h1 className="mb-6">Choose Your Plan</h1>
              <p className="mb-12 text-xl text-text-muted">
                Start creating professional music today. All plans include access to our AI technology.
              </p>

              <div className="mb-16 inline-flex items-center gap-4 rounded-xl border border-white/10 bg-surface-primary p-2">
                <Button
                  variant={billingPeriod === "monthly" ? "default" : "ghost"}
                  onClick={() => setBillingPeriod("monthly")}
                  className="px-6"
                >
                  Monthly
                </Button>
                <Button
                  variant={billingPeriod === "yearly" ? "default" : "ghost"}
                  onClick={() => setBillingPeriod("yearly")}
                  className="relative px-6"
                >
                  Yearly
                  <span className="absolute -right-3 -top-2 rounded-full bg-accent-pink px-2 py-0.5 text-xs">
                    Save 17%
                  </span>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="section-spacing">
          <div className="content-container container-padding">
            <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-8 lg:grid-cols-3">
              {plans.map((plan, index) => {
                const Icon = plan.icon;
                const price = plan.price[billingPeriod];
                return (
                  <motion.div
                    key={plan.name}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={`relative rounded-3xl border border-white/10 bg-surface-primary p-8 glass-surface ${
                      plan.popular ? "border-2 border-accent-purple lg:scale-105" : ""
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-accent-blue to-accent-purple px-4 py-1 text-sm font-medium">
                        Most Popular
                      </div>
                    )}

                    <div
                      className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl"
                      style={{ background: `linear-gradient(135deg, ${plan.color}, ${plan.color}40)` }}
                    >
                      <Icon className="h-7 w-7" />
                    </div>

                    <h3 className="mb-2 text-2xl font-bold">{plan.name}</h3>
                    <p className="mb-6 text-sm text-text-muted">{plan.description}</p>

                    <div className="mb-6">
                      <div className="flex items-baseline gap-2">
                        <span className="text-5xl font-bold">${price}</span>
                        <span className="text-text-muted">/{billingPeriod === "monthly" ? "mo" : "yr"}</span>
                      </div>
                      {billingPeriod === "yearly" && (
                        <p className="mt-2 text-sm text-text-muted">${(price / 12).toFixed(2)}/month billed annually</p>
                      )}
                    </div>

                    <Button className="mb-8 w-full" variant={plan.popular ? "default" : "outline"}>
                      Get Started
                    </Button>

                    <ul className="space-y-4">
                      {plan.features.map((feature) => (
                        <li key={feature.text} className="flex items-start gap-3">
                          {feature.included ? (
                            <Check className="mt-0.5 h-5 w-5 text-accent-blue" />
                          ) : (
                            <X className="mt-0.5 h-5 w-5 text-text-muted/40" />
                          )}
                          <span className={feature.included ? "text-white" : "text-text-muted/60"}>{feature.text}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section-spacing">
          <div className="content-container container-padding">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16 text-center"
            >
              <h2 className="mb-4">Compare All Features</h2>
              <p className="text-text-muted">Detailed feature comparison across all plans</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="overflow-x-auto rounded-2xl glass-surface"
            >
              <table className="w-full min-w-[640px]">
                <thead className="bg-surface-primary">
                  <tr>
                    <th className="px-6 py-4 text-left">Feature</th>
                    <th className="px-6 py-4 text-center">Starter</th>
                    <th className="px-6 py-4 text-center">Creator</th>
                    <th className="px-6 py-4 text-center">Pro</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-white/5">
                    <td className="px-6 py-4">Monthly Generations</td>
                    <td className="px-6 py-4 text-center text-text-muted">50</td>
                    <td className="px-6 py-4 text-center text-accent-blue">Unlimited</td>
                    <td className="px-6 py-4 text-center text-accent-blue">Unlimited</td>
                  </tr>
                  <tr className="border-t border-white/5">
                    <td className="px-6 py-4">Voice Library</td>
                    <td className="px-6 py-4 text-center text-text-muted">Basic</td>
                    <td className="px-6 py-4 text-center text-accent-blue">Full (200+)</td>
                    <td className="px-6 py-4 text-center text-accent-blue">Full + Custom</td>
                  </tr>
                  <tr className="border-t border-white/5">
                    <td className="px-6 py-4">Commercial License</td>
                    <td className="px-6 py-4 text-center">
                      <X className="mx-auto h-5 w-5 text-red-400" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Check className="mx-auto h-5 w-5 text-green-400" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Check className="mx-auto h-5 w-5 text-green-400" />
                    </td>
                  </tr>
                  <tr className="border-t border-white/5">
                    <td className="px-6 py-4">API Access</td>
                    <td className="px-6 py-4 text-center">
                      <X className="mx-auto h-5 w-5 text-red-400" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <X className="mx-auto h-5 w-5 text-red-400" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Check className="mx-auto h-5 w-5 text-green-400" />
                    </td>
                  </tr>
                  <tr className="border-t border-white/5">
                    <td className="px-6 py-4">Team Collaboration</td>
                    <td className="px-6 py-4 text-center">
                      <X className="mx-auto h-5 w-5 text-red-400" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <X className="mx-auto h-5 w-5 text-red-400" />
                    </td>
                    <td className="px-6 py-4 text-center text-accent-blue">5 seats</td>
                  </tr>
                </tbody>
              </table>
            </motion.div>
          </div>
        </section>

        <section className="section-spacing">
          <div className="content-container container-padding">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16 text-center"
            >
              <h2 className="mb-4">Frequently Asked Questions</h2>
              <p className="text-text-muted">Everything you need to know about our plans</p>
            </motion.div>

            <div className="mx-auto grid max-w-[900px] grid-cols-1 gap-6">
              {faqs.map((faq, index) => (
                <motion.div
                  key={faq.question}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  className="rounded-2xl glass-surface p-6"
                >
                  <h4 className="mb-3 text-lg font-semibold">{faq.question}</h4>
                  <p className="text-text-muted">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-spacing">
          <div className="content-container container-padding">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative mx-auto max-w-[1200px] overflow-hidden rounded-3xl p-12 text-center glass-surface"
            >
              <div className="gradient-orb pointer-events-none absolute right-0 top-0 h-96 w-96" />
              <div className="relative z-10">
                <h2 className="mb-4">Still have questions?</h2>
                <p className="mx-auto mb-8 max-w-[600px] text-text-muted">
                  Try MuseAI free for 14 days. No credit card required.
                </p>
                <div className="flex flex-col justify-center gap-4 sm:flex-row">
                  <Button size="lg">Start Free Trial</Button>
                  <Button variant="outline" size="lg">
                    Contact Sales
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

