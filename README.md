# Genmap

Smart indexing and rendering of family trees

## How it works

-   Genmap automatically detects parents and children written in the YAML frontmatter.
-   If you add a `genmap` code tag to a person, genmap will automatically render
    his or hers nearest relatives.

## Example

Add relational information to a person in the YAML frontmatter. Use a list of wikilinks (need to be escaped with double quotes):

```
// Son.md

---
parents:
    - "[[Mother]]"
---
```

Render relational information with a `genmap` code tag:

````
// Mother.md

```genmap
parents, children
```
````

If nothing further is specified, Genmap will replace the code tag with links to all relatives it finds.
You may specify which relatives to render by adding a comma-separated list of the following options: `parents`, `children`, `siblings`.

The example above will be rendered as follows:

**Parents:** Unknown  
**Children:** [Son](#)
