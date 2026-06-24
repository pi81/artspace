import { fixtureArtistBodies, fixtureArtworkBodies, fixtureExhibitionBodies } from "./bodies";

type WithSlug = { slug: string; bodyHtml: string };

function applyBodies<T extends WithSlug>(items: T[], bodies: Record<string, string>): T[] {
  return items.map((item) => {
    const bodyHtml = bodies[item.slug];
    if (!bodyHtml) return item;
    return { ...item, bodyHtml };
  });
}

export function applyFixtureGutenbergBodies<T extends WithSlug>(
  items: T[],
  resource: "artwork" | "artist" | "exhibition",
): T[] {
  const bodies =
    resource === "artwork"
      ? fixtureArtworkBodies
      : resource === "artist"
        ? fixtureArtistBodies
        : fixtureExhibitionBodies;

  return applyBodies(items, bodies);
}
