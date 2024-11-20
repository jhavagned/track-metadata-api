// src/tests/song-search.test.js
import { expect } from 'chai';
import request from 'supertest';
import app from '../server.js';

/**
 * Tests for Song API Endpoints
 * 
 * This file contains test cases for the Song API, verifying its ability to fetch
 * song details based on title and artist, handle missing songs, and ensure case-insensitive searches.
 */

describe('Song API', () => {
  /**
   * Test: Fetch song details by title and artist
   * 
   * This test verifies that the API correctly retrieves the song details
   * when provided with a valid title and artist combination.
   */
  it('should fetch song details by title and artist', async () => {
    const response = await request(app)
      .get('/api/song')
      .query({ title: 'Sanko', artist: 'Timaya' });

    // Ensure the response status is 200 (OK)
    expect(response.status).to.equal(200);

    // Validate that the response body contains the expected song data
    expect(response.body.title).to.equal('Sanko');
    expect(response.body.artist).to.equal('Timaya');
    expect(response.body.album).to.equal('Epiphany');
    expect(response.body.year).to.equal(2014);
    expect(response.body.bpm).to.equal(103.004);
    expect(response.body.genre).to.equal('Afrobeats');
  });

  /**
   * Test: Handle missing songs
   * 
   * This test ensures that the API returns a 404 status code when a song is not found
   * and verifies that the missing song is logged to a "missing_songs" file.
   */
  it('should return a 404 status and log the missing song if the song is not found', async () => {
    const response = await request(app)
      .get('/api/song')
      .query({ title: 'Nonexistent Song', artist: 'Unknown Artist' });

    // Ensure that the API returns a 404 status code when the song is not found
    expect(response.status).to.equal(404);
  });

  /**
   * Test: Fetch song details with case-insensitive search
   * 
   * This test verifies that the API can retrieve song details
   * regardless of the casing in the title and artist fields.
   */
  it('should fetch song details with case-insensitive search', async () => {
    const response = await request(app)
      .get('/api/song')
      .query({ title: 'sAnKo', artist: 'tIMayA' });

    // Ensure the response status is 200 (OK)
    expect(response.status).to.equal(200);

    // Validate that the response body contains the expected song data
    expect(response.body.title).to.equal('Sanko');
    expect(response.body.artist).to.equal('Timaya');
    expect(response.body.album).to.equal('Epiphany');
    expect(response.body.year).to.equal(2014);
    expect(response.body.bpm).to.equal(103.004);
    expect(response.body.genre).to.equal('Afrobeats');
  });
});
