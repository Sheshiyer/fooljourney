import React from 'react';
import type { JournalEntry } from '../types';

interface LandingPageProps {
  entries: JournalEntry[];
  onEntrySelect: (entryId: string) => void;
}

export function LandingPage({ entries, onEntrySelect }: LandingPageProps) {
  const featuredEntry = entries[0]; // Use first entry as featured

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="mystical-card p-12 text-center relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 mb-4 animate-glow">
            The Fool's Journey
          </h1>
          <p className="text-xl text-purple-200 mb-8 max-w-2xl mx-auto leading-relaxed">
            A mystical exploration through the realms of consciousness, 
            where ancient wisdom meets modern understanding in the eternal dance of becoming.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="mystical-button text-lg px-8 py-3">
              Begin the Journey
            </button>
            <button className="border border-purple-400 text-purple-200 hover:bg-purple-800/20 font-semibold py-3 px-8 rounded-lg transition-all duration-200">
              Explore Entries
            </button>
          </div>
        </div>
      </div>

      {/* Featured Entry */}
      {featuredEntry && (
        <div className="mystical-card p-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-amber-400">⭐</span>
            <h2 className="text-2xl font-bold text-purple-200">Featured Entry</h2>
          </div>
          <div 
            className="cursor-pointer hover:scale-[1.02] transition-transform duration-300"
            onClick={() => onEntrySelect(featuredEntry.id)}
          >
            <div className="flex items-start gap-6">
              <span className="text-6xl animate-float">{featuredEntry.symbol}</span>
              <div className="flex-1">
                <h3 className="text-3xl font-bold text-purple-100 mb-2">{featuredEntry.title}</h3>
                <div className="flex gap-4 mb-4 text-sm text-purple-400">
                  <span>Tarot: {featuredEntry.tarot}</span>
                  <span>Numerology: {featuredEntry.numerology}</span>
                </div>
                <p className="text-slate-300 leading-relaxed line-clamp-3">
                  {featuredEntry.content.substring(0, 200)}...
                </p>
                <button className="mt-4 text-purple-400 hover:text-purple-300 font-medium">
                  Read More →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recent Entries Grid */}
      <div>
        <h2 className="text-3xl font-bold text-purple-200 mb-6 flex items-center gap-3">
          <span>📚</span>
          Recent Entries
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {entries.slice(1).map((entry) => (
            <div
              key={entry.id}
              className="mystical-card p-6 cursor-pointer hover:scale-105 transition-all duration-300 group"
              onClick={() => onEntrySelect(entry.id)}
            >
              <div className="flex items-center gap-4 mb-4">
                <span className="text-4xl group-hover:animate-pulse">{entry.symbol}</span>
                <div>
                  <h3 className="text-xl font-semibold text-purple-200 group-hover:text-purple-100">
                    {entry.title}
                  </h3>
                  <p className="text-sm text-purple-400">{entry.tarot}</p>
                </div>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed line-clamp-3">
                {entry.content.substring(0, 120)}...
              </p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-xs text-purple-500">
                  {entry.secrets.length} secrets hidden
                </span>
                <span className="text-purple-400 group-hover:text-purple-300 text-sm">
                  Explore →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="mystical-card p-8 text-center">
        <h2 className="text-2xl font-bold text-purple-200 mb-4">
          Ready to Begin Your Own Journey?
        </h2>
        <p className="text-purple-300 mb-6">
          Every fool's journey begins with a single step into the unknown.
        </p>
        <button className="mystical-button text-lg px-8 py-3">
          Create Your First Entry
        </button>
      </div>
    </div>
  );
}