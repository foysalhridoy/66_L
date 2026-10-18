import React from 'react';
import { ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-6 sm:mt-8 py-4 sm:py-5 border-t border-black/5 text-xs text-neutral-500">
      <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-center sm:text-left">
        {/* Brand & Section */}
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#d4ff00]" />
          <span className="font-bold text-neutral-800">66_L Announcements</span>
          <span className="text-neutral-400">•</span>
          <span>DIU CSE Section 66_L</span>
        </div>

        {/* Developer Credit with GitHub Profile Link */}
        <div className="flex items-center gap-1 text-[11px] text-neutral-500 font-medium">
          <span>Developed by</span>
          <a
            href="https://github.com/foysalhridoy"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-black hover:underline inline-flex items-center gap-1 transition-all"
          >
            <span>Hridoy</span>
            <ExternalLink className="w-3 h-3 text-neutral-400" />
          </a>
        </div>
      </div>
    </footer>
  );
};
