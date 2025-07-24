#!/usr/bin/env node

/**
 * PEEVEM Event Validator
 * 
 * Simple validator for PEEVEM events against JSON Schema
 */

const fs = require('fs');
const path = require('path');
const Ajv = require('ajv');
const addFormats = require('ajv-formats');
const readline = require('readline');

// Initialize validator
const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

// Load schemas
function loadSchemas(schemasDir) {
  const schemas = {};
  const files = fs.readdirSync(schemasDir);

  for (const file of files) {
    if (file.endsWith('.json')) {
      const schemaPath = path.join(schemasDir, file);
      const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
      schemas[schema.$id || file] = schema;
      ajv.addSchema(schema);
    }
  }

  return schemas;
}

// Validate a single event
function validateEvent(event, schemas) {
  // Determine which schema to use based on event type
  const eventType = event.event;
  let schemaId = null;

  // Try to find a schema that matches the event type
  for (const id in schemas) {
    if (id.includes(eventType)) {
      schemaId = id;
      break;
    }
  }

  if (!schemaId) {
    // Fall back to core schema
    schemaId = 'https://peevem.org/schemas/event';
  }

  const validate = ajv.getSchema(schemaId);

  if (!validate) {
    return {
      valid: false,
      errors: [`Schema not found for event type: ${eventType}`]
    };
  }

  const valid = validate(event);

  return {
    valid,
    errors: validate.errors || []
  };
}

// Validate an NDJSON file of events
async function validateFile(filePath, schemas) {
  const fileStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let lineNumber = 0;
  let validCount = 0;
  let invalidCount = 0;
  const errors = [];

  for await (const line of rl) {
    lineNumber++;

    if (!line.trim()) continue;

    try {
      const event = JSON.parse(line);
      const result = validateEvent(event, schemas);

      if (result.valid) {
        validCount++;
      } else {
        invalidCount++;
        errors.push({
          line: lineNumber,
          event,
          errors: result.errors
        });
      }
    } catch (error) {
      invalidCount++;
      errors.push({
        line: lineNumber,
        error: `Invalid JSON: ${error.message}`
      });
    }
  }

  return {
    filePath,
    totalEvents: validCount + invalidCount,
    validCount,
    invalidCount,
    errors
  };
}

// Main function
async function main() {
  const args = process.argv.slice(2);

  if (args.length < 2) {
    console.error('Usage: validate.js <schemas-directory> <events-file>');
    process.exit(1);
  }

  const schemasDir = args[0];
  const eventsFile = args[1];

  try {
    const schemas = loadSchemas(schemasDir);
    console.log(`Loaded ${Object.keys(schemas).length} schemas`);

    const result = await validateFile(eventsFile, schemas);

    console.log('\nValidation Summary:');
    console.log(`File: ${result.filePath}`);
    console.log(`Total Events: ${result.totalEvents}`);
    console.log(`Valid Events: ${result.validCount}`);
    console.log(`Invalid Events: ${result.invalidCount}`);

    if (result.invalidCount > 0) {
      console.log('\nErrors:');
      result.errors.forEach(error => {
        console.log(`\nLine ${error.line}:`);
        if (error.event) {
          console.log(`Event: ${JSON.stringify(error.event, null, 2)}`);
          console.log('Validation errors:');
          console.log(JSON.stringify(error.errors, null, 2));
        } else {
          console.log(error.error);
        }
      });
      process.exit(1);
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

main();
