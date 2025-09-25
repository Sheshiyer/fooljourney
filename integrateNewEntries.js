const fs = require('fs');
const path = require('path');

// Read the markdown files
const mdFiles = [
  { filename: 'entrysix.md', entryNumber: 6 },
  { filename: 'entryseven.md', entryNumber: 7 },
  { filename: 'entryeight.md', entryNumber: 8 },
  { filename: 'entryzero.md', entryNumber: 0 }
];

function parseMdContent(mdContent, filename, entryNumber) {
  if (!mdContent.trim()) {
    return null;
  }

  const lines = mdContent.split('\n');
  
  // Find the title line
  let title = `Entry ${entryNumber}`;
  let contentStartIndex = 0;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.includes('Entry') && line.includes(entryNumber.toString())) {
      title = line;
      contentStartIndex = i + 1;
      break;
    } else if (line.includes('FIELD JOURNEY JOURNAL')) {
      // Skip this line and look for the actual entry title
      continue;
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

function convertToJournalEntry(parsed, filename) {
  const { title, content, entryNumber } = parsed;
  
  // Generate ID based on entry number and content
  const id = entryNumber === 0 ? 'deep-trench-forge' : 
             entryNumber === 6 ? 'thoth-rider-waite-full' :
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
  const tarot = entryNumber === 0 ? 'Two of Swords → The Chariot' :
                entryNumber === 6 ? 'The Chariot → The Star → The Hermit' :
                entryNumber === 7 ? 'The Star → Inner Sun' :
                'The Fool';

  // Extract numerology/gene key references
  const numerology = entryNumber === 0 ? 'Gate-52 → Steel Time' :
                     entryNumber === 6 ? 'Gate-52, GK-23, GK-5' :
                     entryNumber === 7 ? 'Jachin & Boaz: Pillar Spiral Square' :
                     'Path of Integration';

  // Extract secrets (key terms and concepts)
  const secrets = extractSecrets(content, entryNumber);

  // Generate interactions based on content themes
  const interactions = generateInteractions(content, entryNumber);

  return {
    id,
    title,
    symbol,
    tarot,
    numerology,
    content: `${content}`,
    secrets,
    interactions
  };
}

function extractSecrets(content, entryNumber) {
  const secrets = [];
  
  if (entryNumber === 0) {
    return ['Two of Swords', 'deep trench', 'steel time', 'true blades', 'WitnessOS', '7/1/3', 'Gate-52', 'sacral yes/no', 'Shenzhen forge', 'endogenous', 'Ichigo', 'royal forge'];
  } else if (entryNumber === 6) {
    return ['Thoth\'s Fool', 'Rider–Waite\'s Fool', 'The Chariot', 'Jachin', 'Boaz', 'vector', 'WitnessOS', 'skin-lift', 'Kala', 'Kali', 'The Star', 'Hermit\'s lamp', 'endogenous', 'Gate-52', 'GK-23', 'GK-5'];
  } else if (entryNumber === 7) {
    return ['pillar', 'spiral', 'square', 'Jachin', 'Boaz', 'unalome', 'lek yant', 'yantra', 'The Star', 'inner sun', 'coherence', 'precision', 'compassion'];
  } else if (entryNumber === 8) {
    return ['entry-eight'];
  }
  
  return ['witness-protocol'];
}

function generateInteractions(content, entryNumber) {
  if (entryNumber === 0) {
    return ['deep-forge', 'blade-tempering', 'breath-protocol', 'sacral-tuning'];
  } else if (entryNumber === 6) {
    return ['thoth-initiation', 'rider-waite-invitation', 'chariot-vector', 'pillar-naming', 'kala-guidance'];
  } else if (entryNumber === 7) {
    return ['pillar-naming', 'spiral-encoding', 'yantra-console', 'inner-sun'];
  } else if (entryNumber === 8) {
    return ['witness-protocol'];
  }
  
  return ['witness-protocol'];
}

// Process the markdown files
const newEntries = [];

for (const { filename, entryNumber } of mdFiles) {
  try {
    const filePath = path.join(__dirname, filename);
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Skip empty files
    if (!content.trim()) {
      console.warn(`Skipping empty file: ${filename}`);
      continue;
    }

    const parsed = parseMdContent(content, filename, entryNumber);
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
  const aNum = a.id === 'deep-trench-forge' ? 0 : 
               a.id === 'thoth-rider-waite-full' ? 6 :
               a.id === 'pillar-spiral-square' ? 7 :
               a.id === 'entry-eight' ? 8 : 999;
  const bNum = b.id === 'deep-trench-forge' ? 0 : 
               b.id === 'thoth-rider-waite-full' ? 6 :
               b.id === 'pillar-spiral-square' ? 7 :
               b.id === 'entry-eight' ? 8 : 999;
  
  // Special handling for entry 0 (epilogue) - should come last
  if (aNum === 0) return 1;
  if (bNum === 0) return -1;
  
  return aNum - bNum;
});

console.log('Generated entries:');
newEntries.forEach(entry => {
  console.log(`- ${entry.id}: ${entry.title}`);
});

// Generate the TypeScript code for the new entries
const entriesCode = newEntries.map(entry => {
  return `  {
    id: '${entry.id}',
    title: '${entry.title}',
    symbol: '${entry.symbol}',
    tarot: '${entry.tarot}',
    numerology: '${entry.numerology}',
    content: \`${entry.content.replace(/`/g, '\\`')}\`,
    secrets: [${entry.secrets.map(s => `'${s.replace(/'/g, "\\'")}'`).join(', ')}],
    interactions: [${entry.interactions.map(i => `'${i}'`).join(', ')}]
  }`;
}).join(',\n');

console.log('\nGenerated TypeScript entries:');
console.log(entriesCode);

// Write to a temporary file for manual integration
fs.writeFileSync('newEntries.ts', `// New entries to integrate into witnessJournalEntries.ts
// Add these entries to the witnessJournalEntries array

${entriesCode}
`);

console.log('\nEntries written to newEntries.ts for manual integration.');