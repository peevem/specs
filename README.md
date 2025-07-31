# PEEVEM Specification

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

PEEVEM (which stands for PErsonal EVEnts Management) is a project that aims to create a standardised way to store and manage personal events through structured text-based event-sourcing. The goal is to establish a reliable, decade-spanning approach to personal knowledge management in a way that's easy to understand and audit.

> [!WARNING]
> The project is absolutely not ready! I change the specs on a whim and docs/tooling are not there.

## The issues at hand

There are myriads of great specialised applications for everything. Commercial platforms, [open source apps](https://github.com/awesome-selfhosted/awesome-selfhosted), for desktop, mobile or terminal, you name it. The issue is if you want an integration between those, you need to choose between:
- a lot of work
- a very tiny subset of apps designed to work together
- a very, very invasive platform (hi "don't be evil", hi "munched fruit")

In other words, either you agree to give everything to a corporation and relinquish control over your data, or you spend **a lot** of time to maintain your personal knowledge management.

Another issue is that many open source projects are somewhat short-lived, which is not great if one wants to preserve a long and full digital life.

## How about we bring in some glue?

- Something you and me can use to store all sorts of **personal events**: from real-life events to trivial things like bookmarking a webpage, moving a file to external drive, creating a contact, microblogging, mails, calendar event etc. Anything really!

- Something that can act as a storage layer for those great specialised apps, so you can fearlessly bridge them to your other data and also keep a track record once it inevitably ends

- Something open, built with ubiquitous tech so it can be used everywhere, even your PotatoPi V1 in the back of the closet.

- Something you could open and read by other means, should the project fail at some point.

- Something decentralised and reliable, that should never forget anything by default.

- Something you control completely. You choose where and how it's stored.

## Non-goals

- Replace the software you use is not the goal here.
- Since it's built with longevity in mind, low latency, high availability and high mutability are non-goals too.

## Technical details

- The canonical way to store PEEVEM events is [NDJson](https://github.com/ndjson/ndjson-spec)
  - I intend to structure specs and guidelines so other formats like [YAML](https://yaml.org/), [TOML](https://toml.io), [CBOR](https://cbor.io/) and [MessagePack](https://msgpack.org/) could be used, as long as one refrains from using incompatible features
- Events will be defined and validated by [JSON Schema](https://json-schema.org/draft/2020-12).
  - This is the cornerstone of PEEVEM and this specification.
- Multi-deviceCompression and encryption are planned, too

## Contributing

PEEVEM is intended to be community-driven; it won't work otherwise. Please challenge me; 
[CONTRIBUTING.md](CONTRIBUTING.md) to see how!