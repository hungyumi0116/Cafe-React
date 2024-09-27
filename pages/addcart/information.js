import React, { useState, useEffect } from 'react'
import card from '@/styles/card.module.css'
import styles from '@/styles/addcart.module.css'
import { useCart } from '@/hooks/use-cart'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Link from 'next/link'

export default function Checkout() {
  const [Sendway, setSendway] = useState([])

  // 發送 API 請求來獲取運送方式
  const getSendway = async (params = {}) => {
    const baseURL = 'http://localhost:3005/api/sendway'
    const searchParams = new URLSearchParams(params)
    const qs = searchParams.toString()
    const url = `${baseURL}?${qs}`

    try {
      const res = await fetch(url)
      const resData = await res.json()

      // 檢查響應是否成功
      if (resData.status === 'success') {
        console.log('運送方式:', resData.data.sendway) // 確認資料是否正確
        setSendway(resData.data.sendway) // 更新 Sendway 狀態
      } else {
        throw new Error('獲取運送方式失敗')
      }
    } catch (e) {
      console.error(e)
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

  useEffect(() => {
    getSendway()
  }, [])

  return (
    <>
      <div className={styles.containerback}>
        <div className={styles.little1}>
          <div className={styles.circlebigdiv}>
            <div className={styles.circlediv}>
              <div className={styles.circle}></div>
              <p>購物車</p>
            </div>
            <div className={styles.circlediv}>
              <div className={styles.circle}></div>
              <p>填寫資料</p>
            </div>
            <div className={styles.circlediv}>
              <div className={styles.circle}></div>
              <p>完成訂單</p>
            </div>
          </div>
        </div>
        <div className={styles.container}>
          <div className={styles.cart}>
            <div className={styles.little}>
              <p>請填寫基本資料</p>
            </div>

            <div className={styles.inputcontainer}>
              <div className={styles.inputdiv}>
                姓名：
                <input
                  className={styles.inputtext}
                  placeholder="請輸入收件人姓名"
                ></input>
                地址：
                <input
                  className={styles.inputtext}
                  placeholder="請輸入收件人地址"
                ></input>
              </div>
            </div>

            <div className={styles.ul}></div>
          </div>

          <div className={styles.subtotal}>
            <div className={styles.little}>
              <p>小計明細</p>
            </div>
            <div className={styles.subtotaldiv}>
              <div className={styles.subtotaltext}>
                <div> 商品數量: {totalQty}</div>
                <div> 小計: {totalPrice}</div>
                <div className={styles.sendway}>
                  <p>請選擇運送方式：</p>
                  <div>
                    <select onChange={handleSendwayChange}>
                      <option>請選擇一種運送方式</option>
                      {Sendway.map((v) => (
                        <option key={v.send_id} value={v.send_id}>
                          {v.send_way} {v.send_cost}元
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>總計: {totalWithShipping}元</div>
              </div>
              <hr />
              <div className={styles.forbutton}>
                <div className={styles.buttondiv}>
                  <Link href={`/addcart/addcart`}>
                    <button className={styles.button}>
                      <span>返回購物車</span>
                    </button>
                  </Link>
                </div>
                <div className={styles.buttondiv}>
                  {items.length > 0 && (
                    <Link href={`/addcart/checkout`}>
                      <button className={styles.button}>
                        <span>下訂單！</span>
                      </button>
                    </Link>
                  )}
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
      <div className={card.text}>
        <div className={card.h3}>
          <h3>探索咖啡的所有可能</h3>
        </div>
        <div className={card.h2}>
          <h2>推薦商品</h2>
        </div>
      </div>
    </>
  )
}
