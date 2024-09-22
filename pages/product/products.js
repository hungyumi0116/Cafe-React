import { useState, useEffect } from 'react'
import Link from 'next/link'

// 有名稱的路由(巢狀路由)
export default function List() {
  // 商品物件陣列狀態
  // 注意1: 初始值至少要空陣列，初次渲染使用的是初始值
  // 注意2: 在應用程式執行過程中，一定要保持狀態的資料類型一致(陣列)
  // 從伺服器得到的資訊
  const [products, setProducts] = useState([])
  const [total, setTotal] = useState(0) // 總筆數
  const [pageCount, setPageCount] = useState(0) // 總頁數

  // 控制用資訊
  // 分頁用 (建議與後端的預設值要一致，減少錯誤)
  const [page, setPage] = useState(1)
  const [perpage, setPerpage] = useState(10)

  // 向伺服器獲取資料(建議寫在useEffect外，用async-await)
  const getProducts = async (params = {}) => {
    const baseURL = 'http://localhost:3005/api/product_list'
    // 轉換params為查詢字串
    const searchParams = new URLSearchParams(params)
    const qs = searchParams.toString()
    const url = `${baseURL}?${qs}`

    try {
      const res = await fetch(url)
      const resData = await res.json()

      console.log(resData)

      // 設定到狀態中
      // (3.) 設定到狀態後 -> 觸發update(re-render)
      if (resData.status === 'success') {
        setProducts(resData.data.products)
        setTotal(resData.data.total)
        setPageCount(resData.data.pageCount)
      }
    } catch (e) {
      console.error(e)
    }
  }

  // 樣式3: didMount+didUpdate
  useEffect(() => {
    // 建立查詢字串用的參數值
    const params = {
      page,
      perpage,
    }

    // 向伺服器要求資料
    getProducts(params)
  }, [page, perpage])

  return (
    <>
      <h1>商品列表頁</h1>
      <div>
        <button
          onClick={() => {
            const nextPage = page - 1
            // 最小是1
            if (nextPage >= 1) {
              setPage(nextPage)
            }
          }}
        >
          上一頁
        </button>
        <button
          onClick={() => {
            const nextPage = page + 1
            // 最大是pageCount
            if (nextPage <= pageCount) {
              setPage(nextPage)
            }
          }}
        >
          下一頁
        </button>
        每頁幾筆:{' '}
        <select
          value={perpage}
          onChange={(e) => {
            setPerpage(e.target.value)
            // 因改變每頁筆數會造成頁數改變，所以需要跳回第一頁，以免造成操作邏輯上的bug
            setPage(1)
          }}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>{' '}
        目前頁面: {page} / 總頁數: {pageCount} / 總筆數: {total}
      </div>
      <ul>
        {products.map((v, i) => {
          return (
            <li key={v.id}>
              <Link href={`/product/products/${v.p_id}`}>{v.p_name}</Link>
            </li>
          )
        })}
      </ul>
    </>
  )
}
