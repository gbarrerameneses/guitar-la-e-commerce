import { useState, useEffect } from "react";
import Header from "./components/Header";
import Guitar from "./components/Guitar";
import { db } from "./data/db";
import useCart from "./hooks/useCart";

function App() {
  useCart()

  // Revisa si hay algo en localStorage
  const initialCart = () => {
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : []
  }

  const [data, setData] = useState(db) // seteamos db
  const [cart, setCart] = useState(initialCart) // Pasamos initialCart

  const MIN_ITEMS = 1
  const MAX_ITEMS = 5

  // localStorage
  useEffect(() =>{
    localStorage.setItem('cart', JSON.stringify(cart))
  },[cart])

  // Función para agregar productos al carrito
  function addToCart(item) {
    const itemExists = cart.findIndex(guitar => guitar.id === item.id)

    if (itemExists >= 0) { // Validación - Existe en el carrito
      if(cart[itemExists].quantity >= MAX_ITEMS) return
      const updatedCart = [...cart] // tomamos una copia del state para no inmutarlo
      updatedCart[itemExists].quantity++ // e incrementamos la cantidad

      setCart(updatedCart) // seteamos con updateCart

    } else {

      item.quantity = 1
      setCart([...cart, item]) // agrega al state

    }

    // saveLocalStorage()
  }

  // Función para eliminar productos al carrito
  function removeToCart(id){
    setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
  }

  // Función para incrementar productos al carrito
  function increaseQuantity(id){
    const updatedCart = cart.map(item => {
      if (item.id === id && item.quantity < MAX_ITEMS) {
        return {
          ...item, // referencia del carrito de compra
          quantity: item.quantity + 1 // incrementa la cantidad
        }
      }
      return item // para mantener a las guitarras que no se dio click
    })

    setCart(updatedCart)
  }

  // Función para decrementar productos al carrito
  function decreaseQuantity(id){
    const updatedCart = cart.map(item => {
      if (item.id === id && item.quantity > MIN_ITEMS) {
        return {
          ...item, // referencia del carrito de compra
          quantity: item.quantity - 1 // decrementa la cantidad
        }
      }
      return item // para mantener a las guitarras que no se dio click
    })

    setCart(updatedCart)
  }

  // Función para limpiar el carrito
  function clearCart() {
    setCart([]) // reinicia el arreglo del carrito
  }

  return (
    <>
      <Header
        cart={cart}
        removeToCart={removeToCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        clearCart={clearCart}
      />
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar) => (
            <Guitar
              key={guitar.id} // pasando el id de la guitarra
              guitar={guitar}
              setCart={setCart}
              addToCart={addToCart}
            />
          ))}
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            GuitarLA - Todos los derechos Reservados
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
