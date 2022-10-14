interface Window {
  config: {
    baseUrl: string;
  };
}

export type GetArrayElementType<T extends Array<any>> = T extends (infer U)[]
  ? U
  : never;
