import { CheckCircle, Headphones, FileText, Store } from 'lucide-react';

const badges = [
  {
    icon: Store,
    text: '95+ Stores',
  },
  {
    icon: CheckCircle,
    text: 'Easy Pre-Booking',
  },
  {
    icon: Headphones,
    text: 'Expert Support',
  },
  {
    icon: FileText,
    text: 'Largest Apple Premium Partner',
  },
];

export function TrustBadges() {
  // Duplicate badges for seamless loop
  const duplicatedBadges = [...badges, ...badges];

  return (
    <section className="w-full py-2 md:py-2.5 overflow-hidden" style={{ backgroundColor: '#1d1d1f' }}>
      <div className="relative">
        {/* Scrolling container */}
        <div className="flex animate-scroll">
          {duplicatedBadges.map((badge, index) => (
            <div
              key={index}
              className="flex items-center gap-2.5 flex-shrink-0 px-8 md:px-12"
            >
              <div className="flex-shrink-0 w-6 h-6 rounded-full border border-white/30 flex items-center justify-center" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                <badge.icon className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-xs font-medium text-white whitespace-nowrap">
                {badge.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
          display: flex;
          width: fit-content;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
