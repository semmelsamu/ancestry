import Genmap from "@/main";

export {};

declare global {
	interface Window {
		/**
		 * The current genmap instance.
		 */
		genmap: Genmap | undefined;
	}
}
