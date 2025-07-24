# Spécification PEEVEM v0.1

## Introduction

La spécification PEEVEM (Personal Event-Sourced Knowledge Management) définit un format standard pour stocker et manipuler des événements personnels selon les principes de l'event-sourcing. Ce document décrit formellement la structure, le format et les règles que doivent suivre les implémentations conformes.

## Concepts fondamentaux

### Event Sourcing

L'event sourcing est un modèle architectural où l'état d'un système est déterminé par une séquence d'événements plutôt que par des instantanés. Dans PEEVEM, chaque action ou changement est capturé sous forme d'événement immuable, créant ainsi un historique complet et auditaable.

### Événement

Un événement dans PEEVEM représente quelque chose qui s'est produit à un moment précis. Il peut s'agir d'une action réalisée par l'utilisateur (ex: création d'un signet), d'un changement d'état (ex: déplacement d'un fichier), ou d'une observation (ex: rencontre avec une personne).

## Format des fichiers

### NDJSON (Newline Delimited JSON)

Les événements PEEVEM sont stockés au format NDJSON, où chaque ligne représente un objet JSON complet correspondant à un événement distinct. Ce format offre plusieurs avantages :

- Simplicité de lecture et d'écriture
- Possibilité d'ajouter de nouveaux événements par simple ajout de ligne
- Facilité de traitement par lots
- Compatibilité avec les outils standard de manipulation de texte

Exemple d'un fichier NDJSON contenant des événements PEEVEM :

```
{"date":"2025-07-24T10:15:30Z","uuid":"550e8400-e29b-41d4-a716-446655440000","event":"bookmark.created","url":"https://example.com","title":"Exemple de site"}
{"date":"2025-07-24T14:22:10Z","uuid":"6ba7b810-9dad-11d1-80b4-00c04fd430c8","event":"file.moved","source":"/home/user/docs/old.txt","destination":"/media/backup/old.txt"}
```

## Structure des événements

Chaque événement PEEVEM doit respecter la structure définie par les schémas JSON. Tous les événements partagent un ensemble de propriétés communes définies dans le schéma de base (`core.json`).

### Propriétés communes

- `date` - Date et heure de l'événement (format ISO 8601)
- `uuid` - Identifiant unique de l'événement (format UUID)
- `event` - Type d'événement (ex: bookmark.created, file.moved)

### Types d'événements

Le type d'événement (`event`) indique la nature de l'événement et détermine quelles propriétés supplémentaires sont attendues. Les types d'événements suivent généralement une convention de nommage utilisant des points pour la hiérarchisation (ex: `bookmark.created`, `contact.updated`).

## Validation

Les événements PEEVEM doivent être validés contre les schémas JSON correspondants. La validation garantit que les événements sont bien formés et contiennent toutes les propriétés requises.

## Versionnement

> Note: Le versionnement des schémas est une question ouverte en cours de discussion.

La spécification PEEVEM suit le versionnement sémantique (SemVer). Les modifications incompatibles entraînent une incrémentation de la version majeure, les ajouts compatibles une incrémentation de la version mineure, et les corrections de bugs une incrémentation de la version de patch.

## Sécurité et confidentialité

Les implémentations de PEEVEM doivent prendre en considération la nature potentiellement sensible des données personnelles. Il est recommandé de :

- Chiffrer les fichiers d'événements au repos
- Implémenter des contrôles d'accès appropriés
- Permettre l'anonymisation ou la pseudonymisation des données sensibles
- Fournir des mécanismes pour la suppression sélective d'événements (tout en préservant l'intégrité de la chaîne d'événements)
