# Biddly - Auction Platform

## About the Project

Auction Platform is a backend-oriented pet project designed to explore and implement complex architectural patterns and advanced features using the NestJS ecosystem. The main goal is to deeply practice concepts such as Event Sourcing, Domain-Driven Design (DDD), Event-Driven Architecture, and Distributed Systems patterns.

This project simulates a real auction platform where users can create auctions, place bids in real-time, and watch auctions close automatically based on configurable rules.

This setup is highly modular and scalable, suitable for production-like experiments.

## Tech Stack

*   **NestJS** (Backend Framework)
*   **PostgreSQL** (Primary Database for persistent storage and Event Store)
*   **RabbitMQ** (Message Broker for Event-Driven Architecture)
*   **Redis** (Caching, Pub/Sub, Rate Limiting, Distributed Locking)
*   **Prisma** (Object Relational Mapper)
*   **Event Sourcing** (Core pattern for state management)
*   **WebSockets** (Real-time communication for bidding process)
*   **Docker** (Containerization and local infrastructure)
*   **AdminJS** (Internal Admin Panel for management operations)

## Core Architecture Concepts

### Event Sourcing

*   All domain changes are stored as immutable events.
*   Event Store is implemented using PostgreSQL.
*   State is rebuilt by replaying past events.

### WebSocket Gateway

*   Real-time communication for active auctions.
*   Each auction session has its own WebSocket channel.

### Redis Usage

*   Rate Limiting for placing bids.
*   Distributed Locks to prevent race conditions.
*   Pub/Sub for notifications and updates.

### RabbitMQ Usage

*   Event-driven communication between services.
*   Separate queues for different event types.

## AdminJS

Internal admin panel for auction management:

```bash
yarn start:dev:admin
```

Access URL: http://localhost:3000/admin

## Roadmap

- [ ] Infrastructure setup
- [ ] Auction Domain Model Implementation
- [ ] Event Sourcing Layer Development
- [ ] WebSocket Real-time Bidding Feature
- [ ] Redis Distributed Lock Implementation
- [ ] AdminJS CRUD for Auctions
- [ ] Load and Stress Testing

## Additional Ideas

Optional improvements for the future:

*   Payment Service Integration
*   Load Testing using k6 or Artillery
*   Multi-tenancy Architecture

## License

[MIT](LICENSE)
