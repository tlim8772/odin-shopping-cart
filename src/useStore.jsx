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

  function updateItemCnt(itemId) {
    return (cnt) => {
      if (cnt == 0) {
        cart.delete(itemId);
      } else {
        cart.set(itemId, cnt);
      }
      setCart(new Map(cart));
    }
      
  }

  function decrementItemCnt(itemId) {
    return () => {
      const cnt = cart.get(itemId);
      if (!cnt) {
        return;
      } else if (cnt == 1) {
        cart.delete(itemId);
      } else {
        cart.set(itemId, cnt - 1);
      }
      setCart(new Map(cart));
    }
      
  }

  function incrementItemCnt(itemId) {
    return () => {
      const cnt = cart.get(itemId);
      cart.set(itemId, (cnt ?? 0) + 1);
      setCart(new Map(cart));
    }
      
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