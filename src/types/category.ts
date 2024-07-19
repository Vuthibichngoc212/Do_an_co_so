export interface ICategoryItem {
  id: number;
  categoryName: string;
}

export interface ICategoryResponse {
  status: string;
  message: string;
  data: {
    totalPages: number;
    categories: ICategoryItem[];
  };
}
