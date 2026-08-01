import { motion } from "framer-motion";
import PropTypes from "prop-types";

export default function Hr({ variant }) {
	if (variant === "long") {
		return (
			<>
				<motion.div
					className="bg-gray-700 w-28 h-1 rounded-full mb-3 self-start"
					style={{ originX: 0 }}
					initial={{ scaleX: 0 }}
					whileInView={{ scaleX: 1 }}
					viewport={{ once: true, amount: 0.5 }}
					transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}></motion.div>
				<motion.div
					className="bg-gray-700 w-28 h-1 rounded-full self-start"
					style={{ originX: 0 }}
					initial={{ scaleX: 0 }}
					whileInView={{ scaleX: 1 }}
					viewport={{ once: true, amount: 0.5 }}
					transition={{ delay: 0.45, duration: 0.7, ease: "easeOut" }}></motion.div>
			</>
		);
	}

	return (
		<div className="flex justify-center items-center flex-col my-5">
			<motion.div
				className="bg-gray-700 w-20 h-1 rounded-full mb-2"
				initial={{ scaleX: 0 }}
				whileInView={{ scaleX: 1 }}
				viewport={{ once: true, amount: 0.5 }}
				transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}></motion.div>
			<motion.div
				className="bg-gray-700 w-20 h-1 rounded-full"
				initial={{ scaleX: 0 }}
				whileInView={{ scaleX: 1 }}
				viewport={{ once: true, amount: 0.5 }}
				transition={{ delay: 0.35, duration: 0.6, ease: "easeOut" }}></motion.div>
		</div>
	);
}

Hr.propTypes = {
	variant: PropTypes.oneOf(["short", "long"]),
};

Hr.defaultProps = {
	variant: "short",
};
