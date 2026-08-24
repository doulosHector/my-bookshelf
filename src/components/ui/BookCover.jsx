import { useState } from "react";
import { useTheme } from "../../hooks/useTheme";
import { spineColor } from "../../utils/spineColor";
import { coverUrl } from "../../services/openLibrary";

/**
 * A book cover, or a colored square with the title's initial when there is
 * none. Always a `span` or an `img`, so it stays valid inside a button.
 *
 * Cover URLs ask for `default=false`, which answers 404 instead of a blank
 * image; that is what turns a dead id into the fallback square.
 *
 * With `fit` the image keeps its own proportions, so the whole cover shows at
 * the given width and nothing is cropped; `height` then only sizes the fallback
 * square, which has no proportions of its own.
 */
export function BookCover({ coverId, title = "", genre, width, height, fit = false }) {
  const { t } = useTheme();
  // Remembers *which* id failed, so a new one is given its own chance.
  const [failedId, setFailedId] = useState(null);

  const box = { width, flexShrink: 0, borderRadius: 3 };

  if (!coverId || failedId === coverId) {
    return (
      <span
        className="serif"
        aria-hidden="true"
        style={{
          ...box,
          height,
          display: "grid",
          placeItems: "center",
          background: spineColor(genre),
          color: t.surface,
          fontSize: Math.round(width * 0.42),
        }}
      >
        {title.charAt(0)}
      </span>
    );
  }

  return (
    <img
      src={coverUrl(coverId)}
      alt=""
      onError={() => setFailedId(coverId)}
      style={{
        ...box,
        // `auto` lets the image scale to its own aspect ratio; nothing is cropped.
        height: fit ? "auto" : height,
        display: "block",
        objectFit: "cover",
        border: `1px solid ${t.border}`,
      }}
    />
  );
}
