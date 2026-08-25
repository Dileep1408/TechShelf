# TechShelf

TechShelf is a full-stack resource hub for technical clubs and student communities. It provides a public platform for discovering useful learning resources and a secure member portal for adding, editing, and managing resources.

## Features

* Public resource browsing without requiring an account.
* Search resources by title, category, or description.
* Member authentication using username and password.
* JWT-based authentication for protected operations.
* Add new technical resources with title, category, link, and note.
* Edit resources added by a member.
* Delete resources added by a member.
* Member-specific resource management.
* Persistent resource storage using PostgreSQL.
* Dynamic resource rendering using JavaScript.
* Responsive frontend interface.
* HTTPS-based communication between the deployed frontend and backend.

## Tech Stack

### Frontend

* HTML5
* CSS3
* JavaScript
* Fetch API
* Browser Local Storage

### Backend

* Node.js
* Express.js
* PostgreSQL
* JWT
* bcrypt
* CORS
* dotenv

### Deployment

* GitHub — Source control
* Vercel — Frontend hosting
* Render — Backend hosting and PostgreSQL

## Project Structure

```text
TechShelf/
├── Frontend/
│   ├── index.html
│   ├── resources.html
│   ├── login.html
│   ├── member.html
│   ├── script.js
│   ├── login.js
│   ├── member.js
│   └── style.css
│
├── Backend/
│   ├── config/
│   │   └── db.js
│   ├── middleware/
│   │   └── auth.js
│   ├── routes/
│   ├── server.js
│   ├── package.json
│   └── .env
│
└── README.md
```

## How It Works

Visitors can open the public resources page and browse or search all resources stored in TechShelf.

Members can log in through the authentication page. After successful authentication, the member receives a JWT which is used to authorize protected operations.

Authenticated members can add resources and manage the resources they have created. Changes are sent through the backend REST API and stored permanently in PostgreSQL.

## Resource Information

Each resource contains:

* `id` — Unique resource identifier
* `title` — Resource name
* `note` — Short description
* `link` — External resource URL
* `category` — Resource category
* `created_by` — Member who added the resource
* `created_at` — Creation timestamp

## API

The backend exposes REST endpoints for authentication and resource management.

| Method | Endpoint             | Purpose             | Authentication |
| ------ | -------------------- | ------------------- | -------------- |
| POST   | `/api/auth/login`    | Authenticate member | No             |
| GET    | `/api/resources`     | Get resources       | No             |
| POST   | `/api/resources`     | Add a resource      | Yes            |
| PUT    | `/api/resources/:id` | Update a resource   | Yes            |
| DELETE | `/api/resources/:id` | Delete a resource   | Yes            |

Production API:

`https://techshelf-backend.onrender.com`

## Running Locally

### Prerequisites

* Node.js
* npm
* PostgreSQL
* Git

### Clone the Repository

```bash
git clone https://github.com/Dileep1408/TechShelf.git
cd TechShelf
```

### Backend Setup

```bash
cd Backend
npm install
```

Create a `.env` file in the `Backend` directory and configure the PostgreSQL connection and JWT secret.

Example:

```env
DB_HOST=your_database_host
DB_PORT=5432
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASSWORD=your_database_password
JWT_SECRET=your_jwt_secret
```

Start the backend in development mode:

```bash
npm run dev
```

The backend can also be started using:

```bash
npm start
```

### Frontend

Open the frontend using a local development server and make sure its API requests point to the appropriate backend URL.

For production, the frontend uses:

```text
https://techshelf-backend.onrender.com
```

## Security

* Passwords are hashed using bcrypt.
* Protected API operations require JWT authentication.
* Authentication tokens are handled on the client side for authorized requests.
* Database credentials and JWT secrets are stored in environment variables.
* `.env` is excluded from version control.
* External links are opened with `noopener noreferrer`.
* User-provided resource fields are escaped before being rendered as HTML.
* Production API communication uses HTTPS.

## Deployment

The application is deployed using a separate frontend, backend, and database environment.

* Frontend: Vercel
* Backend: Render
* Database: Render PostgreSQL
* Source Code: GitHub

The GitHub repository is connected to the deployment platforms so that changes can be deployed through the normal Git workflow.

## Database

TechShelf uses PostgreSQL for persistent application data.

The main database tables include:

* `members` — Stores member authentication information.
* `resources` — Stores resources submitted through the application.

Because resources are stored in PostgreSQL, they remain available after page reloads and across different sessions.

## Current Resources

The production database includes technical resources such as:

* GitHub Skills
* GitHub
* Node.js Documentation
* PostgreSQL Documentation
* MDN Web Docs
* Git and GitHub

## Future Improvements

Potential improvements include:

* Role-based admin access.
* Advanced resource filtering and sorting.
* Pagination for larger resource collections.
* Resource bookmarking and favorites.
* Duplicate-link detection.
* Password reset functionality.
* Improved validation and rate limiting.
* Automated testing and CI/CD.
* Resource analytics.
* Improved accessibility and mobile optimization.

## Repository

GitHub:

https://github.com/Dileep1408/TechShelf

## License

This project is currently intended as a club/student project. Add a `LICENSE` file to the repository if the project is intended for public reuse or distribution.
