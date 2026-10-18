import React from "react";

/**
 * Scroll-reveal wrapper. Fades/slides its children in the first time they
 * enter the viewport. Also exposes `data-visible` so children can react with
 * Tailwind's `group-data-[visible=true]/rv:` variants.
 *
 * direction: "up" | "down" | "left" | "right" | "zoom"
 */
const hiddenTransform = {
  up: "translateY(36px)",
  down: "translateY(-36px)",
  left: "translateX(-48px)",
  right: "translateX(48px)",
  zoom: "scale(0.92)",
};

const Reveal = ({
  children,
  delay = 0,
  direction = "up",
  className = "",
  as: Tag = "div",
  threshold = 0.15,
}) => {
  const ref = React.useRef(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const ease = "cubic-bezier(0.22, 1, 0.36, 1)";

  return (
    <Tag
      ref={ref}
      data-visible={visible}
      className={`group/rv ${className}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : hiddenTransform[direction],
        transition: `opacity 0.9s ${ease} ${delay}ms, transform 0.9s ${ease} ${delay}ms`,
      }}
    >
      {children}
    </Tag>
  );
};

export default Reveal;