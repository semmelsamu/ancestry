import { Person } from "@/types/person";
import getLocale from "@/utilities/getLocale";
import renderPersons from "@/utilities/renderPersons";

export default function renderParents(
	person: Person,
	el: any,
	hideEmptyRelations: boolean
): number {
	if (person.parents.length < 1) {
		if (!hideEmptyRelations)
			el.createEl("em", {
				text: `${getLocale("parents")}: ${getLocale("unknown")}`,
			});

		return 0;
	}

	const result = el.createEl("p");

	result.createEl("strong", { text: `${getLocale("parents")}: ` });

	renderPersons(person.parents, result);

	return 1;
}
