# Emberhold Quest Portal

## Project Description

Welcome to Emberhold!

Emberhold Quest Portal is a medieval-inspired guild and quest management application that I created for my CSE 340 Web Backend Development final project.

I wanted to build something that felt more like the beginning of a living world than a traditional business application. Guild members can create accounts, browse available quests, request adventures, track their progress, and record completed journeys through personal Quest Journal entries.

Guild staff members manage incoming quest requests and update their progress. Guild administrators oversee the larger system by managing users and roles, creating and maintaining quest content, and moderating community journal entries.

Although this project was created to demonstrate backend development concepts, it also represents the beginning of a much larger immersive world that I hope to continue building in the future.

## Live Application

**Render deployment:**  
`https://emberhold-quest-portal.onrender.com`

## GitHub Repository

`https://github.com/jkulmus/emberhold-quest-portal.git`

## Main Features

### Guests

- View the home and about pages
- Browse the public Quest Board
- View individual quest details
- Register for a guild account
- Log into an existing account

### Guild Members

- Browse and request quests
- View personal quest requests
- Track request status
- View recent activity through the Guild Hall
- Create Quest Journal entries for completed quests
- Edit their own journal entries
- Delete their own journal entries

### Guild Staff

Staff members have all standard-user permissions, plus they can:

- View all submitted Guild Requests
- Approve quest requests
- Update quest-request statuses
- Mark requests as completed or cancelled

### Guild Administrators

Administrators have full system access and can:

- Perform all staff actions
- Create new quests
- Edit existing quests
- Delete quests
- View guild members
- Change user roles
- Moderate and remove inappropriate Quest Journal entries
- View operational quest activity

## Technology Stack

- Node.js
- Express.js
- EJS
- PostgreSQL
- ECMAScript Modules
- `express-session`
- `connect-pg-simple`
- bcrypt
- `express-validator`
- pnpm
- Render

## Skills Demonstrated

This project demonstrates:

- Server-side rendering with EJS
- MVC architecture and separation of concerns
- PostgreSQL database design
- Foreign-key relationships
- Session-based authentication
- Password hashing with bcrypt
- Role-based authorization
- Protected routes
- Dynamic routing
- Parameterized SQL queries
- Form validation and sanitization
- Dynamic content management
- User-generated content
- Multi-stage workflow tracking
- Administrative dashboards
- Global error handling
- Production deployment with environment variables

## MVC Architecture

The application is organized using the Model-View-Controller pattern.

```text
src/
├── controllers/
├── middleware/
├── models/
├── routes/
└── views/

public/
└── css/
```

Models contain database queries and data-related logic. Controllers coordinate requests and responses. Routes connect URLs to controller functions. EJS views render the application interface, and middleware handles authentication, authorization, validation, flash messages, and errors.

## Database Schema

The database contains the following primary application tables:

- `roles`
- `users`
- `quests`
- `quest_requests`
- `quest_journals`

The relationships allow users to have roles, request quests, track request statuses, and write journal entries connected to completed quest requests.

![Emberhold database ERD](docs/emberhold-erd.png)

## User Roles

### Standard User

A standard guild member can:

- Browse quests
- Request quests
- View personal request history
- Track quest-request statuses
- Create, edit, and delete personal Quest Journal entries

### Staff

A staff member can perform all standard-user actions and can also:

- View Guild Requests
- Approve requests
- Update request statuses
- Complete or cancel requests

Staff members cannot create, edit, or delete quest content and cannot manage user roles.

### Administrator

An administrator has full system access and can:

- Manage quest requests
- Create, edit, and delete quests
- View users
- Change user roles
- Moderate Quest Journal entries
- Access all administrative controls

## Test Accounts

| Role | Email |
|---|---|
| Standard User | `emberhold.user@test.com` |
| Staff | `emberhold.staff@test.com` |
| Administrator | `emberhold.admin@test.com` |

All test accounts use the common password specified in the final-project requirements

## Multi-Stage Workflow

Quest requests move through a status-based workflow:

```text
Requested
    ↓
Approved
    ↓
Completed
```

Requests may also be cancelled when appropriate.

Guild members can see their current request statuses through **My Quests** and the **Guild Hall**. Staff and administrators can update those statuses through **Guild Requests**. Once a quest is completed, the member can create a Quest Journal entry.

## User-Generated Content

Completed quest requests allow guild members to write Quest Journal entries containing:

- A rating from one to five
- A written account of their experience

Users may view, edit, and delete their own journal entries. Administrators can moderate active journal entries and remove inappropriate content.

## Security

The project includes several security practices:

- Passwords are hashed with bcrypt
- Authentication uses server-side sessions
- Sessions are stored in PostgreSQL
- Routes are protected by login and role middleware
- SQL queries use parameterized values
- Forms use server-side validation
- Sensitive configuration is stored in environment variables
- `.env` is excluded from Git
- Production errors do not expose sensitive system details

## Local Installation

Clone the repository:

```bash
git clone PASTE_GITHUB_URL_HERE
cd emberhold-quest-portal
```

Install dependencies:

```bash
pnpm install
```

Create a local `.env` file:

```env
NODE_ENV=development
PORT=3000
DB_URL=your_postgresql_connection_string
SESSION_SECRET=your_session_secret
```

Start the application:

```bash
pnpm start
```

For development with automatic restarting:

```bash
pnpm dev
```

The local application will normally be available at:

```text
http://localhost:3000
```

## Known Limitations

- Quest Journal moderation currently supports removal rather than flagging or administrator editing.
- Quest requests use a focused status workflow and do not currently preserve a separate timestamped audit record for every individual status change.
- Quest images and categories are not yet implemented.
- The project currently uses the PostgreSQL database supplied through the course environment.
- Some visual and accessibility improvements could still be added in future versions.

## Future Improvements

If I continue developing Emberhold, I would like to add:

- Quest categories, sorting, and filtering
- Quest artwork and location maps
- Expanded statuses such as In Progress and Awaiting Signoff
- A complete timestamped status-history table
- Guild achievements, ranks, and badges
- Quest scheduling and calendar integration
- Staff notes and communication with guild members
- Additional kingdoms and connected storylines
- Expanded accessibility and responsive-design testing

## Author

**Jacquelyn Kulmus**  
CSE 340 Web Backend Development  
BYU–Idaho  
2026