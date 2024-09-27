import React, { useState, useEffect } from 'react'
import { useCart } from '@/hooks/use-cart'

export default function ECPayIndex() {
  // 導向至ECPay付款頁面
  const goECPayTestOnly = (totalWithShipping) => {
    if (window.confirm('確認要導向至ECPay進行付款?')) {
      // 先連到node伺服器後，導向至ECPay付款頁面
      window.location.href = `http://localhost:3005/api/ecpay-test-only?amount=${totalWithShipping}`
    }
  }

  const {
    items,
    totalPrice,
    totalQty,
    handleSendwayChange,
    totalWithShipping,
    handleAdd,
    handleDecrease,
    handleIncrease,
    handleRemove,
    handlecancel,
  } = useCart()

  return (
    <>
      <h1>ECPay測試</h1>
      <button
        onClick={() => {
          goECPayTestOnly(totalWithShipping)
        }}
      >
        結帳
      </button>
    </>
  )
}
