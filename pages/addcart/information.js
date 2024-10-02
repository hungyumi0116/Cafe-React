import React, { useState, useEffect } from 'react'
import card from '@/styles/card.module.css'
import styles from '@/styles/addcart.module.css'
import { useCart } from '@/hooks/use-cart'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Link from 'next/link'

export default function Checkout() {
  const [Sendway, setSendway] = useState([])
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

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

    
    if (window.confirm('確認要導向至ECPay進行付款?')) {
      // 先連到node伺服器後，導向至ECPay付款頁面
      window.location.href = `http://localhost:3005/api/ecpay-test-only?amount=${totalWithShipping}`
    }
  }


  return (
    <>
      <div className={styles.containerback}>
        {/* 訂單資料的狀態列 */}
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
        {/* 訂單資料的狀態列 */}

        <div className={styles.container}>
          <div className={styles.cart}>
            <div className={styles.little}>
              <p>購物車目前共有{totalQty}件商品</p>
            </div>

            <div className={styles.ul}>
              <ul>
                <div className={styles.sort}>
                  <div>商品</div>
                  <div>品名</div>
                  <div>數量</div>
                  <div>價格</div>
                </div>
                {items.map((v, i) => {
                  return (
                    <li key={v.p_id} className={styles.list}>
                      <div className={styles.listdiv}>{v.p_pic1}</div>
                      <div className={styles.listdiv}>{v.p_name}</div>
                      <div className={styles.listdiv}>{v.qty}</div>
                      <div className={styles.listdiv}>{v.p_discount}</div>
                    </li>
                  )
                })}
              </ul>
            </div>
            {/*  */}
            <div className={styles.little}>
              <p>收件人基本資料</p>
            </div>
            <div className={styles.inputcontainer}>
              <div className={styles.inputdiv}>
                姓名：
                <input
                  className={styles.inputtext}
                  placeholder="請輸入收件人姓名"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className={styles.inputdiv}>
                地址：
                <input
                className={styles.inputtext}
                placeholder="請輸入收件人地址"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
/>
              </div>
            </div>
            <div className={styles.inputcontainer}>
              <div className={styles.inputdiv}>
                手機：
                <input
                className={styles.inputtext}
                placeholder="請輸入收件人電話"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              </div>
              <div className={styles.inputdiv}>
                信箱：
                <input
                className={styles.inputtext}
                placeholder="請輸入收件人信箱"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              </div>
            </div>
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
                      <option>請選擇運送方式：</option>
                      {Sendway.map((way) => (
                        <option key={way.send_id} value={way.send_id}>
                          {way.send_way}
                          {way.send_cost}元
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
                      <button className={styles.button} button id="sendOrder" onClick={sendOrder}>
                        <span>下訂單！</span>
                      </button>
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
