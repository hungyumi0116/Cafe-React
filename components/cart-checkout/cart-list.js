import React from 'react'
import styles from '@/styles/addcart.module.css'
import { useCart } from '@/hooks/use-cart'
// 訊息會話盒，需要先安裝套件
// npm i sweetalert2 sweetalert2-react-content
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export default function CartList() {
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
      <div className={styles['cart']}>
        <ul className={styles['list']}>
          {items.map((v, i) => {
            return (
              <li key={v.p_id} className={styles['item']}>
                <div className={styles['w-400']}>{v.p_name}</div>
                <div>{v.p_discount}</div>
                <div>
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
      <hr />
      <div>
        總數量: {totalQty} / 總金額: {totalPrice}
      </div>
    </>
  )
}
