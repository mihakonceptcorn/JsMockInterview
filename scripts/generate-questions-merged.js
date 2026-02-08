const fs = require('fs');
const path = require('path');

const LOCALES_DIR = path.resolve(__dirname, '../src/assets/locales');
const LOCALES = ['en', 'uk', 'es'];

/**
 * Generates a TypeScript file that imports all questions/{framework}/{topic}.json
 * and exports a single merged object for i18n.
 */
function generateMergedForLocale(locale) {
  const questionsDir = path.join(LOCALES_DIR, locale, 'questions');
  if (!fs.existsSync(questionsDir)) {
    console.warn(`⚠️ No questions dir for locale: ${locale}`);
    return;
  }

  const imports = [];
  const spreadKeys = [];
  let varIndex = 0;

  const frameworks = fs.readdirSync(questionsDir).filter((name) => {
    const fullPath = path.join(questionsDir, name);
    return fs.statSync(fullPath).isDirectory();
  });

  for (const framework of frameworks.sort()) {
    const frameworkPath = path.join(questionsDir, framework);
    const files = fs.readdirSync(frameworkPath).filter((f) => f.endsWith('.json'));

    for (const file of files.sort()) {
      const topic = file.replace('.json', '');
      const varName = `q${varIndex++}`;
      const relativePath = `./questions/${framework}/${topic}.json`;
      imports.push(`import ${varName} from '${relativePath}';`);
      spreadKeys.push(varName);
    }
  }

  const content = `// Auto-generated. Do not edit. Run: node scripts/generate-questions-merged.js
${imports.join('\n')}

export default {
  ...${spreadKeys.join(',\n  ...')},
};
`;

  const outPath = path.join(LOCALES_DIR, locale, 'questions-merged.ts');
  fs.writeFileSync(outPath, content, 'utf8');
  console.log(`✅ Generated ${locale}/questions-merged.ts`);
}

for (const locale of LOCALES) {
  generateMergedForLocale(locale);
}
