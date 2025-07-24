# Guide de démarrage rapide PEEVEM

Ce guide vous aidera à comprendre et à commencer à utiliser le standard PEEVEM pour la gestion de vos connaissances personnelles.

## Qu'est-ce que PEEVEM ?

PEEVEM (Personal Event-Sourced Knowledge Management) est un standard ouvert qui permet de stocker des événements personnels dans un format texte structuré, basé sur les principes d'event-sourcing. L'idée fondamentale est de capturer toutes vos activités numériques et réelles sous forme d'événements chronologiques.

## Premiers pas

### 1. Comprendre la structure d'un événement

Un événement PEEVEM est un objet JSON qui contient au minimum les propriétés suivantes :

```json
{
  "date": "2025-07-24T10:15:30Z",
  "uuid": "550e8400-e29b-41d4-a716-446655440000",
  "event": "bookmark.created"
  // Autres propriétés spécifiques à l'événement
}
```

### 2. Créer votre premier fichier d'événements

Créez un fichier texte avec l'extension `.ndjson` et ajoutez-y votre premier événement :

```
{"date":"2025-07-24T10:15:30Z","uuid":"550e8400-e29b-41d4-a716-446655440000","event":"note.created","content":"Ma première note dans PEEVEM"}
```

### 3. Ajouter plus d'événements

Pour ajouter un nouvel événement, ajoutez simplement une nouvelle ligne à votre fichier :

```
{"date":"2025-07-24T10:15:30Z","uuid":"550e8400-e29b-41d4-a716-446655440000","event":"note.created","content":"Ma première note dans PEEVEM"}
{"date":"2025-07-24T11:20:45Z","uuid":"6ba7b810-9dad-11d1-80b4-00c04fd430c8","event":"bookmark.created","url":"https://peevem.org","title":"Site officiel de PEEVEM"}
```

### 4. Valider vos événements

Vous pouvez valider vos événements contre les schémas JSON disponibles dans ce référentiel. Plusieurs outils permettent de réaliser cette validation :

- Bibliothèques JSON Schema comme `ajv` (JavaScript)
- Outils en ligne de commande comme `jsonschema` (Python)
- Services en ligne de validation JSON Schema

## Exemples d'événements courants

### Création d'un signet

```json
{
  "date": "2025-07-24T10:15:30Z",
  "uuid": "550e8400-e29b-41d4-a716-446655440000",
  "event": "bookmark.created",
  "url": "https://example.com",
  "title": "Exemple de site",
  "tags": ["exemple", "démo"]
}
```

### Rencontre avec une personne

```json
{
  "date": "2025-07-24T14:00:00Z",
  "uuid": "7ba7b810-9dad-11d1-80b4-00c04fd430c8",
  "event": "person.met",
  "person": "Alice Dupont",
  "location": "Café du Centre, Paris",
  "notes": "Discussion sur le projet PEEVEM"
}
```

### Déplacement d'un fichier

```json
{
  "date": "2025-07-24T16:30:00Z",
  "uuid": "8ba7b810-9dad-11d1-80b4-00c04fd430c8",
  "event": "file.moved",
  "source": "/home/user/documents/rapport.pdf",
  "destination": "/media/backup/2025/rapport.pdf",
  "checksum": "5eb63bbbe01eeed093cb22bb8f5acdc3"
}
```

## Prochaines étapes

- Explorez les différents [schémas d'événements](../schemas/) disponibles
- Consultez les [exemples d'utilisation](../examples/) plus avancés
- Participez aux [discussions](../discussions/) sur l'évolution du standard
- Créez vos propres outils pour générer ou exploiter les événements PEEVEM
