import { Notice, Plugin, WorkspaceLeaf, WorkspaceTabs } from "obsidian";
import { Indexer } from "src/Indexer";
import { Renderer } from "src/Renderer";
import { FAMILY_TREE_VIEW, FamilyTreeView } from "./FamilyTreeView";
import { Settings, DEFAULT_SETTINGS } from "src/Settings";
import { SettingsTab } from "./SettingsTab";

export default class Genmap extends Plugin {
	/**
	 * Singleton
	 */
	public static instance: Genmap;

	settings: Settings;

	/**
	 * Main entry point for the plugin.
	 */
	async onload() {
		// Hello world
		console.log(`Loading ${this.manifest.name} v${this.manifest.version}`);

		// Initialize the singleton
		Genmap.instance = this;

		// Load settings
		await this.loadSettings();

		// Load settings UI
		this.addSettingTab(new SettingsTab(this.app, this));

		// Event listeners for index updating
		this.app.workspace.onLayoutReady(async () => {
			await Indexer.indexVault();
		});
		this.registerEvent(
			this.app.vault.on("modify", () => {
				Indexer.indexVault();
			})
		);
		this.registerEvent(
			this.app.vault.on("delete", () => {
				Indexer.indexVault();
			})
		);
		this.registerEvent(
			this.app.vault.on("rename", () => {
				Indexer.indexVault();
			})
		);

		// Register the family tree renderer
		this.registerMarkdownCodeBlockProcessor("ancestry", Renderer.render);

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
