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
			path: person.path,
			parents: [],
			children: [],
			siblings: [],
		});
	});

	// Link the persons with the data provided
	result.forEach((thisPerson: Person) => {
		// Attach our parents to us
		getRaw(thisPerson.label).parents?.forEach((parentLabel: any) => {
			const parent = getReference(parentLabel);
			if (parent) thisPerson.parents.push(parent);
		});

		// Attach our children to us
		getRaw(thisPerson.label).children?.forEach((childLabel: any) => {
			const child = getReference(childLabel);
			if (child) thisPerson.children.push(child);
		});

		// Attach our siblings to us
		getRaw(thisPerson.label).siblings?.forEach((siblingLabel: any) => {
			const sibling = getReference(siblingLabel);
			if (sibling) thisPerson.siblings.push(sibling);
		});
	});

	// Automatically calculate the remaining references
	result.forEach((thisPerson: Person) => {
		// Also attach us to the list of our parent's children
		thisPerson.parents.forEach((parent: Person) => {
			if (!parent.children.includes(thisPerson)) {
				parent.children.push(thisPerson);
			}
		});

		// Also attach us to the list of our children's parents
		thisPerson.children.forEach((child: Person) => {
			if (!child.parents.includes(thisPerson)) {
				child.parents.push(thisPerson);
			}
		});

		// Also attach us to the list of our sibling's siblings
		thisPerson.siblings.forEach((sibling: Person) => {
			if (!sibling.siblings.includes(thisPerson)) {
				sibling.siblings.push(thisPerson);
			}
		});

		// For each sibling we have, also add our siblings to
		// the list of its siblings
		thisPerson.siblings.forEach((sibling: Person) => {
			thisPerson.siblings.forEach((siblingToAdd: Person) => {
				if (siblingToAdd == sibling) return;
				if (!sibling.siblings.includes(siblingToAdd)) {
					sibling.siblings.push(siblingToAdd);
				}
			});
		});
	});

	console.log(result);

	return result;
}
