# `src/`

This folder contains the source code for the plugin. Below, you can find an overview of the most relevant files and directories.

## `main.ts`

Contains the `Genmap` class, which is the main entry point. Here, we load the plugin, its settings, register the parser, renderers and views.

We also hold the internal map of the family tree: `genmap`.

On load, we also attach the Genmap object to the window so we can access it from anywhere.

## `parse.ts`

Contains the `parse` function, which is used to scrape every note in the vault for relational data and convert it into a JSON object.

## `build.ts`

Contains the `build` function, which is used to calculate every connection between every person in the family tree.

Example: When a note specifies a parent, the `build` function will create a reference from the child to the parent, as well as a reference from the parent to the child.

## `renderers/`

Contains the various render functions which are used to render the computed relationships in a Note.
