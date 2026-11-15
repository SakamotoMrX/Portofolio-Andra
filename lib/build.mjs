// Small pure helpers for the home page: the build line, the time in Bogor, the latency bars.

const WIB = { timeZone: "Asia/Jakarta", hour: "2-digit", minute: "2-digit", hourCycle: "h23" };

export function wibTime(date, withDay = false) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-GB", withDay ? { ...WIB, day: "numeric", month: "short" } : WIB)
      .formatToParts(date)
      .map((p) => [p.type, p.value]),
  );
  const time = `${parts.hour}:${parts.minute}`;
  return withDay ? `${parts.day} ${parts.month}, ${time}` : time;
}

export function buildLine({ sha, at } = {}) {
  if (!sha || !at) return "local build";
  return `commit ${sha.slice(0, 7)}, built ${wibTime(new Date(at), true)} WIB`;
}

// a host that is down or not checked yet gets no bar, never a 0 ms reading
export function latencyBars(status, hosts) {
  const ms = hosts.map((h) => (status[h.slug]?.state === "up" ? status[h.slug].ms : null));
  const max = Math.max(1, ...ms.filter((m) => m != null));
  return hosts.map((h, i) => ({ host: h.host, ms: ms[i], pct: ms[i] == null ? 0 : Math.round((ms[i] / max) * 100) }));
}
