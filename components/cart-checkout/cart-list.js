import React from 'react'
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

export default function CartList() {
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
        <div className={styles.little1}>
          <span>購物車</span>
          <span>填寫資料</span>
          <span>完成訂單</span>
        </div>
        <div className={styles.container}>
          <div className={styles.cart}>
            <div className={styles.little}>
              <p>購物車目前共有？件商品</p>
            </div>

            <div className={styles.ul}>
              <ul>
                {items.map((v, i) => {
                  return (
                    <li key={v.p_id} className={styles.list}>
                      <div>
                        <div>商品</div>
                        {v.p_image}
                      </div>
                      <div>
                        <div>品名</div>
                        {v.p_name}
                      </div>
                      <div>
                        <div>數量</div>
                        <button
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

                        <span>{v.qty}</span>
                        <button
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
                      </div>
                      <div>
                        <div>價格</div>
                        {v.p_discount}
                      </div>

                      <div>
                        <div>操作</div>
                        <button
                          onClick={() => {
                            // 跳出確認視窗，按下確定才會進行刪除
                            notifyAndRemove(v.p_name, v.p_id)
                            // if (confirm('你確定要刪除此商品?')) {
                            //   handleRemove(v.id)
                            // }
                          }}
                        >
                          移除
                        </button>
                      </div>
                    </li>
                  )
                })}
              </ul>
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
                <div> 運費: 運費將於填寫送貨地址後，於結帳頁顯示。</div>
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
                    <button onClick={handleCheckout} className={styles.button}>
                      <span>前往結帳</span>
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
