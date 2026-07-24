import Link from "next/link";

const Button = ({ children, variation, href, onClick, className = "", ...props }) => {
	const baseStyles = `inline-block cursor-pointer title mr-3 px-8 py-2.5 shadow-md transition duration-300 ease-in-out text-center select-none ${
		variation === "primary"
			? "glass-btn"
			: "glass-btn-outline"
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
