import React, { useState, useEffect } from 'react'
import card from '@/styles/card.module.css'
import styles from '@/styles/addcart.module.css'
import { useCart } from '@/hooks/use-cart'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Link from 'next/link'
import { create } from 'lodash'
import { string } from 'prop-types'
import ProductCard from '@/components/common/ProductCard'
import Slider from 'react-slick'
import products from '@/pages/products' // 引入商品數據

export default function Checkout() {
  const [Sendway, setSendway] = useState([])
  const [Name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [Remark, setRemark] = useState('')
  const [payway, setPayway] = useState([])
  const [selectedSendCost, setSelectedSendCost] = useState(0) // 選中的運費
  const [selectedSendway, setSelectedSendway] = useState([]) // 選中的運送方式
  const [selectedSendwayId, setSelectedSendwayId] = useState([]) // 選中的運送方式
  const [selectedPayway, setSelectedPayway] = useState([]) // 選中的運送方式
  const [selectedPaywayId, setSelectedPaywayId] = useState([]) // 選中的付費方式
  const [totalWithShipping, setTotalWithShipping] = useState(0) // 總計

  // 錯誤訊息的狀態
  const [errors, setErrors] = useState({})

  // --------------------------------------------------------------------------------

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

  useEffect(() => {
    getSendway()
  }, [])

  // 發送 API 請求來獲取運送方式
  const getPayway = async (params = {}) => {
    const baseURL = 'http://localhost:3005/api/payway'
    const searchParams = new URLSearchParams(params)
    const qs = searchParams.toString()
    const url = `${baseURL}?${qs}`

    try {
      const res = await fetch(url)
      const resData = await res.json()

      // 檢查響應是否成功
      if (resData.status === 'success') {
        console.log('付款方式:', resData.data.payway) // 確認資料是否正確
        setPayway(resData.data.payway) // 更新 Sendway 狀態
      } else {
        throw new Error('獲取付款方式失敗')
      }
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    getPayway()
  }, [])

  // --------------------------------------------------------------------------------

  const { items, totalPrice, totalQty, handleRemove } = useCart()

  // 處理選擇運送方式的事件
  const handleSendwayChange = (e) => {
    const selectedId = e.target.value
    const selectedWay = Sendway.find(
      (way) => way.send_id === parseInt(selectedId)
    )
    if (selectedWay) {
      setSelectedSendCost(selectedWay.send_cost) // 設定選中的運費
      setSelectedSendway(selectedWay.send_way)
      setSelectedSendwayId(selectedWay.send_id)
    }
  }
  // 處理選擇付費方式的事件
  const handlePaywayChange = (e) => {
    const selectedId = e.target.value
    const selectedWay = payway.find(
      (pway) => pway.pay_id === parseInt(selectedId)
    )
    if (selectedWay) {
      setSelectedPayway(selectedWay.pay_way) // 設定選中付費方式
      setSelectedPaywayId(selectedWay.pay_id)
    }
  }

  // 當 selectedSendCost 或 totalPrice 改變時，計算並存入 localStorage
  useEffect(() => {
    const Finaltotal = selectedSendCost + totalPrice
    setTotalWithShipping(Finaltotal)
    localStorage.setItem('totalWithShipping', Finaltotal) // 將總計存入 localStorage
  }, [selectedSendCost, totalPrice])

  // 在頁面刷新後從 localStorage 中加載保存的總計金額
  useEffect(() => {
    const savedTotal = localStorage.getItem('totalWithShipping')
    if (savedTotal) {
      setTotalWithShipping(parseInt(savedTotal))
    }
  }, [])
  const MySwal = withReactContent(Swal)
  const notifyAndRemove = (productName, productId) => {
    MySwal.fire({
      title: '你確定嗎?',
      text: '你將無法回復這個操作!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: '取消',
      confirmButtonText: '確定刪除!',
    }).then((result) => {
      if (result.isConfirmed) {
        MySwal.fire({
          title: '已刪除!',
          text: productName + ' 已從購物車中刪除',
          icon: 'success',
        })
        // 作刪除的動作
        handleRemove(productId)
      }
    })
  }
  // --------------------------------------------------------------------------------

  const validateForm = () => {
    const newErrors = {}
    if (!Name) newErrors.Name = '姓名為必填項'
    if (!address) newErrors.address = '地址為必填項'
    if (!phone) {
      newErrors.phone = '手機號碼為必填項，請輸入10位數字'
    } else if (!/^[0-9]{10}$/.test(phone)) {
      newErrors.phone = '手機號碼格式錯誤，請輸入10位數字'
    }
    if (!email) {
      newErrors.email = '信箱為必填項，需有信箱地址'
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      newErrors.email = '信箱格式不正確'
    }
    const validPayways = [
      '綠界支付',
      '超商取貨付款',
      '網銀轉帳付款',
      '貨到付款',
    ] // 有效的付款方式列表
    if (!validPayways.includes(selectedPayway)) {
      newErrors.payway = '請選擇有效的付款方式'
    }

    return newErrors
  }

  // 發送訂單的函數
  const sendOrder = async () => {
    const validationErrors = validateForm() // 驗證表單
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors) // 設置錯誤狀態
      return // 如果有錯誤，停止執行
    } else {
      setErrors({}) // 清除錯誤狀態
    }

    if (items.length === 0) {
      return alert('購物車是空的')
    }

    const cartitem = items.map((v) => v.p_name).join(',')

    // 構造訂單資料
    const orderData = {
      order_date: new Date().toISOString().split('T')[0], // 格式化為日期型別
      member_id: null, // member_id 允許為 NULL
      send_id: selectedSendwayId, // 選擇的 send_id
      send_tax: selectedSendCost, // 運費
      total_price: totalWithShipping, // 訂單總價
      order_status: '包貨中', // 默認狀態
      pay_id: selectedPaywayId,
      pay_ornot: '是', //默認狀態
      recipient_address: address,
      mobile: phone,
      email: email,
      remark: Remark,
      member_name: Name,
      order_detail: {
        create_date: new Date().toISOString().split('T')[0],
        order_item: cartitem,
        item_qty: totalQty,
        pay_way: selectedPayway,
        send_way: selectedSendway,
        send_tax: selectedSendCost,
        price: totalPrice,
        recipient_address: address,
      },
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
        const orderlistId = data.orderlistId
        alert(`'訂單成功送出！，訂單編號為：${orderlistId}'`)
        // 跳轉到 ECPay 支付頁面，傳遞 orderlist_id
        window.confirm('確認要導向至 ECPay 進行付款?')
        window.location.href = `http://localhost:3005/api/ecpay-test-only?amount=${totalWithShipping}&orderlist_id=${orderlistId}&item_qty=${totalQty}&order_item=${cartitem}`
      
        console.log('訂單詳細資料：', data)

      } else {
        alert('訂單送出失敗：' + data.message)
        console.error('訂單送出失敗：', data)
      }
    } catch (error) {
      console.error('訂單送出過程中出現錯誤：', error)
    }
  }

  const settings = {
    dots: true, // 顯示下方的圓點導航
    infinite: true, // 允許無限輪播
    speed: 500, // 切換速度，500ms
    slidesToShow: 5, // 每次顯示的商品數量
    slidesToScroll: 1, // 每次滾動的商品數量
    responsive: [
      {
        breakpoint: 1550, // 當螢幕寬度小於 1440px 時
        settings: {
          slidesToShow: 3, // 顯示3個商品
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1000, // 當螢幕寬度小於 600px 時
        settings: {
          slidesToShow: 2, // 顯示一個商品
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 800, // 當螢幕寬度小於 600px 時
        settings: {
          slidesToShow: 1, // 顯示一個商品
          slidesToScroll: 1,
        },
      },
    ],
  }

  return (
    <>
      <div className={styles.containerback}>
        {/* 訂單資料的狀態列 */}
        <div className={styles.little1}>
          <div className={styles.line}></div>
          <div className={styles.circlebigdiv}>
            <div className={styles.circlediv}>
              <div className={styles.circle2}>1</div>
              <p className={styles.ptext}>購物車</p>
            </div>
            <div className={styles.circlediv}>
              <div className={styles.circlealive}>2</div>
              <p className={styles.ptext}>填寫資料</p>
            </div>
            <div className={styles.circlediv}>
              <div className={styles.circle3}>3</div>
              <p className={styles.ptext}>完成訂單</p>
            </div>
          </div>
        </div>
        {/* 訂單資料的狀態列 */}

        <div className={styles.container}>
          <div className={styles.cart}>
            <div className={styles.little}>
              <p>購物車目前共有{totalQty}件商品</p>
            </div>

            <ul className={styles.ul}>
              <div className={styles.sort}>
                <div className={styles.sorttext1}>商品</div>
                <div className={styles.sorttext2}>品名</div>
                <div className={styles.sorttext3}>數量</div>
                <div className={styles.sorttext4}>價格</div>
                <div className={styles.sorttext5}>操作</div>
              </div>
              {items.map((v, i) => {
                return (
                  <li key={v.p_id} className={styles.list}>
                  <div className={styles.listdiv}>
                      <img src={`http://localhost:3005/img/${v.p_pic1}`} alt={v.p_name} /> {/* 確保這裡使用 v.p_pic1 */}
                      </div>
                    <div className={styles.listdiv}>{v.p_name}</div>
                    <div className={styles.listdiv}>{v.qty}</div>
                    <div className={styles.listdiv}>{v.p_discount}</div>
                    <button className={styles.buybutton}
                      onClick={() => {
                        if (v.qty > 0) {
                          notifyAndRemove(v.p_name, v.p_id)
                        } else {
                          handleRemove(v.p_id)
                        }
                      }}
                    >
                      x
                    </button>
                  </li>
                )
              })}
            </ul>
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
                  value={Name}
                  onChange={(e) => setName(e.target.value)}
                />
                <div className={styles.errordiv}>
                  {errors.Name && <p className={styles.error}>{errors.Name}</p>}
                </div>
              </div>
              <div className={styles.inputdiv}>
                地址：
                <input
                  className={styles.inputtext}
                  placeholder="請輸入收件人地址"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <div className={styles.errordiv}>
                  {errors.address && (
                    <p className={styles.error}>{errors.address}</p>
                  )}
                </div>
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
                <div className={styles.errordiv}>
                  {errors.phone && (
                    <p className={styles.error}>{errors.phone}</p>
                  )}
                </div>
              </div>
              <div className={styles.inputdiv}>
                信箱：
                <input
                  className={styles.inputtext}
                  placeholder="請輸入收件人信箱"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className={styles.errordiv}>
                  {errors.email && (
                    <p className={styles.error}>{errors.email}</p>
                  )}
                </div>
              </div>
            </div>
            <div className={styles.inputcontainer}>
              <div className={styles.inputdiv}>
                付款方式：
                <select
                  className={styles.inputtext2}
                  onChange={handlePaywayChange}
                >
                  <option>請選擇付款方式：</option>
                  {payway.map((way) => (
                    <option key={way.pay_id} value={way.pay_id}>
                      {way.pay_way}
                    </option>
                  ))}
                </select>
                <div className={styles.errordiv}>
                  {errors.payway && (
                    <p className={styles.error}>{errors.payway}</p>
                  )}
                </div>
              </div>
              <div className={styles.inputdiv}>
                備註：
                <input
                  className={styles.inputtext}
                  placeholder="填寫備註事項"
                  onChange={(e) => setRemark(e.target.value)}
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
                    <button
                      className={styles.button}
                      button
                      id="sendOrder"
                      onClick={sendOrder}
                    >
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
      <div className={card.recommend}>
      <img className={card.storycontainerimg2} src="/close-up-barista-making-cappuccino-bartender-preparing-coffee-drink.jpg"/>
        <div className={card.card}>
        <Slider {...settings}>
          {products.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </Slider>
        </div>
      </div>
    </>
  )
}
