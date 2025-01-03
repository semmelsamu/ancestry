import { Person } from "@/types/person";
import renderWikilink from "./renderWikilink";

/**
 * Create wikilinks and append them to the node.
 * @param list The hrefs / texts of the wikilinks
 * @param el The element to append the created wikilinks to
 */
export default function renderPersons(list: Person[], el: HTMLElement) {
	list.forEach((person, index) => {
		renderWikilink(person.label, el);
		if (index < list.length - 1) {
			el.appendChild(document.createTextNode(", "));
		}
	});
}
