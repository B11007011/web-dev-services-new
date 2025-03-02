import Image from 'next/image';
import { cn } from '@/lib/utils';
import { IconMapPin, IconBriefcase, IconMail } from '@tabler/icons-react';

interface TeamMemberProps {
  name: string;
  chineseName: string;
  role: string;
  locations: string[];
  expertise: string[];
  contact: {
    wechat?: string;
    line?: string;
    whatsapp?: string;
    email: string;
  };
  imagePath: string;
  imagePosition?: string;
}

export function TeamMember({
  name,
  chineseName,
  role,
  locations,
  expertise,
  contact,
  imagePath,
  imagePosition = 'center center'
}: TeamMemberProps) {
  return (
    <div className="group relative overflow-hidden p-8 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 h-full">
      <div className="relative z-10 flex flex-col items-center">
        {/* Image container */}
        <div className="relative mb-6 w-[160px] h-[160px]">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-xl transform group-hover:scale-110 transition-transform duration-300" />
          <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-blue-500/30 shadow-lg shadow-blue-500/20 transition-all duration-300 group-hover:border-blue-400/50 group-hover:shadow-blue-400/30">
            <Image
              src={imagePath}
              alt={name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="160px"
              style={{
                objectPosition: imagePosition
              }}
              priority
            />
          </div>
        </div>
        
        {/* Name and role */}
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">{name}</h3>
          <h4 className="text-xl text-white/80 mb-2">{chineseName}</h4>
          <div className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 text-sm font-medium">
            {role}
          </div>
        </div>
        
        {/* Details */}
        <div className="w-full space-y-6">
          {/* Locations */}
          <div className="space-y-2">
            <div className="flex items-center justify-center mb-2">
              <IconMapPin className="w-5 h-5 text-blue-400 mr-2" />
              <span className="text-white/70 text-sm uppercase tracking-wider font-medium">Locations</span>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {locations.map((location, index) => (
                <span 
                  key={index} 
                  className="px-3 py-1 bg-white/5 rounded-full text-white/70 text-sm border border-white/10"
                >
                  {location}
                </span>
              ))}
            </div>
          </div>
          
          {/* Expertise */}
          <div className="space-y-2">
            <div className="flex items-center justify-center mb-2">
              <IconBriefcase className="w-5 h-5 text-blue-400 mr-2" />
              <span className="text-white/70 text-sm uppercase tracking-wider font-medium">Expertise</span>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {expertise.map((skill, index) => (
                <span 
                  key={index} 
                  className="px-3 py-1 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full text-white/90 text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          
          {/* Contact */}
          <div className="pt-4 border-t border-white/10">
            <div className="flex items-center justify-center">
              <IconMail className="w-5 h-5 text-blue-400 mr-2" />
              <a 
                href={`mailto:${contact.email}`} 
                className="text-white/70 hover:text-blue-400 transition-colors"
              >
                {contact.email}
              </a>
            </div>
            
            {/* Optional contact methods */}
            <div className="flex justify-center space-x-4 mt-4">
              {contact.wechat && (
                <div className="text-xs text-white/50">
                  WeChat: <span className="text-white/70">{contact.wechat}</span>
                </div>
              )}
              {contact.line && (
                <div className="text-xs text-white/50">
                  LINE: <span className="text-white/70">{contact.line}</span>
                </div>
              )}
              {contact.whatsapp && (
                <div className="text-xs text-white/50">
                  WhatsApp: <span className="text-white/70">{contact.whatsapp}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative corner accents */}
      <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-blue-500/30 rounded-tl-lg" />
      <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-purple-500/30 rounded-br-lg" />
    </div>
  );
} 