const fs = require('fs');
const path = require('path');

const DATA_DIR = path.resolve(__dirname, '../src/data');
const OUT_FILE = path.join(DATA_DIR, 'dataMap.ts');

let mapEntries = [];

fs.readdirSync(DATA_DIR).forEach((framework) => {
  const frameworkPath = path.join(DATA_DIR, framework);
  if (!fs.statSync(frameworkPath).isDirectory()) return;

  const questionsPath = path.join(frameworkPath, 'questions');
  if (!fs.existsSync(questionsPath)) return;

  fs.readdirSync(questionsPath).forEach((file) => {
    if (!file.endsWith('.json')) return;

    const id = file.replace('.json', '');

    // імʼя без крапок
    const varName = `require('./${framework}/questions/${file}') `;

    mapEntries.push(`'${framework}/${id}': ${varName}`);
  });
});

const content = `
export const dataMap = {
  ${mapEntries.join(',\n  ')}
} as const;
`;

fs.writeFileSync(OUT_FILE, content.trim());
console.log('✅ dataMap.ts generated');
