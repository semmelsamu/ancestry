import { Person } from "@/types/person";
import getLocale from "@/utilities/getLocale";
import renderPersons from "@/utilities/renderPersons";

export default function renderSiblings(person: Person, el: any) {
	const result = el.createEl("p");

	result.createEl("strong", { text: `${getLocale("siblings")}: ` });

	// Siblings may be calculated straight up from the calculation over the
	// parents or already be hardcoded in the person.
	let siblings = [...calculateSiblings(person), ...person.siblings];

	// Make sure every sibling is unique
	siblings = Array.from(new Set(siblings));

	if (siblings.length < 1) {
		result.appendChild(document.createTextNode(getLocale("unknown")));
		return;
	}

	renderPersons(siblings, result);
}

function calculateSiblings(person: Person) {
	return Array.from(
		new Set(person.parents.flatMap((parent: any) => parent.children))
	).filter((sibling: Person) => sibling.label !== person.label);
}
