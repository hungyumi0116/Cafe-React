// ProductCard.js
import React from 'react'
import card from '@/styles/card.module.css'

const ProductCard = ({ product }) => {
  return (
    <div className={card.card}>
      <div className={card.productcard}>
        <div className={card.img}>
          <img src={product.image} alt={product.name} />
        </div>
        <div className={card.cardtext}>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>${product.price}</p>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
