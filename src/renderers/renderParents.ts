import renderWikilink from "@/utilities/renderWikilink";
import renderWikilinks from "@/utilities/renderWikilinks";

export default function renderParents(person: Person, el: any) {
	if (person.parents.length < 1)
		return el.createEl("div").createEl("p", { text: "Eltern: unbekannt" });

	renderWikilinks(
		person.parents.map((p: any) => p.label),
		el.createEl("div").createEl("p", { text: "Eltern: " })
	);
}
