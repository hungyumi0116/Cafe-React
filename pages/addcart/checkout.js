import React from 'react'
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
    items, // 購物車中的商品
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

  // 發送訂單的函數
  const sendOrder = async () => {
    if (items.length === 0) {
      return alert('購物車是空的')
    }

    try {
      // 發送 POST 請求到後端
      const response = await fetch('http://localhost:3005/api/orderforcart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items, // 將購物車中的商品資料發送
          totalQty,
          totalPrice,
          shippingMethod: handleSendwayChange,
          totalWithShipping,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        alert('訂單成功送出！')
        console.log('訂單詳細資料：', data)
      } else {
        console.error('訂單送出失敗：', data.message)
      }
    } catch (error) {
      console.error('訂單送出過程中出現錯誤：', error)
    }
  }

  return (
    <>
      <h1>ECPay 測試</h1>
      <button id="sendOrder" onClick={sendOrder}>
        送出訂單
      </button>
      <button onClick={() => goECPayTestOnly(totalWithShipping)}>結帳</button>
    </>
  )
}
