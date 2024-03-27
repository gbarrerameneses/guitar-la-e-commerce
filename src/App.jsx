import { useState } from "react";
import Header from "./components/Header";
import Guitar from "./components/Guitar";
import { db } from "./data/db";

function App() {
  const [data, setData] = useState(db) // seteamos db
  const [cart, setCart] = useState([])

  // Función para agregar productos al carrito
  function addToCart(item) {

    const itemExists = cart.findIndex(guitar => guitar.id === item.id)

    if (itemExists >= 0) { // Validación - Existe en el carrito

      const updatedCart = [...cart] // tomamos una copia del state para no inmutarlo
      updatedCart[itemExists].quantity++ // e incrementamos la cantidad

      setCart(updatedCart) // seteamos con updateCart

    } else {

      item.quantity = 1
      setCart([...cart, item]) // agrega al state

    }
  }

  return (
    <>
      <Header
        cart={cart}
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
