# Discussion 002: Événements composites

## Contexte

Certaines actions ou situations réelles génèrent naturellement plusieurs événements liés. Par exemple, l'ajout d'un contact pourrait impliquer la création de l'entité contact, l'enregistrement d'une rencontre, et potentiellement la création d'un lien avec une organisation. Comment PEEVEM devrait-il gérer ces groupes d'événements logiquement liés?

## Importance

Une approche cohérente pour les événements composites permettrait :

- De représenter fidèlement des interactions complexes
- De maintenir les relations logiques entre événements
- De faciliter l'analyse et la visualisation des séquences d'événements
- D'assurer l'intégrité référentielle entre événements liés

## Approches possibles

### 1. Événements indépendants avec références croisées

Chaque événement reste indépendant mais inclut des références aux événements liés.

**Avantages :**
- Préserve l'atomicité de chaque événement
- Maintient la simplicité du modèle d'événement

**Inconvénients :**
- Peut rendre difficile l'identification des groupes d'événements
- Risque d'incohérences si certains événements sont absents

**Exemple :**

```json
{"date":"2025-07-24T10:00:00Z","uuid":"550e8400-e29b-41d4-a716-446655440000","event":"contact.created","name":"Alice Dupont","relatedEvents":["6ba7b810-9dad-11d1-80b4-00c04fd430c8"]}
{"date":"2025-07-24T10:01:00Z","uuid":"6ba7b810-9dad-11d1-80b4-00c04fd430c8","event":"person.met","person":"550e8400-e29b-41d4-a716-446655440000","location":"Café du Centre","relatedEvents":["550e8400-e29b-41d4-a716-446655440000"]}
```

### 2. Meta-événement englobant

Créer un type d'événement spécial qui encapsule plusieurs sous-événements.

**Avantages :**
- Représentation explicite du groupe
- Garantit l'intégrité du groupe

**Inconvénients :**
- Introduit un niveau d'indirection supplémentaire
- Complexifie le modèle d'événement

**Exemple :**

```json
{
  "date": "2025-07-24T10:00:00Z",
  "uuid": "450e8400-e29b-41d4-a716-446655440000",
  "event": "composite",
  "description": "Ajout d'un nouveau contact suite à une rencontre",
  "events": [
    {"date":"2025-07-24T10:00:00Z","uuid":"550e8400-e29b-41d4-a716-446655440000","event":"contact.created","name":"Alice Dupont"},
    {"date":"2025-07-24T10:01:00Z","uuid":"6ba7b810-9dad-11d1-80b4-00c04fd430c8","event":"person.met","person":"Alice Dupont","location":"Café du Centre"}
  ]
}
```

### 3. Propriété de groupe d'événements

Ajouter une propriété optionnelle à chaque événement indiquant son appartenance à un groupe.

**Avantages :**
- Simple à implémenter
- Maintient le format plat des événements

**Inconvénients :**
- Ne garantit pas l'intégrité du groupe
- Peut être difficile à suivre sans outils spécifiques

**Exemple :**

```json
{"date":"2025-07-24T10:00:00Z","uuid":"550e8400-e29b-41d4-a716-446655440000","event":"contact.created","name":"Alice Dupont","groupId":"g-123456","groupType":"contact-addition"}
{"date":"2025-07-24T10:01:00Z","uuid":"6ba7b810-9dad-11d1-80b4-00c04fd430c8","event":"person.met","person":"Alice Dupont","location":"Café du Centre","groupId":"g-123456","groupType":"contact-addition"}
```

### 4. Transaction d'événements

Introduire le concept de "transaction" qui englobe plusieurs événements atomiques.

**Avantages :**
- Concept familier pour les développeurs
- Permet le traitement atomique d'un groupe d'événements

**Inconvénients :**
- Ajoute une couche de complexité
- Pourrait nécessiter un support spécial dans les outils

**Exemple :**

```json
{"date":"2025-07-24T10:00:00Z","uuid":"450e8400-e29b-41d4-a716-446655440000","event":"transaction.begin","description":"Ajout d'un nouveau contact suite à une rencontre","transactionId":"t-123456"}
{"date":"2025-07-24T10:00:01Z","uuid":"550e8400-e29b-41d4-a716-446655440000","event":"contact.created","name":"Alice Dupont","transactionId":"t-123456"}
{"date":"2025-07-24T10:00:02Z","uuid":"6ba7b810-9dad-11d1-80b4-00c04fd430c8","event":"person.met","person":"Alice Dupont","location":"Café du Centre","transactionId":"t-123456"}
{"date":"2025-07-24T10:00:03Z","uuid":"7ba7b810-9dad-11d1-80b4-00c04fd430c8","event":"transaction.commit","transactionId":"t-123456"}
```

## Questions à considérer

1. Quelle approche s'intègre le mieux avec la simplicité visée par PEEVEM?
2. Comment préserver l'immutabilité et l'auditabilité dans le cas d'événements composites?
3. Quel impact sur les outils de traitement et d'analyse?
4. Comment gérer les cas où un événement appartient à plusieurs groupes logiques?
5. Faut-il normaliser certains types de groupes d'événements courants?

## Proposition initiale

L'approche 3 (propriété de groupe d'événements) semble offrir le meilleur équilibre entre simplicité et expressivité :

- Ajout de propriétés optionnelles `groupId` (identifiant unique du groupe) et `groupType` (nature du regroupement)
- Maintien du format plat et simple des événements
- Possibilité de créer des outils qui comprennent et exploitent ces regroupements

Cette approche permettrait une évolution progressive vers des concepts plus sophistiqués si nécessaire, tout en restant compatible avec les principes fondamentaux de PEEVEM.

## Statut actuel

Cette discussion est ouverte. Nous encourageons la communauté à partager ses réflexions et expériences sur ce sujet.
