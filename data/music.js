// data/music.js
// Edit this file to update your music preferences and listening habits.

export const music = {
  genres: [
    { name: "Osu! & rhythm game tracks", pct: 30 },
    { name: "Vocaloid / J-core", pct: 25 },
    { name: "Punk & post-hardcore", pct: 20 },
    { name: "Synthwave / electronic", pct: 15 },
    { name: "Lo-fi & instrumental", pct: 10 }
  ],
  artists: [
    { name: "Camellia", note: "Osu! map staples — blistering speedcore." },
    { name: "ishytoc", note: "Vocaloid rock with heavy riffs." },
    { name: "hitorie", note: "Japanese rock — melodic and intense." },
    { name: "PUP", note: "Toronto pop-punk — high-energy anthem factory." },
    { name: "Aimer", note: "Beautiful vocals with synth-rich arrangements." }
  ],
  topTracks: [
    { title: "NANI THE F**K!!", artist: "Camellia", playCount: 482 },
    { title: "Exit This Earth's Atomosphere", artist: "Camellia", playCount: 371 },
    { title: "Surface", artist: "Aimer", playCount: 305 },
    { title: "Moratorium", artist: "hitorie", playCount: 268 },
    { title: "DVP", artist: "PUP", playCount: 241 }
  ],
  habits: {
    weeklyHours: 18,
    playlists: 12,
    setup: "DAC → Topping L30 II → Moondrop Aria 2",
    eq: "Oratory1990 Harman Target via EqualizerAPO"
  }
};
