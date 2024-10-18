export interface Settings {
	/**
	 * The label from where to pull the parents of a note.
	 */
	parentLabel: string;
}

export const DEFAULT_SETTINGS: Partial<Settings> = {
	parentLabel: "Parent",
};
