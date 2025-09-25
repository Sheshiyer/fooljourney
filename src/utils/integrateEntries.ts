import { readFileSync } from 'fs';
import { join } from 'path';
import { parseMdContent, convertToJournalEntry } from './mdParser';
import type { JournalEntry } from '../data/witnessJournalEntries';

export async function integrateMarkdownEntries(): Promise<JournalEntry[]> {
  const mdFiles = [
    { filename: 'entrysix.md', path: '/Users/magenarayan/Documents/fooljourney/entrysix.md' },
    { filename: 'entryseven.md', path: '/Users/magenarayan/Documents/fooljourney/entryseven.md' },
    { filename: 'entryeight.md', path: '/Users/magenarayan/Documents/fooljourney/entryeight.md' },
    { filename: 'entryzero.md', path: '/Users/magenarayan/Documents/fooljourney/entryzero.md' }
  ];

  const newEntries: JournalEntry[] = [];

  for (const { filename, path } of mdFiles) {
    try {
      const content = readFileSync(path, 'utf-8');
      
      // Skip empty files
      if (!content.trim()) {
        console.warn(`Skipping empty file: ${filename}`);
        continue;
      }

      const parsed = parseMdContent(content, filename);
      if (parsed) {
        const journalEntry = convertToJournalEntry(parsed, filename);
        newEntries.push(journalEntry);
      }
    } catch (error) {
      console.error(`Error processing ${filename}:`, error);
    }
  }

  // Sort entries by entry number (0 should be last as epilogue)
  newEntries.sort((a, b) => {
    const aNum = extractEntryNumber(a.id);
    const bNum = extractEntryNumber(b.id);
    
    // Special handling for entry 0 (epilogue) - should come last
    if (aNum === 0) return 1;
    if (bNum === 0) return -1;
    
    return aNum - bNum;
  });

  return newEntries;
}

function extractEntryNumber(id: string): number {
  if (id === 'deep-trench-forge') return 0;
  if (id === 'thoth-rider-waite') return 6;
  if (id === 'pillar-spiral-square') return 7;
  if (id === 'entry-eight') return 8;
  
  const match = id.match(/entry-(\d+)/);
  return match && match[1] ? parseInt(match[1]) : 999;
}

// For browser environment (since we can't use fs in browser)
export function createEntriesFromMdContent(mdContents: { [filename: string]: string }): JournalEntry[] {
  const newEntries: JournalEntry[] = [];

  Object.entries(mdContents).forEach(([filename, content]) => {
    if (!content.trim()) {
      console.warn(`Skipping empty content for: ${filename}`);
      return;
    }

    const parsed = parseMdContent(content, filename);
    if (parsed) {
      const journalEntry = convertToJournalEntry(parsed, filename);
      newEntries.push(journalEntry);
    }
  });

  // Sort entries by entry number (0 should be last as epilogue)
  newEntries.sort((a, b) => {
    const aNum = extractEntryNumber(a.id);
    const bNum = extractEntryNumber(b.id);
    
    // Special handling for entry 0 (epilogue) - should come last
    if (aNum === 0) return 1;
    if (bNum === 0) return -1;
    
    return aNum - bNum;
  });

  return newEntries;
}