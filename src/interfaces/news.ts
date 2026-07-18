export interface INewsPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string | null;
  tags: string[];
  author: string | null;
  publishedAt: string | null;
  /** Proxy URL, not a raw Notion S3 link — those expire after about an hour. */
  coverImage: string | null;
  coverAlt: string;
}

export interface IEvent {
  id: string;
  slug: string;
  title: string;
  description: string;
  location: string | null;
  startDate: string;
  /** Set only for multi-day events. */
  endDate: string | null;
  registrationUrl: string | null;
  coverImage: string | null;
}

export interface IPaginatedPosts {
  posts: INewsPost[];
  page: number;
  totalPages: number;
  totalPosts: number;
}

export type NewsRichText = {
  text: string;
  bold: boolean;
  italic: boolean;
  underline: boolean;
  strikethrough: boolean;
  code: boolean;
  href: string | null;
};

export type NewsBlock =
  | { type: "paragraph"; id: string; richText: NewsRichText[] }
  | { type: "heading_1"; id: string; richText: NewsRichText[] }
  | { type: "heading_2"; id: string; richText: NewsRichText[] }
  | { type: "heading_3"; id: string; richText: NewsRichText[] }
  | { type: "quote"; id: string; richText: NewsRichText[] }
  | { type: "callout"; id: string; richText: NewsRichText[]; emoji: string | null }
  | { type: "bulleted_list"; id: string; items: NewsListItem[] }
  | { type: "numbered_list"; id: string; items: NewsListItem[] }
  | { type: "to_do"; id: string; richText: NewsRichText[]; checked: boolean }
  | { type: "code"; id: string; text: string; language: string }
  | { type: "image"; id: string; url: string; caption: string }
  | { type: "video"; id: string; url: string; caption: string }
  | { type: "embed"; id: string; url: string; caption: string }
  | { type: "bookmark"; id: string; url: string; caption: string }
  | { type: "divider"; id: string }
  | { type: "unsupported"; id: string };

export interface NewsListItem {
  id: string;
  richText: NewsRichText[];
  children: NewsBlock[];
}
