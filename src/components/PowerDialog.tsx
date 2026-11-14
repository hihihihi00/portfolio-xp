import { Icon } from "./Icon";
import { useEffect, useRef } from "react";
export function PowerDialog({
  onCancel,
  onShutdown,
  onRestart,
}: {
  onCancel: () => void;
  onShutdown: () => void;
  onRestart: () => void;
}) {
  const cancel = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    cancel.current?.focus();
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    document.addEventListener("keydown", key);
    return () => {
      document.removeEventListener("keydown", key);
      previous?.focus();
    };
  }, [onCancel]);
  return (
    <div className="power-overlay" onClick={onCancel}>
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="power-title"
        className="power-dialog"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => {
          if (e.key === "Tab") {
            const nodes = Array.from(
              e.currentTarget.querySelectorAll<HTMLButtonElement>("button"),
            );
            const first = nodes[0],
              last = nodes[nodes.length - 1];
            if (e.shiftKey && document.activeElement === first) {
              e.preventDefault();
              last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
              e.preventDefault();
              first.focus();
            }
          }
        }}
      >
        <header id="power-title">HIRO XP の終了</header>
        <p>操作を選んでください</p>
        <div className="power-actions">
          <button onClick={onShutdown}>
            <span className="power-red">
              <Icon name="power" />
            </span>
            終了する
          </button>
          <button onClick={onRestart}>
            <span className="power-green">
              <Icon name="restart" />
            </span>
            再起動
          </button>
        </div>
        <footer>
          <small>ペイントの絵は消えます。</small>
          <button ref={cancel} onClick={onCancel}>
            キャンセル
          </button>
        </footer>
      </section>
    </div>
  );
}
export function PowerOffScreen({
  transition,
  onStart,
}: {
  transition: boolean;
  onStart: () => void;
}) {
  return (
    <section className="power-off">
      <div className="power-off-center">
        <div className="power-off-brand">
          HIRO<span>xp</span>
        </div>
        <h1>
          {transition ? "終了しています..." : "電源を切る準備ができました。"}
        </h1>
        {!transition && (
          <>
            <p>また、遊びにきてください。</p>
            <button onClick={onStart}>
              <Icon name="power" /> 電源を入れる
            </button>
          </>
        )}
      </div>
    </section>
  );
}
