# Discussion 001: Versionnement des schémas

## Contexte

Le standard PEEVEM repose sur des schémas JSON qui définissent la structure des événements. Au fil du temps, ces schémas vont nécessairement évoluer pour répondre à de nouveaux besoins ou corriger des problèmes. Comment gérer ce versionnement de manière à préserver la compatibilité et la lisibilité tout en permettant l'évolution du standard?

## Importance

Une stratégie de versionnement claire est essentielle pour :

- Assurer la compatibilité à long terme des événements
- Permettre aux utilisateurs de savoir quelle version ils utilisent
- Faciliter la migration entre versions
- Permettre l'évolution du standard sans casser les implémentations existantes

## Approches possibles

### 1. Versionnement explicite dans chaque événement

Chaque événement inclut une propriété `schemaVersion` qui indique la version du schéma utilisé.

**Avantages :**
- Très explicite
- Permet de mélanger différentes versions dans le même flux

**Inconvénients :**
- Augmente la taille de chaque événement
- Redondant si tous les événements d'un flux utilisent la même version

**Exemple :**

```json
{
  "date": "2025-07-24T10:15:30Z",
  "uuid": "550e8400-e29b-41d4-a716-446655440000",
  "event": "bookmark.created",
  "schemaVersion": "1.0.0",
  "url": "https://example.com",
  "title": "Exemple de site"
}
```

### 2. Versionnement dans le nom du schéma

Intégrer la version dans l'identifiant du schéma.

**Avantages :**
- Ne nécessite pas de champ supplémentaire dans chaque événement
- Approche standard dans de nombreux systèmes de schémas

**Inconvénients :**
- Peut rendre les URLs de schémas plus complexes
- Nécessite une convention claire pour la formation des URLs

**Exemple :**

```
$id: "https://peevem.org/schemas/v1/bookmark.created"
```

### 3. Versionnement par namespaces

Organiser les schémas dans des namespaces correspondant aux versions majeures.

**Avantages :**
- Séparation claire entre versions incompatibles
- Permet une organisation hiérarchique des schémas

**Inconvénients :**
- Peut complexifier la structure des répertoires
- Nécessite un mécanisme pour naviguer entre les versions

**Exemple :**

```
/schemas/v1/bookmark.created.json
/schemas/v2/bookmark.created.json
```

### 4. Versionnement par propriété `version` dans le schéma

Inclure une propriété `version` dans le schéma lui-même, sans l'exiger dans les événements.

**Avantages :**
- Simplicité pour les événements
- Information disponible pour les développeurs

**Inconvénients :**
- La version n'est pas visible dans les événements eux-mêmes
- Peut nécessiter une introspection des schémas

**Exemple :**

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://peevem.org/schemas/bookmark.created",
  "version": "1.0.0",
  "title": "Bookmark Created Event",
  // ...
}
```

## Questions à considérer

1. Comment gérer la compatibilité ascendante et descendante?
2. Faut-il adopter le versionnement sémantique (SemVer)?
3. Comment les outils devraient-ils gérer les différentes versions?
4. Faut-il prévoir un mécanisme de migration automatique entre versions?
5. Comment documenter les changements entre versions?

## Proposition initiale

Une combinaison des approches 2 et 4 semble offrir un bon équilibre :

- Inclure une propriété `version` dans chaque schéma (non exposée dans les événements)
- Utiliser le versionnement sémantique (SemVer) pour cette propriété
- Pour les changements incompatibles (version majeure), créer un nouveau namespace dans l'URL du schéma

Exemple :

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://peevem.org/schemas/v1/bookmark.created",
  "version": "1.2.3",
  "title": "Bookmark Created Event",
  // ...
}
```

Cette approche permettrait :
- Une séparation claire des versions incompatibles (v1, v2, etc.)
- Une évolution incrémentale au sein d'une version majeure (1.1.0, 1.2.0, etc.)
- Une identification facile de la version exacte utilisée

## Statut actuel

Cette discussion est ouverte. Nous encourageons la communauté à partager ses réflexions et expériences sur ce sujet.
