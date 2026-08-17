"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Button from "@/components/Button";
import FixedButton from "@/components/FixedButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import Card from "@/components/spotify/card";
import { HitCircle, TrackChip } from "@/components/rhythm";
import { EqBar } from "@/components/EqBar";
import { ReadingGrid } from "@/components/reading";
import { music } from "@/data/music";
import { reading } from "@/data/reading";
import EqStrip from "@/components/setup/EqStrip";

export default function Page() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <main className="overflow-hidden">
      <FixedButton href="/#home">
        <FontAwesomeIcon icon={faChevronLeft} className="text-white" />
      </FixedButton>

      {/* Hero section */}
      <section className="relative h-screen flex items-center justify-center px-4 md:px-8 overflow-hidden">
        <div className="z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-8xl font-bold text-white mb-6">
            Interests & Media
          </h1>
          <p className="text-base sm:text-xl mt-4 tracking-wider text-white/60 leading-[1.6rem]">
            Audio, rhythm games, and what I&rsquo;m reading
          </p>
          <div className="mt-8">
            <Button variation="secondary" onClick={() => window.scrollTo({ top: 800, behavior: "smooth" })}>
              Scroll Down
            </Button>
          </div>
        </div>
      </section>

      {/* Spotify Now Playing */}
      <section className="py-10 px-4 md:px-8 max-w-4xl mx-auto">
        <div className="mb-6 flex items-center gap-2 text-accent font-mono">
          <span>$</span>
          <span>now-playing</span>
        </div>
        <Card />
      </section>

      {/* Rhythm Section */}
      <section className="py-10 px-4 md:px-8 max-w-5xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-accent-2 font-mono">
            <span>$</span>
            <span>cat ~/.config/rhythm.txt</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white">Osu! & Rhythm Games</h2>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-10">
          <div className="flex flex-wrap justify-center gap-6">
            {[1, 2, 3, 4].map((i) => (
              <HitCircle key={i} radius={64} />
            ))}
          </div>
          <div className="flex-1 min-w-0">
            <div className="mb-4 text-white/40">
              <p className="text-sm">My current top tracks:</p>
              <div className="space-y-2">
                {music.topTracks.slice(0, 3).map((track, i) => (
                  <TrackChip key={i} {...track} />
                ))}
              </div>
            </div>
            <div className="text-white/40 text-xs mt-4">
              <p className="mb-1">Listening habits:</p>
              <p>{music.habits.weeklyHours} hours/week • {music.habits.playlists} playlists</p>
            </div>
          </div>
        </div>
      </section>

      {/* Genres */}
      <section className="py-10 px-4 md:px-8 max-w-4xl mx-auto border-t border-white/5">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-white mb-4">Genres</h3>
          <div className="flex flex-wrap gap-2">
            {music.genres.map((genre, i) => (
              <div key={i} className="glass-static px-3 py-1.5 rounded-lg text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-white/60">{genre.name}</span>
                  <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-accent-2" style={{ width: `${genre.pct}%` }} />
                  </div>
                  <span className="text-white/40 text-xs">{genre.pct}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reading List */}
      <section className="py-10 px-4 md:px-8 max-w-6xl mx-auto border-t border-white/5">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-accent font-mono mb-2">
            <span>$</span>
            <span>cat ~/books/reading-list.md</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white">Currently Reading</h2>
        </div>
        <ReadingGrid items={reading} />
      </section>

      {/* Habits Summary */}
      <section className="py-10 px-4 md:px-8 max-w-4xl mx-auto border-t border-white/5">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-white mb-4">Listening Habits</h3>
          <div className="glass-static p-6 rounded-xl">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <div className="text-3xl font-bold text-accent-2">{music.habits.weeklyHours}h</div>
                <div className="text-sm text-white/40">weekly listening</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-accent-2">{music.habits.playlists}</div>
                <div className="text-sm text-white/40">active playlists</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-accent-2">12+</div>
                <div className="text-sm text-white/40">hours archived</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EQ Setup */}
      <section className="py-10 px-4 md:px-8 max-w-4xl mx-auto border-t border-white/5">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-accent font-mono">
            <span>$</span>
            <span>cat ~/.config/audio/eq.txt</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Equalizer Profile</h2>
        </div>
        <EqStrip
          preset={music.habits.eq.split(" ")[0] || "Oratory1990 / Harman Target"}
          source={music.habits.eq.includes("EqualizerAPO") ? "EqualizerAPO + Peace" : "Built-in"}
          bands={[
            { freq: 20, gain: 0 }, { freq: 40, gain: 1.5 }, { freq: 80, gain: 2.5 },
            { freq: 160, gain: 2 }, { freq: 315, gain: 1 }, { freq: 630, gain: 0.5 },
            { freq: 1250, gain: 0 }, { freq: 2500, gain: -0.5 }, { freq: 5000, gain: -1 },
            { freq: 8000, gain: -0.5 }, { freq: 12000, gain: 0 }
          ]}
        />
      </section>
    </main>
  );
}
