import { useState, useEffect } from 'react'
import Link from 'next/link'

// 有名稱的路由(巢狀路由)
export default function List() {
  // 商品物件陣列狀態
  // 注意1: 初始值至少要空陣列，初次渲染使用的是初始值
  // 注意2: 在應用程式執行過程中，一定要保持狀態的資料類型一致(陣列)
  const [products, setProducts] = useState([])

  // 向伺服器獲取資料(建議寫在useEffect外，用async-await)
  const getProducts = async () => {
    const baseURL = 'http://localhost:3005/api/my-product'

    try {
      const res = await fetch(baseURL)
      const resData = await res.json()

      console.log(resData)

      // 設定到狀態中
      // (3.) 設定到狀態後 -> 觸發update(re-render)
      if (resData.status === 'success') {
        setProducts(resData.data.products)
      }
    } catch (e) {
      console.error(e)
    }
  }

  // 樣式2: didMount
  useEffect(() => {
    // (2.) 初次render之後，執行這裡一次
    getProducts()
  }, [])

  return (
    <>
      <h1>商品列表頁</h1>
      <h2>使用動態路由:`[productId]`</h2>
      <ul>
        {/* (1.)首次render: 使用狀態初始值`[]` */}
        {products.map((v, i) => {
          return (
            <li key={v.p_id}>
              <Link href={`/products/${v.p_id}`}>{v.p_name}</Link>
            </li>
          )
        })}
      </ul>
      <h2>使用巢狀路由:`detail?productId=xxx`</h2>
      <ul>
        {/* (1.)首次render: 使用狀態初始值`[]` */}
        {products.map((v, i) => {
          return (
            <li key={v.p_id}>
              <Link href={`/product/detail?productId=${v.p_id}`}>
                {v.p_name}
              </Link>
            </li>
          )
        })}
      </ul>
    </>
  )
}
