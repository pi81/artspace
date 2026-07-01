import { getCmsProvider } from "@/api/get-cms";
import type { ContentRetriever } from "@/lib/ai/types";
import { extractPlainText } from "@/lib/cms/utils/extract-plain-text";

const MAX_ARTWORKS = 60;

export const galleryContentRetriever: ContentRetriever = {
  async buildContext(signal) {
    const cms = getCmsProvider();
    const options = { signal };
    const [artworks, exhibitions] = await Promise.all([
      cms.getArtworks(options),
      cms.getExhibitions(options),
    ]);

    const artworkLines = artworks.slice(0, MAX_ARTWORKS).map((artwork) => {
      const excerpt = artwork.bodyHtml ? extractPlainText(artwork.bodyHtml).slice(0, 200) : "";
      return (
        `- "${artwork.title}" by ${artwork.artist}${artwork.year ? ` (${artwork.year})` : ""}` +
        `${artwork.medium ? `, ${artwork.medium}` : ""}` +
        (excerpt ? `: ${excerpt}` : "")
      );
    });

    const exhibitionLines = exhibitions.map((exhibition) => {
      const body = exhibition.bodyHtml
        ? extractPlainText(exhibition.bodyHtml).slice(0, 300)
        : exhibition.summary;
      return `- Exhibition "${exhibition.title}": ${body} (${exhibition.artworkIds.length} works)`;
    });

    return ["ARTWORKS:", ...artworkLines, "", "EXHIBITIONS:", ...exhibitionLines].join("\n");
  },
};
