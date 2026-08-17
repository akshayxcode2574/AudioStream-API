AudioStream API  

A RESTful backend for a music streaming platform, built with Node.js, Express, and MongoDB. This project focuses purely on backend engineering — authentication, role-based authorization, file handling, and relational data modeling using Mongoose.

Overview
AudioStream API powers the core functionality of a music streaming service: user accounts with role-based access (listeners vs. artists), music/album uploads with cloud file storage, and structured relational data between users, music tracks, and albums.

Tech Stack
	•	Runtime: Node.js
	•	Framework: Express.js
	•	Database: MongoDB with Mongoose ODM
	•	Authentication: JWT (JSON Web Tokens) + cookie-parser
	•	Password Security: bcryptjs
	•	File Uploads: Multer (memory storage)
	•	Cloud Storage: ImageKit
  
Features

	Authentication & Authorization
	•	User registration and login with hashed passwords (bcryptjs)
	•	JWT-based session handling via HTTP cookies
	•	Role-based access control — user and artist roles
	•	Custom middleware (authUser, authArtist) to protect routes by role
  
	Music & Album Management
	•	Artists can upload music files (streamed to ImageKit via Multer’s in-memory storage)
	•	Artists can create albums and link tracks to them
	•	Any authenticated user can fetch all music, all albums, or a single album by ID
	•	Mongoose relations (ref + populate) link albums to their artist and tracks
  
	Data Modeling
	•	User: username, email, password, role (user / artist, defaults to user)
	•	Music: file URI, title, artist reference
	•	Album: title, array of music references, artist reference
  
Project Structure

src/
├── controllers/
│   ├── auth.controller.js      # register, login, logout
│   └── music.controller.js     # create/fetch music & albums
├── db/
│   └── db.js                   # MongoDB connection
├── middlewares/
│   └── auth.middleware.js      # authUser, authArtist
├── models/
│   ├── user.model.js
│   ├── music.model.js
│   └── album.model.js
├── routes/
│   ├── auth.routes.js
│   └── music.routes.js
├── services/
│   └── storage.services.js     # ImageKit upload logic
└── app.js                      # Express app config
server.js                       # Entry point

API Endpoints:
Auth Routes (/api/auth)
|Method|Endpoint   |Description             |Access|
|------|-----------|------------------------|------|
|POST  |`/register`|Register a new user     |Public|
|POST  |`/login`   |Log in and receive JWT  |Public|
|POST  |`/logout`  |Log out and clear cookie|Public|

Music Routes (/api/music)
|Method|Endpoint          |Description                         |Access       |
|------|------------------|------------------------------------|-------------|
|POST  |`/upload`         |Upload a music file                 |Artist only  |
|POST  |`/album`          |Create a new album                  |Artist only  |
|GET   |`/`               |Get all music tracks                |Authenticated|
|GET   |`/albums`         |Get all albums                      |Authenticated|
|GET   |`/albums/:albumId`|Get a single album (with population)|Authenticated|

Getting Started
Prerequisites
	•	Node.js installed
	•	MongoDB instance (local or Atlas)
	•	ImageKit account (for file storage)
  
Installation
git clone https://github.com/akshayxcode2574/AudioStream-API.git
cd AudioStream-API
npm install

Environment Variables
Create a .env file in the root directory with the following:
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint

Run the Server : node server.js

The server will start on http://localhost:3000
