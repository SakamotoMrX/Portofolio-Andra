import projectsData from "@/json/data.json";

export async function generateMetadata({ params }) {
	const { slug } = await params;
	const project = projectsData.Projects.find((p) => p.slug === slug);

	if (!project) {
		return { title: "Not Found | Andra" };
	}

	return {
		title: `${project.title} | Andra`,
		description: Array.isArray(project.desc) ? project.desc[0] : project.desc,
	};
}

export default function ProjectDetailLayout({ children }) {
	return <>{children}</>;
}
