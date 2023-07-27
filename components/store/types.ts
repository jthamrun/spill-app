export type Action<T> = {
    type: string
    data: T
}


export type User = {
    id?: string;
    email: string;
    name: string;
  };