import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from '@/styles/addcart.module.css';
import st from '@/styles/orderfinish.module.css';
import Link from 'next/link'; // 更改這一行
import { useCart } from '@/hooks/use-cart'

export default function OrderSuccess() {
  const router = useRouter();
  const { orderlist_id } = router.query; // 獲取 URL 中的 orderlist_id
  const [orderData, setOrderData] = useState(null); // 存儲訂單資料
  const [loading, setLoading] = useState(true); // 加載狀態
  const [error, setError] = useState(null); // 錯誤信息

  // 發送 API 請求來獲取訂單資料
  const getOrderData = async (orderlist_id) => {
    const url = `http://localhost:3005/api/orderfinish/${orderlist_id}`;

    try {
      const res = await fetch(url);
      const resData = await res.json();

      // 檢查響應是否成功
      if (resData.status === 'success' && resData.data.orderlist) {
        console.log('訂單資料:', resData.data.orderlist); // 確認資料是否正確
        setOrderData(resData.data.orderlist); // 更新 orderData 狀態
      } else {
        throw new Error('獲取訂單失敗，請檢查訂單編號');
      }
    } catch (e) {
      console.error(e);
      setError(e.message); // 設置錯誤信息
    } finally {
      setLoading(false); // 無論成功或失敗，都設置加載狀態為 false
    }
  };

  useEffect(() => {
    if (orderlist_id) {
      getOrderData(orderlist_id);
    }
  }, [orderlist_id]); // 當 orderlist_id 變化時觸發

  if (loading) {
    return <p>加載中...</p>; // 加載狀態提示
  }

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
     <div className={styles.containerback}>

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

        {/* 訂單資料的狀態列 */}

        <div className={styles.container}>

          <div className={styles.cart}>
            <div className={styles.little}>
              <p>訂單已送出!</p>
            </div>
            <div>
              <ul className={styles.ul}>
              <table className={st.table}>
            <tbody  className={st.table}>
              <tr>
                <td className={st.statustitle}>訂單編號：</td>
                <td className={st.statustitle}>{orderData.orderlist_id}</td>
              </tr>
              <tr>
                <td className={st.statustitle}>訂單日期：</td>
                <td className={st.statustitle}>{orderData.order_date}</td>
              </tr>
              <tr>
                <td className={st.statustitle}>收件人姓名：</td>
                <td className={st.statustitle}>{orderData.member_name}</td>
              </tr>
              <tr>
                <td className={st.statustitle}>收件人手機：</td>
                <td className={st.statustitle}>{orderData.mobile}</td>
              </tr>
              <tr>
                <td className={st.statustitle}>電子郵件：</td>
                <td className={st.statustitle}>{orderData.email}</td>
              </tr>
              <tr>
                <td className={st.statustitle}>付款狀態：</td>
                <td className={st.statustitle}>{orderData.pay_ornot}</td>
              </tr>
              <tr>
                <td className={st.statustitle}>總金額：</td>
                <td className={st.statustitle}>{orderData.total_price}元</td>
              </tr>
              <tr>
                <td className={st.statustitle}>收件地址：</td>
                <td className={st.statustitle}>{orderData.recipient_address}</td>
              </tr>
              <tr>
                <td className={st.statustitle}>備註：</td>
                <td className={st.statustitle}>{orderData.remark}</td>
              </tr>
              <tr>
                <td className={st.statustitle}>訂單詳情：</td>
                <td className={st.statustitle}>{orderData.order_detail_id}</td>
              </tr>
            </tbody>
          </table>
              </ul>
            </div>
            {/*  */}
          </div>

          <div className={styles.subtotal}>
            <div className={styles.little}>
              <p>返回列表</p>
            </div>
            <div className={styles.subtotaldiv}>
              <div className={styles.subtotaltext}>
              </div>
              <div className={styles.forbutton}>
                <div className={styles.buttondiv}>
                  <Link href={`/product/list`}>
                    <button className={styles.button}>
                      <span>返回商品頁面</span>
                    </button>
                  </Link>
                </div>
                <div className={styles.buttondiv}>
            <Link href={`/addcart/orderread/`}>
          <button className={st.button}>
            <span>查看詳細資料</span>
            </button>
          </Link>
          </div>
              </div>
              <p>
                🔸【超商取貨】若有選購禮盒類商品，有可能材積會超過，若不需要外盒，可備註在訂單留言喔!!
              </p>
              <p>
                🔸【急件】若您急需送禮/出國/飯店代收…等，請下單前/後，一定要與線上客服聯絡確定可到貨日期喔!!!
              </p>
              <p>
                🔸『 LINE Pay 付款』本店支援 LINE Pay 付款，歡迎使用 LINE Pay
                進行結帳。
              </p>
              <p>
                🔸
                【手機戴具無法開立統編】若同時填寫「統編」及「手機條碼戴具」二個欄位，系統會直接開立手機條碼戴具!!
              </p>
              <p>
                🔸【包裝】若您不需任何禮盒等包裝，請在填寫資料頁「訂單備註」欄留言「不需任何禮盒/紙盒包裝」即可。
              </p>
            </div>
          </div>
        </div>
      </div>  
      
    </>
  );
}
