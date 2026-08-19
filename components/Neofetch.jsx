"use client";

import { neofetchData } from "@/data/neofetch";

export default function Neofetch() {
	const d = neofetchData;

	return (
		<section className="w-full py-10 md:py-12 px-3 sm:px-8 max-w-5xl mx-auto">
			<div className="bg-[#0d0d0d] p-4 sm:p-8 font-mono text-xs sm:text-sm leading-relaxed">
				<pre className="text-cyan-400 select-none mb-4">
{`       ..'
     ,xNMM.
   .OMMMMo
   lMM"
  .;loddo:.  .olloddol;
cKMMMMMMMMMMNWMMMMMMMMMM0:
.KMMMMMMMMMMMMMMMMMMMMMMMWd.
XMMMMMMMMMMMMMMMMMMMMMMMX.
MMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMM
.MMMMMMMMMMMMMMMMMMMMMMMMX.
 kMMMMMMMMMMMMMMMMMMMMMMMMWd.
 'XMMMMMMMMMMMMMMMMMMMMMMMMMMk
  'XMMMMMMMMMMMMMMMMMMMMMMMMK.
    kMMMMMMMMMMMMMMMMMMMMMMd
     ;KMMMMMMMWXXWMMMMMMMk.
       "cooc*"    "*coo'`}
				</pre>

				<div className="mb-2">
					<span className="text-yellow-400 font-bold">{d.user}</span>
					<span className="text-white/50">@</span>
					<span className="text-yellow-400 font-bold">{d.host}</span>
				</div>

				<div className="space-y-0.5 text-white/70">
					<Row label="OS" value={d.os} />
					<Row label="Host" value={d.location} />
					<Row label="Uptime" value={d.uptime} />
					<Row label="Shell" value={d.shell} />
					<Row label="IDE" value={d.ide.join(", ")} />
					<Row label="Languages.Scripting" value={d.languages.scripting.join(", ")} />
					<Row label="Languages.Human" value={d.languages.human.join(", ")} />
					<Row label="Skills.System" value={d.skills.system.join(", ")} />
					<Row label="Skills.WebDev" value={d.skills.webdev.join(", ")} />
					<Row label="Skills.Process" value={d.skills.process.join(", ")} />
					<Row label="Hobbies" value={d.hobbies.join(" • ")} />
					<Row label="Contact.Email" value={d.contact.email} />
					<Row label="Contact.Discord" value={d.contact.discord} />
					<Row label="Contact.Instagram" value={d.contact.instagram} />
					<Row label="Contact.Facebook" value={d.contact.facebook} />
				</div>
			</div>
		</section>
	);
}

function Row({ label, value }) {
	return (
		<div className="flex">
			<span className="text-yellow-400/80 shrink-0 w-[11ch]">{label}</span>
			<span className="text-white/60">{value}</span>
		</div>
	);
}
