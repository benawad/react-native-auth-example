import { API } from "../constants";

interface Options {
  path: string;
  method?: string;
  body: any;
}

export const useMutation = () => {
  return async ({ path, method = "POST", body }: Options) => {
    const response = await fetch(API + path, {
      method,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });
    return await response.json();
  };
};
