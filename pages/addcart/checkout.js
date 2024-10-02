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
      order_date: new Date().toISOString().split('T')[0],  // 格式化為日期型別
      member_id: null,  // member_id 允許為 NULL
      send_id:null,    // send_id 允許為 NULL
      send_tax:0,      // 默認運費為 0
      total_price:totalWithShipping,   // 默認總價格為 0
      order_status:'包貨中',  // 默認狀態為 '包貨中'
      order_detail_id:null,    // 訂單詳細 ID 允許為 NULL
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
