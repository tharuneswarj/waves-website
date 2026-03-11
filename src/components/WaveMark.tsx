"use client";

/**
 * Animated wave mark for the homepage hero.
 * Three SVG wave paths with staggered CSS keyframe animations
 * creating a subtle, alive parametric motion.
 */
export default function WaveMark() {
  return (
    <div className="flex items-center justify-center">
      <svg
        viewBox="0 0 120 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-52 w-52 md:h-72 md:w-72"
        aria-label="Waves logo mark"
      >
        <path
          d="M10 55 Q30 25, 60 40 Q90 55, 110 30"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          className="animate-wave-1"
        />
        <path
          d="M10 45 Q35 15, 60 30 Q85 45, 110 20"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          opacity="0.6"
          className="animate-wave-2"
        />
        <path
          d="M10 65 Q25 40, 60 50 Q95 60, 110 38"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          opacity="0.35"
          className="animate-wave-3"
        />
      </svg>

      <style jsx>{`
        @keyframes wave1 {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        @keyframes wave2 {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(3px); }
        }
        @keyframes wave3 {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-2px); }
        }
        .animate-wave-1 {
          animation: wave1 4s ease-in-out infinite;
          transform-origin: center;
        }
        .animate-wave-2 {
          animation: wave2 5s ease-in-out infinite;
          animation-delay: 0.5s;
          transform-origin: center;
        }
        .animate-wave-3 {
          animation: wave3 6s ease-in-out infinite;
          animation-delay: 1s;
          transform-origin: center;
        }
      `}</style>
    </div>
  );
}
