/**
 * @example
 * Input:  [[wikilink]]
 * Output: wikilink
 */
export default function extractWikilink(wikilink: string) {
	return wikilink.replace(/\[\[|\]\]/g, "");
}
