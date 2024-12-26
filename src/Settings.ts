import Genmap from "@/main";
import { App, PluginSettingTab, Setting } from "obsidian";

export interface Settings {
	/**
	 * The language setting for the application.
	 */
	language: string;
}

export const DEFAULT_SETTINGS: Partial<Settings> = {
	language: "en",
};

export class SettingsTab extends PluginSettingTab {
	plugin: Genmap;

	constructor(app: App, plugin: Genmap) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		let { containerEl } = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName("Language")
			.setDesc("The language to use for the plugin.")
			.addDropdown((dropdown) =>
				dropdown
					.addOptions({
						en: "English (English)",
						de: "German (Deutsch)",
					})
					.setValue(this.plugin.settings.language)
					.onChange(async (value) => {
						this.plugin.settings.language = value;
						await this.plugin.saveSettings();
						this.plugin.reRenderGenmapBlocks();
					})
			);
	}
}
