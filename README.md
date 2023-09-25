# Tipgram Backend

This is the backend repository for the Tipgram, a real-time messaging application built using the MERN (MongoDB, Express.js, React, Node.js) stack. It leverages WebSocket technology to enable real-time messaging between users.

## Technologies Used

- Node.js
- Express.js
- WebSocket: Socket.IO
- MongoDB Atlas

## Local Setup

To run the backend server locally, follow these steps:

### Prerequisites

- Node.js and npm installed on your machine.
- MongoDB installed and running locally or a MongoDB Atlas account for the database (replace with your connection string).

### Clone the Repository

```bash
git clone https://github.com/AnmolDotX/tipgramserver
cd tipgramserver
```

### Configure Environment Variables

Create a `.env` file in the root directory (if not already present) and configure the following environment variables:

```env
PORT=8000
MONGO_URI=your_mongodb_uri
CLIENT_ORIGIN = your_localhost_server
```

- `PORT`: Port on which the server will run locally (e.g., 5000).
- `MONGO_URI`: MongoDB connection URI (replace with your local MongoDB URI or MongoDB Atlas URI).
- `CLIENT_ORIGIN`: localhost url of your frontend (e.g., "http://localhost:5173").

### Install Dependencies

Install the required dependencies:

```bash
npm install
```

### Start the Development Server

Start the development server:

```bash
npm run dev
```

The backend server should now be running locally on the specified port (e.g., http://localhost:8000).

## MongoDB Setup

If you don't have MongoDB installed locally and are using MongoDB Atlas, follow these additional steps:

1. Sign up for a MongoDB Atlas account and create a cluster.

2. Obtain the MongoDB Atlas connection URI.

3. Replace the `MONGO_URI` value in the `.env` file with your MongoDB Atlas connection URI.

## Contributing

Feel free to contribute to this project by opening issues or submitting pull requests. Your contributions are welcome!