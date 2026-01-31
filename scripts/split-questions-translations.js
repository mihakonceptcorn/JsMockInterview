const fs = require('fs');
const path = require('path');

const DATA_DIR = path.resolve(__dirname, '../src/data');
const LOCALES_DIR = path.resolve(__dirname, '../src/assets/locales');

/**
 * Builds a map: questionId -> { framework, topic }
 * by scanning all data/{framework}/questions/{topic}.json files.
 */
function buildQuestionIdToTopicMap() {
  const idToTopic = {};

  const frameworks = fs.readdirSync(DATA_DIR).filter((name) => {
    const fullPath = path.join(DATA_DIR, name);
    return fs.statSync(fullPath).isDirectory() && !name.startsWith('.');
  });

  for (const framework of frameworks) {
    const questionsPath = path.join(DATA_DIR, framework, 'questions');
    if (!fs.existsSync(questionsPath)) continue;

    const files = fs.readdirSync(questionsPath).filter((f) => f.endsWith('.json'));

    for (const file of files) {
      const topic = file.replace('.json', '');
      const filePath = path.join(questionsPath, file);
      const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      const questions = content.default || content;
      if (!Array.isArray(questions)) continue;

      for (const q of questions) {
        if (q.id) {
          idToTopic[q.id] = { framework, topic };
        }
      }
    }
  }

  return idToTopic;
}

/**
 * Splits a single questions.json into per-framework, per-topic files.
 * @param {string} locale - e.g. 'en', 'uk', 'es'
 */
function splitQuestionsForLocale(locale) {
  const questionsPath = path.join(LOCALES_DIR, locale, 'questions.json');
  if (!fs.existsSync(questionsPath)) {
    console.warn(`⚠️ No questions.json for locale: ${locale}`);
    return;
  }

  const idToTopic = buildQuestionIdToTopicMap();
  const allQuestions = JSON.parse(fs.readFileSync(questionsPath, 'utf8'));

  const groups = {}; // key: `${framework}/${topic}` -> { questionId: { prompt, explanation, interviewTip } }

  for (const [questionId, value] of Object.entries(allQuestions)) {
    const meta = idToTopic[questionId];
    if (!meta) {
      console.warn(`No data topic for question id: ${questionId}`);
      continue;
    }
    const key = `${meta.framework}/${meta.topic}`;
    if (!groups[key]) groups[key] = {};
    groups[key][questionId] = value;
  }

  const questionsDir = path.join(LOCALES_DIR, locale, 'questions');
  if (!fs.existsSync(questionsDir)) {
    fs.mkdirSync(questionsDir, { recursive: true });
  }

  for (const [key, entries] of Object.entries(groups)) {
    const [framework, topic] = key.split('/');
    const frameworkDir = path.join(questionsDir, framework);
    if (!fs.existsSync(frameworkDir)) {
      fs.mkdirSync(frameworkDir, { recursive: true });
    }
    const outPath = path.join(frameworkDir, `${topic}.json`);
    fs.writeFileSync(outPath, JSON.stringify(entries, null, 2) + '\n', 'utf8');
  }

  console.log(`✅ Split questions for locale: ${locale} into questions/${locale}/**/*.json`);
}

const locales = process.argv.slice(2).length ? process.argv.slice(2) : ['en', 'uk', 'es'];

for (const locale of locales) {
  splitQuestionsForLocale(locale);
}
