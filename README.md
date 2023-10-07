# MERN Stack CRUD Operations

Welcome to the MERN Stack CRUD Operations repository! This project is designed to help you understand how to perform CRUD (Create, Read, Update, Delete) operations using the MERN (MongoDB, Express.js, React, Node.js) stack. It provides a simple yet comprehensive example of building a web application with these technologies.

## Table of Contents

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Usage](#usage)

## Introduction

In this repository, you will find a complete MERN stack application that allows you to perform CRUD operations on a sample data entity. The application is structured to help you learn and implement the basic operations required for most web applications.

Key features of this project include:

- MongoDB for data storage.
- Express.js as the backend server.
- React for the frontend user interface.
- Node.js to manage the server-side logic.
- A simple API for creating, reading, updating, and deleting data records.
- User-friendly frontend interfaces for interacting with the data.

Whether you're a beginner looking to learn the MERN stack or an experienced developer seeking a reference project, this repository can be a valuable resource.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm (Node Package Manager) installed on your local machine.
- MongoDB installed and running (you can use a local MongoDB instance or a cloud-based service like MongoDB Atlas).
- A code editor of your choice (e.g., Visual Studio Code, Sublime Text, or Atom).

## Getting Started

Follow these steps to get the project up and running on your local machine:

1. Clone the repository to your local machine using the following command:

   ```bash
   git clone https://github.com/nasarlalu/CRUD.git
   ```

2. Navigate to the project directory:

   ```bash
   cd CRUD
   ```

3. Install the backend dependencies:

   ```bash
   cd client
   cd server
   npm install
   ```

4. Configure the env:
   - Create a `.env.production` and `.env.development`  file in the `client` directory and define your api_url's and node environment
   - Create a `.env.prod` and `.env.prod`  file in the `server` directory and define your MongoDB connection string, port details and node environment

5. Start the backend server:

   ```bash
   npm run server
   ```

6. Open a new terminal window, navigate to the project directory, and install the frontend dependencies:

   ```bash
   cd ../client
   npm install
   ```

7. Start the frontend development server:

   ```bash
   npm start
   ```

8. Your MERN stack CRUD application should now be running. Access it in your web browser. For client `http://localhost:3000` and for server `http://localhost:3001`.

## Project Structure

The project directory is organized as follows:

- `server/`: Contains the Express.js backend application.
- `client/`: Contains the React frontend application.
- `public/`: Contains static assets for the frontend.
- `README.md`: This README file.
- `.gitignore`: Specifies files and directories to be ignored by Git.
- `package.json`: Defines project dependencies and scripts.

## Usage

You can use this project as a starting point for building your own MERN stack applications with CRUD functionality. Study the code, modify it, and adapt it to your specific requirements. Feel free to customize the frontend, backend, and data models to suit your needs.

To perform CRUD operations, use the API endpoints provided by the backend, and integrate them into your frontend components.



Thank you for using the MERN Stack CRUD Operations repository! If you have any questions or need further assistance, please don't hesitate to reach out to me @nasarlalu114@gmail.com. Happy coding!
