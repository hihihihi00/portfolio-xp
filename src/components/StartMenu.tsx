import { Icon } from "./Icon";
export function StartMenu({
  open,
  onShutdown,
}: {
  open: boolean;
  onShutdown: () => void;
}) {
  return (
    <div className={`startmenu${open ? "" : " hide"}`} id="startmenu">
      <div className="user">
        <Icon name="user" />
        　HIRO
      </div>
      <div className="startitems">
        <button data-open="home">
          <Icon name="computer" /> マイ ポートフォリオ
        </button>
        <button data-open="works">
          <Icon name="folder" /> 制作実績
        </button>
        <button data-open="about">
          <Icon name="document" /> 自己紹介
        </button>
        <button data-open="skills">
          <Icon name="tools" /> スキル
        </button>
        <button data-open="paint">
          <Icon name="paint" /> ペイント
        </button>
        <button data-open="trash">
          <Icon name="trash" /> ごみ箱
        </button>
        <button data-open="readme">
          <Icon name="help" /> ヘルプとサポート
        </button>
      </div>
      <div className="power">
        <button id="shutdown" onClick={onShutdown}>
          <Icon name="shutdown" /> 終了オプション
        </button>
      </div>
    </div>
  );
}
