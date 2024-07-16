export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  phone: number;
  address: string;
  imageUrl: string;
}

export interface IUserResponse {
  status: string;
  message: string;
  data: IUser;
}
