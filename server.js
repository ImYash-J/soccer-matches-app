  // server.js
import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const PORT = 3000;

app.use(cors());

app.get('/api/matches', async (req, res) => {
  try {
    const response = await fetch('https://www.scorebat.com/video-api/v3/');
    const json = await response.json();

    const matches = json.response.map(event => {
      const title = event.title || 'Unknown vs Unknown';
      const date = event.date || 'Unknown Date';
      const competition = event.competition || 'Unknown Competition';

      return {
        teams: title.trim(), // example: "ASEAN A. vs Manchester United"
        competition,
        date
      };
    });

    res.json(matches);
  } catch (error) {
    console.error('Error fetching matches:', error);
    res.status(500).json({ error: 'Failed to fetch matches' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
