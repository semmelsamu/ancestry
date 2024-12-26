import { parseYaml } from "obsidian";

export default function extractFrontmatter(content: string) {
	// Match YAML frontmatter block
	const match = content.match(/^---\n([\s\S]*?)\n---/);

	if (!match) {
		return null; // No frontmatter found
	}

	try {
		return parseYaml(match[1]);
	} catch (err) {
		console.error("Failed to parse YAML frontmatter", err);
		return null;
	}
}
