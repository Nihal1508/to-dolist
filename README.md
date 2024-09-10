# Todo Manager

A simple application to manage todos with basic authentication and GitHub Gist export functionality.

## Prerequisites

- Node.js and npm
- MongoDB installed and running locally
- GitHub account and personal access token

## Setup

1. Clone the repository or download the files.
2. Install the dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add the following:

    ```plaintext
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/todo-manager
    JWT_SECRET=your_jwt_secret
    GITHUB_TOKEN=your_github_token
    ```

4. Start the MongoDB server if it isn't already running:

    ```bash
    mongod
    ```

5. Start the application:

    ```bash
    npm run dev
    ```

6. Open your browser and go to `http://localhost:5000`.
