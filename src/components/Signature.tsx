import { Icon } from "./Icon";
export function Signature() {
  return (
    <div className="signature">
      <div className="mobile-brand">
        <Icon name="brand" /> <strong>HIRO XP</strong>
        <i>Portfolio Edition</i>
      </div>
      <small>FRONTEND ENGINEER</small>
      <strong>
        hiro portfolio<span style={{ color: "#f4b73a" }}> xp</span>
      </strong>
      <p>懐かしいデスクトップに、これまでの仕事を。</p>
    </div>
  );
}
