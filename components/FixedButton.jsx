import Link from "next/link";

const FixedButton = ({ children, href = '/' }) => (
	<Link
		href={href}
		className="fixed top-2 left-2 md:left-10 flex justify-center items-center rounded-full p-3 md:p-4 transition duration-300 ease-in-out z-50 glass-icon"
		aria-label="Go back">
		{children}
	</Link>
);

export default FixedButton;
