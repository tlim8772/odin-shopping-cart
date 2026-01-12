import styles from './Product.module.css';
import { useState } from 'react';

function clip(s) {
  return s.slice(0, 30) + '...';
}

export function ProductCard(props) {
  const {
    product,
    cnt,
    updateCnt,
    decrementCnt,
    incrementCnt
  } = props;
  const [quantity, setQuantity] = useState(cnt ?? 0);

  function increment() {
    setQuantity(quantity + 1);
    incrementCnt();
  }

  function decrement() {
    if (quantity == 0) return;
    setQuantity(quantity - 1);
    decrementCnt();
  }

  function update(e) {
    setQuantity(e.target.value);
    updateCnt(e.target.value);
  }

  return (
    <div className={styles.productCard}>
      <img src={product.image} />
      <div>
        {clip(product.title)}
      </div>
      <div className={styles.gutter}>
        <button onClick={decrement}>-</button>
        <input type='number' onChange={update} value={quantity}></input>
        <button onClick={increment}>+</button>
      </div>
    </div>
  )
}