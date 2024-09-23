import React from 'react'
import products from '@/pages/products'
import styles from '@/styles/addcart.module.css'
import { useCart } from '@/hooks/use-cart'
// 土司訊息，需要先安裝套件( npm i react-hot-toast )
import toast, { Toaster } from 'react-hot-toast'

export default function ProductList() {
  const { handleAdd } = useCart()

  // 跳出訊息對話盒函式
  const notify = (productName) => {
    toast.success(productName + ' 已成功加入購物車!')
  }



  return (
    <>
      <div className={styles['product']}>
        <ul className={styles['list']}>
          {products.map((v, i) => {
            return (
              <li key={v.p_id} className={styles['item']}>
                <div className={styles['w-400']}>{v.p_name}</div>
                <div>{v.p_discount}</div>
                <div>
                  <button
                    onClick={() => {
                      // 加入到購物車狀態中
                      handleAdd(v)
                      // 呈現訊息對話盒
                      notify(v.p_name)
                    }}
                  >
                    加入購物車
                  </button>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
      {/* 土司訊息要使用的元件 */}
      <Toaster />
    </>
  )
}
