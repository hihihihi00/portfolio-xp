import { Icon } from "./Icon";
export function DesktopIcons() {
  return (
    <nav className="icons" aria-label="デスクトップ">
      <button className="icon" data-open="home">
        <span className="ico">
          <Icon name="computer" />
        </span>
        マイ ポートフォリオ
      </button>
      <button className="icon" data-open="works">
        <span className="ico">
          <Icon name="folder" />
        </span>
        制作実績
      </button>
      <button className="icon" data-open="about">
        <span className="ico">
          <Icon name="document" />
        </span>
        自己紹介.txt
      </button>
      <button className="icon" data-open="skills">
        <span className="ico">
          <Icon name="tools" />
        </span>
        スキル
      </button>
      <button className="icon" data-open="paint">
        <span className="ico">
          <Icon name="paint" />
        </span>
        ペイント
      </button>
      <button className="icon" data-open="trash">
        <span className="ico">
          <Icon name="trash" />
        </span>
        ごみ箱
      </button>
    </nav>
  );
}
