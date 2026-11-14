import { Icon } from "./Icon";
import type { IconName } from "./Icon";
import { useEffect, useState } from "react";
export function Taskbar({
  title,
  icon,
  windowOpen,
  active,
  menuOpen,
  onStart,
  onTask,
}: {
  title: string;
  icon: IconName;
  windowOpen: boolean;
  active: boolean;
  menuOpen: boolean;
  onStart: () => void;
  onTask: () => void;
}) {
  const [time, setTime] = useState("");
  useEffect(() => {
    const update = () =>
      setTime(
        new Date().toLocaleTimeString("ja-JP", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      );
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <footer className="taskbar">
      <button
        className="start"
        id="start"
        onClick={onStart}
        aria-expanded={menuOpen}
      >
        <span className="flag">
          <Icon name="brand" />
        </span>
        start
      </button>
      {windowOpen && (
        <button
          className={`task${active ? " task-active" : ""}`}
          id="task"
          onClick={onTask}
          aria-pressed={active}
          title={title}
        >
          <span>
            <Icon name={icon} />
            {title}
          </span>
        </button>
      )}
      <div className="tray">
        <span>
          <Icon name="speaker" />
        </span>
        <time id="clock">{time}</time>
      </div>
    </footer>
  );
}
