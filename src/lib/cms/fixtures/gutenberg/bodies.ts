import { fixtureMediaUrls as m } from "./media-urls";
import { joinBlocks, wpGallery, wpHeading, wpImage, wpList, wpParagraph, wpQuote } from "./wp-html";

export const fixtureArtworkBodies: Record<string, string> = {
  "starry-night-study": joinBlocks(
    wpHeading(2, "About this work"),
    wpParagraph("Oil on canvas study, part of the <em>Modern Masters</em> exhibition."),
    wpImage({
      id: 99,
      src: m.starryNight,
      alt: "Starry Night Study",
      width: 843,
      height: 1054,
    }),
    wpQuote(
      "I often think that the night is more alive and more richly colored than the day.",
      "Vincent van Gogh",
    ),
  ),
  "water-lilies-reflection": joinBlocks(
    wpParagraph("A serene study of light on water from the late impressionist period."),
    wpGallery(
      [
        {
          id: 201,
          src: m.waterLilies,
          alt: "Water Lilies detail 1",
        },
        {
          id: 202,
          src: m.waterLiliesDetail,
          alt: "Water Lilies detail 2",
        },
      ],
      2,
    ),
  ),
  "composition-viii": joinBlocks(
    wpHeading(3, "Geometric abstraction"),
    wpParagraph("Bold geometric forms arranged in dynamic tension across the canvas plane."),
    wpList(
      ["Primary geometric planes", "Intersecting diagonals", "Contrasting color fields"],
      true,
    ),
  ),
  "american-gothic": joinBlocks(
    wpHeading(2, "Regional modernism"),
    wpParagraph(
      "Grant Wood's iconic portrait of rural American stoicism, painted after a visit to Eldon, Iowa.",
    ),
    wpImage({
      id: 301,
      src: m.americanGothic,
      alt: "American Gothic",
      width: 843,
      height: 1054,
    }),
  ),
  nighthawks: joinBlocks(
    wpParagraph(
      "Edward Hopper's nocturnal diner scene captures urban loneliness beneath fluorescent light.",
    ),
    wpImage({
      id: 302,
      src: m.nighthawks,
      alt: "Nighthawks",
      width: 843,
      height: 1054,
    }),
  ),
  "the-bedroom": joinBlocks(
    wpHeading(2, "Arles, 1888"),
    wpParagraph(
      "Van Gogh painted his bedroom in the Yellow House three times; this version emphasizes calm through saturated color.",
    ),
    wpImage({
      id: 303,
      src: m.theBedroom,
      alt: "The Bedroom",
      width: 843,
      height: 1054,
    }),
  ),
  "paris-street-rainy-day": joinBlocks(
    wpParagraph(
      "Caillebotte's monumental view of the Place de Dublin captures Parisian bourgeois life under a soft grey sky.",
    ),
    wpGallery(
      [
        {
          id: 401,
          src: m.parisStreet,
          alt: "Paris Street full view",
        },
        {
          id: 402,
          src: m.parisStreetDetail,
          alt: "Paris Street detail",
        },
      ],
      2,
    ),
  ),
  "the-childs-bath": joinBlocks(
    wpHeading(2, "Intimacy and form"),
    wpParagraph(
      "Mary Cassatt's tender domestic scene shows her mastery of composition influenced by Japanese printmaking.",
    ),
    wpImage({
      id: 501,
      src: m.childsBath,
      alt: "The Child's Bath",
      width: 843,
      height: 1054,
    }),
  ),
};

export const fixtureArtistBodies: Record<string, string> = {
  "vincent-van-gogh": joinBlocks(
    wpParagraph(
      "Dutch post-impressionist painter whose bold colors and expressive brushwork profoundly influenced modern art.",
    ),
    wpHeading(2, "Legacy"),
    wpParagraph(
      "Though he sold only one painting during his lifetime, van Gogh's work is now among the most celebrated in Western art.",
    ),
  ),
  "claude-monet": joinBlocks(
    wpParagraph(
      "French impressionist painter and founder of the movement, best known for his series of water lily paintings.",
    ),
    wpHeading(2, "Giverny years"),
    wpParagraph(
      "From his garden studio in Giverny, Monet pursued serial studies of light, atmosphere, and reflection on water.",
    ),
  ),
  "wassily-kandinsky": wpParagraph(
    "Russian painter and art theorist, credited with painting one of the first purely abstract works.",
  ),
  "grant-wood": joinBlocks(
    wpParagraph(
      "American painter associated with the Regionalist movement, celebrated for scenes of Midwestern rural life.",
    ),
    wpHeading(2, "Stone City"),
    wpParagraph(
      "Wood co-founded the Stone City Art Colony in Iowa, mentoring artists who shared his interest in local subject matter.",
    ),
  ),
  "edward-hopper": joinBlocks(
    wpParagraph(
      "American realist painter whose spare compositions explore solitude, silence, and the psychology of modern life.",
    ),
    wpParagraph(
      "Hopper's use of light and shadow transforms everyday settings — diners, offices, gas stations — into scenes of quiet drama.",
    ),
  ),
  "mary-cassatt": joinBlocks(
    wpParagraph(
      "American impressionist painter and printmaker, known for intimate depictions of mothers and children.",
    ),
    wpHeading(2, "Paris circle"),
    wpParagraph(
      "Cassatt exhibited with the Impressionists in Paris and helped shape American collecting through her advocacy of modern French art.",
    ),
  ),
  "gustave-caillebotte": joinBlocks(
    wpParagraph(
      "French impressionist painter and patron who supported his peers while producing sharply observed urban views.",
    ),
    wpParagraph(
      "His unusual perspectives and plunging viewpoints bring a photographic clarity to scenes of contemporary Paris.",
    ),
  ),
};

export const fixtureExhibitionBodies: Record<string, string> = {
  "modern-masters": joinBlocks(
    wpParagraph(
      "Curated selection of 20th-century works spanning impressionism through early abstraction.",
    ),
    wpHeading(2, "Highlights"),
    wpList([
      "Van Gogh — <em>Starry Night Study</em>",
      "Monet — <em>Water Lilies Reflection</em>",
      "Kandinsky — <em>Composition VIII</em>",
      "Hopper — <em>Nighthawks</em>",
    ]),
    wpGallery(
      [
        { id: 601, src: m.starryNight, alt: "Starry Night Study" },
        { id: 602, src: m.waterLilies, alt: "Water Lilies Reflection" },
        { id: 603, src: m.nighthawks, alt: "Nighthawks" },
      ],
      3,
    ),
  ),
  "light-and-color": joinBlocks(
    wpParagraph(
      "An intimate look at how light transforms perception across the impressionist canon.",
    ),
    wpList(["Plein-air impressionism", "Reflected light on water", "Late Monet serial studies"]),
  ),
};
