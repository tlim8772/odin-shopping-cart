import styles from './Product.module.css';
import { useRef, useState } from 'react';

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
  const ref = useRef();

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

  function openDialog() {
    console.log('open dialog');
    ref.current?.showModal();
  }

  return (
    <>
      <div className={styles.productCard}>
        <img src={product.image} onClick={openDialog}/>
        <div>
          {clip(product.title)}
        </div>
        <div>${product.price}</div>
        <div className={styles.gutter}>
          <button onClick={decrement}>-</button>
          <input type='number' onChange={update} value={quantity}></input>
          <button onClick={increment}>+</button>
        </div>
      </div>
      <dialog 
        className={styles.productDialog} 
        ref={ref}
        onClick={e => {
          if (e.target === ref.current) ref.current.close();
        }} 
      >
        <div className={styles.dialogPage}>
          <div className={styles.dialogProductInfo}>
            <img src={product.image} />
            <div>{product.title}</div>
            <div>{product.description}</div>
          </div>
          <div></div>
          <div>
            <div>${product.price}</div>
            <div className={styles.gutter}>
              <button onClick={decrement}>-</button>
              <input type='number' onChange={update} value={quantity}></input>
              <button onClick={increment}>+</button>
            </div>
          </div>
        </div>
      </dialog>
    </>
  )
}