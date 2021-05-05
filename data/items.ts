export interface Item {
  title: string
  image: string
  lines: string[]
  link: string
  icon: string
  tile: boolean
}

export const items: Item[] = [
  {
    title: "Home",
    image: "",
    lines: [],
    link: "/",
    icon: "mdiApps",
    tile: false
  },
  {
    title: "About",
    image: "/about.png",
    lines: [
      "静岡県浜松市在住のWeb開発者 松井英俊のWebサイトです。",
      "日々の記録、仕事や取り組み、使用技術などについて紹介します。",
      "こちらより自己紹介をご覧いただけます。"
    ],
    link: "/about",
    icon: "mdiInformationOutline",
    tile: true
  },
  {
    title: "制作物",
    image: "/works.png",
    lines: [
      "Webアプリケーションを中心に開発・運用に携わってきました。",
      "こちらでは個人的な開発プロジェクトについて紹介します。"
    ],
    link: "/works",
    icon: "mdiWrench",
    tile: true
  },
  {
    title: "メディア掲載",
    image: "/media_coverages.png",
    lines: [
      "今までの開発プロジェクトなどの取り組みを各種メディアでご紹介いただきました。",
      "詳しくはこちらよりご覧ください。"
    ],
    link: "/media_coverages",
    icon: "mdiCamera",
    tile: true
  },
  {
    title: "日記",
    image: "articles.png",
    lines: [
      "技術や日々の活動、日常生活について綴っています。",
      "詳しくはこちらよりご覧ください。"
    ],
    link: "/articles",
    icon: "mdiNewspaperVariantMultipleOutline",
    tile: true
  },
  {
    title: "雑学",
    image: "knowledges.png",
    lines: [
      "日々仕入れた雑学を公開していきます。",
      "詳しくはこちらよりご覧ください。"
    ],
    link: "/knowledges",
    icon: "mdiLightbulbOutline",
    tile: true
  },
  {
    title: "お問い合わせ",
    image: "contact.png",
    lines: [
      "お問い合わせはこちらよりお願いいたします。"
    ],
    link: "/contact",
    icon: "mdiCommentTextOutline",
    tile: true
  }
]
