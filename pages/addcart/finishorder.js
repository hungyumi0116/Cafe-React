// pages/order/[orderId].js
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import styles from '@/styles/addcart.module.css'

export default function OrderSuccess() {
  const router = useRouter()
  const { orderId } = router.query // 獲取 URL 中的 orderId（如果需要的話）

  const [orderData, setOrderData] = useState(null) // 存儲訂單資料
  const [loading, setLoading] = useState(true) // 加載狀態

  // 發送 API 請求來獲取訂單資料
  const fetchOrderData = async () => {
    const baseURL = 'http://localhost:3005/api/orderfinish' // 你的後端 API
    const url = `${baseURL}` // API 請求路徑

    try {
      const res = await fetch(url, { method: 'POST' }) // 使用 POST 請求
      const resData = await res.json()

      // 檢查響應是否成功
      if (resData.status === 'success') {
        setOrderData(resData.data) // 設置訂單資料
      } else {
        throw new Error('獲取訂單資料失敗')
      }
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false) // 加載結束
    }
  }

  useEffect(() => {
    if (router.isReady) {
      fetchOrderData() // 只在路由準備好時獲取資料
    }
  }, [router.isReady]) // 依賴於 router.isReady

  if (loading) {
    return <p>加載中...</p> // 加載狀態
  }

  return (
    <>
      {/* 訂單資料的狀態列 */}
      <div className={styles.little1}>
        <div className={styles.line}></div>
        <div className={styles.circlebigdiv}>
          <div className={styles.circlediv}>
            <div className={styles.circle2}>1</div>
            <p className={styles.ptext}>購物車</p>
          </div>
          <div className={styles.circlediv}>
            <div className={styles.circle2}>2</div>
            <p className={styles.ptext}>填寫資料</p>
          </div>
          <div className={styles.circlediv}>
            <div className={styles.circlealive}>3</div>
            <p className={styles.ptext}>完成訂單</p>
          </div>
        </div>
      </div>
      {/* 訂單資料的狀態列 */}

      <div>
        <h1>訂單完成</h1>
        {orderData && (
          <>
            <p>訂單編號: {orderData.orderlist_id}</p>
            <p>總金額: {orderData.totalAmount}</p>
            <p>商品數量: {orderData.itemQty}</p>
            <p>商品內容: {orderData.orderItem}</p>
          </>
        )}
        {/* 顯示訂單的其他詳細信息 */}
      </div>
    </>
  )
}
