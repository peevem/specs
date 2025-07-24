# Schema Versioning in PEEVEM

Versioning is a critical aspect of the PEEVEM project, as it allows the schemas to evolve while maintaining compatibility with existing data and tools.

## Principles

PEEVEM follows these principles for versioning:

1. **Backward Compatibility**: Newer versions of schemas should be able to validate data created with older versions whenever possible
2. **Clear Signaling**: Version changes should be clearly indicated and documented
3. **Semantic Versioning**: Follow the MAJOR.MINOR.PATCH pattern for schema versions

## Version Indicators

### Schema $id

Each schema includes a version in its `$id` URL:

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://peevem.org/schemas/bookmark/v1.0.0"
}
```

The version follows semantic versioning principles:

- **MAJOR**: Incompatible changes that could break existing implementations
- **MINOR**: Backward-compatible additions (new optional fields)
- **PATCH**: Backward-compatible fixes (improving descriptions, fixing validation bugs)

### Schema Registry

The PEEVEM project maintains a registry of all schema versions with details about changes and compatibility.

## Handling Schema Evolution

### Adding Properties

New properties should be added as optional to maintain backward compatibility. For example, adding a `read_later` flag to a bookmark schema:

```json
// v1.0.0
{
  "properties": {
    "url": { "type": "string" },
    "title": { "type": "string" }
  },
  "required": ["url"]
}

// v1.1.0
{
  "properties": {
    "url": { "type": "string" },
    "title": { "type": "string" },
    "read_later": { "type": "boolean" }
  },
  "required": ["url"]
}
```

### Breaking Changes

When a breaking change is necessary, increment the major version and document the migration path:

```json
// v1.0.0
{
  "properties": {
    "tags": { "type": "string" }
  }
}

// v2.0.0
{
  "properties": {
    "tags": { 
      "type": "array",
      "items": { "type": "string" }
    }
  }
}
```

## Consumer Recommendations

Applications consuming PEEVEM data should:

1. Be explicit about which schema versions they support
2. Handle unknown properties gracefully (forward compatibility)
3. Implement version detection and appropriate parsing
4. Consider providing migration utilities

## Schema Deprecation

When a schema version needs to be deprecated:

1. Clearly mark it as deprecated in the registry
2. Document the recommended migration path
3. Maintain the deprecated schema for a reasonable transition period
4. Provide tools to help migrate data to newer schemas

## Community Process

Proposals for schema changes follow this process:

1. Create an issue describing the proposed change
2. Categorize as PATCH, MINOR, or MAJOR based on impact
3. Get community feedback and refine the proposal
4. Implement the change with appropriate version increment
5. Update documentation and examples

This approach ensures that PEEVEM can evolve while maintaining a stable ecosystem.
