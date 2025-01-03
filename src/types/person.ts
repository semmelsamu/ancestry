export type Person = {
	/**
	 * The name of the person.
	 */
	label: string;

	/**
	 * The path to the markdown file.
	 */
	path: string;

	/**
	 * The parents of the person.
	 */
	parents: Person[];

	/**
	 * The children of the person.
	 */
	children: Person[];
};
