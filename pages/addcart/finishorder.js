// pages/order/[orderId].js
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function OrderSuccess() {
  const router = useRouter()
  const { orderId } = router.query // 取得動態路由參數

  const [orderData, setOrderData] = useState(null)

  useEffect(() => {
    if (orderId) {
      // 假設後端提供 API 來根據 orderId 獲取訂單資料
      const fetchOrderData = async () => {
        try {
          const res = await fetch(`http://localhost:3005/api/order/${orderId}`)
          const data = await res.json()
          setOrderData(data)
          console.log('獲取訂單資料成功!', data)
        } catch (error) {
          console.error('獲取訂單資料失敗', error)
        }
      }

      fetchOrderData()
    }
  }, [orderId])

  if (!orderData) {
    return <div>加載中...</div>
  }

  return (
    <div>
      <h1>訂單完成</h1>
      <p>訂單編號: {orderId}</p>
      <p>總金額: {orderData.total_price}</p>
      {/* 顯示訂單的其他詳細信息 */}
    </div>
  )
}
