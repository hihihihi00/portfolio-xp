import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type PointerEvent,
} from "react";
import { PowerDialog, PowerOffScreen } from "./components/PowerDialog";
import { BootScreen } from "./components/BootScreen";
import { Wallpaper } from "./components/Wallpaper";
import { DesktopIcons } from "./components/DesktopIcons";
import { Signature } from "./components/Signature";
import { PortfolioWindow } from "./components/PortfolioWindow";
import { StartMenu } from "./components/StartMenu";
import { Taskbar } from "./components/Taskbar";
import { isPageId, pageTitles, pageIcons, type PageId } from "./data/portfolio";
export default function App() {
  const [powerDialog, setPowerDialog] = useState(false);
  const [powerState, setPowerState] = useState<"running" | "shutting" | "off">(
    "running",
  );
  const [session, setSession] = useState(0);
  const powerTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cancelPower = useCallback(() => setPowerDialog(false), []);
  useEffect(
    () => () => {
      if (powerTimer.current) clearTimeout(powerTimer.current);
    },
    [],
  );
  const [booting, setBooting] = useState(true);
  const completeBoot = useCallback(() => setBooting(false), []);
  const [page, setPage] = useState<PageId>("home");
  const [pageHistory, setPageHistory] = useState<PageId[]>([]);
  const [windowOpen, setWindowOpen] = useState(true);
  const [visible, setVisible] = useState(true);
  const [maximized, setMaximized] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [position, setPosition] = useState<{ x: number; y: number } | null>(
    null,
  );
  const drag = useRef<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);
  const openPage = (next: PageId) => {
    if (next === "shutdown") {
      setPowerDialog(true);
      setMenuOpen(false);
      return;
    }
    if (!windowOpen) {
      setPosition(null);
      setMaximized(false);
    }
    if (windowOpen && next !== page)
      setPageHistory((previous) => [...previous.slice(-99), page]);
    if (!windowOpen) setPageHistory([]);
    setWindowOpen(true);
    setPage(next);
    setVisible(true);
    setMenuOpen(false);
  };
  useEffect(() => {
    const escape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", escape);
    return () => document.removeEventListener("keydown", escape);
  }, []);
  const onClick = (event: MouseEvent<HTMLDivElement>) => {
    if (!(event.target instanceof Element)) return;
    const target = event.target.closest<HTMLElement>("[data-open]");
    const id = target?.dataset.open;
    if (id && isPageId(id)) openPage(id);
  };
  const pointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (
      (e.target as HTMLElement).closest("button") ||
      maximized ||
      window.matchMedia("(max-width: 720px)").matches
    )
      return;
    const box = e.currentTarget.parentElement!.getBoundingClientRect();
    drag.current = {
      x: e.clientX - box.left,
      y: e.clientY - box.top,
      width: box.width,
      height: box.height,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const pointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!drag.current) return;
    setPosition({
      x: Math.max(
        0,
        Math.min(
          window.innerWidth - drag.current.width,
          e.clientX - drag.current.x,
        ),
      ),
      y: Math.max(
        0,
        Math.min(
          window.innerHeight - 36 - drag.current.height,
          e.clientY - drag.current.y,
        ),
      ),
    });
  };
  const goBack = () => {
    const previous = pageHistory.at(-1);
    if (!previous) return;
    setPage(previous);
    setPageHistory((history) => history.slice(0, -1));
  };
  const resetDesktop = () => {
    setPageHistory([]);
    setPage("home");
    setVisible(true);
    setMaximized(false);
    setMenuOpen(false);
    setPosition(null);
    setWindowOpen(true);
    setSession((x) => x + 1);
  };
  const startSystem = () => {
    resetDesktop();
    setPowerState("running");
    setBooting(true);
  };
  const powerAction = (restart: boolean) => {
    setPowerDialog(false);
    setMenuOpen(false);
    setPowerState("shutting");
    powerTimer.current = setTimeout(() => {
      if (restart) startSystem();
      else {
        resetDesktop();
        setPowerState("off");
      }
    }, 1100);
  };
  if (powerState !== "running")
    return (
      <PowerOffScreen
        transition={powerState === "shutting"}
        onStart={startSystem}
      />
    );
  if (booting) return <BootScreen onComplete={completeBoot} />;
  return (
    <div className={`os${menuOpen ? " menu-open" : ""}`} onClick={onClick}>
      <Wallpaper />
      <main className="desktop">
        <DesktopIcons />
        <Signature />
        {windowOpen && (
          <PortfolioWindow
            key={session}
            page={page}
            visible={visible}
            maximized={maximized}
            position={position}
            onPositionChange={setPosition}
            onMinimize={() => setVisible(false)}
            canGoBack={pageHistory.length > 0}
            onBack={goBack}
            onClose={() => {
              setPageHistory([]);
              setWindowOpen(false);
              setVisible(false);
            }}
            onMaximize={() => setMaximized((x) => !x)}
            onPointerDown={pointerDown}
            onPointerMove={pointerMove}
            onPointerUp={() => {
              drag.current = null;
            }}
          />
        )}
      </main>
      {menuOpen && (
        <button
          className="menu-scrim"
          aria-label="スタートメニューを閉じる"
          onClick={() => setMenuOpen(false)}
        />
      )}
      <StartMenu open={menuOpen} onShutdown={() => openPage("shutdown")} />
      {powerDialog && (
        <PowerDialog
          onCancel={cancelPower}
          onShutdown={() => powerAction(false)}
          onRestart={() => powerAction(true)}
        />
      )}
      <Taskbar
        title={pageTitles[page]}
        icon={pageIcons[page]}
        windowOpen={windowOpen}
        active={visible}
        menuOpen={menuOpen}
        onStart={() => setMenuOpen((x) => !x)}
        onTask={() => setVisible((x) => !x)}
      />
    </div>
  );
}
