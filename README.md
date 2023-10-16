# Read Magic

## Project Description

Read Magic is an innovative online book store application designed to bring the world of literature to your fingertips. With a vast collection of books spanning various genres, this platform allows book enthusiasts to explore, discover, and purchase their favorite reads from the comfort of their own devices. Whether you're into classic literature, contemporary fiction, non-fiction, or anything in between, Read Magic has a book for you. Explore the magic of literature and embark on a journey through the pages of countless stories right from your browser or mobile device.

## Installation Instructions

**Client:**

1. First, navigate to the client directory:
cd client

2. Install the required dependencies by running:
npm install

3. Create a `.env` file inside the `client` folder and add the following values to it:
VITE_SERVER_URL=YOUR_SERVER_URL
Replace `YOUR_SERVER_URL` with the actual server URL you will be using.

4. Start the client application in development mode:
npm run dev

**Server:**

1. Navigate to the server directory:
cd server

2. Install the necessary server-side dependencies by running:
npm install

3. Create a `.env` file inside the `server` folder and add the following environment variables:
NODE_ENV=development
PORT=YOUR_SERVER_PORT
MONGO_URI=YOUR_MONGO_DB_URI
GOOGLE_BOOKS_API=https://www.googleapis.com/books/v1/volumes
ACCESS_TOKEN_SECRET=YOUR_ACCESS_TOKEN_SECRET
REFRESH_TOKEN_SECRET=YOUR_REFRESH_TOKEN_SECRET
Replace the placeholders with your specific configuration details.

4. Start the server in development mode:
npm run dev


## Technologies Used

- **Client:**
- Vite
- React

- **Server:**
- Express.js

## Features

- **Extensive Book Collection**
- **User-Friendly Interface**
- **Search and Recommendations**
- **Secure User Authentication**
- **Online Purchase**
- **Responsive Design**

## Contributing

We welcome contributions from the community to help improve Read Magic. If you'd like to contribute, please follow these guidelines:

1. Fork the repository to your own GitHub account.

2. Create a new branch for your feature or bug fix.

3. Make your changes and commit them with descriptive messages.

4. Push your branch to your fork on GitHub.

5. Open a pull request to the main repository's `main` branch, explaining the changes and their purpose.

Thank you for considering contributing to Read Magic! Your contributions help make this project even better.

## License

This project is licensed under the **MIT License** - see the [LICENSE](./LICENSE) file for details.

## Authors

- [Anish](https://github.com/anish-25)

