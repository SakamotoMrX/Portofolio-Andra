export default function RepoRow({ name, desc, url, lang, stars }) {
  return (
    <div className="group flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2 rounded-lg hover:bg-white/5 transition-colors">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:text-accent/80 font-mono font-medium truncate"
            title={url || undefined}>
            {name}
          </a>
          {lang && (
            <span className="text-xs text-white/40 bg-white/5 px-1.5 py-0.5 rounded">
              {lang}
            </span>
          )}
        </div>
        <p className="text-xs text-white/50 truncate mt-0.5">{desc}</p>
      </div>
      <div className="flex items-center gap-3 text-xs text-white/40">
        {stars !== undefined && (
          <span className="flex items-center gap-1">
            ★ {stars}
          </span>
        )}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="opacity-0 group-hover:opacity-100 transition-opacity text-white hover:text-accent">
          View
        </a>
      </div>
    </div>
  );
}
