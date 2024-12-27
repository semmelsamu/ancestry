# Summary from the Obsidian Plugin Documentation

In order to release a new version of the plugin, you need to do the following:

1. Make sure to run `npm run build` and check for build errors.
2. Bump the version in `manifest.json`
3. Create a tag that matches the version in the manifest.json file.
    ```bash
    git tag -a 1.0.1 -m "1.0.1"
    git push origin 1.0.1
    ```
    - `-a` creates an [annotated tag](https://git-scm.com/book/en/v2/Git-Basics-Tagging#_creating_tags).
    - `-m` specifies the name of your release. For Obsidian plugins, this must be the same as the version.
4. Go to [Releases](https://github.com/semmelsamu/obsidian-genmap/releases). The workflow has created a draft GitHub release and uploaded the required assets as binary attachments.
5. Edit the release notes, add other files if necessary and publish the release.

Read more here: https://docs.obsidian.md/Plugins/Releasing/Release+your+plugin+with+GitHub+Actions
