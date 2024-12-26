import renderWikilink from "@/utilities/renderWikilink";
import renderWikilinks from "@/utilities/renderWikilinks";

export default function renderParents(person: Person, el: any) {
	const result = el.createEl("p");

	result.createEl("strong", { text: "Parents: " });

	if (person.parents.length < 1) {
		result.appendChild(document.createTextNode("Unknown"));
		return;
	}

	renderWikilinks(
		person.parents.map((p: any) => p.label),
		result
	);
}
