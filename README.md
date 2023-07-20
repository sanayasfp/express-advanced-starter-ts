# express-advanced-starter-ts

![Express](https://img.shields.io/badge/Express-4.17.17-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.1.6-blue)

Advanced starter for an Express.js application (API or Web) with TypeScript.

## Table of Contents

- [express-advanced-starter-ts](#express-advanced-starter-ts)
  - [Table of Contents](#table-of-contents)
  - [Description](#description)
  - [Features](#features)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [Configuration](#configuration)
  - [Usage](#usage)
  - [Middlewares](#middlewares)
    - [Batch Middlewares](#batch-middlewares)
  - [Controllers](#controllers)
  - [Features (TODO)](#features-todo)
  - [Contributing](#contributing)
  - [License](#license)

## Description

express-advanced-starter-ts is a feature-rich and advanced starter kit for building robust Express.js applications, whether they are APIs or web applications. The project is implemented using TypeScript to provide type safety and better code maintainability.

This starter kit is designed to streamline the development process and allow developers to focus on building the core features of their applications without worrying about the initial setup and boilerplate code.

## Features

- Integrated TypeScript support for enhanced code quality and maintainability.
- Well-structured and organized project architecture.
- Easy routing and route handling with middleware support.
- Pre-configured middlewares for common tasks like JSON parsing, URL encoding, and more.
- Error handling and global exception management.
- Environment variable management using the Config class.

## Getting Started

### Prerequisites

- Node.js and npm installed on your system.

### Installation

1. Clone the repository:

```plain text
git clone <https://github.com/SanaYasfp/express-advanced-starter-ts.git>

```

2. Install the dependencies:

```sh

cd express-advanced-starter-ts
pnpm install
npm install
yarn

```

1. Run the application:

```sh

pnpm dev
npm run dev
yarn dev

```

The application will be running on port specified in environment file or on port 5000.

## Configuration

The project uses the Config class to manage environment variables and configuration. By default, the application will look for a `.env` file that match `.env.some-text` at the root of the project for configuration. You can also specify a custom path for the configuration file by passing it as an argument when creating a new instance of the Config class.

## Usage

The starter kit provides a Router class to handle routing and route handling. You can define your routes and associate them with corresponding controllers and middlewares.

Here's an example of defining a route for a GET request:

```typescript
import { Router } from './path/to/Router';
import { PostController } from './path/to/controllers/PostController';

Router.get('/posts', PostController.index);
```

You can also apply middlewares to specific routes or groups of routes:

```typescript
import Route from 'Routes/Kernel';
import { PostController } from 'App/Http/Controllers/PostController';
import { AuthMiddleware } from './path/to/middlewares/AuthMiddleware';

export default Route;

Router.get('/posts', 'PostController.index');
Router.post('/posts', PostController.handler(PostController, 'create')).middleware([AuthMiddleware.name]);
```

For more details on how to define routes, middlewares, and controllers, refer to the source code and documentation.

## Middlewares

The project comes with pre-configured middlewares for common tasks such as JSON parsing, URL encoding, and error handling. You can also define your custom middlewares as needed.

### Batch Middlewares

The `Route.batchMiddlewares` method allows you to apply a batch of middlewares to multiple routes at once. This is useful when you want to add the same middleware(s) to a group of routes without duplicating the middleware setup.

Here's an example of how to use `Route.batchMiddlewares`:

```typescript
import UserController from 'App/Http/Controllers/UserController';
import AuthMiddleware from 'App/Http/Middlewares/AuthMiddleware';
import RateLimitMiddleware from 'App/Http/Middlewares/RateLimitMiddleware';
import Route from 'Routes/Kernel';

export default Route;

// Public routes accessible without authentication
Route.post('/login', `${UserController.name}.login`);
Route.post('/register', `${UserController.name}.register`);

// Routes with rate limiting and authentication
Route.batchMiddlewares([RateLimitMiddleware, AuthMiddleware])([
  Route.get('/users', `${UserController.name}.index`),
  Route.get('/users/:id', `${UserController.name}.show`),
  Route.patch('/users/:id', `${UserController.name}.update`),
  Route.delete('/users/:id', `${UserController.name}.destroy`),
]);

// Admin routes with additional authorization check
Route.batchMiddlewares([AuthMiddleware, ({ req, res, next }) => {
  if (req.user?.role !== 'admin') {
    return { message: 'Unauthorized', statusCode: 403 };
  }
  return next();
}])([
  Route.get('/admin/dashboard', 'AdminController.dashboard'),
  Route.get('/admin/users', 'AdminController.listUsers'),
  Route.post('/admin/create-user', 'AdminController.createUser'),
  Route.patch('/admin/users/:id', 'AdminController.updateUser'),
  Route.delete('/admin/users/:id', 'AdminController.deleteUser'),
]);

```

## Controllers

Controllers are responsible for handling the logic of your routes. They should export methods that correspond to the route handlers.

## Features (TODO)

- [x] Integrated TypeScript support for enhanced code quality and maintainability.
- [x] Well-structured and organized project architecture.
- [x] Easy routing and route handling with middleware support.
- [x] Pre-configured middlewares for common tasks like JSON parsing, URL encoding, and more.
- [x] Environment variable management using the Config class.
- [ ] Query validator.
- [ ] Path Params validator.
- [ ] Body validator.
- [ ] Config Validator.
- [ ] Built-in Error handling and global exception management.
- [ ] Database integration (Prisma ORM).
- [ ] Authentication and user management. [Not sure]
- [ ] Authorization and role-based access control. [Not sure]
- [ ] Unit tests and test coverage.
- [ ] API documentation generation.
- [ ] Front-end integration. [Not sure]
- [ ] Docker containerization support.
- [ ] Performance optimization and caching strategies.
- [ ] Logging and log management.
- [ ] Custom error pages and error handling for production.
- [ ] Rate limiting and request throttling.
- [ ] API versioning.
- [ ] Internationalization and localization support. [Not sure]
- [ ] Better File uploads and handling.

Please note that this list is not exhaustive, and there may be additional features or improvements that will be added in the future based on project requirements and contributions from the community.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, feel free to open an issue or submit a pull request.

## License

[MIT License](LICENSE)
