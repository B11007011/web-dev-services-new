import Image from 'next/image';
import { cn } from '@/lib/utils';

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
}

export function TeamMember({
  name,
  chineseName,
  role,
  locations,
  expertise,
  contact,
  imagePath
}: TeamMemberProps) {
  return (
    <div className="flex flex-col items-center p-8 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-white/20 transition-all h-full">
      <div className="relative w-40 h-40 mb-6 overflow-hidden rounded-full">
        <Image
          src={imagePath}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      
      <h3 className="text-2xl font-bold text-white mb-1">{name}</h3>
      <h4 className="text-xl text-white/80 mb-2">{chineseName}</h4>
      <p className="text-lg font-semibold text-primary mb-6">{role}</p>
      
      <div className="w-full space-y-6">
        <div className="space-y-2">
          {locations.map((location, index) => (
            <p key={index} className="text-white/70 text-center">{location}</p>
          ))}
        </div>
        
        <div className="space-y-2">
          {expertise.map((skill, index) => (
            <p key={index} className="text-white/90 text-center">{skill}</p>
          ))}
        </div>
        
        <div className="space-y-2 text-sm">
          {contact.wechat && (
            <p className="text-white/70 text-center">WeChat: {contact.wechat}</p>
          )}
          {contact.line && (
            <p className="text-white/70 text-center">LINE: {contact.line}</p>
          )}
          {contact.whatsapp && (
            <p className="text-white/70 text-center">WhatsApp: {contact.whatsapp}</p>
          )}
          <p className="text-white/70 text-center">Email: {contact.email}</p>
        </div>
      </div>
    </div>
  );
} 