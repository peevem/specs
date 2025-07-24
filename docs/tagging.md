# Tagging in PEEVEM

## The Tag Event Approach

PEEVEM uses a distinct approach to tagging that aligns with event-sourcing principles: tags are implemented as separate events that reference other events, rather than embedding tags within the events themselves.

## Why Separate Tag Events?

### Immutability and Traceability

- **Preserve Original Events**: Adding or removing tags doesn't require modifying the original event
- **Capture Tag History**: Clearly see when tags were added or removed
- **Support Immutability**: Core events remain unchanged over time, supporting audit trails

### Flexibility

- **Add Tags Anytime**: Tag events retroactively without modifying past events
- **Remove Tags Cleanly**: Mark a tag as removed without deleting data
- **Multiple Taxonomies**: Apply different tagging systems from different sources
- **Tag Namespaces**: Use the namespace property to support different tag categories

### Implementation Benefits

- **Simpler Event Schemas**: No need for tags arrays in every event type
- **Consistent Approach**: Uniform way to handle metadata across all event types
- **Easier Filtering**: Query for specific tags without parsing each event type differently

## Tag Event Schema

The tag event follows this structure:

```json
{
  "date": "2025-07-24T10:15:40Z",
  "uuid": "f47ac10b-58cc-4372-a567-0e02b2c3d480",
  "event": "tag",
  "target": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  "value": "documentation",
  "namespace": "category",
  "removed": false
}
```

Properties:

- `date` and `uuid`: Standard fields from the core schema
- `event`: Always "tag" for tag events
- `target`: UUID of the event being tagged
- `value`: The tag text
- `namespace` (optional): Category or context for the tag
- `removed` (optional, default false): Whether this tag is being removed

## Working with Tags

### Adding Tags

To tag an event, create a tag event that references the target event's UUID:

```json
// Original event
{"date":"2025-07-24T09:15:00Z","uuid":"550e8400-e29b-41d4-a716-446655440001","event":"read_article","title":"Introduction to Event Sourcing","url":"https://example.com/event-sourcing-intro"}

// Adding tags
{"date":"2025-07-24T09:15:10Z","uuid":"550e8400-e29b-41d4-a716-446655440101","event":"tag","target":"550e8400-e29b-41d4-a716-446655440001","value":"programming"}
{"date":"2025-07-24T09:15:11Z","uuid":"550e8400-e29b-41d4-a716-446655440102","event":"tag","target":"550e8400-e29b-41d4-a716-446655440001","value":"architecture"}
```

### Removing Tags

To remove a tag, create a new tag event with `removed: true`:

```json
// Removing a tag
{"date":"2025-07-25T14:30:00Z","uuid":"550e8400-e29b-41d4-a716-446655440201","event":"tag","target":"550e8400-e29b-41d4-a716-446655440001","value":"programming","removed":true}
```

### Using Namespaces

Namespaces can be used to organize tags into categories:

```json
// Using namespaces
{"date":"2025-07-24T09:15:20Z","uuid":"550e8400-e29b-41d4-a716-446655440103","event":"tag","target":"550e8400-e29b-41d4-a716-446655440001","value":"must-read","namespace":"priority"}
{"date":"2025-07-24T09:15:21Z","uuid":"550e8400-e29b-41d4-a716-446655440104","event":"tag","target":"550e8400-e29b-41d4-a716-446655440001","value":"5","namespace":"rating"}
```

## Processing Tags

When processing PEEVEM streams, applications should:

1. Identify all tag events in the stream
2. Build tag associations by matching the target UUIDs
3. Handle removed tags appropriately (filtering them out)
4. Group tags by namespace if needed

This approach allows for rich metadata while maintaining the integrity of the event-sourcing model.

## Beyond Tags: Other Relationship Events

The same pattern used for tags can be extended to other types of relationships between events:

- **Links**: Connect related events
- **Categories**: Group events into hierarchical structures
- **Ratings**: Apply numeric ratings to events
- **Annotations**: Add commentary to events

Each of these can be implemented as separate relationship events following the same pattern as tag events.
