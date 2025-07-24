/**
 * Schema Validation Script
 * 
 * This script validates all JSON Schema files in the schemas/ directory
 * to ensure they are valid according to the JSON Schema specification.
 */

const fs = require('fs');
const path = require('path');
const Ajv = require('ajv');
const addFormats = require('ajv-formats');
const glob = require('glob');
const chalk = require('chalk');

// Initialize Ajv with formats
const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

// Load the meta-schema
const metaSchema = require('../node_modules/ajv/dist/refs/json-schema-draft-2020-12.json');
ajv.addMetaSchema(metaSchema);

// Get all schema files
const schemaFiles = glob.sync('schemas/**/*.json');

let hasErrors = false;

// Validate each schema file against the meta-schema
schemaFiles.forEach(file => {
  try {
    const schema = JSON.parse(fs.readFileSync(file, 'utf8'));
    const valid = ajv.validateSchema(schema);

    if (!valid) {
      console.log(chalk.red(`❌ ${file} is not a valid JSON Schema:`));
      console.log(chalk.red(JSON.stringify(ajv.errors, null, 2)));
      hasErrors = true;
    } else {
      console.log(chalk.green(`✅ ${file} is a valid JSON Schema`));

      // Also check references if this is not the core schema
      if (file !== 'schemas/core.json') {
        validateReferences(file, schema);
      }
    }
  } catch (error) {
    console.log(chalk.red(`❌ Error processing ${file}: ${error.message}`));
    hasErrors = true;
  }
});

// Function to validate references within a schema
function validateReferences(file, schema) {
  // Find all $ref values in the schema
  const refs = findRefs(schema);

  refs.forEach(ref => {
    if (ref.startsWith('#')) {
      // Internal reference - not validating here
      return;
    }

    if (ref.startsWith('https://peevem.org/schemas/')) {
      // Convert URL reference to local file path
      const schemaName = ref.replace('https://peevem.org/schemas/', '');
      const localPath = path.join('schemas', `${schemaName}.json`);

      if (!fs.existsSync(localPath)) {
        console.log(chalk.red(`❌ ${file} references non-existent schema: ${ref}`));
        console.log(chalk.yellow(`   Expected local file: ${localPath}`));
        hasErrors = true;
      }
    } else if (!ref.startsWith('https://json-schema.org/')) {
      // External reference that's not to json-schema.org
      console.log(chalk.yellow(`⚠️ ${file} contains external reference: ${ref}`));
      console.log(chalk.yellow(`   External references may cause validation issues`));
    }
  });
}

// Function to find all $ref values in a schema object
function findRefs(obj, refs = []) {
  if (typeof obj !== 'object' || obj === null) {
    return refs;
  }

  if (obj.$ref && typeof obj.$ref === 'string') {
    refs.push(obj.$ref);
  }

  for (const key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      findRefs(obj[key], refs);
    }
  }

  return refs;
}

// Exit with appropriate code
process.exit(hasErrors ? 1 : 0);
