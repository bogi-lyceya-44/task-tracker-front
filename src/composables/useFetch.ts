import { ref, toValue, watchEffect } from "vue";

import type { BodyType } from "../types.ts";
import { request } from "../utils/httpRequest.ts";

const useFetch = (url: string, body: BodyType = {}) => {
  const data = ref(null);
  const error = ref(null);

  const fetchData = () => {
    data.value = null;
    error.value = null;

    request(toValue(url), "POST", body)
      .then((res) => res.json())
      .then((json) => (data.value = json))
      .catch((err) => (error.value = err));
  };

  watchEffect(() => {
    fetchData();
  });

  return { data, error };
};

export default useFetch;
