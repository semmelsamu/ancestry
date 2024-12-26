import getLocale from "@/utilities/getLocale";
import renderWikilinks from "@/utilities/renderWikilinks";

export default function renderSiblings(person: Person, el: any) {
	const result = el.createEl("p");

	result.createEl("strong", { text: `${getLocale("siblings")}: ` });

	let siblings: Person[] = getSiblings(person);

	if (siblings.length < 1) {
		result.appendChild(document.createTextNode(getLocale("unknown")));
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
