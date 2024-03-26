import React from 'react'

const Guitar = ({guitar, cart, setCart}) => { // Destructuring - Props

const { id, name, image, description, price } = guitar

// Una forma de pasar el producto al carrito 
// es generando la función y
// pasando lo de adentro de la función
// setCart([...cart, guitar]) al onClick y
// sustituyo 'handleClick(guitar)'
// const handleClick = (guitar) => {
//   setCart([...cart, guitar])
// }

  return (
    <>
      <div className="col-md-6 col-lg-4 my-4 row align-items-center">
            <div className="col-4">
            <img
                className="img-fluid"
                src={`/img/${image}.jpg`}
                alt="imagen guitarra"
              />
            </div>
            <div className="col-8">
              <h3 className="text-black fs-4 fw-bold text-uppercase">
                {name}
              </h3>
              <p>
                {description}
              </p>
              <p className="fw-black text-primary fs-3">${price}</p>
              <button type="button" className="btn btn-dark w-100"
              onClick={() => setCart(prevCart => [...prevCart, guitar])}>
                {/* Pero optamos por pasar solamente el useState
                mediante un arrowfunction, ya que sabe lo que
                tiene tomando una copia, prevCart sustituye al estate
                Ya que no va a ser necesario pasar el state (cart)
                */}
                Agregar al Carrito
              </button>
            </div>
          </div>

    </>
  )
}

export default Guitar

