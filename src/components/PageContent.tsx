import { Icon } from "./Icon";
import {
  awards,
  projects,
  skillGroups,
  type PageId,
} from "../data/portfolio";
import { Home } from "./Home";
export function PageContent({ page }: { page: PageId }) {
  if (page === "shutdown")
    return (
      <div className="page center">
        <h2>まだ、終了しないで。</h2>
        <p>制作実績も見ていってくださいね。</p>
        <button className="folder" data-open="works">
          <Icon name="folder" /> 制作実績を開く
        </button>
      </div>
    );
  if (page === "home") return <Home />;
  if (page === "about")
    return (
      <div className="page">
        <div className="eyebrow">ABOUT ME</div>
        <h2>こんにちは、HIROです。</h2>
        <p>
        HIROです。ものをつくることと、まだ知らない世界に触れることが好きです。
        </p>
        <p>
          古いパソコンを起動すると、そこにいた昔の自分まで立ち上がる気がします。
        </p>
        <p>
          このデスクトップにも、今の私を少しだけ残しておきます。
        </p>
        <hr />
        <p>
          <b>好きなもの</b>
          <br />
          バイク、ゲーム、語学学習、資格取得、読書。バイクで知らない道を走ったり、本や言葉を通じて知らない世界に触れたり。興味のあることを見つけると、つい新しいウィンドウを開いてしまいます。
        </p>
        <section className="about-records" aria-labelledby="awards-heading">
          <b id="awards-heading">賞罰</b>
          <ul>
            {awards.map((item) => (
              <li key={item.name}>
                <span className="record-date">{item.date}</span>
                <div>
                  <span>{item.name}</span>
                  {item.description && (
                    <p className="record-description">{item.description}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    );
  if (page === "skills")
    return (
      <div className="page simple-skills">
        <div className="eyebrow">MY TOOLKIT</div>
        <h2>スキルと開発ツール</h2>
        <p>これまで使用してきた技術。</p>
        {skillGroups.map((group) => (
          <section key={group.title}>
            <h3>{group.title}</h3>
            <div className="chips">
              {group.skills.map((skill) => (
                <span className="chip" key={skill}>
                  {skill}
                </span>
              ))}
            </div>
          </section>
        ))}
      </div>
    );
  if (page === "works")
    return (
      <div className="page works-page">
        <div className="eyebrow">PROJECT ARCHIVE / 2020 — 2024</div>
        <header className="works-header">
          <h2>制作実績</h2>
          <span>{projects.length} 件のプロジェクト</span>
        </header>
        <p className="works-intro">
          Webサイト制作からアプリのUI実装、業務システムの開発、プロジェクト管理まで。これまでに参画した主な案件をご紹介します。
        </p>
        <div className="works-list">
          {projects.map((project) => (
            <article
              className="work-entry"
              key={project.id}
              aria-labelledby={`work-${project.id}`}
            >
              <header className="work-entry-header">
                <span className="work-file-icon" aria-hidden="true">
                  <Icon name="folder" />
                </span>
                <div>
                  <span className="work-year">{project.year}</span>
                  <h3 id={`work-${project.id}`}>{project.title}</h3>
                  <p className="work-role">{project.role}</p>
                </div>
              </header>
              <div className="work-details">
                <h4>担当内容</h4>
                <ul>
                  {project.tasks.map((task) => (
                    <li key={task}>{task}</li>
                  ))}
                </ul>
                {project.award && (
                  <p className="work-award">
                    <span aria-hidden="true">
                      <Icon name="award" />
                    </span>{" "}
                    {project.award}
                  </p>
                )}
                <h4>使用技術</h4>
                <ul
                  className="work-tech"
                  aria-label={`${project.title}の使用技術`}
                >
                  {project.technologies.map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                  <li className="work-tech-other">ほか</li>
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    );
  if (page === "trash")
    return (
      <div className="page">
        <h2>ごみ箱</h2>
        <p className="trash-icon">
          <Icon name="trash" />
        </p>
        <p className="center">
          このフォルダは空です。
          <br />
          <span className="muted">消したい黒歴史は、まだ入れていません。</span>
        </p>
      </div>
    );
  return (
    <div className="page">
      <h2>HIRO XPへようこそ</h2>
      <p>Windows XPの雰囲気を楽しむ、架空のデスクトップです。</p>
      <p>
        <Icon name="folder" /> アイコンをクリックすると、ページが開きます。
        <br />
        青いタイトルバーをドラッグすると、移動できます。
        <br />□ 右上のボタンで最大化・最小化・終了できます。
        <br />
        <Icon name="brand" /> スタートメニューからも各ページを開けます。
      </p>
      <div className="note">
        Microsoftの公式サイト・製品ではありません。
        <br />
        このサイトは個人のポートフォリオです。
      </div>
    </div>
  );
}
