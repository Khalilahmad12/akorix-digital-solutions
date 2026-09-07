import React from 'react';
import { 
  Sparkles, 
  MessageSquare, 
  Eye, 
  ShieldCheck, 
  Clock 
} from 'lucide-react';

interface ExpectationItem {
  title: string;
  description: string;
  icon: React.ElementType;
}

const EXPECTATIONS: ExpectationItem[] = [
  {
    title: 'Clear Communication',
    description: 'Stay informed throughout the project.',
    icon: MessageSquare,
  },
  {
    title: 'Transparent Workflow',
    description: 'Know what’s happening at every stage.',
    icon: Eye,
  },
  {
    title: 'Quality-Focused',
    description: 'Attention to design, performance, and functionality.',
    icon: ShieldCheck,
  },
  {
    title: 'On-Time Delivery',
    description: 'Clear milestones and focused execution.',
    icon: Clock,
  },
];

export const WhatYouCanExpect: React.FC = () => {
  return (
    <section 
      id="what-you-can-expect"
      className="py-10 sm:py-14 bg-stone-50 text-stone-900 border-b border-stone-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2 mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/80 border border-amber-300 text-xs font-semibold text-amber-950">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span className="tracking-wider uppercase text-[11px]">WHAT YOU CAN EXPECT</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-950 leading-tight">
            A Better Way to Work Together.
          </h2>
        </div>

        {/* Compact 4-Item Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {EXPECTATIONS.map((item) => {
            const IconComponent = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-xl bg-white border border-stone-200 p-4 sm:p-5 shadow-xs hover:shadow-md hover:border-amber-400/80 transition-all duration-200 flex flex-col justify-start"
              >
                <div className="w-8 h-8 rounded-lg bg-amber-100/70 border border-amber-200 flex items-center justify-center text-amber-800 mb-3">
                  <IconComponent className="w-4 h-4" />
                </div>

                <h3 className="text-sm sm:text-base font-bold text-stone-950 mb-1">
                  {item.title}
                </h3>

                <p className="text-xs text-stone-600 font-normal leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
