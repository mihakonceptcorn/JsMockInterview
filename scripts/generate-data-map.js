const fs = require('fs');
const path = require('path');

const DATA_DIR = path.resolve(__dirname, '../src/data');
const OUT_FILE = path.join(DATA_DIR, 'dataMap.ts');

const mapEntries = [];

const frameworks = fs.readdirSync(DATA_DIR).filter((name) => {
  const fullPath = path.join(DATA_DIR, name);
  return fs.statSync(fullPath).isDirectory();
});

for (const framework of frameworks.sort()) {
  const questionsPath = path.join(DATA_DIR, framework, 'questions');
  if (!fs.existsSync(questionsPath)) continue;

  const files = fs.readdirSync(questionsPath).filter((f) => f.endsWith('.json'));

  for (const file of files.sort()) {
    const id = file.replace('.json', '');
    mapEntries.push(`'${framework}/${id}': require('./${framework}/questions/${file}')`);
  }
}

mapEntries.sort();

const content = `export const dataMap = {
  ${mapEntries.join(',\n  ')}
} as const;
`;

fs.writeFileSync(OUT_FILE, content);
console.log('✅ dataMap.ts generated');
