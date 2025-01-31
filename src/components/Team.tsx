'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { IconBrandLinkedin, IconBrandGithub, IconBrandTwitter } from '@tabler/icons-react'
import { useTranslations } from '@/providers/TranslationsProvider'

type TeamTranslations = {
  title: string;
  subtitle: string;
  members: Array<{
    name: string;
    role: string;
    image: string;
    bio: string;
    social: {
      linkedin: string;
      github: string;
      twitter: string;
    }
  }>;
}

export default function Team() {
  const [selectedMember, setSelectedMember] = useState(0);
  const [direction, setDirection] = useState(0);

  const content = useTranslations<TeamTranslations>('team') || {
    title: 'Meet Our Team',
    subtitle: 'Passionate experts dedicated to your success',
    members: [
      {
        name: 'John Smith',
        role: 'CEO & Lead Developer',
        image: '/placeholder-team1.jpg',
        bio: '10+ years of experience in web development and team leadership',
        social: {
          linkedin: 'https://linkedin.com',
          github: 'https://github.com',
          twitter: 'https://twitter.com'
        }
      },
      {
        name: 'Sarah Johnson',
        role: 'UI/UX Designer',
        image: '/placeholder-team2.jpg',
        bio: 'Expert in creating beautiful and functional user experiences',
        social: {
          linkedin: 'https://linkedin.com',
          github: 'https://github.com',
          twitter: 'https://twitter.com'
        }
      },
      {
        name: 'Michael Chen',
        role: 'Backend Developer',
        image: '/placeholder-team3.jpg',
        bio: 'Specialized in scalable cloud architecture and security',
        social: {
          linkedin: 'https://linkedin.com',
          github: 'https://github.com',
          twitter: 'https://twitter.com'
        }
      }
    ]
  }

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-br from-blue-950 via-black to-blue-950" id="team">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 font-serif"
          >
            {content.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/80 max-w-2xl mx-auto"
          >
            {content.subtitle}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Team Member Preview */}
          <motion.div 
            className="relative aspect-[1] rounded-2xl overflow-hidden group"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <AnimatePresence initial={false} mode="wait">
              <motion.div
                key={selectedMember}
                initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0"
              >
                <Image
                  src={content.members[selectedMember].image}
                  alt={content.members[selectedMember].name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <div className="absolute inset-x-0 bottom-0 p-6 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => {
                  setDirection(-1)
                  setSelectedMember((prev) => (prev - 1 + content.members.length) % content.members.length)
                }}
                className="p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
              >
                ←
              </button>
              <button
                onClick={() => {
                  setDirection(1)
                  setSelectedMember((prev) => (prev + 1) % content.members.length)
                }}
                className="p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
              >
                →
              </button>
            </div>
          </motion.div>

          {/* Member Details */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedMember}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20"
              >
                <motion.h3 
                  className="text-3xl font-bold mb-2 text-white"
                  layoutId="memberName"
                >
                  {content.members[selectedMember].name}
                </motion.h3>
                <motion.p 
                  className="text-xl text-blue-400 mb-6"
                  layoutId="memberRole"
                >
                  {content.members[selectedMember].role}
                </motion.p>
                <motion.p 
                  className="text-white/70 mb-8 text-lg"
                  layoutId="memberBio"
                >
                  {content.members[selectedMember].bio}
                </motion.p>

                <div className="flex gap-4">
                  <motion.a
                    href={content.members[selectedMember].social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <IconBrandLinkedin className="w-6 h-6 text-white" />
                  </motion.a>
                  <motion.a
                    href={content.members[selectedMember].social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <IconBrandGithub className="w-6 h-6 text-white" />
                  </motion.a>
                  <motion.a
                    href={content.members[selectedMember].social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <IconBrandTwitter className="w-6 h-6 text-white" />
                  </motion.a>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Team Navigation Dots */}
            <div className="flex justify-center mt-8 gap-3">
              {content.members.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setDirection(idx > selectedMember ? 1 : -1);
                    setSelectedMember(idx);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    idx === selectedMember ? 'w-8 bg-blue-500' : 'bg-white/20'
                  }`}
                  aria-label={`View ${content.members[idx].name}'s profile`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-16 bg-gradient-to-t from-white/20 to-transparent" />
    </section>
  );
} 
