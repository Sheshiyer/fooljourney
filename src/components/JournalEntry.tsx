import React from 'react';
import type { JournalEntry as JournalEntryType } from '../types';
import { tarotCards } from '../data/tarotCards';

interface JournalEntryProps {
  entry: JournalEntryType;
  isActive: boolean;
  onSecretClick: (secret: string) => void;
  onInteractionClick: (interaction: string) => void;
}

export function JournalEntry({ entry, isActive, onSecretClick, onInteractionClick }: JournalEntryProps) {
  const tarotCard = tarotCards[entry.tarot];

  const renderContent = (text: string) => {
    return text.split('**').map((part, index) => {
      if (index % 2 === 1) {
        return (
          <span
            key={index}
            className="secret-text"
            onClick={() => onSecretClick(part)}
          >
            {part}
          </span>
        );
      }
      return part;
    });
  };

  if (!isActive) {
    return (
      <div className="mystical-card p-6 cursor-pointer hover:scale-105 transition-transform">
        <div className="flex items-center gap-4">
          <span className="text-4xl animate-float">{entry.symbol}</span>
          <div>
            <h3 className="text-xl font-semibold text-purple-200">{entry.title}</h3>
            <p className="text-sm text-purple-400">{entry.tarot} • {entry.numerology}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mystical-card p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-6xl animate-float">{entry.symbol}</span>
          <div>
            <h2 className="text-3xl font-bold text-purple-100">{entry.title}</h2>
            <div className="flex gap-4 mt-2">
              <span className="text-purple-300">Tarot: {entry.tarot}</span>
              <span className="text-purple-300">Numerology: {entry.numerology}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tarot Card Info */}
      {tarotCard && (
        <div className="bg-slate-800/50 rounded-lg p-4 border border-purple-500/20">
          <h4 className="font-semibold text-purple-200 mb-2">{tarotCard.name}</h4>
          <p className="text-sm text-slate-300 mb-2">{tarotCard.meaning}</p>
          <div className="flex gap-4 text-xs text-purple-400">
            <span>Element: {tarotCard.element}</span>
            <span>Planet: {tarotCard.planet}</span>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="prose prose-invert max-w-none">
        <p className="text-slate-200 leading-relaxed text-lg">
          {renderContent(entry.content)}
        </p>
      </div>

      {/* Interactions */}
      {entry.interactions.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-purple-200 font-semibold">Interactive Protocols:</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {entry.interactions.map((interaction, index) => (
              <button
                key={index}
                onClick={() => onInteractionClick(interaction)}
                className="mystical-button text-sm py-2"
              >
                {interaction}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Secrets */}
      {entry.secrets.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-amber-200 font-semibold">Hidden Secrets:</h4>
          <div className="space-y-1">
            {entry.secrets.map((secret, index) => (
              <div
                key={index}
                className="text-amber-300/70 text-sm cursor-pointer hover:text-amber-200 transition-colors"
                onClick={() => onSecretClick(secret)}
              >
                • {secret}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}