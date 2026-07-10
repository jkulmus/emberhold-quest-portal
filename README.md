# Emberhold Quest Portal

## Project Description

Welcome to Emberhold!

Emberhold Quest Portal is a medieval-inspired web application that I created as my final project for CSE 340 Web Backend Development at BYU–Idaho.

Rather than creating a traditional business application, I wanted to build something that felt like the beginning of a living world. Guild members can create accounts, browse available quests, request adventures, follow their progress through a multi-stage workflow, and record completed journeys in their personal Quest Journal.

Guild staff members help manage incoming quest requests while guild administrators oversee the guild by managing quests, user roles, and community journal entries.

Although this project was created to demonstrate backend development concepts, it also represents the beginning of a much larger immersive medieval experience that I hope to continue developing in the future.

---

# Why I Chose This Project

I have always enjoyed creating immersive experiences and wanted a project that allowed me to practice backend development while building something meaningful to me. Designing Emberhold allowed me to combine database design, authentication, user management, workflows, and dynamic content into a project that feels like a real application instead of simply completing assignment requirements.

Building this project challenged me to think differently about application architecture and gave me much more confidence working with Express, PostgreSQL, MVC, authentication, validation, and deployment.

---

# Live Application

https://emberhold-quest-portal.onrender.com

---

# GitHub Repository

https://github.com/jkulmus/emberhold-quest-portal

---

# Features

## Guests

- Browse the Quest Board
- View quest details
- Register for a guild account
- Login

## Guild Members

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

Administrators can:

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
- connect-pg-simple
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
- Dynamic content management
- User-generated content
- Multi-stage workflow management
- Administrative dashboards
- Deployment using Render

---

# MVC Architecture

The project is organized using the MVC design pattern.

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

Models handle database communication, controllers process requests, routes connect URLs to controllers, middleware manages authentication, authorization, validation, and flash messages, and EJS views render the user interface.

---

# Database Schema

The application uses a normalized PostgreSQL database with multiple related tables.

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

![Emberhold Quest Portal ERD](docs/emberhold-erd.png)

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

Quest requests progress through the following workflow:

```
Requested
      ↓
Approved
      ↓
Completed
```

Requests may also be cancelled if necessary.

Guild members can monitor their request status through the **My Quests** page while staff and administrators update statuses through the **Guild Requests** page.

---

# User Interaction

Guild members can create Quest Journal entries after completing quests.

Each journal entry includes:

- Rating
- Written adventure summary
- Date created

Users can:

- View
- Edit
- Delete

their own journal entries.

Administrators can moderate journal entries by removing inappropriate content.

---

# Security

Security features include:

- Password hashing using bcrypt
- Session-based authentication
- Role-based authorization
- Protected routes
- Parameterized SQL queries
- Server-side validation using express-validator
- Environment variables for sensitive configuration
- .env excluded from Git
- Secure production deployment

---

# Test Accounts

| Role | Email |
|------|-------|
| Administrator | emberhold.admin@test.com |
| Staff | emberhold.staff@test.com |
| Standard User | emberhold.user@test.com |

All test accounts use the common password specified in the project requirements.

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

- Journal moderation currently supports removal instead of advanced moderation tools.
- Quest categories and images have not yet been implemented.
- Additional workflow stages such as "In Progress" could be added in future versions.
- Additional accessibility improvements could still be made.

---

# Future Improvements

If I continue developing Emberhold, I would like to add:

- Quest images
- Quest categories and filtering
- Guild achievements and badges
- Quest scheduling
- Guild messaging
- Expanded journal moderation
- Additional workflow stages
- Multiple kingdoms connected through one shared world
- More immersive story-driven adventures

---

# Final Thoughts

This project represents everything I learned throughout CSE 340. It challenged me to combine authentication, authorization, database design, MVC architecture, server-side rendering, validation, and deployment into one complete application.

More importantly, it gave me the opportunity to build something I genuinely enjoyed creating. While there are many additional features I hope to add in the future, I am proud of how much Emberhold has grown throughout this course and excited to continue developing it beyond this class.

---

# Author

**Jacquelyn Kulmus**

CSE 340 Web Backend Development

BYU–Idaho

2026
