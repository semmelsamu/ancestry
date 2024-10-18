import Genmap from "./main";
import { App, PluginSettingTab, Setting } from "obsidian";

export interface Settings {
	/**
	 * The label from where to pull the parents of a note.
	 */
	parentLabel: string;
}

export const DEFAULT_SETTINGS: Partial<Settings> = {
	parentLabel: "Parent",
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

		containerEl.createEl("h1", { text: "Labels" });

		containerEl.createEl("p", {
			text: "Customize the labels used for specifying family relations in your family trees.",
		});

		new Setting(containerEl).setName("Parent Label").addText((text) =>
			text
				.setPlaceholder("Parent")
				.setValue(this.plugin.settings.parentLabel)
				.onChange(async (value) => {
					this.plugin.settings.parentLabel = value;
					await this.plugin.saveSettings();
				})
		);
	}
}
