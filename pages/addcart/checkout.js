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
  } = useCart()

  // 發送訂單的函數
  const sendOrder = async () => {
    if (items.length === 0) {
      return alert('購物車是空的')
    }

    // 構造訂單資料
    const orderData = {
      order_date: new Date().toISOString(), // 當前時間
      number_id: 123, // 訂單編號
      pay_ornot: false, // 是否已付款
      pay_id: 1, // 假設的支付方式ID
      send_tax: handleSendwayChange, // 假設運費
      total_price: totalWithShipping, // 總價格
      order_status: 'pending', // 訂單狀態
      recipient_address: '', // 收件人地址
      order_detail_id: 1, // 訂單詳細ID
    }

    try {
      const response = await fetch('http://localhost:3005/api/orderfetch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData), // 將訂單資料作為請求體發送
      })

      const data = await response.json()

      if (response.ok) {
        alert('訂單成功送出！')
        console.log('訂單詳細資料：', data)
      } else {
        alert('訂單送出失敗：' + data.message)
        console.error('訂單送出失敗：', data)
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
