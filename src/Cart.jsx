import { useOutletContext } from "react-router";
import styles from './Cart.module.css';

export function Cart() {
  const props = useOutletContext();
  const {
    products,
    cart,
    updateItemCnt,
    decrementItemCnt,
    incrementItemCnt,
  } = props;

  return (
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
                      <button onClick={decrementItemCnt(itemId)}>-</button>
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
  )
}