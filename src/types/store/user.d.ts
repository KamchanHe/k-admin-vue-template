export type RolesType = (string | number)[];

export interface UserStoreType {
  token: string;
  username: string;
  avatar: string;
  roles: RolesType;
}
