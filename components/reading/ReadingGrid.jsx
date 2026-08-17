export default function ReadingGrid({ items }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-6xl">
      {items.map((book, i) => (
        <a
          key={i}
          href={book.url}
          target="_blank"
          rel="noopener noreferrer"
          className="glass-static p-5 rounded-xl hover:border-accent/60 transition-all duration-300 group">
          <div className="mb-3">
            <h3 className="font-bold text-white group-hover:text-accent transition-colors">
              {book.title}
            </h3>
            <p className="text-sm text-white/50">{book.author}</p>
          </div>
          
          <div className="mb-3">
            <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-medium ${
              book.status === "finished"
                ? "bg-green-500/10 text-green-400"
                : "bg-accent/10 text-accent"
            }`}>
              {book.status === "finished" ? "Finished" : "Reading"}
            </span>
          </div>
          
          <p className="text-sm text-white/60 leading-relaxed italic">
            &ldquo;{book.takeaway}&rdquo;
          </p>
          
          <div className="mt-4 flex items-center gap-2 text-xs text-white/40 group-hover:text-accent transition-colors">
            <span className="underline decoration-dotted decoration-white/20 underline-offset-2">
              Read more
            </span>
          </div>
        </a>
      ))}
    </div>
  );
}
