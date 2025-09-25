import type { JournalEntry } from '../data/witnessJournalEntries';

interface ParsedMdEntry {
  title: string;
  content: string;
  entryNumber: number;
}

export function parseMdContent(mdContent: string, filename: string): ParsedMdEntry | null {
  if (!mdContent.trim()) {
    return null;
  }

  const lines = mdContent.split('\n');
  
  // Extract entry number from filename (e.g., "entrysix.md" -> 6)
  const entryMatch = filename.match(/entry(\w+)\.md/);
  let entryNumber = 0;
  
  if (entryMatch && entryMatch[1]) {
    const numberWord = entryMatch[1];
    const numberMap: { [key: string]: number } = {
      'zero': 0,
      'one': 1,
      'two': 2,
      'three': 3,
      'four': 4,
      'five': 5,
      'six': 6,
      'seven': 7,
      'eight': 8,
      'nine': 9,
      'ten': 10
    };
    entryNumber = numberMap[numberWord] ?? (parseInt(numberWord) || 0);
  }

  // Find the title line (usually starts with "FIELD JOURNEY JOURNAL" or contains "Entry")
  let title = `Entry ${entryNumber}`;
  let contentStartIndex = 0;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]?.trim() || '';
    if (line.includes('ENTRY') && line.includes(entryNumber.toString())) {
      title = line.replace('FIELD JOURNEY JOURNAL — ', '');
      contentStartIndex = i + 1;
      break;
    } else if (line.startsWith('Entry') && line.includes(entryNumber.toString())) {
      title = line;
      contentStartIndex = i + 1;
      break;
    }
  }

  // Extract content (skip the witness statement and title)
  const contentLines = lines.slice(contentStartIndex).filter(line => {
    const trimmed = line.trim();
    return trimmed !== '' && 
           !trimmed.startsWith('I witness with precision and compassion') &&
           !trimmed.startsWith('FIELD JOURNEY JOURNAL');
  });

  const content = contentLines.join('\n').trim();

  return {
    title,
    content,
    entryNumber
  };
}

export function convertToJournalEntry(parsed: ParsedMdEntry, filename: string): JournalEntry {
  const { title, content, entryNumber } = parsed;
  
  // Generate ID based on entry number and content
  const id = entryNumber === 0 ? 'deep-trench-forge' : 
             entryNumber === 6 ? 'thoth-rider-waite' :
             entryNumber === 7 ? 'pillar-spiral-square' :
             entryNumber === 8 ? 'entry-eight' :
             `entry-${entryNumber}`;

  // Extract symbols based on content themes
  const symbol = entryNumber === 0 ? '⚔️' :
                 entryNumber === 6 ? '🏍️' :
                 entryNumber === 7 ? '🏛️' :
                 entryNumber === 8 ? '🌟' :
                 '📖';

  // Extract tarot references from content
  const tarotMatches = content.match(/(The \w+|Seven of \w+|Knight of \w+|Three of \w+|Two of \w+|\w+ of \w+)/g) || [];
  const tarot = tarotMatches.slice(0, 3).join(' → ') || 'The Fool';

  // Extract numerology/gene key references
  const numerologyMatches = content.match(/(Gene Key \d+|GK-\d+|Gate-\d+|\d+ → \d+|Jachin.*?Boaz)/g) || [];
  const numerology = numerologyMatches[0] || 'Path of Integration';

  // Extract secrets (key terms and concepts)
  const secrets = extractSecrets(content);

  // Generate interactions based on content themes
  const interactions = generateInteractions(content, entryNumber);

  return {
    id,
    title,
    symbol,
    tarot,
    numerology,
    content,
    secrets,
    interactions
  };
}

function extractSecrets(content: string): string[] {
  const secrets: string[] = [];
  
  // Common patterns to extract as secrets
  const patterns = [
    /Thoth'?s? Fool/g,
    /Rider[–-]Waite'?s? Fool/g,
    /The Chariot/g,
    /The Star/g,
    /The Hermit/g,
    /Jachin/g,
    /Boaz/g,
    /WitnessOS/g,
    /Gene Key \d+/g,
    /GK-\d+/g,
    /Gate-\d+/g,
    /vector/g,
    /pillar/g,
    /unalome/g,
    /yantra/g,
    /Kala/g,
    /Kali/g,
    /endogenous/g,
    /skin-lift/g,
    /deep trench/g,
    /steel time/g,
    /true blades/g,
    /7.*?1.*?3/g,
    /one statement.*?one ask/g
  ];

  patterns.forEach(pattern => {
    const matches = content.match(pattern);
    if (matches) {
      matches.forEach(match => {
        if (!secrets.includes(match)) {
          secrets.push(match);
        }
      });
    }
  });

  // Limit to most relevant secrets
  return secrets.slice(0, 12);
}

function generateInteractions(content: string, entryNumber: number): string[] {
  const interactions: string[] = [];
  
  if (content.includes('breath') || content.includes('7') || content.includes('1') || content.includes('3')) {
    interactions.push('breath-protocol');
  }
  
  if (content.includes('tarot') || content.includes('Chariot') || content.includes('Star')) {
    interactions.push('tarot-activation');
  }
  
  if (content.includes('pillar') || content.includes('Jachin') || content.includes('Boaz')) {
    interactions.push('pillar-naming');
  }
  
  if (content.includes('vector') || content.includes('lane')) {
    interactions.push('vector-alignment');
  }
  
  if (content.includes('yantra') || content.includes('square')) {
    interactions.push('yantra-console');
  }
  
  if (content.includes('forge') || content.includes('steel') || content.includes('blade')) {
    interactions.push('blade-forging');
  }

  if (entryNumber === 0) {
    interactions.push('deep-forge', 'blade-tempering');
  } else if (entryNumber === 6) {
    interactions.push('thoth-initiation', 'rider-waite-invitation');
  } else if (entryNumber === 7) {
    interactions.push('yantra-encoding', 'inner-sun');
  }

  return interactions.length > 0 ? interactions : ['witness-protocol'];
}