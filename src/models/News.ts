export type ResultApiNews = {
  data: News[];
};

export type ResultApiNewsBySlug = {
  data: News;
};

export type News = {
  id: number;
  title: string;
  description: string;
  slug: string;
  cover: string;
  body: string;
  created_at?: string;
  updated_at?: string;
};

export type FormDataNews = {
  title: string;
  description: string;
  slug?: string;
  cover: File | null | string;
  body: string;
};
