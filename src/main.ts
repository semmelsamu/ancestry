import { Plugin, MarkdownView, MarkdownPostProcessorContext } from "obsidian";
import parse from "@/parse";
import build from "@/build";
import { DEFAULT_SETTINGS, Settings, SettingsTab } from "@/settings";
import renderChildren from "@/renderers/renderChildren";
import renderParents from "@/renderers/renderParents";
import renderSiblings from "@/renderers/renderSiblings";

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

	public settings: Settings;

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

		// Attach the app object globally
		window.genmap = this;

		// Load settings
		await this.loadSettings();
		this.addSettingTab(new SettingsTab(this.app, this));

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
		this.reRenderGenmapBlocks();
	}

	private async getPerson(path: string): Promise<any> {
		return this.genmap.find((p: any) => p.path == path);
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
		if (sources.length == 0) sources = ["parents", "children", "siblings"];

		// Add Loading Text
		el.createDiv().createEl("p", { text: "Loading..." });

		try {
			// Fetch Data
			const person = await this.getPerson(ctx.sourcePath);

			// Remove Loading Text
			el.replaceChildren();

			// Render
			if (sources.includes("parents")) renderParents(person, el);
			if (sources.includes("children")) renderChildren(person, el);
			if (sources.includes("siblings")) renderSiblings(person, el);
		} catch (error) {
			// Remove Loading Text
			el.replaceChildren();
			// Render error message
			el.createDiv().createEl("pre", { text: "Genmap Error: " + error });
		}
	}

	reRenderGenmapBlocks() {
		this.app.workspace
			.getActiveViewOfType(MarkdownView)
			?.previewMode.rerender(true);
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
	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData()
		);
	}

	/**
	 * Save settings to the disk
	 */
	async saveSettings() {
		await this.saveData(this.settings);
	}

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
