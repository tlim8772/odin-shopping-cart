import { useOutletContext } from "react-router";
import styles from './Cart.module.css';
import { useState, useRef } from "react";
import { prettyDOM } from "@testing-library/dom";

export function Cart() {
  const props = useOutletContext();
  const {
    products,
    cart,
    updateItemCnt,
    decrementItemCnt,
    incrementItemCnt,
  } = props;
  const [prodToRm, setProdToRm] = useState(null);
  const ref = useRef();

  function decrementHelper(itemId) {
    return () => {
      if (cart.get(itemId) > 1) {
        decrementItemCnt(itemId)();
        return;
      } 
      setProdToRm(products.find(p => p.id === itemId));
      ref.current?.showModal();
    }
  }

  return (
    <>
      <div className={styles.cart}>
        <table className={styles.cartTable}>
          <caption>Your Cart</caption>
          <colgroup>
            <col />
            <col />
            <col />
          </colgroup>
          <tbody>
            {
              Array.from(cart.entries()).map(([itemId, cnt]) => {
                const product = products.find(p => p.id === itemId);
                return (
                  <tr key={itemId}>
                    <td>
                      <div style={{marginRight: '32px'}}>
                        <img className={styles.productImg} src={product.image} />
                      </div>
                    </td>
                    <td>
                      {product.title}
                    </td>
                    <td className={styles.tdCenter}>
                      <div className={styles.gutter}>
                        <button onClick={decrementHelper(itemId)}>-</button>
                        {cnt}
                        <button onClick={incrementItemCnt(itemId)}>+</button>
                      </div>
                    </td>
                    <td className={styles.tdCenter}>
                      {(cnt * product.price).toFixed(2)}
                    </td>
                  </tr>
                )
              })
            }
            <tr>
              <td>&nbsp;</td>
              <td>Total</td>
              <td>&nbsp;</td>
              <td className={styles.tdCenter}>
                {
                  Array.from(cart.entries()).reduce((acc, [itemId, cnt]) => {
                    const product = products.find(p => p.id === itemId);
                    return acc + cnt * product.price;
                  }, 0).toFixed(2)
                }
              </td>
            </tr>
            <tr>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td className={styles.tdCenter}>
                <button>Checkout</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <dialog 
        ref={ref} 
        closedby="any"
        className={styles.confirmDialog}
      >
        <div className={styles.confirmDiv}>
          <div>Are you sure you want to remove</div>
          <img src={prodToRm?.image} />
          <div>{prodToRm?.title}</div>
          <button 
            onClick={() => {
              ref.current?.close();
              decrementItemCnt(prodToRm?.id)();
            }}
          >
            Yes
          </button>
        </div>
      </dialog>
    </>
  )
}