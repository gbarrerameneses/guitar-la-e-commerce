import { useState, useEffect, useMemo } from "react";
import { db } from "./../data/db";

const useCart = () => {
  /* App */

  // Revisa si hay algo en localStorage
  const initialCart = () => {
    const localStorageCart = localStorage.getItem("cart");
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  };

  const [data, setData] = useState(db); // seteamos db
  const [cart, setCart] = useState(initialCart); // Pasamos initialCart

  const MIN_ITEMS = 1;
  const MAX_ITEMS = 5;

  // localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Función para agregar productos al carrito
  function addToCart(item) {
    const itemExists = cart.findIndex((guitar) => guitar.id === item.id);

    if (itemExists >= 0) {
      // Validación - Existe en el carrito
      if (cart[itemExists].quantity >= MAX_ITEMS) return;
      const updatedCart = [...cart]; // tomamos una copia del state para no inmutarlo
      updatedCart[itemExists].quantity++; // e incrementamos la cantidad

      setCart(updatedCart); // seteamos con updateCart
    } else {
      item.quantity = 1;
      setCart([...cart, item]); // agrega al state
    }

    // saveLocalStorage()
  }

  // Función para eliminar productos al carrito
  function removeToCart(id) {
    setCart((prevCart) => prevCart.filter((guitar) => guitar.id !== id));
  }

  // Función para incrementar productos al carrito
  function increaseQuantity(id) {
    const updatedCart = cart.map((item) => {
      if (item.id === id && item.quantity < MAX_ITEMS) {
        return {
          ...item, // referencia del carrito de compra
          quantity: item.quantity + 1, // incrementa la cantidad
        };
      }
      return item; // para mantener a las guitarras que no se dio click
    });

    setCart(updatedCart);
  }

  // Función para decrementar productos al carrito
  function decreaseQuantity(id) {
    const updatedCart = cart.map((item) => {
      if (item.id === id && item.quantity > MIN_ITEMS) {
        return {
          ...item, // referencia del carrito de compra
          quantity: item.quantity - 1, // decrementa la cantidad
        };
      }
      return item; // para mantener a las guitarras que no se dio click
    });

    setCart(updatedCart);
  }

  // Función para limpiar el carrito
  function clearCart() {
    setCart([]); // reinicia el arreglo del carrito
  }

  /* Header */
  // State Derivado
  const isEmpty = useMemo(() => cart.length === 0, [cart]);
  const cartTotal = useMemo(
    () => cart.reduce((total, item) => total + item.quantity * item.price, 0),
    [cart]
  );

  return {
    data,
    cart,
    addToCart,
    removeToCart,
    decreaseQuantity,
    increaseQuantity,
    clearCart,
    isEmpty,
    cartTotal,
  };
};

export default useCart;
