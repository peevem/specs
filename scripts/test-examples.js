/**
 * Example Validation Script
 * 
 * This script validates all example NDJSON files against their respective schemas
 * to ensure they conform to the PEEVEM specification.
 */

const fs = require('fs');
const path = require('path');
const Ajv = require('ajv');
const addFormats = require('ajv-formats');
const glob = require('glob');
const chalk = require('chalk');

// Initialize Ajv
const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

// Get all schema files
const schemaFiles = glob.sync('schemas/**/*.json');

// Load all schemas
schemaFiles.forEach(file => {
  try {
    const schema = JSON.parse(fs.readFileSync(file, 'utf8'));
    if (schema.$id) {
      ajv.addSchema(schema, schema.$id);
    }
  } catch (error) {
    console.log(chalk.red(`❌ Error loading schema ${file}: ${error.message}`));
  }
});

// Get all example files
const exampleFiles = glob.sync('examples/**/*.ndjson');

let hasErrors = false;

// Validate each example file
exampleFiles.forEach(file => {
  console.log(chalk.blue(`Testing ${file}...`));

  try {
    const content = fs.readFileSync(file, 'utf8');
    const events = content
      .split('\n')
      .filter(line => line.trim())
      .map((line, index) => {
        try {
          return JSON.parse(line);
        } catch (e) {
          console.log(chalk.red(`❌ Line ${index + 1} is not valid JSON: ${e.message}`));
          hasErrors = true;
          return null;
        }
      })
      .filter(event => event !== null);

    // Validate each event against core schema
    events.forEach((event, index) => {
      const lineNumber = index + 1;

      // First validate against core schema
      const validCore = ajv.validate('https://peevem.org/schemas/core', event);
      if (!validCore) {
        console.log(chalk.red(`❌ Line ${lineNumber} fails core schema validation:`));
        console.log(chalk.red(JSON.stringify(ajv.errors, null, 2)));
        hasErrors = true;
        return;
      }

      // Try to determine the appropriate schema based on event properties
      let schemaId = determineSchema(event);

      if (schemaId) {
        const valid = ajv.validate(schemaId, event);
        if (!valid) {
          console.log(chalk.red(`❌ Line ${lineNumber} fails ${schemaId} validation:`));
          console.log(chalk.red(JSON.stringify(ajv.errors, null, 2)));
          hasErrors = true;
        } else {
          console.log(chalk.green(`✅ Line ${lineNumber} is a valid ${schemaId.split('/').pop()} event`));
        }
      } else {
        console.log(chalk.yellow(`⚠️ Line ${lineNumber} has no specific schema validation (only core validated)`));
      }
    });

  } catch (error) {
    console.log(chalk.red(`❌ Error processing ${file}: ${error.message}`));
    hasErrors = true;
  }
});

// Function to determine which schema to use for an event
function determineSchema(event) {
  // This is a simple heuristic - extend as needed
  if (event.event === 'bookmark') {
    return 'https://peevem.org/schemas/bookmark';
  }

  if (event.event === 'contact_created' || event.event === 'contact_updated') {
    return 'https://peevem.org/schemas/contact';
  }

  // If we have an event property, use the generic event schema
  if (event.event) {
    return 'https://peevem.org/schemas/event';
  }

  return null;
}

// Exit with appropriate code
process.exit(hasErrors ? 1 : 0);
