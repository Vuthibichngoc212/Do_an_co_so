export interface IEmployee {
  id: number;
  username: string;
  password: string;
  retypePassword: string;
  fullname: string;
  email: string;
  phoneNumber: string;
  address: string;
  role: number;
}

export interface IEmployeeResponse {
  status: string;
  message: string;
  data: {
    totalPages: number;
    userResponses: IEmployee[];
  };
}
