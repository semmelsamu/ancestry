import { MarkdownPostProcessorContext } from "obsidian";
import { Util } from "./Util";
import { ChildrenRenderer } from "./Renderers/ChildrenRenderer";
import Genmap from "./main";

/**
 * Gathers all ancestry block rendering.
 */
export class Renderer {
	private plugin: Genmap;

	constructor(plugin: Genmap) {
		this.plugin = plugin;
	}

	/**
	 * Parses an ancestry code block. Will be registered in the app via
	 * registerMarkdownCodeBlockProcessor.
	 * @param source
	 * @param el
	 * @param ctx
	 */
	public async render(
		source: string,
		el: HTMLElement,
		ctx: MarkdownPostProcessorContext
	) {
		// Add Loading Text
		el.createDiv().createEl("p", { text: "Loading..." });

		// Get Person
		let person = ctx.sourcePath.substring(0, ctx.sourcePath.length - 3);

		// Fetch Data
		const data = await this.plugin.getPerson(person);

		if (!data) return;

		// Remove Loading Text
		el.replaceChildren();

		// Render
		ChildrenRenderer.render(data, el);
	}
}
