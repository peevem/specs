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

## Relationship and Metadata Events

PEEVEM implements relationships and metadata as separate events rather than embedding them within original events. This approach keeps original events clean and immutable while allowing flexible metadata management.

### Tag Event

[`tag.json`](tag.json) defines a schema for tagging other events:

- `event`: Always "tag" for this event type
- `target`: UUID of the event being tagged
- `value`: The tag value being applied
- `namespace`: Optional namespace for the tag
- `removed`: Boolean indicating if the tag is being removed

### Status Event

[`status.json`](status.json) tracks status changes for other events:

- `event`: Always "status" for this event type
- `target`: UUID of the event whose status is changing
- `type`: The type of status (e.g., "archived", "deleted", "completed")
- `value`: Boolean indicating whether to apply or remove the status
- `reason`: Optional explanation for the status change

### Note Event

[`note.json`](note.json) attaches notes to other events:

- `event`: Always "note" for this event type
- `target`: UUID of the event this note relates to
- `content`: The text content of the note
- `type`: Optional categorization of the note
- `replaces`: Optional UUID of a previous note this one replaces

### Rating Event

[`rating.json`](rating.json) assigns ratings to other events:

- `event`: Always "rating" for this event type
- `target`: UUID of the event being rated
- `value`: The rating value (numeric or sentiment)
- `scale`: Optional indication of the rating scale
- `aspect`: Optional specific aspect being rated

### Priority Event

[`priority.json`](priority.json) assigns priorities to other events:

- `event`: Always "priority" for this event type
- `target`: UUID of the event being prioritized
- `value`: The priority value (named level or number)
- `system`: Optional indication of the priority system
- `context`: Optional context for this priority

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
