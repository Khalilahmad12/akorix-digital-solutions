import React, { useState } from 'react';
import { Users, Linkedin, Mail, User } from 'lucide-react';
import { TEAM_DATA } from '../../data';

interface TeamSectionProps {
  onOpenContact?: (msg?: string) => void;
}

export const TeamSection: React.FC<TeamSectionProps> = ({ onOpenContact }) => {
  const [imageErrorMap, setImageErrorMap] = useState<Record<string, boolean>>({});

  const handleImageError = (id: string) => {
    setImageErrorMap(prev => ({ ...prev, [id]: true }));
  };

  return (
    <section 
      id="team"
      className="py-10 sm:py-14 lg:py-16 bg-stone-50 text-stone-900 border-b border-stone-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2 mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/80 border border-amber-300 text-xs font-semibold text-amber-950">
            <Users className="w-3.5 h-3.5 text-amber-700" />
            <span className="tracking-wider uppercase text-[11px]">OUR TEAM</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-950 leading-tight">
            Meet the People Behind the Work.
          </h2>

          <p className="text-sm text-stone-600 font-normal leading-relaxed max-w-2xl mx-auto">
            Different skills. One shared goal — creating better digital experiences for businesses.
          </p>
        </div>

        {/* 4 Columns Desktop Grid (4 + 4 + 1 for 9 members), 2 cols tablet, 1 col mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {TEAM_DATA.slice(0, 9).map((member) => {
            const hasImgError = imageErrorMap[member.id];

            return (
              <div
                key={member.id}
                className="group relative rounded-xl bg-white border border-stone-200 shadow-xs hover:shadow-md hover:border-amber-400/80 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                <div>
                  {/* Image Container */}
                  <div className="relative aspect-4/3 w-full bg-stone-100 overflow-hidden border-b border-stone-100">
                    {!hasImgError ? (
                      <img
                        src={member.avatar}
                        alt={`${member.name} - ${member.role} at AKorix Digital Solutions`}
                        onError={() => handleImageError(member.id)}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-stone-100 text-stone-400">
                        <User className="w-12 h-12 stroke-1 mb-1 text-stone-300" />
                        <span className="text-xs font-semibold text-stone-400">{member.name}</span>
                      </div>
                    )}

                    {/* Social/Profile Icons */}
                    <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
                      <a
                        href="https://www.linkedin.com/company/akorix-digital-solutions"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${member.name} on LinkedIn`}
                        className="w-7 h-7 rounded-lg bg-white/90 hover:bg-white text-stone-700 hover:text-amber-700 shadow-xs flex items-center justify-center transition-colors"
                      >
                        <Linkedin className="w-3.5 h-3.5" />
                      </a>
                      {onOpenContact && (
                        <button
                          type="button"
                          onClick={() => onOpenContact(`Hi, I'd like to connect with ${member.name} regarding a project.`)}
                          aria-label={`Contact ${member.name}`}
                          className="w-7 h-7 rounded-lg bg-white/90 hover:bg-white text-stone-700 hover:text-amber-700 shadow-xs flex items-center justify-center transition-colors cursor-pointer"
                        >
                          <Mail className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Member Name and Specialty */}
                  <div className="p-4 sm:p-5 space-y-1">
                    <h3 className="text-base font-bold text-stone-950 group-hover:text-amber-900 transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-xs font-semibold text-amber-700">
                      {member.role}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
