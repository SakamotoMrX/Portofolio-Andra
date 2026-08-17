"use client";

export default function DeviceCard({ role, name, brand, specs, note }) {
  return (
    <div className="glass-static p-4 rounded-xl border border-white/10 hover:border-accent hover:border-opacity-60 transition-all duration-300">
      <div className="mb-3">
        <div className="text-xs text-accent font-semibold uppercase tracking-wider mb-1">{role}</div>
        <div className="text-white font-medium text-lg">{name}</div>
        <div className="text-white/40 text-sm">{brand}</div>
      </div>
      
      <div className="space-y-1 mb-3">
        {specs.map((spec, i) => (
          <div key={i} className="text-xs text-white/60 font-mono truncate" title={spec}>
            • {spec}
          </div>
        ))}
      </div>
      
      <div className="text-xs text-white/50 italic leading-relaxed">
        {note}
      </div>
    </div>
  );
}
