import { Icon } from "./Icon";
export function Home() {
  return (
    <>
      <div className="mobile-welcome">
        <h1>こんにちは、HIROです。</h1>
        <p>フロントエンドエンジニア</p>
        <div className="mobile-computer" aria-hidden="true">
          <Icon name="computer" />
        </div>
        <button data-open="works">
          制作実績を見る <Icon name="arrow" />
        </button>
      </div>
      <div className="welcome">
        <div className="eyebrow">WELCOME TO MY DESKTOP</div>
        <h1>
          つくることを、
          <br />
          <em>もっと、おもしろく。</em>
        </h1>
        <p>
          こんにちは、HIROです。
          <br />
          Webの見た目と動きをつくる、フロントエンドエンジニア。
          <br />
          フォルダを開いて、これまでの仕事をのぞいてみてください。
        </p>
        <div className="badge">
          <span className="dot"></span> FRONTEND / INTERACTION / WEB
        </div>
      </div>
      <div className="folders">
        <button className="folder" data-open="works">
          <span>
            <Icon name="folder" />
          </span>
          <div>
            制作実績<small>Selected works</small>
          </div>
        </button>
        <button className="folder" data-open="about">
          <span>
            <Icon name="document" />
          </span>
          <div>
            自己紹介<small>About me</small>
          </div>
        </button>
        <button className="folder" data-open="skills">
          <span>
            <Icon name="tools" />
          </span>
          <div>
            スキル<small>My toolkit</small>
          </div>
        </button>
      </div>
    </>
  );
}
