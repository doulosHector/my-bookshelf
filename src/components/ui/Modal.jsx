import { useEffect } from "react";
import { useTheme } from "../../hooks/useTheme";

/** Centered dialog with a click-outside and Escape-to-close backdrop. */
export function Modal({ label, onClose, maxWidth = 540, children }) {
  const { styles } = useTheme();

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(8,9,11,0.6)",
        display: "grid",
        placeItems: "center",
        padding: 16,
        zIndex: 50,
        overflowY: "auto",
      }}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        style={{
          ...styles.card,
          borderRadius: 10,
          width: "100%",
          maxWidth,
          padding: 24,
          maxHeight: "92vh",
          overflowY: "auto",
          boxSizing: "border-box",
        }}
      >
        {children}
      </div>
    </div>
  );
}
