export interface LinkItem {
  id: string;
  name: string;
  desc: string;
  url: string;
  icon: string;
  color?: string; // Tailwind color class for icon background
}

export interface LinkCategory {
  id: string;
  title: string;
  icon: string;
  links: LinkItem[];
}

export type SearchEngine = 'bing' | 'google' | 'baidu';

export interface Quote {
  text: string;
  author: string;
}