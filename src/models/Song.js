// src/models/Song.js
import mongoose from 'mongoose';

/**
 * Song Schema for Search Functionality
 * 
 * This schema defines the structure of the song documents in the MongoDB database.
 * It includes only the essential fields required for search purposes: `title` and `artist`.
 */

const songSchema = new mongoose.Schema({
  /**
   * Title of the song.
   * This field is required, trimmed of any leading or trailing whitespace, and indexed for faster searches.
   */
  title: {
    type: String,
    required: true,
    trim: true, // Removes leading and trailing whitespace
  },

  /**
   * Artist of the song.
   * This field is required, trimmed of any leading or trailing whitespace, and indexed for faster searches.
   */
  artist: {
    type: String,
    required: true,
    trim: true, // Removes leading and trailing whitespace
  },
});

/**
 * Compound Index:
 * A compound index on the `title` and `artist` fields improves query performance
 * for searches that filter by both title and artist. This is especially useful for
 * lookups where users are searching for songs with specific titles and artists.
 */
songSchema.index({ title: 1, artist: 1 });

// Export the model based on the songSchema for use in the application.
export default mongoose.model('Song', songSchema);
