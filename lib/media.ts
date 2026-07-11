// Dependency-free media helpers, safe to import in both client and server code.

const IMAGE_EXT = /\.(jpe?g|png|webp|gif|avif|bmp|svg|heic|heif)$/i;

/**
 * True when the URL points at a video. We detect by *excluding* known image
 * extensions rather than listing video ones, so ANY video container/codec the
 * admin uploads (mp4, webm, mov, m4v, avi, mkv, mpeg, …) renders as a video.
 * Strips query/hash before testing (blob URLs and our "#t=0.1" poster hint).
 */
export function isVideoAsset(url: string): boolean {
  const clean = url.split("?")[0].split("#")[0];
  return !IMAGE_EXT.test(clean);
}
