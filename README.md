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

Genmap will replace this with Links to the relatives you specified inside the code tag. Currently supported: `parents`, `children`, `siblings`. If nothing is provided, it will render all.

Rendered output of Genmap:

**Parents:** Unknown  
**Children:** [Son](#)
