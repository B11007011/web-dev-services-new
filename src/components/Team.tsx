'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { IconBrandLinkedin, IconBrandGithub, IconBrandTwitter, IconMail, IconMapPin, IconBriefcase } from '@tabler/icons-react'
import { useTranslations } from '@/providers/TranslationsProvider'
import JsonLd from '@/components/JsonLd'
import { TeamMember } from '@/components/TeamMember'

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

const defaultTeam: TeamTranslations = {
  title: 'Meet Our Team',
  subtitle: 'Passionate experts dedicated to your success',
  members: []
};

export default function Team() {
  const content = useTranslations<TeamTranslations>('team');
  const displayContent = content ? (Object.keys(content).length === 0 ? defaultTeam : content) : defaultTeam;

  // Add loading check
  if (!displayContent || !displayContent.members) {
    return null; // Or return a loading spinner
  }

  // Generate Person structured data for each team member
  const teamStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: displayContent.members.map((member, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Person',
        name: member.name,
        jobTitle: member.role,
        description: member.bio,
        image: member.image,
        sameAs: [
          member.social.linkedin,
          member.social.github,
          member.social.twitter
        ].filter(Boolean)
      }
    }))
  }

  const teamMembers = [
    {
      name: 'Nikolas Doan',
      chineseName: '段皇方',
      role: 'Co-Founder & CEO',
      locations: [
        'Taipei, Taiwan',
        'Hanoi, Vietnam',
        'San Francisco, USA'
      ],
      expertise: [
        'Digital Strategy',
        'Market Research',
        'International Cooperation'
      ],
      imagePath: '/Team/Nikolas Doan.png',
      imagePosition: 'center center',
      contact: {
        email: 'niko.tecx@gmail.com'
      }
    },
    {
      name: 'Brian Nguyen',
      chineseName: '阮文貴',
      role: 'Founder & CTO',
      locations: [
        'Taipei, Taiwan',
        'HCMC, Vietnam'
      ],
      expertise: [
        'Website Development',
        'Application Development',
        'Digital Solutions'
      ],
      imagePath: '/Team/Brian Nguyen.png',
      imagePosition: 'center 30%',
      contact: {
        email: 'brian.tecx@gmail.com'
      }
    },
    {
      name: 'Jane Liu',
      chineseName: '劉美娟',
      role: 'Design Manager',
      locations: [
        'Taipei, Taiwan',
        
      ],
      expertise: [
        'UI/UX Design',
        'Branding',
        'Graphic Design',
        'UX Research'
      ],
      imagePath: '/Team/Jane.png',
      imagePosition: 'center center',
      contact: {
        email: 'mei.tecx@gmail.com'
      }
    }
  ];

  return (
    <>
      <JsonLd data={teamStructuredData} />
      <section className="relative py-24 overflow-hidden bg-gradient-to-br from-blue-950 via-black to-blue-950" id="team">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-block mb-4"
            >
              <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                Our Experts
              </span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-serif"
            >
              {displayContent.title}
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-white/80 max-w-2xl mx-auto"
            >
              {displayContent.subtitle}
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-8 rounded-full"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <TeamMember {...member} />
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-20 text-center"
          >
            <a 
              href="#contact" 
              className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium transition-all hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-1"
            >
              <span>Work With Our Team</span>
              <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl" />
      </section>
    </>
  );
} 
