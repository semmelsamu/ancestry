# Genmap

Smart indexing and rendering of family trees

## How it works

-   Genmap automatically detects Parents and saves them automatically
-   If you write a `ancestry` code tag, it will automatically look for any relatives and display them in your file.
-   Currently supported are: Children, Siblings and Step Siblings

## Example

_Chris.md:_

```md
Eltern: [[Anna]]
```

_Anna.md:_

````md
Eltern: [[James]]

    ```ancestry
    ```
````

_Will be rendered as:_

```
Eltern: [[James]]

Kinder: [[Chris]]
```
