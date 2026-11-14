export type IconName =
  | "computer"
  | "folder"
  | "document"
  | "tools"
  | "paint"
  | "brush"
  | "trash"
  | "help"
  | "speaker"
  | "search"
  | "award"
  | "eraser"
  | "brand"
  | "power"
  | "restart"
  | "shutdown"
  | "user"
  | "back"
  | "undo"
  | "arrow";
export function Icon({
  name,
  className = "",
}: {
  name: IconName;
  className?: string;
}) {
  return (
    <img
      className={`xp-icon ${className}`}
      src={`/icons/${name}.svg`}
      alt=""
      aria-hidden="true"
      draggable={false}
      width="20"
      height="20"
    />
  );
}
