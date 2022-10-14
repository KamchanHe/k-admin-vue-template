export interface TokensType {
  [key: string]: {
    token: string;
  };
}

export interface UsersType {
  [key: string]: {
    id: string;
    account: string;
    authorIds: (string | number)[];
    icon?: string;
    name?: string;
    code?: string;
    mobile?: string;
  };
}
