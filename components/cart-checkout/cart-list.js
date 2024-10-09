import React , { useEffect, useState } from 'react'
import card from '@/styles/card.module.css'
import styles from '@/styles/addcart.module.css'
import indexcss from '@/styles/index.module.css'
import { useRouter } from 'next/router' // 用來導航到結帳頁面
import { useCart } from '@/hooks/use-cart'
// 訊息會話盒，需要先安裝套件
// npm i sweetalert2 sweetalert2-react-content
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Link from 'next/link'
import Image from 'next/image'

export default function CartList(item) {

  const [products, setProducts] = useState([])
  const getProducts = async (params = {}) => {
    const baseURL = 'http://localhost:3005/api/product_list'
    // 轉換params為查詢字串
    const searchParams = new URLSearchParams(params)
    const qs = searchParams.toString()
    const url = `${baseURL}?${qs}`

    // 使用try-catch語句，讓和伺服器連線的程式能作錯誤處理
    try {
      const res = await fetch(url)
      const resData = await res.json()

      if (resData.status === 'success') {
        setPageCount(resData.data.pageCount)
        setTotal(resData.data.total)
        // 設定到狀態中 ===> 進入update階段，觸發重新渲染(re-render)，呈現資料
        // 確定資料是陣列資料類型才設定到狀態中(最基本的保護)
        if (Array.isArray(resData.data.products)) {
          setProducts(resData.data.products)
        }
      }
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    getProducts()
  }, [])

  const router = useRouter()
  const handleCheckout = () => {
    if (items.length > 0) {
      // 如果購物車有資料，導航到結帳頁面
      router.push('/addcart/checkout')
    }
  }
  const {
    items,
    totalPrice,
    totalQty,
    handleDecrease,
    handleIncrease,
    handleRemove,
  } = useCart()

  // 以下將用MySwal取代Swal來實作
  const MySwal = withReactContent(Swal)

  // 確認後進行刪除的對話盒
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

  return (
    <>
      <div className={styles.containerback}>
        {/* 訂單資料的狀態列 */}
        <div className={styles.little1}>
        <div className={styles.line}></div>
          <div className={styles.circlebigdiv}>
            <div className={styles.circlediv}>
              <div className={styles.circlealive}>1</div>
              <p className={styles.ptext}>購物車</p>
            </div>
            <div className={styles.circlediv}>
              <div className={styles.circle2}>2</div>
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
            <div className={styles.sort}>
              <div className={styles.sorttext1}>商品</div>
              <div className={styles.sorttext2}>品名</div>
              <div className={styles.sorttext3}>數量</div>
              <div className={styles.sorttext4}>價格</div>
              <div className={styles.sorttext5}>操作</div>
            </div>
            <div>
              <ul className={styles.ul}>

                {items.map((v, i) => {
                  return (

                    <li key={v.p_id} className={styles.list}>
                      <div className={styles.listdiv}>
                      <img src={`http://localhost:3005/img/${v.p_pic1}`} alt={v.p_name} /> {/* 確保這裡使用 v.p_pic1 */}
                      </div>
                      <div className={styles.listdiv}>{v.p_name}</div>
                      <div className={styles.listdiv}>
                        <button className={styles.buybutton}
                          onClick={() => {
                            // 先計算當使用者按下-按鈕時，商品數量會變為多少
                            const nextQty = v.qty - 1
                            // 如果按下後，商品數量 <= 0 則進行刪除
                            if (nextQty <= 0) {
                              // 跳出確認視窗，按下確定才會進行刪除
                              notifyAndRemove(v.p_name, v.p_id)
                              // if (confirm('你確定要刪除此商品?')) {
                              //   handleRemove(v.id)
                              // }
                            } else {
                              // 否則作遞減
                              handleDecrease(v.p_id)
                            }
                          }}
                        >
                          -
                        </button>
                        <div className={styles.listdiv}>{v.qty}</div>
                        <button className={styles.buybutton}
                          onClick={() => {
                            const maxQty = 10
                            // 先計算當使用者按下+按鈕時，商品數量會變為多少
                            const nextQty = v.qty + 1

                            if (nextQty > maxQty) {
                              alert('最多只能購買的數量為10')
                            } else {
                              handleIncrease(v.p_id)
                            }
                          }}
                        >
                          +
                        </button>
                      </div>

                      <div className={styles.listdiv}>{v.p_discount}</div>
                      <button className={styles.buybutton}
                        onClick={() => {
                          if (v.qty > 0) {
                            notifyAndRemove(v.p_name, v.p_id)
                          } else {
                            handleRemove(v.p_id)
                          }
                        }
                        }
                      >
                        x
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
            {/*  */}
          </div>

          <div className={styles.subtotal}>
            <div className={styles.little}>
              <p>小計明細</p>
            </div>
            <div className={styles.subtotaldiv}>
              <div className={styles.subtotaltext}>
                <div> 商品數量: {totalQty}</div>
                <div> 小計: {totalPrice}</div>
              </div>
              <hr />
              <div className={styles.forbutton}>
                <div className={styles.buttondiv}>
                  <Link href={`/product/list`}>
                    <button className={styles.button}>
                      <span>返回商品頁面</span>
                    </button>
                  </Link>
                </div>
                <div className={styles.buttondiv}>
                  {/* 如果購物車有資料才顯示結帳按鈕 */}
                  {items.length > 0 && (
                    <Link href={`/addcart/information`}>
                      <button
                        className={styles.button}
                      >
                        <span>填寫訂單資料</span>
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
