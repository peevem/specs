# PEEVEM: Personal Event-Sourced Knowledge Management

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Introduction

PEEVEM (Personal Event-Sourced Knowledge Management) is a project that aims to create a standardized way to store personal events through text-based event-sourcing. The goal is to establish a reliable, decade-spanning approach to personal knowledge management that is easy to understand and audit.

## Core Concepts

- **Event-Sourcing**: Store all changes to your personal data as a sequence of immutable events
- **Text-Based**: Use ubiquitous technologies (primarily NDJSON) that will stand the test of time
- **Schema-Driven**: Define clear JSON Schemas for all event types
- **Interoperable**: Link to existing systems rather than replace them
- **Future-Proof**: Design for long-term data viability and migration

## Why PEEVEM?

In our digital lives, our personal information is scattered across numerous applications, platforms, and devices. PEEVEM doesn't aim to replace specialized tools but instead provides a common language and storage format to link everything together:

- Link real-life events with digital artifacts
- Track file movements across systems
- Maintain contact information consistently
- Bookmark webpages with rich context
- Record thoughts, ideas, and activities in a structured way

## Project Structure

- `/schemas/` - JSON Schema definitions for events
  - `core.json` - The base schema all events inherit from
  - `event.json` - Standard event structure
  - `content.json` - Content-focused events
  - (Additional schemas will be added)
- `/examples/` - Example PEEVEM streams and events
- `/docs/` - Documentation on usage and best practices
- `/drafts/` - Working ideas and proposals

## Getting Started

1. Review the schemas to understand the event structure
2. Check out the examples to see PEEVEM in action
3. Contribute your ideas for new event types or improvements

## Roadmap

- [x] Initial schemas definition
- [ ] Complete documentation on event types
- [ ] Tools for validating PEEVEM streams
- [ ] Reference implementations for producers/consumers
- [ ] Community-driven event type registry

## Contributing

PEEVEM is designed to be community-driven. We welcome contributions in several areas:

- New event type schemas
- Documentation improvements
- Tools for working with PEEVEM data
- Use cases and examples

See [CONTRIBUTING.md](CONTRIBUTING.md) for more details.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.