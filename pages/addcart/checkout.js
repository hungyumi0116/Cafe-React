import React from 'react'

import { useCart } from '@/hooks/use-cart'
export default function Checkout() {
  const {
    items,
    totalPrice,
    totalQty,
    handleDecrease,
    handleIncrease,
    handleRemove,
  } = useCart()

  return (
    <>
    <div>Checkout</div>
    {totalPrice}
    </>
  )
}
