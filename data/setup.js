// data/setup.js
// Edit this file to update your audio chain and equalizer settings.

export const setup = {
  chain: [
    {
      role: "DAC",
      name: "Fiio K5 Pro ESS",
      brand: "Fiio",
      specs: ["AK4493S DAC", "USB / optical / coaxial inputs", "6.3mm + 4.4mm outputs"],
      note: "Desktop DAC that doubles as the amp driver for the desk stack."
    },
    {
      role: "AMP",
      name: "L30 II",
      brand: "Topping",
      specs: ["3.5W @ 32Ω", "1.7W @ 300Ω", "RCA outputs"],
      note: "Neutral gain stage — flat response, no coloring."
    },
    {
      role: "IEMs",
      name: "Moondrop Aria 2 (CRINACLE tuning)",
      brand: "Moondrop",
      specs: ["10mm dynamic driver", "Steel + resin shell", "Detachable 2-pin cable"],
      note: "The daily driver for desktop listening."
    },
    {
      role: "Speakers",
      name: "Edifier R1280DBs",
      brand: "Edifier",
      specs: ["42W RMS", "4\" bass drivers", "Bluetooth 5.0 / optical input"],
      note: "Desk speakers for quick reference checks and ambient listening."
    }
  ],
  headphones: [
    {
      name: "AKG K240 Studio",
      brand: "AKG",
      note: "Open-back reference cans for mixing sanity checks."
    },
    {
      name: "Sennheiser HD 560S",
      brand: "Sennheiser",
      note: "Natural, neutral tuning — the benchmark for open-backs."
    }
  ],
  speakers: [
    {
      name: "Edifier R1280DBs",
      brand: "Edifier",
      note: "Primary desk speakers — compact but capable."
    }
  ],
  eq: {
    preset: "Oratory1990 / Harman Target",
    source: "EqualizerAPO + Peace",
    bands: [
      { freq: 20, gain: 0 },
      { freq: 40, gain: 1.5 },
      { freq: 80, gain: 2.5 },
      { freq: 160, gain: 2 },
      { freq: 315, gain: 1 },
      { freq: 630, gain: 0.5 },
      { freq: 1250, gain: 0 },
      { freq: 2500, gain: -0.5 },
      { freq: 5000, gain: -1 },
      { freq: 8000, gain: -0.5 },
      { freq: 12000, gain: 0 }
    ]
  }
};
