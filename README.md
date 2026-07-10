# Emberhold Quest Portal

## Project Description

Welcome to Emberhold!

Emberhold Quest Portal is a medieval-inspired web application that I created as my final project for CSE 340 Web Backend Development at BYU–Idaho.

Rather than creating a traditional business application, I wanted to build something that people could imagine actually using. I've always enjoyed medieval worlds and immersive experiences, so creating Emberhold gave me the opportunity to combine those interests while applying everything I learned throughout this course.

Guild members can create accounts, browse available quests, request adventures, follow their progress through a multi-stage workflow, and record completed journeys in their personal Quest Journal.

Guild staff members help manage incoming quest requests while guild administrators oversee the guild by managing quests, user roles, and community journal entries.

Although this project was created to demonstrate backend development concepts, it also represents the beginning of a much larger immersive medieval experience that I hope to continue developing in the future.

---

# Why I Chose This Project

I have always enjoyed creating immersive experiences and wanted a project that allowed me to practice backend development while building something meaningful to me. Designing Emberhold allowed me to combine database design, authentication, user management, workflows, and dynamic content into a project that feels like a real application instead of simply completing assignment requirements.

Building this project challenged me to think differently about application architecture and gave me much more confidence working with Express, PostgreSQL, MVC, authentication, validation, deployment, and debugging real-world problems.

It was exciting to watch the project grow from a simple idea into a complete web application that I can continue improving long after this class ends.

---

# Live Application

https://emberhold-quest-portal.onrender.com

---

# GitHub Repository

https://github.com/jkulmus/emberhold-quest-portal

---

# Application Preview

The following screenshots highlight some of the major features available throughout the Emberhold Quest Portal.

## Home Page

The landing page introduces visitors to Emberhold and provides access to the Quest Board, registration, and login.

![Home Page](public/images/home-page.png)

---

## Quest Board

The Quest Board displays all available quests stored in the PostgreSQL database. Users can browse quests and view detailed information before requesting an adventure.

![Quest Board](public/images/quest-board.png)

---

## Guild Hall

After logging in, guild members gain access to their personal dashboard where they can manage quests, view their progress, and access role-specific features.

![Guild Hall](public/images/guild-hall.png)

---

## Guild Management

Administrators have access to guild management tools that allow them to manage users, assign roles, and oversee the Emberhold community.

![Guild Management](public/images/guild-management.png)

## Quest Workflow

One of the core features of Emberhold is the quest request workflow. As a guild member, a quest progresses through several stages before it can be completed and recorded in a Quest Journal.

### 1. Quest Requested

After selecting a quest from the Quest Board, the request is submitted and appears with a **Requested** status while awaiting guild approval.

![Quest Requested](public/images/quest-requested.png)

---

### 2. Quest Approved

Guild staff review incoming requests and can approve them. Once approved, the guild member can see the updated status.

![Quest Approved](public/images/quest-approved.png)

---

### 3. Quest Completed

After the quest has been completed, the guild member can create a personal Quest Journal entry documenting their adventure.

![Quest Completed](public/images/quest-completed.png)

---

# Features

## Guests

- Browse the Quest Board
- View quest details
- Register for a guild account
- Login

## Registered Guild Members

Guild members can:

- Browse available quests
- Request quests
- Track quest request status
- View quest history
- Create Quest Journal entries
- Edit personal journal entries
- Delete personal journal entries

## Guild Staff

Staff members can:

- View all Guild Requests
- Approve quest requests
- Update quest request statuses
- Complete or cancel quests

## Guild Administrators

Administrators have full control of the guild and can:

- Create quests
- Edit quests
- Delete quests
- Manage user roles
- Moderate Quest Journal entries
- Access all staff features

---

# Technology Stack

- Node.js
- Express.js
- PostgreSQL
- EJS
- ECMAScript Modules (ESM)
- Express Session
- connect-pg-simple (PostgreSQL Session Store)
- bcrypt
- express-validator
- pnpm
- Render

---

# Skills Demonstrated

This project demonstrates:

- MVC Architecture
- Server-side rendering with EJS
- PostgreSQL database relationships
- Session-based authentication
- Password hashing with bcrypt
- Role-based authorization
- Dynamic routing
- Parameterized SQL queries
- Form validation
- Flash messaging
- Global error handling
- Dynamic content management
- User-generated content
- Multi-stage workflow management
- Administrative dashboards
- Production deployment using Render

---

# MVC Architecture

The project follows the Model-View-Controller (MVC) design pattern.

```
src
├── controllers
├── middleware
├── models
├── routes
└── views

public
└── css
```

Models handle database communication, controllers process business logic, routes connect URLs to controller actions, middleware manages authentication, authorization, validation, flash messages, and error handling, while EJS views render the user interface.

This separation of concerns makes the project easier to maintain, extend, and understand.

---

# Database Schema

The application uses a normalized PostgreSQL database with multiple related tables.

Each table has a specific responsibility and is connected through foreign-key relationships to reduce duplicated data and maintain referential integrity.

Primary tables include:

- Roles
- Users
- Quests
- Quest Requests
- Quest Journals

Relationships include:

- One Role → Many Users
- One User → Many Quest Requests
- One Quest → Many Quest Requests
- One User → Many Quest Journal Entries
- One Quest Request → Many Journal Entries

![Emberhold Quest Portal ERD](public/images/emberhold-erd.png)

---

# User Roles

## Standard User

- Register and login
- Browse quests
- Request quests
- Track quest status
- Create, edit, and delete personal Quest Journal entries

## Staff

All Standard User permissions plus:

- View Guild Requests
- Approve requests
- Update request statuses
- Complete or cancel quests

## Administrator

All Staff permissions plus:

- Create quests
- Edit quests
- Delete quests
- Manage user roles
- Moderate Quest Journals

---

# Multi-Stage Workflow

Quest requests move through the following workflow:

```
Requested
      ↓
Approved
      ↓
Completed
```

Requests may also be cancelled when necessary.

Guild members can monitor the current status of their requests through the **My Quests** page, while staff members and administrators update those statuses through the **Guild Requests** page.

---

# User Interaction

Guild members can create Quest Journal entries after completing quests.

Each journal entry contains:

- Rating
- Written adventure summary
- Date created

Users can:

- View their own journal entries
- Edit their own journal entries
- Delete their own journal entries

Administrators can moderate journal entries by removing inappropriate content when necessary.

---

# Security

Security features include:

- Password hashing using bcrypt
- Session-based authentication with Express Session
- Role-based authorization
- Protected routes
- Parameterized SQL queries to prevent SQL injection
- Server-side validation using express-validator
- Environment variables for sensitive configuration
- `.env` excluded from Git version control
- Secure production deployment on Render

---

# Test Accounts

| Role | Email |
|------|-------|
| Administrator | emberhold.admin@test.com |
| Staff | emberhold.staff@test.com |
| Standard User | emberhold.user@test.com |

All test accounts use the password specified in the project requirements

---

# Local Installation

Clone the repository:

```bash
git clone https://github.com/jkulmus/emberhold-quest-portal

cd emberhold-quest-portal
```

Install dependencies:

```bash
pnpm install
```

Create a `.env` file:

```env
NODE_ENV=development
PORT=3000
DB_URL=your_postgresql_connection_string
SESSION_SECRET=your_session_secret
```

Run the application:

```bash
pnpm start
```

Development mode:

```bash
pnpm dev
```

---

# Known Limitations

Current limitations include:

- Journal moderation currently supports removal instead of more advanced moderation tools.
- Quest categories and images are planned for a future version of Emberhold.
- Additional workflow stages such as "In Progress" could be added in future updates.
- Additional accessibility improvements could still be made.

---

# Future Improvements

If I continue developing Emberhold, I would like to add:

- Quest images
- Quest categories and advanced filtering
- Guild achievements and badges
- Quest scheduling
- Guild messaging between members and staff
- Expanded journal moderation tools
- Additional workflow stages
- Expanded kingdoms inspired by the larger Phenixgard world
- More immersive story-driven adventures

---

# Final Thoughts

This project represents everything I learned throughout CSE 340. It challenged me to combine authentication, authorization, database design, MVC architecture, server-side rendering, validation, and deployment into one complete application.

More importantly, this project gave me the opportunity to build something I genuinely enjoyed creating. Seeing Emberhold grow from a simple idea into a fully deployed application has been one of the most rewarding parts of this course. While there are many additional features I hope to build in the future, I am proud of what I accomplished and excited to continue expanding this project beyond the classroom.

---

# Author

**Jacquelyn Kulmus**

CSE 340 Web Backend Development

BYU–Idaho

2026