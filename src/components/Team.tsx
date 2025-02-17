'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { IconBrandLinkedin, IconBrandGithub, IconBrandTwitter } from '@tabler/icons-react'
import { useTranslations } from '@/providers/TranslationsProvider'
import JsonLd from '@/components/JsonLd'
import { TeamMember } from './TeamMember'

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
};

export default function Team() {
  const [selectedMember, setSelectedMember] = useState(0);
  const [direction, setDirection] = useState(0);

  const content = useTranslations<TeamTranslations>('team');
  const displayContent = Object.keys(content).length === 0 ? defaultTeam : content;

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
      contact: {
        wechat: 'nikolasdoan',
        line: 'nikolasdoan',
        whatsapp: '+886966392602',
        email: 'niko.tecx@gmail.com'
      },
      imagePath: '/Team/Nikolas Doan.jpg'
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
      contact: {
        wechat: 'briantecx',
        line: '+886-900-299-506',
        email: 'brian.tecx@gmail.com'
      },
      imagePath: '/Team/Brian Nguyen.jpg'
    }
  ];

  return (
    <>
      <JsonLd data={teamStructuredData} />
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
              {displayContent.title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-white/80 max-w-2xl mx-auto"
            >
              {displayContent.subtitle}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {teamMembers.map((member) => (
              <TeamMember key={member.name} {...member} />
            ))}
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-16 bg-gradient-to-t from-white/20 to-transparent" />
      </section>
    </>
  );
} 
