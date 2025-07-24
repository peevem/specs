# PEEVEM Schemas

This directory contains the JSON Schema definitions that form the foundation of PEEVEM. These schemas define the structure and validation rules for different types of events.

## Core Schema

[`core.json`](core.json) defines the base properties that all PEEVEM events must include:

- `date`: When the event occurred (ISO 8601 format)
- `uuid`: A unique identifier for the event

## Event Types

### Basic Event

[`event.json`](event.json) extends the core schema with properties for basic events:

- `event`: The action or verb describing what happened
- `subject`: Optional reference to what the event relates to

### Content Event

[`content.json`](content.json) extends the core schema for events that involve content creation or consumption.

## Schema Versioning

Schemas in PEEVEM are versioned using semantic versioning principles:

- **Major versions**: Incompatible changes that require consumers to be updated
- **Minor versions**: Backward-compatible additions
- **Patch versions**: Backward-compatible fixes

Versioning is managed through the schema `$id` URL pattern.

## Extending Schemas

Community members can propose new schemas or extensions to existing ones. See the [contributing guidelines](../CONTRIBUTING.md) for more information on how to propose new schemas.

## Custom Extensions

Applications can extend these schemas with their own properties. The core and event schemas allow for additional properties, enabling customization while maintaining compatibility with the PEEVEM ecosystem.
