// Copyright (C) 2025 Andra (SakamotoMrX)
// a lime sheet wipes off the screen on every page change (after Aardvark Book Club, House of Honey)
// it is a CSS animation, so it also clears without JavaScript and replays when the template remounts
export default function Template({ children }) {
  return (
    <>
      <div className="wipe" aria-hidden="true" />
      {children}
    </>
  );
}
