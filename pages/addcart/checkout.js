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

      {/* 顯示購物車項目 */}
      {items.length > 0 ? (
        items.map((item, index) => (
          <div key={index}>
            <h3>{item.p_name}</h3>
            <p>價格: {item.p_price}</p>
            <p>數量: {item.qty}</p>
            <button onClick={() => handleIncrease(item.p_id)}>增加數量</button>
            <button onClick={() => handleDecrease(item.p_id)}>減少數量</button>
            <button onClick={() => handleRemove(item.p_id)}>刪除</button>
          </div>
        ))
      ) : (
        <p>購物車是空的。</p>
      )}

      {/* 顯示總數量和總價格 */}
      <div>
        <p>總數量: {totalQty}</p>
        <p>總價格: {totalPrice}</p>
      </div>
    </>
  )
}
