# Introduction to PEEVEM

## What is PEEVEM?

PEEVEM (Personal Event-Sourced Knowledge Management) is a standardized approach to capturing, storing, and interacting with personal data through event-sourcing principles. It provides a framework for recording all types of personal events - from bookmarking a webpage to attending a concert - in a consistent, future-proof format.

## Core Concepts

### Event Sourcing

Event sourcing is a pattern where all changes to application state are stored as a sequence of events. Instead of storing the current state, an event-sourced system captures every change as an immutable fact. The current state can be derived by replaying these events.

In PEEVEM, your personal data history becomes an append-only log of events that happened in your life or digital interactions.

### NDJSON as Storage Format

PEEVEM uses Newline Delimited JSON (NDJSON) as its primary storage format. Each line in a PEEVEM file represents a single event as a JSON object. This format is:

- Human-readable
- Simple to parse
- Easy to append to
- Compatible with streaming operations
- Processable with standard text tools

### Schema-Driven Design

Every PEEVEM event conforms to a JSON Schema. This ensures:

- Consistent structure across events
- Validation capabilities
- Self-documenting data
- Interoperability between tools

## Basic Event Structure

All PEEVEM events share this common structure:

```json
{
  "date": "2025-07-24T15:30:00Z",
  "uuid": "123e4567-e89b-12d3-a456-426614174000"
}
```

Specific event types extend this with additional properties.

## Use Cases

PEEVEM can be used to record and manage:

- Digital activities (bookmarks, file operations, content creation)
- Personal events (meetings, trips, meals)
- Thoughts and ideas
- Health data
- Financial transactions
- Social interactions
- Professional activities

The key advantage is that all this information exists in a single, consistent format that can be analyzed, searched, and visualized with common tools.

## Next Steps

- Review the [schema documentation](../schemas/README.md)
- Check out [examples](../examples/README.md) of PEEVEM in action
- Learn about [building tools](tooling.md) for PEEVEM
