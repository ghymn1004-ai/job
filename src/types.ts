export type PostCategory = 'literacy' | 'utilization' | 'senior' | 'health';

export interface Post {
  id: string;
  category: PostCategory;
  title: string;
  content: string;
  summary: string;
  coverImage: string;
  createdAt: string;
  author: string;
  views: number;
  isPublished: boolean;
}

export const CATEGORY_LABELS: Record<PostCategory, string> = {
  literacy: 'AI리터러시',
  utilization: 'AI직무활용',
  senior: '시니어교육',
  health: '건강칼럼',
};
