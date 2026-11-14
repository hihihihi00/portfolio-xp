import { Icon } from "./Icon";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent,
  type PointerEventHandler,
} from "react";
import { Paint } from "./Paint";
import { PageContent } from "./PageContent";
import { pageTitles, pageIcons, type PageId } from "../data/portfolio";
type Props = {
  page: PageId;
  visible: boolean;
  maximized: boolean;
  position: { x: number; y: number } | null;
  onPositionChange: (position: { x: number; y: number }) => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onClose: () => void;
  onBack: () => void;
  canGoBack: boolean;
  onPointerDown: PointerEventHandler<HTMLDivElement>;
  onPointerMove: PointerEventHandler<HTMLDivElement>;
  onPointerUp: PointerEventHandler<HTMLDivElement>;
};
export function PortfolioWindow({
  page,
  visible,
  maximized,
  position,
  onPositionChange,
  onMinimize,
  onMaximize,
  onClose,
  onBack,
  canGoBack,
  onPointerDown,
  onPointerMove,
  onPointerUp,
}: Props) {
  const contentRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (contentRef.current) contentRef.current.scrollTop = 0;
  }, [page]);
  const [size, setSize] = useState<{ width: number; height: number } | null>(
    null,
  );
  const [paintOpened, setPaintOpened] = useState(false);
  if (page === "paint" && !paintOpened) setPaintOpened(true);
  const resizing = useRef<{
    corner: string;
    startX: number;
    startY: number;
    left: number;
    top: number;
    width: number;
    height: number;
  } | null>(null);
  const resizeStart = (event: PointerEvent<HTMLDivElement>, corner: string) => {
    if (maximized || window.matchMedia("(max-width:720px)").matches) return;
    event.preventDefault();
    const rect = event.currentTarget.parentElement!.getBoundingClientRect();
    resizing.current = {
      corner,
      startX: event.clientX,
      startY: event.clientY,
      left: rect.left,
      top: rect.top,
      width: rect.width,
      height: rect.height,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const resizeMove = (event: PointerEvent<HTMLDivElement>) => {
    const r = resizing.current;
    if (!r) return;
    const dx = event.clientX - r.startX,
      dy = event.clientY - r.startY;
    const right = r.left + r.width,
      bottom = r.top + r.height;
    let left = r.left,
      top = r.top,
      width = r.width,
      height = r.height;
    const maxBottom = window.innerHeight - 36;
    if (r.corner.includes("e"))
      width = Math.max(420, Math.min(window.innerWidth - r.left, r.width + dx));
    if (r.corner.includes("s"))
      height = Math.max(300, Math.min(maxBottom - r.top, r.height + dy));
    if (r.corner.includes("w")) {
      left = Math.max(0, Math.min(right - 420, r.left + dx));
      width = right - left;
    }
    if (r.corner.includes("n")) {
      top = Math.max(0, Math.min(bottom - 300, r.top + dy));
      height = bottom - top;
    }
    setSize({ width, height });
    onPositionChange({ x: left, y: top });
  };
  return (
    <section
      className={`win ${page === "home" ? "win-home" : "win-page"}${maximized ? " max" : ""}${visible ? "" : " hide"}`}
      id="window"
      style={
        {
          ...(position
            ? {
                "--window-x": `${position.x}px`,
                "--window-y": `${position.y}px`,
              }
            : {}),
          ...(position ? { left: position.x, top: position.y } : {}),
          ...(size ? { width: size.width, height: size.height } : {}),
        } as CSSProperties
      }
      aria-label="ポートフォリオ ウィンドウ"
    >
      <div
        className="title"
        id="titlebar"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onDoubleClick={(event) => {
          if (!(event.target as HTMLElement).closest("button")) onMaximize();
        }}
      >
        <span id="windowtitle" title={pageTitles[page]}>
          <Icon name={pageIcons[page]} />
          {pageTitles[page]}
        </span>
        <div className="controls">
          <button aria-label="最小化" id="minimize" onClick={onMinimize}>
            _
          </button>
          <button aria-label="最大化" id="maximize" onClick={onMaximize}>
            □
          </button>
          <button
            className="close"
            aria-label="閉じる"
            id="close"
            onClick={onClose}
          >
            ×
          </button>
        </div>
      </div>
      <div className="menu">
        ファイル(F) 編集(E) 表示(V) お気に入り(A) ツール(T) ヘルプ(H)
      </div>
      <div
        className="toolbar toolbar-display"
        aria-label="ナビゲーションツールバー"
      >
        <button
          className="back-display"
          id="back"
          onClick={onBack}
          disabled={!canGoBack}
          aria-label="前のページに戻る"
        >
          <span className="back" aria-hidden="true">
            <Icon name="back" />
          </span>{" "}
          戻る
        </button>
        <span className="toolbar-divider" aria-hidden="true">
          │
        </span>
        <span className="toolbar-extra">
          <Icon name="search" /> 検索
        </span>
        <span className="toolbar-extra">
          <Icon name="folder" /> フォルダ
        </span>
      </div>
      <div className="address">
        <label htmlFor="address">アドレス</label>
        <span id="address" role="text">
          <Icon name="computer" />
          {` C:\\HIRO\\${page === "home" ? "Portfolio" : page}`}
        </span>
        <button id="homebtn" data-open="home">
          移動 ➜
        </button>
      </div>
      <div className="body">
        <aside className="sidebar">
          <div className="sidebox">
            <b>ポートフォリオのタスク</b>
            <div>
              <button data-open="works">
                <Icon name="folder" /> 制作実績を表示する
              </button>
              <button data-open="about">
                <Icon name="document" /> プロフィールを読む
              </button>
              <button data-open="skills">
                <Icon name="tools" /> スキルを確認する
              </button>
            </div>
          </div>
          <div className="sidebox">
            <b>その他の場所</b>
            <div>
              <button data-open="home">
                <Icon name="computer" /> マイ ポートフォリオ
              </button>
              <button data-open="readme">
                <Icon name="help" /> はじめにお読みください
              </button>
            </div>
          </div>
          <div className="sidebox">
            <b>詳細</b>
            <div>
              HIRO XP
              <br />
              Portfolio Edition
              <br />
              <span style={{ fontSize: "10px" }}>Web上で動く、架空のOS。</span>
            </div>
          </div>
        </aside>
        <div className="content" id="content" ref={contentRef}>
          {page !== "paint" && <PageContent page={page} />}
          {paintOpened && (
            <div hidden={page !== "paint"}>
              <Paint />
            </div>
          )}
        </div>
      </div>
      <div className="status" id="status">
        HIRO XP　│　
        <Icon name={pageIcons[page]} />
        {pageTitles[page]}
      </div>
      {!maximized &&
        ["nw", "ne", "sw", "se"].map((corner) => (
          <div
            key={corner}
            className={`resize-handle resize-${corner}`}
            data-testid={`resize-${corner}`}
            aria-hidden="true"
            onPointerDown={(event) => resizeStart(event, corner)}
            onPointerMove={resizeMove}
            onPointerUp={() => {
              resizing.current = null;
            }}
            onPointerCancel={() => {
              resizing.current = null;
            }}
          />
        ))}
    </section>
  );
}
