import renderWikilinks from "@/utilities/renderWikilinks";

export default function renderSiblings(person: Person, el: any) {
	const result = el.createEl("p");

	result.createEl("strong", { text: "Siblings: " });

	let siblings: Person[] = getSiblings(person);

	if (siblings.length < 1) {
		result.appendChild(document.createTextNode("Unknown"));
		return;
	}

	renderWikilinks(
		siblings.map((p: any) => p.label),
		result
	);
}

function getSiblings(person: Person) {
	return Array.from(
		new Set(person.parents.flatMap((parent: any) => parent.children))
	).filter((sibling: Person) => sibling.label !== person.label);
}
