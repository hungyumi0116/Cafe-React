import React from 'react'
import styles from '@/styles/addcart.module.css'
import { useCart } from '@/hooks/use-cart'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

// 土司訊息，需要先安裝套件( npm i react-hot-toast )
import toast, { Toaster } from 'react-hot-toast'

export default function ProductList() {
  const { handleAdd } = useCart()

  // 跳出訊息對話盒函式
  const notify = (productName) => {
    toast.success(productName + ' 已成功加入購物車!')
  }


  const [product, setProduct] = useState({
    p_id: 0,
    p_name: '',
    p_price: 0,
  });

    // 向伺服器獲取資料(建議寫在useEffect外，用async-await)
    const getProduct = async (productId) => {
      const baseURL = `http://localhost:3005/api/product_list/${productId}`;
  
      try {
        const res = await fetch(baseURL);
        const resData = await res.json();
  
        console.log(resData);
  
        // 設定到狀態中
        // (3.) 設定到狀態後 -> 觸發update(re-render)
        if (resData.status === 'success') {
          setProduct(resData.data.product);
        }
      } catch (e) {
        console.error(e);
      }
    };
  
    // 第1步: 宣告路由器
    // router.query 一個物件值，裡面會包含productId屬性
    // router.isReady 一個布林值，一開始是false(初次渲染)，當next完成水合化作用(SSR)後，會改變為true，此時可以得到router.query的值
    const router = useRouter();
  
    // 第2步: 用useEffect監聽router.isReady變化，當為true時代表query裡有productId可以使用
    useEffect(() => {
      if (router.isReady) {
        // 這裡可以確保一定可以得到router.query的值
        console.log(router.query);
        // 向伺服器要求資料
        getProduct(router.query.productId);
      }
  
      // 以下為省略eslint檢查一行，這裡再加上router.query意義會有所不同目前會是多餘的
      // eslint-disable-next-line
    }, [router.isReady])
  


  return (
    <>
        <ul>
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


        </ul>
      {/* 土司訊息要使用的元件 */}
      <Toaster />
    </>
  )
}
