# Genmap

Smart indexing and rendering of family trees

## How it works

-   Genmap automatically detects Parents and saves them automatically
-   If you write a `ancestry` code tag, it will automatically look for any relatives and display them in your file.
-   Currently supported are: Children, Siblings and Step Siblings

## Example

_Chris.md:_

```md
Parents:: [[Anna]]
```

_Anna.md:_

````md
Parents:: [[James]]

    ```ancestry
    ```
````

_Will be rendered as:_

```
Parents:: [[James]]

Children: [[Chris]]
```
