import { Plugin, MarkdownView, MarkdownPostProcessorContext } from "obsidian";
import parse from "./parse";
import build from "./build";
import renderChildren from "./renderers/renderChildren";
import renderParents from "./renderers/renderParents";

export default class Genmap extends Plugin {
	//**************************************************************************
	//
	//  Attributes
	//
	//**************************************************************************

	/**
	 * Our internal map of the family tree.
	 */
	private genmap: any = [];

	//**************************************************************************
	//
	//  Main entry point
	//
	//**************************************************************************

	/**
	 * Main entry point for the plugin.
	 */
	async onload() {
		// Hello world
		console.log(`Loading ${this.manifest.name} v${this.manifest.version}`);

		// Load settings
		// await this.loadSettings();

		// Load settings UI
		// this.addSettingTab(new SettingsTab(this.app, this));

		// this.renderer = new Renderer(this);

		// Event listeners for index updating
		this.registerIndexingEvents();

		// Register the family tree renderer
		this.registerMarkdownCodeBlockProcessor("genmap", (source, el, ctx) => {
			this.render(source, el, ctx);
		});

		/*
		this.registerView(FAMILY_TREE_VIEW, (leaf) => new FamilyTreeView(leaf));

		const ribbonIconEl = this.addRibbonIcon(
			"network",
			"Open family tree",
			(evt: MouseEvent) => {
				// Called when the user clicks the icon.
				this.openFamilyTree();
			}
		);
        */
	}

	//**************************************************************************
	//
	//  Vault Indexing
	//
	//**************************************************************************

	private registerIndexingEvents() {
		this.app.workspace.onLayoutReady(() => {
			this.indexVault();
		});
		this.registerEvent(
			this.app.vault.on("modify", () => {
				this.indexVault();
			})
		);
		this.registerEvent(
			this.app.vault.on("delete", () => {
				this.indexVault();
			})
		);
		this.registerEvent(
			this.app.vault.on("rename", () => {
				this.indexVault();
			})
		);
	}

	public async indexVault() {
		this.genmap = build(await parse());

		// Re-render the genmap in the active view with the new data
		app.workspace
			.getActiveViewOfType(MarkdownView)
			?.previewMode.rerender(true);
	}

	private async getPerson(person: string): Promise<any> {
		return this.genmap.find((p: any) => p.label == person);
	}

	//**************************************************************************
	//
	//  Rendering
	//
	//**************************************************************************

	async render(
		source: string,
		el: HTMLElement,
		ctx: MarkdownPostProcessorContext
	) {
		// Convert the source string to an array
		let sources = source.split(/[\s,]+/).filter((s) => s.trim() != "");
		if (sources.length == 0) sources = ["parents", "children"];

		// Add Loading Text
		el.createDiv().createEl("p", { text: "Loading..." });

		try {
			// Extract Person Name
			const label = ctx.sourcePath.substring(
				0,
				ctx.sourcePath.length - 3
			);

			// Fetch Data
			const person = await this.getPerson(label);

			// Remove Loading Text
			el.replaceChildren();

			// Render
			if (sources.includes("parents")) renderParents(person, el);
			if (sources.includes("children")) renderChildren(person, el);
		} catch (error) {
			// Remove Loading Text
			el.replaceChildren();
			// Render error message
			el.createDiv().createEl("pre", { text: "Genmap Error: " + error });
		}
	}

	//**************************************************************************
	//
	//  Settings
	//
	//**************************************************************************

	/**
	 * Load settings from the disk. Use the default settings if no settings are
	 * found.
	 */
	// async loadSettings() {
	// 	this.settings = Object.assign(
	// 		{},
	// 		DEFAULT_SETTINGS,
	// 		await this.loadData()
	// 	);
	// }

	// /**
	//  * Save settings to the disk
	//  */
	// async saveSettings() {
	// 	await this.saveData(this.settings);
	// }

	//**************************************************************************
	//
	//  Views
	//
	//**************************************************************************

	/*
	async openFamilyTree() {
		const leaf = this.app.workspace.getLeaf(true);
		await leaf.setViewState({
			type: FAMILY_TREE_VIEW,
			active: true,
		});
		this.app.workspace.revealLeaf(leaf);
	}
    */
}
