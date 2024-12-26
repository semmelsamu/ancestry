import getLocale from "@/utilities/getLocale";
import renderWikilink from "@/utilities/renderWikilink";
import renderWikilinks from "@/utilities/renderWikilinks";

export default function renderChildren(person: Person, el: any) {
	const result = el.createEl("p");

	result.createEl("strong", { text: `${getLocale("children")}: ` });

	if (person.children.length < 1) {
		result.appendChild(document.createTextNode(getLocale("unknown")));
		return;
	}

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
			result
		);

		if (!key || key == "undefined") {
			result.appendChild(
				document.createTextNode(` (${getLocale("unknownOtherParent")})`)
			);
		} else {
			result.appendChild(
				document.createTextNode(` (${getLocale("with")} `)
			);

			renderWikilink(key, result);

			result.appendChild(document.createTextNode(")"));
		}

		if (index < Object.entries(children).length - 1) {
			result.appendChild(document.createTextNode("; "));
		}
	});
}
