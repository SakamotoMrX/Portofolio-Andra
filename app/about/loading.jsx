export default function Loading() {
	return (
		<div className="fixed inset-0 flex justify-center items-center bg-[#0a0e27] z-[999]">
			<div className="flex flex-col items-center gap-5">
				<div className="w-10 h-10 border-2 border-teal-400/30 border-t-teal-400 rounded-full animate-spin" />
				<p className="text-white/40 text-sm font-mono tracking-widest uppercase">Loading</p>
			</div>
		</div>
	);
}
