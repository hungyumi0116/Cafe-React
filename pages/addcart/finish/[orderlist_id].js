import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import styles from '@/styles/addcart.module.css'
import st from '@/styles/orderfinish.module.css'

export default function OrderSuccess() {
  const router = useRouter()
  const { orderlist_id } = router.query // 獲取 URL 中的 orderlist_id
  const [orderData, setOrderData] = useState(null) // 存儲訂單資料


  // 發送 API 請求來獲取訂單資料
  const getOrderData = async (orderlist_id) => {
    const url = `http://localhost:3005/api/orderfinish/${orderlist_id}`

    try {
      const res = await fetch(url)
      const resData = await res.json()

      // 檢查響應是否成功
      if (resData.status === 'success') {
        console.log('訂單資料:', resData.data.orderlist) // 確認資料是否正確
        setOrderData(resData.data.orderlist) // 更新 orderData 狀態
      } else {
        throw new Error('獲取訂單失敗')
      }
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    if (orderlist_id) {
      getOrderData(orderlist_id)
    }
  }, [orderlist_id]) // 當 orderlist_id 變化時觸發

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
      <div className={st.title}>訂單完成</div>
      <div className={st.title2}>訂單狀態：{orderData.order_status}</div>


      {orderData ? (
        <>
          <div className={st.statusbigdiv}>
            <div className={st.statusdiv}>
              <tr>
                <td className={st.statustitle}>訂單編號：</td>
              <td>{orderData.orderlist_id}</td>
              </tr>
              <tr>
                <td className={st.statustitle}>訂單日期：</td>
                <td>{orderData.order_date}</td>
              </tr>
              <tr>
                <td className={st.statustitle}>收件人姓名：</td>
                <td>{orderData.member_name}</td>
              </tr>
              <tr>
                <td className={st.statustitle}>收件人手機：</td>
                <td>{orderData.mobile}</td>
              </tr>
              <tr>
                <td className={st.statustitle}>電子郵件：</td>
                <td>{orderData.email}</td>
              </tr>
              <tr>
                <td className={st.statustitle}>付款狀態：</td>
                <td>{orderData.pay_ornot}</td>
              </tr>
              <tr>
              <td className={st.statustitle}>總金額：</td>
              <td>{orderData.total_price}元</td>
              </tr>
              <tr>
              <td className={st.statustitle}>收件地址：</td>
              <td> {orderData.recipient_address}</td>
                </tr>
                <tr>
              <td className={st.statustitle}>備註：</td>
              <td> {orderData.remark}</td>
                </tr>
                <tr>
                <td className={st.statustitle}>訂單詳情：</td>
                <td>{orderData.order_detail_id}</td>
                </tr>
            </div>
          </div>
        </>
      ) : (
        <p>找不到訂單資料</p>
      )}


    </>
  )
}
