type Person = {
	/**
	 * The name of the person.
	 */
	label: string;

	/**
	 * The parents of the person.
	 */
	parents: Person[];

	/**
	 * The children of the person.
	 */
	children: Person[];
};
