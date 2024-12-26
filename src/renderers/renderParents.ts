import { Person } from "@/types/person";
import getLocale from "@/utilities/getLocale";
import renderWikilink from "@/utilities/renderWikilink";
import renderWikilinks from "@/utilities/renderWikilinks";

export default function renderParents(person: Person, el: any) {
	const result = el.createEl("p");

	result.createEl("strong", { text: `${getLocale("parents")}: ` });

	if (person.parents.length < 1) {
		result.appendChild(document.createTextNode(getLocale("unknown")));
		return;
	}

	renderWikilinks(
		person.parents.map((p: any) => p.label),
		result
	);
}
