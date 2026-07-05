# Contributing to MagicStudio Proxy

First off, thank you for considering contributing to this project!

## Development Setup

1. Fork and clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env` and fill in your details.
4. Run the development server:
   ```bash
   npm run dev
   ```

## Code Standards

- This project uses **ESLint** and **Prettier** to maintain code quality.
- Before submitting a Pull Request, please ensure your code passes linting:
  ```bash
  npm run lint
  ```
- If you make changes to the custom queue system or core logic, please run or add tests:
  ```bash
  npm test
  ```

## Submitting Pull Requests

1. Create a new branch for your feature or bug fix.
2. Make your changes and commit them with clear, descriptive messages.
3. Push to your fork and submit a Pull Request to the `main` branch.
4. Ensure all CI checks pass.
