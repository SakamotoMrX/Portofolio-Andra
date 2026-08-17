"use client";

import DeviceCard from "./DeviceCard";
import EqStrip from "./EqStrip";

export default function SetupGrid() {
  const { setup } = require("@/data/setup");

  return (
    <section id="setup" className="w-full py-12 md:py-16 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-accent font-mono mb-2">
          <span>$</span>
          <span>cat ~/.config/setup.txt</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-white">My Audio Chain & Workspace</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8">
        {/* Chain devices - top 2 */}
        {setup.chain.slice(0, 2).map((device, i) => (
          <DeviceCard key={i} {...device} />
        ))}
        {/* Bottom 2 */}
        {setup.chain.slice(2, 4).map((device, i) => (
          <DeviceCard key={i + 2} {...device} />
        ))}
      </div>

      {/* EQ Strip - full width below */}
      <EqStrip
        preset={setup.eq.preset}
        source={setup.eq.source}
        bands={setup.eq.bands}
      />
    </section>
  );
}
