// ProductCard.js
import React from 'react'
import card from '@/styles/card.module.css'
import products from '@/pages/products'

const ProductCard = ({ product }) => {
  return (
    <div className={card.card}>
      <div className={card.productcard}>
        <div className={card.img}>
          <img src={product.p_pic} alt={product.p_id} />
        </div>
        <div className={card.cardtext}>
          <p>{product.p_name}</p>
          <p>NT{product.p_discount}</p>
        </div>
      </div>
    </div>
  )
}

export default ProductCard