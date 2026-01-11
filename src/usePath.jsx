import { useLocation, useNavigate } from "react-router";

export function usePath() {
  const path = useLocation().pathname;
  const navigate = useNavigate();

  function goToHome() {
    navigate('/home');
  }

  function goToShop() {
    navigate('/shop');
  }

  function goToCart() {
    navigate('/cart');
  }

  return {
    path,
    goToHome,
    goToShop,
    goToCart,
  }
}