export interface ITableItem {
  stt: number;
  id: number;
  status: string;
}

export interface ITableResponse {
  status: string;
  message: string;
  data: {
    totalPages: number;
    tableItemResponseList: ITableItem[];
  };
}
