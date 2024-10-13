import React from 'react'
import card from '@/styles/card.module.css'
import Link from 'next/link'
import indexcss from '@/styles/index.module.css'


const ProductCard = ({ product }) => {
  return (
    <Link className={indexcss.link} href={`/product/${product.p_id}`}>
      <div className={card.card}>
        <div className={card.productcard}>
          <div className={card.img}>
            <img className={card.imgsize} src={product.p_pic} alt={product.p_id} />
          </div>
          <div className={card.cardtext}>
            <p>{product.p_name}</p>
            <p>NT{product.p_discount}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
