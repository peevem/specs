# PEEVEM - Personal Event-Sourced Knowledge Management

## Vision

PEEVEM est un standard ouvert pour la gestion des connaissances personnelles basé sur les principes d'event-sourcing. Notre vision est de créer un écosystème où les données personnelles sont stockées sous forme d'événements textuels standardisés, fiables sur des décennies, faciles à comprendre et à auditer.

## Objectifs

- Fournir une méthode standard pour stocker divers événements personnels (rencontres, signets web, déplacements de fichiers, contacts, etc.)
- Utiliser des technologies ubiquitaires (NDJSON, JSON Schema) pour garantir la pérennité et l'interopérabilité
- Créer un pont entre différents systèmes (réseaux sociaux, emails, calendriers, appareils...)
- Permettre à chacun d'interagir avec ses données personnelles selon ses propres besoins

## Structure du projet

- `/schemas` - Schémas JSON définissant la structure des événements
- `/docs` - Documentation sur l'utilisation et l'implémentation du standard
- `/examples` - Exemples d'utilisation dans différents contextes
- `/discussions` - Questions ouvertes et propositions d'évolution

## Commencer

### Comprendre les schémas

Tous les événements PEEVEM suivent un format commun défini dans les schémas JSON. Le schéma de base (`core.json`) définit les propriétés fondamentales présentes dans tous les événements.

### Format des événements

Les événements sont stockés au format NDJSON (Newline Delimited JSON), où chaque ligne représente un objet JSON complet correspondant à un événement distinct.

### Exemples d'utilisation

Consultez le dossier `/examples` pour voir comment PEEVEM peut être utilisé dans différents contextes.

## Contribuer

Ce projet est communautaire et nous encourageons les contributions de tous types :

1. **Questions et discussions** - Ouvrez une issue pour poser des questions ou proposer des idées
2. **Améliorations des schémas** - Proposez des modifications aux schémas existants
3. **Nouveaux types d'événements** - Suggérez de nouveaux types d'événements à standardiser
4. **Documentation** - Améliorez la documentation ou ajoutez des traductions
5. **Exemples** - Partagez des exemples d'utilisation dans différents contextes

## Questions ouvertes

Nous explorons activement plusieurs questions :

- Comment versionner efficacement les schémas
- Comment décrire les événements composites (plusieurs événements liés)
- Comment gérer les références entre événements
- Comment assurer la confidentialité tout en permettant le partage

## Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.