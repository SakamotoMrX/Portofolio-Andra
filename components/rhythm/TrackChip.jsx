export default function TrackChip({ title, artist, playCount }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group cursor-pointer">
      <div className="flex-1 min-w-0">
        <div className="font-medium text-white group-hover:text-accent transition-colors truncate">
          {title}
        </div>
        <div className="text-sm text-white/50 truncate">
          {artist}
        </div>
      </div>
      <div className="flex items-center gap-3 pl-3 border-l border-white/10">
        <span className="text-xs text-white/40 whitespace-nowrap">
          {playCount} plays
        </span>
        <span className="text-xs text-white/20 opacity-0 group-hover:opacity-100 transition-opacity">
          ▶
        </span>
      </div>
    </div>
  );
}
