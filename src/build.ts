import { Person } from "./types/person";

/**
 * Takes the parsed data and builds the genmap.
 */
export default function build(data: any): Person[] {
	let result: Person[] = [];

	// Utility functions
	function getReference(label: string) {
		return result.filter((p: any) => p.label == label)[0];
	}
	function getRaw(label: string) {
		return data.filter((p: any) => p.label == label)[0];
	}

	// Add the parsed data (not yet linked)
	data.forEach((person: any) => {
		result.push({
			label: person.label,
			parents: [],
			children: [],
		});
	});

	// Link the persons with the data provided
	result.forEach((thisPerson: Person) => {
		getRaw(thisPerson.label).parents?.forEach((parentLabel: any) => {
			thisPerson.parents.push(getReference(parentLabel));
		});

		getRaw(thisPerson.label).children?.forEach((childLabel: any) => {
			thisPerson.children.push(getReference(childLabel));
		});
	});

	// Automatically calculate the remaining references
	result.forEach((thisPerson: Person) => {
		thisPerson.parents.forEach((parent: Person) => {
			if (!parent.children.includes(thisPerson)) {
				parent.children.push(thisPerson);
			}
		});

		thisPerson.children.forEach((child: Person) => {
			if (!child.parents.includes(thisPerson)) {
				child.parents.push(thisPerson);
			}
		});
	});

	return result;
}
