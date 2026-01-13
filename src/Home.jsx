import styles from './Home.module.css';

export function Home() {
  return (
    <div className={styles.home}>
      <div className={styles.homeTitle}>
        Welcome to FakeStore ! 
        <svg
          fill="#000000"
          viewBox="0 0 24 24"
          id="cart-alt-1"
          data-name="Flat Line"
          xmlns="http://www.w3.org/2000/svg"
          className="icon flat-line"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth={0} />
          
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          <g id="SVGRepo_iconCarrier">
            <polygon
              id="secondary"
              points="21 6 18.2 13 10 13 7.2 6 21 6"
              style={{ fill: "#2ca9bc", strokeWidth: 2 }}
            />
            
            <path
              id="primary-upstroke"
              d="M11,20.5h.1m5.9,0h.1"
              style={{
                fill: "none",
                stroke: "#000000",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 2.5,
              }}
            />
            
            <path
              id="primary"
              d="M3,3H5.32a1,1,0,0,1,.93.63L10,13,8.72,15.55A1,1,0,0,0,9.62,17H19"
              style={{
                fill: "none",
                stroke: "#000000",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 2,
              }}
            />
            
            <polyline
              id="primary-2"
              data-name="primary"
              points="7.2 6 20.8 6 21 6 18.2 13 10 13"
              style={{
                fill: "none",
                stroke: "#000000",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 2,
              }}
            />
          </g>
        </svg>
      </div>
      <ul>
        <li className={styles.moveLeftRight}>20 items to choose from</li>
        <li className={styles.rainbowText}>Everything is free</li>
      </ul>
    </div>
  )
}