import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export function useStore() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(new Map());
  const navigate = useNavigate();

  useEffect(() => {
    let race = false;
    fetch('https://fakestoreapi.com/products')
      .then(resp => {
        if (!resp.ok) throw new Error('Something went wrong');
        return resp.json();
      })
      .then(data => {
        return new Promise((res, rej) => setTimeout(() => res(data), 500))
      })
      .then(data => {
        if (race) return;
        setProducts(data)
        setLoading(false);
        navigate('/home');
      })
      .catch(e => {
        setError(e)
        setLoading(false);
      });
    
    return () => race = true;
      
  }, []);

  function updateItemCnt(itemId, cnt) {
      setCart(prevMap => new Map(prevMap).set(itemId, cnt));
  }

  function decrementItemCnt(itemId) {
      const cnt = cart.get(itemId);
      if (!cnt) return;
      setCart(prevmap => new Map(prevmap).set(itemId, cnt + 1));
  }

  function incrementItemCnt(itemId) {
      const cnt = cart.get(itemId);
      setCart(prevMap => new Map(prevMap).set(itemId, (cnt ?? 0) + 1));
  }

  return {
    loading,
    error,
    products,
    cart,
    updateItemCnt,
    decrementItemCnt,
    incrementItemCnt,
  }
}