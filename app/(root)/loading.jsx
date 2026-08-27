export default function Loading() {
	return (
		<div className="fixed inset-0 flex justify-center items-center bg-[#f6f5f0] z-[999]">
			<div className="flex flex-col items-center gap-5">
				<div className="w-10 h-10 border-2 border-black/15 border-t-black/70 rounded-full animate-spin" />
				<p className="text-black/40 text-sm font-mono tracking-widest uppercase">Loading</p>
			</div>
		</div>
	);
}
