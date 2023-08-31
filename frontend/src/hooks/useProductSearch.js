import axios from "axios";
import { useEffect, useState } from "react";
import server from "../server";

function useProductSearch(query) {
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  useEffect(() => {
    let cancel;
    const fetchSuggestions = async () => {
      try {
        setLoading(true);
        setError(false);
        let res = await axios(`${server}product/search-suggestion?q=${query}`, {
          cancelToken: new axios.CancelToken((c) => (cancel = c)),
        });
        if (res.data.success) {
          setLoading(false);
          setSuggestions(res.data.suggestions);
        } else {
          setLoading(false);
          setError(true);
        }
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };
    fetchSuggestions();
    return () => cancel();
  }, [query]);
  return { error, isLoading, suggestions };
}

export default useProductSearch;
