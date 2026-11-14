import type { IconName } from "../components/Icon";
export const pageTitles = {
  paint: "無題 — ペイント",
  shutdown: "終了オプション",
  home: "マイ ポートフォリオ",
  works: "制作実績",
  about: "自己紹介.txt — メモ帳",
  skills: "スキル",
  trash: "ごみ箱",
  readme: "はじめにお読みください",
} as const;
export type PageId = keyof typeof pageTitles;
export const pageIcons: Record<PageId, IconName> = {
  home: "computer",
  works: "folder",
  about: "document",
  skills: "tools",
  paint: "paint",
  trash: "trash",
  readme: "help",
  shutdown: "shutdown",
};
export function isPageId(value: string): value is PageId {
  return Object.hasOwn(pageTitles, value);
}
export const skillGroups = [
  {
    title: "Web Development",
    skills: [
      "HTML",
      "CSS",
      "SCSS",
      "JavaScript",
      "TypeScript",
      "PHP",
      "EJS",
      "React",
      "Vue.js",
      "jQuery",
      "Tailwind CSS",
    ],
  },
  {
    title: "Animation & Interaction",
    skills: ["GSAP", "Anime.js", "Velocity.js", "Swiper.js", "8thWall"],
  },
  {
    title: "Tools",
    skills: [
      "Node.js",
      "Webpack",
      "Gulp",
      "Git",
      "SVN",
      "Sitecore",
      "Figma",
      "Photoshop",
      "XD",
    ],
  },
];
export type Project = {
  id: string;
  year: string;
  title: string;
  role: string;
  tasks: string[];
  technologies: string[];
  award?: string;
};
export const projects: Project[] = [
  {
    id: "aeon",
    year: "2024年",
    title: "イオン Webサイト開発プロジェクト",
    role: "フロントエンドエンジニア / プロジェクトマネージャー",
    tasks: [
      "フロントエンドエンジニア兼プロジェクトマネージャーとして参画。",
      "React、HTML/CSS等によるフロントエンド実装を担当。",
      "タスク管理、進捗管理、顧客折衝を担当し、実装とプロジェクト推進を並行して実施。",
      "デザインから実装、運用保守まで一貫した開発フローを経験。",
    ],
    technologies: [
      "React",
      "HTML",
      "CSS",
      "JavaScript",
      "Git",
      "Sitecore",
      "Photoshop",
    ],
  },
  {
    id: "meijiyasuda",
    year: "2023年",
    title: "明治安田生命 顧客管理システム／デザインシステム関連",
    role: "フロントエンド開発",
    tasks: [
      "社内向け業務システムのフロントエンド開発に従事。",
      "保守性を意識したコード設計、パフォーマンス最適化を意識した実装を担当。",
    ],
    award:
      "参画プロジェクト「明治安田のデザインシステム」が2024年度グッドデザイン賞を受賞。",
    technologies: [
      "HTML",
      "SCSS",
      "JavaScript",
      "React",
      "Tailwind CSS",
      "TypeScript",
    ],
  },
  {
    id: "coke-on",
    year: "2022年",
    title: "Coke ON（コカ・コーラ公式アプリ）関連業務",
    role: "コーディング / コンテンツ更新",
    tasks: [
      "コーディングおよびコンテンツ更新業務に従事。",
      "ブランドイメージを維持しながらUI部品の改修、パフォーマンス改善に関与。",
    ],
    technologies: [
      "HTML",
      "CSS",
      "JavaScript",
      "Webpack",
      "Node.js",
      "jQuery",
      "8thWall",
      "Velocity.js",
      "Swiper.js",
      "GSAP",
      "Anime.js",
    ],
  },
  {
    id: "ponta",
    year: "2021年",
    title: "Ponta アプリ UI/UXコーディング",
    role: "アプリのUI実装",
    tasks: [
      "スマートフォンアプリのUI実装に従事。",
      "Figma等のデザインデータをもとに、ユーザー操作性を意識した実装を担当。",
    ],
    technologies: [
      "HTML",
      "CSS",
      "JavaScript",
      "Figma",
      "Webpack",
      "Node.js",
      "Vue.js",
      "jQuery",
      "Tailwind CSS",
    ],
  },
  {
    id: "shiseido",
    year: "2021年",
    title: "資生堂 ビューティージャーナル",
    role: "ブランドサイト / HTMLメール制作",
    tasks: [
      "ブランドサイト制作およびHTMLメールテンプレートのコーディングを担当。",
      "複数デバイス・メールクライアントでの表示最適化を実施。",
    ],
    technologies: [
      "HTML",
      "CSS",
      "JavaScript",
      "Webpack",
      "Node.js",
      "jQuery",
      "Swiper.js",
      "Photoshop",
      "XD",
    ],
  },
  {
    id: "coca-cola",
    year: "2020年〜",
    title: "コカ・コーラ関連案件",
    role: "Webサイト制作 / UI実装",
    tasks: [
      "飲料商品紹介サイトの制作に参画し、HTML/CSSを中心としたコーディングを担当。",
      "レスポンシブ対応、アクセシビリティに配慮したUI実装を実施。",
    ],
    technologies: [
      "HTML",
      "CSS",
      "JavaScript",
      "PHP",
      "EJS",
      "Gulp",
      "Webpack",
      "Node.js",
      "SVN",
      "Vue.js",
      "jQuery",
      "Velocity.js",
      "Swiper.js",
      "GSAP",
      "Anime.js",
      "Photoshop",
      "XD",
    ],
  },
  {
    id: "tepco",
    year: "2020年〜",
    title: "東京電力（TEPCO）Web検診票プロジェクト",
    role: "フォーム制作 / JavaScript実装 / テスト",
    tasks: [
      "紙の検診票をWeb化するプロジェクトに従事。",
      "HTMLフォームの作成、JavaScriptによる画面動作の実装・確認、テストを担当。",
    ],
    technologies: ["HTML", "CSS", "JavaScript", "Gulp", "Webpack"],
  },
  {
    id: "diners",
    year: "2020年〜",
    title: "Diners Club モジュール開発",
    role: "会員サイトのモジュール開発",
    tasks: [
      "会員サイトの一部機能・モジュール開発に参画。",
      "動的コンテンツの表示やJavaScriptの組み込みを担当。",
    ],
    technologies: ["HTML", "CSS", "JavaScript", "Gulp", "Webpack"],
  },
  {
    id: "hikari-tv",
    year: "2020年〜",
    title: "ひかりTV for docomo",
    role: "HTMLコーディング / レスポンシブ対応",
    tasks: [
      "サービス紹介サイトのHTMLコーディングを担当。",
      "スマートフォンを含む複数デバイスでの表示最適化に対応。",
    ],
    technologies: ["HTML", "CSS", "JavaScript", "Gulp", "Webpack"],
  },
  {
    id: "my-au",
    year: "2020年〜",
    title: "KDDI株式会社（My au関連）Web UI実装",
    role: "スマートフォン向けUI実装",
    tasks: ["スマートフォン向けMy auサイトのUI実装を担当。"],
    technologies: ["HTML", "CSS", "JavaScript", "XD"],
  },
  {
    id: "nomura",
    year: "2020年〜",
    title: "野村証券 サステナビリティページ改修",
    role: "ページ更新・改修 / 品質チェック",
    tasks: [
      "サステナビリティ関連ページの更新・改修業務に従事。",
      "デザインに沿ったHTMLコーディングおよび品質チェックを実施。",
    ],
    technologies: ["HTML", "CSS", "JavaScript", "Gulp", "Webpack"],
  },
];

export const awards = [
  {
    date: "2024年度",
    name: "グッドデザイン賞",
    description: "参画プロジェクト「明治安田のデザインシステム」が受賞。",
  },
  {
    date: "2020年1月",
    name: "未来創造展 AbemaTV賞",
    description: "未来創造展という学生の卒業制作を発表する場所で賞を受賞。",
  },
  {
    date: "2020年3月",
    name: "HAL東京 2ヶ年皆勤賞",
    description: "",
  },
  {
    date: "2019年3月",
    name: "HAL EVENT WEEK（校内進級制作展）WEB部門 銀賞",
    description: "HAL東京",
  },
  {
    date: "2019年3月",
    name: "HAL東京 1ヶ年皆勤賞",
    description: "",
  },
];
