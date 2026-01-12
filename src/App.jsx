import { Outlet } from 'react-router';
import styles from './App.module.css';
import { usePath } from './usePath';
import { useStore } from './useStore';
import { Loading } from './Loading';
import { Error } from './Error';

function getHeaderStyle(path) {
  return (elem) => {
    const p = path.split('/')[1].toLowerCase();
    elem = elem.toLowerCase();
    return (elem !== p) ? styles.header : `${styles.header} ${styles.selected}`;
  }
}

function App() {
  const { path, goToHome, goToShop, goToCart } = usePath();
  const getStyle = getHeaderStyle(path);
  
  const props = useStore();
  const {
    loading,
    error,
    products,
    cart,
    updateItemCnt,
    decrementItemCnt,
    incrementItemCnt,
  } = props;

  function getElementToDisplay() {
    if (loading) return <Loading />
    if (error) return <Error />
    return <Outlet context={props} />
  }

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <div 
          className={getStyle('home')}
          onClick={goToHome}
        >
          Home
        </div>
        <div className={styles.divider}></div>
        <div 
          className={getStyle('shop')}
          onClick={goToShop}
        >
          Shop
        </div>
        <div className={styles.divider}></div>
        <div 
          className={getStyle('cart')}
          onClick={goToCart}
        >
          Cart {cart.size}
        </div>
      </div>
      {getElementToDisplay()}
    </div>
  )
}

export default App
