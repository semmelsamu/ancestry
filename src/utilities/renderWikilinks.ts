import renderWikilink from "./renderWikilink";

/**
 * Create wikilinks and append them to the node.
 * @param list The hrefs / texts of the wikilinks
 * @param el The element to append the created wikilinks to
 */
export default function renderWikilinks(list: string[], el: HTMLElement) {
	list.forEach((href, index) => {
		renderWikilink(href, el);
		if (index < list.length - 1) {
			el.appendChild(document.createTextNode(", "));
		}
	});
}
