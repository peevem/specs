# Metadata Events in PEEVEM

## Event-Sourced Metadata Approach

PEEVEM uses separate events to represent metadata and relationships rather than embedding this information within the original events. This document explains this approach and its benefits.

## Core Principles

1. **Event Immutability**: Original events remain unchanged when metadata is added, modified, or removed
2. **Temporal Tracking**: All metadata changes are timestamped events in the stream
3. **Uniform Implementation**: Consistent approach to all types of metadata
4. **Flexible Evolution**: Metadata can evolve without changing core event schemas

## Types of Metadata Events

### Tag Events

Tag events associate labels or categories with other events:

```json
{
  "date": "2025-07-24T09:15:10Z",
  "uuid": "550e8400-e29b-41d4-a716-446655440101",
  "event": "tag",
  "target": "550e8400-e29b-41d4-a716-446655440001",
  "value": "programming"
}
```

### Status Events

Status events track changes in state for other events:

```json
{
  "date": "2025-07-25T16:20:00Z",
  "uuid": "550e8400-e29b-41d4-a716-446655440203",
  "event": "status",
  "target": "550e8400-e29b-41d4-a716-446655440001",
  "type": "archived",
  "value": true,
  "reason": "Information is now outdated"
}
```

Common status types include:
- `archived`: Event is archived but still available
- `deleted`: Event is marked for deletion or removed from active use
- `completed`: Task or activity has been completed
- `read`/`unread`: Content has been read or is unread
- `starred`/`flagged`: Event has been marked as important

### Note Events

Note events attach textual notes to other events:

```json
{
  "date": "2025-07-24T09:15:30Z",
  "uuid": "550e8400-e29b-41d4-a716-446655440301",
  "event": "note",
  "target": "550e8400-e29b-41d4-a716-446655440001",
  "content": "Excellent introduction to event sourcing concepts."
}
```

### Rating Events

Rating events record numeric or sentiment-based ratings:

```json
{
  "date": "2025-07-24T20:10:00Z",
  "uuid": "550e8400-e29b-41d4-a716-446655440501",
  "event": "rating",
  "target": "550e8400-e29b-41d4-a716-446655440005",
  "value": 4,
  "scale": "stars"
}
```

### Priority Events

Priority events assign importance levels:

```json
{
  "date": "2025-07-24T14:10:00Z",
  "uuid": "550e8400-e29b-41d4-a716-446655440401",
  "event": "priority",
  "target": "550e8400-e29b-41d4-a716-446655440003",
  "value": "high"
}
```

## Benefits of Separate Metadata Events

### For Event Authors

- **Simplified Event Creation**: Core events contain only essential properties
- **Progressive Enhancement**: Add metadata as needed over time
- **Flexible Management**: Change metadata without touching original events

### For Consumers

- **Selective Processing**: Process only relevant metadata types
- **Historical Tracking**: See how metadata evolved over time
- **Consistent Handling**: Use common patterns for all metadata types

### For Systems

- **Reduced Schema Complexity**: Core event schemas remain focused and clean
- **Enhanced Discoverability**: Explicit metadata relationships are easy to find
- **Improved Performance**: Selective loading of only needed metadata

## Working with Metadata Events

### Adding Metadata

To add metadata to an event, create the appropriate metadata event referencing the target event's UUID.

### Updating Metadata

To change metadata, create a new metadata event. For status and priority events, a new event with the updated value implicitly replaces previous values. For notes and ratings, you can explicitly reference the UUID of the metadata event being replaced using the `replaces` property.

### Removing Metadata

For tags and status events, set the `value` property to `false` or use `removed: true` to indicate removal. For other metadata types, a removal event with appropriate properties can be created.

## Processing Guidelines

When processing PEEVEM streams, applications should:

1. Parse core events first to build the primary event timeline
2. Process metadata events to build relationships between events
3. Apply metadata events in chronological order
4. Honor the latest metadata event for each combination of target and metadata type

## Extended Applications

The metadata event pattern can be extended to other types of relationships:

- **Link Events**: Connect related events
- **Reference Events**: Reference external resources
- **Location Events**: Add location information to events
- **Timeline Events**: Place events in specific timelines or contexts

By following the same pattern, these extensions maintain compatibility with the PEEVEM ecosystem while adding powerful capabilities.
