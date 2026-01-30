const fs = require('fs');
const path = require('path');

const DATA_DIR = path.resolve(__dirname, 'src/data');
const folders = ['js', 'react', 'reactNative', 'vue'];

const allIds = new Set();
const errors = [];

function validateFile(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        const data = JSON.parse(content);

        if (!data.default || !Array.isArray(data.default)) {
            errors.push(`${filePath}: Missing 'default' array`);
            return;
        }

        data.default.forEach((q, index) => {
            const qPath = `${filePath} [item ${index}]`;

            // Check required fields
            ['id', 'stageId', 'type', 'prompt', 'options', 'correct', 'explanation', 'interviewTip'].forEach(field => {
                if (!q[field]) {
                    errors.push(`${qPath}: Missing field '${field}'`);
                }
            });

            // Check ID uniqueness
            if (q.id) {
                if (allIds.has(q.id)) {
                    errors.push(`${qPath}: Duplicate ID '${q.id}'`);
                }
                allIds.add(q.id);
            }

            // Check options and correct
            if (q.options && Array.isArray(q.options)) {
                if (q.correct && Array.isArray(q.correct)) {
                    q.correct.forEach(idx => {
                        if (idx < 0 || idx >= q.options.length) {
                            errors.push(`${qPath}: Invalid correct index ${idx} for ${q.options.length} options`);
                        }
                    });

                    if (q.type === 'single' && q.correct.length !== 1) {
                        errors.push(`${qPath}: Type 'single' but has ${q.correct.length} correct answers`);
                    }
                    if (q.type === 'multiple' && q.correct.length <= 1) {
                        // Not necessarily an error, but usually multiple means > 1. 
                        // We'll skip for now or make it a warning.
                    }
                }
            }
        });

    } catch (e) {
        errors.push(`${filePath}: Invalid JSON or read error: ${e.message}`);
    }
}

function traverse(dir) {
    const items = fs.readdirSync(dir);
    items.forEach(item => {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            traverse(fullPath);
        } else if (item.endsWith('.json') && !item.includes('stages')) {
            validateFile(fullPath);
        }
    });
}

folders.forEach(folder => {
    const questionsDir = path.join(DATA_DIR, folder, 'questions');
    if (fs.existsSync(questionsDir)) {
        traverse(questionsDir);
    }
});

if (errors.length > 0) {
    console.log('Validation failed:');
    errors.forEach(err => console.error(err));
    process.exit(1);
} else {
    console.log('All files are valid!');
}
