export const imageTypes = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/bmp",
  "image/x-icon",
  "image/tiff",
  "image/svg+xml",
  "image/webp",
] as const;

export const documentTypes = [
  "application/json",
  "text/plain",
  "text/html",
  "text/css",
  "text/javascript",
  "application/javascript",
  "application/x-javascript",
  "application/x-shockwave-flash",
] as const;

export const contentTypes = [...imageTypes, ...documentTypes] as const; // optimize this by replacing it with .concat() & with the as keyword typing

export type DocumentType = (typeof documentTypes)[number];
export type ImageType = (typeof imageTypes)[number];
export type ContentType = (typeof contentTypes)[number];
