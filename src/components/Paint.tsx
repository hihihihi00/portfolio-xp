import { Icon } from "./Icon";
import { useEffect, useRef, useState, type PointerEvent } from "react";
const COLORS = [
  "#000000",
  "#ffffff",
  "#808080",
  "#c00000",
  "#ff3636",
  "#ff9900",
  "#ffe633",
  "#269b32",
  "#00a4b4",
  "#1266dd",
  "#742ab8",
  "#f67daf",
];
export function Paint() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const previous = useRef<{ x: number; y: number } | null>(null);
  const undo = useRef<ImageData[]>([]);
  const [canUndo, setCanUndo] = useState(false);
  const [color, setColor] = useState("#1266dd");
  const [size, setSize] = useState(6);
  const [eraser, setEraser] = useState(false);
  useEffect(() => {
    const ctx = canvas.current!.getContext("2d")!;
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, 1000, 650);
  }, []);
  const snapshot = () => {
    const ctx = canvas.current!.getContext("2d")!;
    undo.current.push(ctx.getImageData(0, 0, 1000, 650));
    if (undo.current.length > 15) undo.current.shift();
    setCanUndo(true);
  };
  const point = (event: PointerEvent<HTMLCanvasElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    return {
      x: ((event.clientX - rect.left) * 1000) / rect.width,
      y: ((event.clientY - rect.top) * 650) / rect.height,
    };
  };
  const stroke = (p: { x: number; y: number }, from = p) => {
    const ctx = canvas.current!.getContext("2d")!;
    ctx.strokeStyle = eraser ? "#ffffff" : color;
    ctx.lineWidth = size;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(p.x + 0.01, p.y + 0.01);
    ctx.stroke();
  };
  const start = (e: PointerEvent<HTMLCanvasElement>) => {
    if (e.button !== 0) return;
    e.preventDefault();
    snapshot();
    drawing.current = true;
    previous.current = point(e);
    e.currentTarget.setPointerCapture(e.pointerId);
    stroke(previous.current);
  };
  const move = (e: PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current) return;
    const p = point(e);
    stroke(p, previous.current ?? p);
    previous.current = p;
  };
  const stop = () => {
    drawing.current = false;
    previous.current = null;
  };
  const restore = () => {
    const image = undo.current.pop();
    if (image) canvas.current!.getContext("2d")!.putImageData(image, 0, 0);
    setCanUndo(undo.current.length > 0);
  };
  const clear = () => {
    snapshot();
    const ctx = canvas.current!.getContext("2d")!;
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, 1000, 650);
  };
  return (
    <div className="paint-app">
      <div className="paint-tools" aria-label="ペイントのツール">
        <button
          className={!eraser ? "selected" : ""}
          onClick={() => setEraser(false)}
          aria-pressed={!eraser}
        >
          <Icon name="brush" /> ペン
        </button>
        <button
          className={eraser ? "selected" : ""}
          onClick={() => setEraser(true)}
          aria-pressed={eraser}
        >
          <Icon name="eraser" /> 消しゴム
        </button>
        <button onClick={restore} disabled={!canUndo}>
          <Icon name="undo" /> 元に戻す
        </button>
        <button onClick={clear}>白紙にする</button>
        <label>
          太さ{" "}
          <input
            aria-label="ペンの太さ"
            type="range"
            min="1"
            max="40"
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
          />
          <span>{size}</span>
        </label>
      </div>
      <div className="paint-palette" aria-label="色の選択">
        {COLORS.map((c) => (
          <button
            key={c}
            aria-label={`色 ${c}`}
            aria-pressed={color === c && !eraser}
            className={color === c && !eraser ? "active" : ""}
            style={{ background: c }}
            onClick={() => {
              setColor(c);
              setEraser(false);
            }}
          />
        ))}
        <input
          type="color"
          aria-label="自由に色を選択"
          value={color}
          onChange={(e) => {
            setColor(e.target.value);
            setEraser(false);
          }}
        />
      </div>
      <div className="paint-workspace">
        <canvas
          ref={canvas}
          width={1000}
          height={650}
          onPointerDown={start}
          onPointerMove={move}
          onPointerUp={stop}
          onPointerCancel={stop}
          onLostPointerCapture={stop}
          aria-label="お絵描きキャンバス"
        >
          マウスや指で描けるキャンバスです。
        </canvas>
      </div>
      <p className="paint-hint">
        マウス・指・ペンでお絵描きできます。絵は終了・再起動すると消えます。
      </p>
    </div>
  );
}
