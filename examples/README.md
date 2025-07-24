# PEEVEM Examples

This directory contains examples of PEEVEM events and streams to help you understand how to use the system in practice.

## Example Files

### Basic PEEVEM Stream

[`basic-stream.ndjson`](basic-stream.ndjson) shows a simple sequence of personal events using the core PEEVEM format.

### Digital Activity Stream

[`digital-activity.ndjson`](digital-activity.ndjson) demonstrates recording browsing history, file operations, and other digital activities.

### Life Events Stream

[`life-events.ndjson`](life-events.ndjson) shows how to record significant personal events, meetings, and activities.

### Tag Operations

[`tag-operations.ndjson`](tag-operations.ndjson) demonstrates how to use separate tag events for classification, including adding, namespacing, and removing tags.

## Using the Examples

These examples are provided to help you understand the structure and possibilities of PEEVEM. You can:

1. Use them as templates for your own events
2. Load them into PEEVEM-compatible tools for testing
3. Study them to understand the event patterns

### Understanding Tag Events

In the examples, you'll notice that tags are implemented as separate events rather than embedded within the original events. This approach offers several advantages:

- Original events remain unchanged when tags are added or removed
- Tag history is preserved in the event stream
- The same tagging approach works consistently across all event types
- Multiple tagging taxonomies can be applied using namespaces

See the [tagging documentation](../docs/tagging.md) for more details on this approach.

## Contributing Examples

We welcome contributions of additional examples that demonstrate innovative uses of PEEVEM. Please see the [contributing guidelines](../CONTRIBUTING.md) for information on how to submit new examples.
