import { getCmsProvider } from "@/api/get-cms";
import { extractPlainText } from "@/lib/cms/html/extract-plain-text";

const MAX_ARTWORKS = 60;

export type ContentRetriever = {
  buildContext(signal: AbortSignal): Promise<string>;
};

export const cmsContentRetriever: ContentRetriever = {
  async buildContext(signal) {
    const cms = getCmsProvider();
    const options = { signal };
    const [artworks, exhibitions] = await Promise.all([
      cms.getArtworks(options),
      cms.getExhibitions(options),
    ]);

    const artworkLines = artworks.slice(0, MAX_ARTWORKS).map((a) => {
      const excerpt = a.bodyHtml
        ? extractPlainText(a.bodyHtml).slice(0, 200)
        : "";
      return (
        `- "${a.title}" by ${a.artist}${a.year ? ` (${a.year})` : ""}` +
        `${a.medium ? `, ${a.medium}` : ""}` +
        (excerpt ? `: ${excerpt}` : "")
      );
    });

    const exhibitionLines = exhibitions.map((e) => {
      const body = e.bodyHtml
        ? extractPlainText(e.bodyHtml).slice(0, 300)
        : e.summary;
      return `- Exhibition "${e.title}": ${body} (${e.artworkIds.length} works)`;
    });

    return [
      "ARTWORKS:",
      ...artworkLines,
      "",
      "EXHIBITIONS:",
      ...exhibitionLines,
    ].join("\n");
  },
};
