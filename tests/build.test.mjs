import assert from "node:assert/strict";
import { buildLine, latencyBars, wibTime } from "../lib/build.mjs";

assert.equal(wibTime(new Date("2026-11-15T07:22:00Z")), "14:22");
assert.equal(wibTime(new Date("2026-11-15T07:22:00Z"), true), "15 Nov, 14:22");
// past midnight in Jakarta while still the previous day in UTC
assert.equal(wibTime(new Date("2026-11-14T17:05:00Z"), true), "15 Nov, 00:05");
assert.equal(buildLine({ sha: "2c3a61eea210dca0", at: "2026-11-15T07:22:00Z" }), "commit 2c3a61e, built 15 Nov, 14:22 WIB");
assert.equal(buildLine({}), "local build");
assert.equal(buildLine({ sha: "", at: "" }), "local build");
const bars = latencyBars(
  { a: { state: "up", ms: 200 }, b: { state: "up", ms: 100 }, c: { state: "down" } },
  [{ slug: "a", host: "a.id" }, { slug: "b", host: "b.id" }, { slug: "c", host: "c.id" }, { slug: "d", host: "d.id" }],
);
assert.deepEqual(bars.map((b) => [b.host, b.ms, b.pct]), [["a.id", 200, 100], ["b.id", 100, 50], ["c.id", null, 0], ["d.id", null, 0]]);
assert.deepEqual(latencyBars({}, [{ slug: "a", host: "a.id" }]).map((b) => b.pct), [0]);
console.log("PASS build helpers");
