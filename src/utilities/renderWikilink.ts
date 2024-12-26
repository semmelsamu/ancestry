/**
 * Create a wikilink and append it to the node.
 * @param href The href / text of the wikilink
 * @param el The element to append the created wikilink to
 */
export default function renderWikilink(
	href: string,
	el: HTMLElement
): HTMLElement {
	return el.createEl("a", {
		text: href,
		href: href,
		cls: "internal-link",
	});
}
