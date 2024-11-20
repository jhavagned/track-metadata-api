Track Meta Finder API
Track Meta Finder is a backend API that allows users to search for songs and retrieve metadata such as title, artist, album, year, genre, and BPM. The API connects to a MongoDB database to store and retrieve song data.

Features
Search for songs by title and artist.
Retrieve song metadata including title, artist, album, year, genre, and BPM.
MongoDB-based database storage for song metadata.
RESTful API endpoints to interact with song data.
Technologies Used
Node.js: JavaScript runtime environment.
Express.js: Web framework for building the API.
MongoDB (via MongoDB Atlas): Cloud-based database for storing song metadata.
Mocha: Testing framework for running unit tests.
Getting Started
Prerequisites
Before you begin, ensure you have the following installed:

Node.js
MongoDB Atlas (for database hosting)
npm (Node.js package manager)
Clone the Repository
To clone the repository, run the following commands:

```bash
git clone https://github.com/jhavagned/track-meta-finder.git
cd track-meta-finder
```

Install Dependencies
Run the following command to install all required dependencies:

```bash
npm install
```

Set Up Environment Variables
Create a .env file in the root of the project and add the following environment variables:

```makefile
DB_USERNAME=<your-db-username>
DB_PASSWORD=<your-db-password>
DB_NAME=<your-db-name>
APP_NAME=<your-app-name>
PORT=5000
```

Get the Database Credentials
Please email me at dunn.jhavagne@gmail.com to get the credentials for the MongoDB database.

Start the Application
To start the API server in development mode, run:

```bash
npm start
```

The server will be available at http://localhost:5000.

API Endpoints
GET /api/song
Searches for a song by its title and artist.

Example Request:

```bash
GET /api/song?title=Sanko&artist=Timaya
```
Example Response:

```json
{
  "title": "Sanko",
  "artist": "Timaya",
  "album": "Epiphany",
  "year": 2014,
  "genre": "Afrobeats",
  "bpm": 103.004
}
```

Error Handling
404: If the song is not found, the API will log the query and respond with a message.
400: If the title or artist is not provided in the query.

Running Tests
To run the tests for this API, use the following command:

```bash
npm test
```
Mocha will run the test suite and output the results.

License
This project is licensed under the MIT License - see the LICENSE file for details.
