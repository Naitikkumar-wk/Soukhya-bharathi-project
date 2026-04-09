"use client";

type Item = { label: string; targetId: string };

type Props = {
  items: Item[];
  className?: string;
  itemClassName?: string;
  separatorClassName?: string;
};

export function InPageScrollNav({
  items,
  className = "",
  itemClassName = "",
  separatorClassName = "",
}: Props) {
  return (
    <nav aria-label="On this page" className={className}>
      {items.map((item, idx) => (
        <span key={item.targetId} className="inline-flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              document.getElementById(item.targetId)?.scrollIntoView({ behavior: "smooth" });
            }}
            className={itemClassName}
          >
            {item.label}
          </button>
          {idx < items.length - 1 ? (
            <span className={separatorClassName} aria-hidden>
              ·
            </span>
          ) : null}
        </span>
      ))}
    </nav>
  );
}
