import { Person } from "@/types/person";
import getLocale from "@/utilities/getLocale";
import renderPersons from "@/utilities/renderPersons";

export default function renderSiblings(person: Person, el: any) {
	const result = el.createEl("p");

	result.createEl("strong", { text: `${getLocale("siblings")}: ` });

	let siblings: Person[] = getSiblings(person);

	if (siblings.length < 1) {
		result.appendChild(document.createTextNode(getLocale("unknown")));
		return;
	}

	renderPersons(siblings, result);
}

function getSiblings(person: Person) {
	return Array.from(
		new Set(person.parents.flatMap((parent: any) => parent.children))
	).filter((sibling: Person) => sibling.label !== person.label);
}
