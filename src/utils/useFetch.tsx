import { useState, useEffect } from "react";
import { API } from "../constants";

export const useFetch = <T extends {}>(path: string) => {
  const [data, setData] = useState<T>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(API + path)
      .then(x => {
        return x.json();
      })
      .then(x => {
        setData(x);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  }, [path]);

  return {
    data,
    loading
  };
};
