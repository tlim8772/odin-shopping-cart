import { useOutletContext } from "react-router";
import { ProductCard } from "./ProductCard";
import styles from './Shop.module.css';
import { useState } from "react";

export function Shop() {
  const props = useOutletContext();
  const {
    products,
    cart,
    updateItemCnt,
    decrementItemCnt,
    incrementItemCnt,
  } = props;

  const [search, setSearch] = useState();
  const [filteredProds, setFilteredPros] = useState(products);

  function onSearch() {
    const regex = new RegExp(search, 'i');
    setFilteredPros(filteredProds.filter(p => {
      return p.title.match(regex);
    }));
  }

  return (
    <div className={styles.shop}>
      <div className={styles.searchBar}>
        <input value={search} onChange={(e) => setSearch(e.target.value)}/>
        <button onClick={onSearch}>
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
        </button>
      </div>
      <div className={styles.productGrid}>
        {filteredProds.map(p => 
          <ProductCard 
            key={p.id}
            product={p} 
            cnt={cart.get(p.id) ?? 0}
            updateCnt={updateItemCnt(p.id)}
            decrementCnt={decrementItemCnt(p.id)}
            incrementCnt={incrementItemCnt(p.id)}
          />
        )}
      </div>  
    </div>
  )
}