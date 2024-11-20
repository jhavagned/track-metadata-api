import express from 'express';
import dotenv from 'dotenv';
import connectDB from './utils/db.js';  // Import connection
import Song from './models/Song.js';  // Import the Song model
import fs from 'fs'; // For logging missing songs
import { fileURLToPath } from 'url';  // Import fileURLToPath from 'url' module
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Resolve __dirname in an ESM environment
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json()); // Middleware for parsing JSON

/**
 * Simple route to confirm that the API is working
 * Accessible at the root URL of the application.
 */
app.get('/', (req, res) => {
    res.send('Welcome to Track Meta API!');
});

/**
 * Route for querying tracks by title and artist
 * Expects query parameters for both title and artist.
 * If no song is found, it logs the missing song to a file.
 */
app.get('/api/song', async (req, res) => {
    const { title, artist } = req.query;

    // Check if both title and artist are provided in the query
    if (!title || !artist) {
        return res.status(400).json({
            message: 'Both song title and artist name are required for the search.',
        });
    }

    try {
        // Search for the song in the database, ignoring case using regular expressions
        const song = await Song.findOne({ 
                title: { $regex: new RegExp(title, 'i') }, 
                artist: { $regex: new RegExp(artist, 'i') }
        });

        if (!song) {
            // If no song is found, log the missing song query to a file
            const missingSongLog = {
                title: title, 
                artist: artist,
                date: new Date(),
            };

            // Path where missing songs will be logged
            const logFilePath = path.join(__dirname, 'admin', 'missing_songs.json'); 
            
            // Append the missing song data to the log file
            fs.appendFile(logFilePath, JSON.stringify(missingSongLog, null, 2) + ',\n', (err) => {
                if (err) {
                    console.error('Error logging missing song:', err);
                } else {
                    console.log('Missing song logged successfully.');
                }
            });

            // Respond with a message indicating the song was not found
            return res.status(404).json({
                message: `Sorry, we couldn't find the song "${title}" by ${artist}. We'll update our database soon!`,
            });
        }

        // If song is found, return the song data
        res.status(200).json(song);

    } catch (error) {
        console.error('Error during song search:', error);
        res.status(500).json({ message: 'An error occurred while searching for the song.' });
    }
});

// Export the app so it can be imported for testing
export default app;

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
