import Link from "next/link";

const Button = ({ children, variation, href, onClick, className = "", ...props }) => {
	const baseStyles = `inline-block cursor-pointer title mr-3 rounded-2xl px-8 py-2 shadow-md transition duration-300 ease-in-out text-center select-none ${
		variation === "primary"
			? "bg-gray-700 hover:bg-transparent border-transparent hover:border-gray-700 border-2 text-gray-100 hover:text-gray-700 box-border"
			: "bg-transparent border-2 border-gray-700 text-gray-700 hover:bg-gray-700 hover:text-gray-100 box-border"
	} ${className}`;

	if (href) {
		if (href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("#")) {
			return (
				<a href={href} className={baseStyles} onClick={onClick} {...props}>
					{children}
				</a>
			);
		}
		return (
			<Link href={href} className={baseStyles} onClick={onClick} {...props}>
				{children}
			</Link>
		);
	}

	return (
		<button onClick={onClick} className={baseStyles} {...props}>
			{children}
		</button>
	);
};

export default Button;