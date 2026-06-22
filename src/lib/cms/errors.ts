export class CmsNotFoundError extends Error {
  constructor(resource: string, slug: string) {
    super(`${resource} not found: ${slug}`);
    this.name = "CmsNotFoundError";
  }
}
