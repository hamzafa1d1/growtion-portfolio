"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { isVideoAsset } from "@/lib/media";

const EASE = [0.22, 1, 0.36, 1] as const;

export interface TestimonialsProps {
  reviewUrls?: string[];
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.93 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: EASE } },
};

export function Testimonials({ reviewUrls = [] }: TestimonialsProps) {
  const filledReviews = reviewUrls.filter((url): url is string => !!url);

  return (
    <section
      id="avis"
      className="section-white py-24 px-6"
      style={{ borderBottom: "1px solid #ede9fe" }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
          className="text-center mb-14"
        >
          <p className="text-purple-600 text-sm font-bold tracking-widest uppercase mb-3">
            Ce que disent nos clients
          </p>
          <h2
            className="text-4xl md:text-5xl font-black text-gray-900"
            style={{ fontFamily: "var(--font-display), 'Arial Black', Impact, sans-serif" }}
          >
            <span className="gradient-text">RESULTS</span>
          </h2>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-purple-600" />
        </motion.div>

        {filledReviews.length > 0 && (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {filledReviews.map((url, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{
                  y: -8,
                  boxShadow: "0 20px 50px rgba(109,40,217,0.18)",
                  transition: { duration: 0.25, ease: "easeOut" },
                }}
                className="group relative rounded-3xl overflow-hidden bg-white"
                style={{
                  border: "1px solid #ede9fe",
                  minHeight: 270,
                  boxShadow: "0 2px 12px rgba(109,40,217,0.07)",
                }}
              >
                <div className="relative w-full" style={{ minHeight: 270 }}>
                  {isVideoAsset(url) ? (
                    <video
                      src={`${url}#t=0.1`}
                      controls
                      playsInline
                      preload="metadata"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <Image
                      src={url}
                      alt={`Avis client ${i + 1}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                      sizes="300px"
                    />
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Social proof banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
          whileHover={{
            scale: 1.01,
            boxShadow: "0 16px 50px rgba(109,40,217,0.15)",
            transition: { duration: 0.25 },
          }}
          className="text-center rounded-3xl py-10 px-6 cursor-default"
          style={{
            background: "linear-gradient(135deg, #f5f3ff, #ede9fe)",
            border: "1px solid #c4b5fd",
          }}
        >
          <p className="text-gray-900 text-xl md:text-2xl font-black leading-relaxed">
            Vous allez bénéficier de l&apos;expérience de plus de{" "}
            <span className="text-purple-600">200 clients</span>
            <br />
            avec près de{" "}
            <span className="text-purple-600">1000 créations réalisées</span>
          </p>
          <p className="text-gray-500 text-base mt-3 font-semibold">
            On met tout en œuvre pour scaler votre e-commerce et booster vos ventes
          </p>
        </motion.div>
      </div>
    </section>
  );
}
