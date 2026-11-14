import { useEffect, useRef, useState } from "react";
export function BootScreen({ onComplete }: { onComplete: () => void }) {
  const [stage, setStage] = useState<"loading" | "welcome">("loading");
  const skip = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    skip.current?.focus();
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const welcome = window.setTimeout(
      () => setStage("welcome"),
      reduced ? 500 : 2600,
    );
    const done = window.setTimeout(onComplete, reduced ? 1000 : 3600);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onComplete();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(welcome);
      clearTimeout(done);
      window.removeEventListener("keydown", onKey);
    };
  }, [onComplete]);
  return (
    <section className={`boot boot--${stage}`} aria-label="HIRO XP 起動画面">
      <div className="boot-center" role="status" aria-live="polite">
        {stage === "loading" ? (
          <>
            <div className="xp-mark" aria-hidden="true">
              <i />
              <i />
              <i />
              <i />
            </div>
            <div className="boot-brand">
              <small>Portfolio Edition</small>
              <h1>
                HIRO<span>xp</span>
              </h1>
            </div>
            <div className="boot-progress" aria-hidden="true">
              <div>
                <i />
                <i />
                <i />
              </div>
            </div>
            <p>ポートフォリオを起動しています...</p>
          </>
        ) : (
          <div className="boot-welcome">ようこそ</div>
        )}
      </div>
      <div className="boot-footer">
        <span>HIRO XP · Portfolio Edition</span>
        <span>Windows XP inspired</span>
      </div>
      <button ref={skip} className="boot-skip" onClick={onComplete}>
        スキップして開く →
      </button>
    </section>
  );
}
