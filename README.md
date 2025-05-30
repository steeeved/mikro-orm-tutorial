# mikro-orm-tutorial

This repository contains a simple set-up that helped to farmiliarise my self with mikro-orm using a nodejs API & postgres

Overview;
Express.js - Web Framework
MikroORM - Typescript ORM with Unit of Work and Data Mapper patterns
PostrgreSQL - Database
Docker - Containerization for development

Features;

1. CRUD operations for blog posts
2. PostgreSQL database with Docker setup
3. MikroORM v6 configuration
4. Request validation
5. Error handling
6. Hot reload

Prerequisites
Before running this project, make sure you have;

- Node.js (v14 or higher)
- npm (v7 or higher)
- Docker and Docker Compose

Installation

1. Clone the repository
2. Install dependencies
   npm install
3. Start the database
   docker-compose up -d
4. Run database migrations
   npm run db:update
5. Start the dev server
   npm run dev

The API will be available at http://localhost:3000
