export function setLogoUrl(basePath: string, ext: "webp" | "png" = "webp") {
    return `${basePath}.${ext}`;
}

export function cardImageUrl(
  basePath: string,
  quality: "high" | "low" = "low",
  ext: "webp" | "png" = "webp"
) {
  return `${basePath}/${quality}.${ext}`;
}