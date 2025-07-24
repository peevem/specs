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

### Metadata Operations

[`metadata-operations.ndjson`](metadata-operations.ndjson) provides a comprehensive example of working with all types of metadata events, including tags, status changes, notes, ratings, and priorities.

## Using the Examples

These examples are provided to help you understand the structure and possibilities of PEEVEM. You can:

1. Use them as templates for your own events
2. Load them into PEEVEM-compatible tools for testing
3. Study them to understand the event patterns

### Understanding Metadata Events

In the examples, you'll notice that metadata like tags, status, notes, ratings, and priorities are implemented as separate events rather than embedded within the original events. This approach offers several advantages:

- **Immutability**: Original events remain unchanged when metadata is added, modified, or removed
- **History**: All metadata changes are preserved in the event stream with timestamps
- **Consistency**: The same approach works uniformly across all event types
- **Flexibility**: Multiple metadata taxonomies can be applied in parallel

Types of metadata events include:

- **Tag events**: For categorization and labeling
- **Status events**: For tracking states like archived, deleted, read, completed
- **Note events**: For attaching textual notes and comments
- **Rating events**: For numeric or sentiment-based ratings
- **Priority events**: For assigning importance levels

See the [metadata events documentation](../docs/metadata-events.md) for more details on this approach.

## Contributing Examples

We welcome contributions of additional examples that demonstrate innovative uses of PEEVEM. Please see the [contributing guidelines](../CONTRIBUTING.md) for information on how to submit new examples.
