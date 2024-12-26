import renderWikilink from "@/utilities/renderWikilink";
import renderWikilinks from "@/utilities/renderWikilinks";

export default function renderChildren(person: Person, el: any) {
	if (person.children.length < 1) return;

	const childrenParagraph = el
		.createEl("div")
		.createEl("p", { text: "Kinder: " });

	let children: any = [];

	person.children.forEach((child: any) => {
		const [otherParent] = child.parents
			.filter((parent: any) => parent.label != person.label)
			.map((parent: any) => parent.label);

		if (!children[otherParent]) children[otherParent] = [];

		children[otherParent].push(child);
	});

	Object.entries(children).forEach(([key, value]: any, index) => {
		renderWikilinks(
			value.map((person: any) => person.label),
			childrenParagraph
		);

		if (!key || key == "undefined") {
			childrenParagraph.appendChild(
				document.createTextNode(" (unbekanntes anderes Elternteil)")
			);
		} else {
			childrenParagraph.appendChild(document.createTextNode(" (mit "));

			renderWikilink(key, childrenParagraph);

			childrenParagraph.appendChild(document.createTextNode(")"));
		}

		if (index < Object.entries(children).length - 1) {
			childrenParagraph.appendChild(document.createTextNode("; "));
		}
	});
}
