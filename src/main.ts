import { Plugin, MarkdownView } from "obsidian";
import { Renderer } from "@/Renderer";
import { Settings, DEFAULT_SETTINGS, SettingsTab } from "@/Settings";
import { Parser } from "./Parser";

export default class Genmap extends Plugin {
	/**
	 * Our internal map of the family tree.
	 */
	private index: any = [];

	/**
	 * The settings of the plugin. What a surprise.
	 */
	settings: Settings;

	/**
	 * The parser for the plugin.
	 */
	private parser: Parser;

	private renderer: Renderer;

	/**
	 * Main entry point for the plugin.
	 */
	async onload() {
		// Hello world
		console.log(`Loading ${this.manifest.name} v${this.manifest.version}`);

		// Load settings
		await this.loadSettings();

		// Load settings UI
		this.addSettingTab(new SettingsTab(this.app, this));

		this.parser = new Parser(this);
		this.renderer = new Renderer(this);

		// Event listeners for index updating
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

		// Register the family tree renderer
		this.registerMarkdownCodeBlockProcessor(
			"ancestry",
			(source, el, ctx) => {
				this.renderer.render(source, el, ctx);
			}
		);

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

	public async indexVault() {
		this.index = await this.parser.all();

		console.log("Index updated");
		console.log(this.index);

		// Rerender
		app.workspace
			.getActiveViewOfType(MarkdownView)
			?.previewMode.rerender(true);
	}

	public async getPerson(name: string) {
		return this.index.find((person: any) => person.name == name);
	}

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
