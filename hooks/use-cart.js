import { createContext, useContext, useState, useEffect } from 'react'

// 使用next.js中提供的路由器功能，可以讀取路由的屬性和使用api
// import { useRouter } from 'next/router'
// 1. 建立context
const CartContext = createContext(null)

// 2. 建立一個專用的Context Provider元件(具有開頭與結尾的自訂元件)
// 目的: 統一集中管理所有要共享的狀態，提供給上層元件(MyApp, _app.js)中使用
// props.children 屬性代表所有包覆在Provider的子女元件
export function CartProvider({ children }) {
  const [didMount, setDidMount] = useState(false)
  const [Sendway, setSendway] = useState([])
  const [animateCart, setAnimateCart] = useState(false) // 狀態來控制動畫

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

  // 加入到購物車的項目
  // 與商品原本的物件資料相比，多了一個qty(代表數量)屬性
  const [items, setItems] = useState([])

  // 遞增購物車中項目的數量
  const handleIncrease = (p_id) => {
    const nextItems = items.map((v) => {
      // 如果符合條件(id是傳入的id)，則回傳修改其中qty屬性進行遞增的新物件值
      if (v.p_id === p_id) return { ...v, qty: v.qty + 1 }
      if (v.p_pic1 === p_pic1) return { ...v, pic: p_pic1 }
      // 否則回傳原本物件
      else return v
    })
    // 設定到狀態中
    setItems(nextItems)
  }

  

  // 遞減購物車中項目的數量
  const handleDecrease = (p_id) => {
    const nextItems = items.map((v) => {
      // 如果符合條件(id是傳入的id)，則回傳修改其中qty屬性進行遞減的新物件值
      if (v.p_id === p_id) return { ...v, qty: v.qty - 1 }
      // 否則回傳原本物件
      else return v
    })
    // 設定到狀態中
    setItems(nextItems)
  }
  const [tempQty, setTempQty] = useState(1) // 初始值為 1

  // 加入購物車
  const handleAdd = (product, qty = 1) => {
    const foundIndex = items.findIndex((v) => v.p_id === product.p_id);

    if (foundIndex !== -1) {
        const nextItems = items.map((v) => {
            if (v.p_id === product.p_id) {
                return { ...v, qty: v.qty + qty }; // 增加指定的數量
            }
            return v;
        });
        setItems(nextItems);
    } else {
        const newItem = { ...product, qty }; // 確保這裡的 product 包含圖片URL
        const nextItems = [newItem, ...items];
        setItems(nextItems);
    }

    animateCartIcon();
};

  // 動畫觸發函數
  const animateCartIcon = () => {
    // 使用 setTimeout 重置動畫
    setAnimateCart(true)
  }

  //減少購物車
  const handlecancel = (product) => {
    // 先判斷此商品是否已經在購物車中
    const foundIndex = items.findIndex((v) => v.p_id === product.p_id)

    if (foundIndex !== -1) {
      // 如果有找到===>遞增數量
      handleDecrease(product.p_id)
    } else {
      // 否則===>新增
      // 先擴充商品物件值多一個qty(數量)屬性，預設為1
      const newItem = { ...product, qty: 1 }
      // 加到到items狀態的最前面
      const nextItems = [newItem, ...items]
      // 設定到狀態中
      setItems(nextItems)
    }
  }

  // 處理刪除
  const handleRemove = (p_id) => {
    const nextItems = items.filter((v) => {
      return v.p_id !== p_id
    })

    setItems(nextItems)
  }

  // 計算總數量與總金額，使用陣列迭代方法reduce(累加/歸納)
  const totalQty = items.reduce((acc, v) => acc + v.qty, 0)
  const totalPrice = items.reduce((acc, v) => acc + v.qty * v.p_discount, 0)

  useEffect(() => {
    setDidMount(true)
    // 保護語法，避免掉ssr重覆渲染的情況
    if (typeof window !== 'undefined') {
      setItems(JSON.parse(localStorage.getItem('cart')) || [])
    }
  }, [])

  // 購物車資料有更動(新增、刪除、修改)時，寫入localstorage
  useEffect(() => {
    if (didMount) {
      localStorage.setItem('cart', JSON.stringify(items))
    }
    console.log(`save ${items.length} to localstorage`)
  }, [items, didMount])

  return (
    <CartContext.Provider
      // 提供者元件中的value屬性放入要共享的值
      value={{
        items,
        totalPrice,
        totalQty,
        handleAdd,
        handleDecrease,
        handleIncrease,
        handleRemove,
        handlecancel,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

//3. 建立一個包裝useContext與CartContext的專用函式
// 目的: 方便消費者們(consumers)呼叫使用
// 因為使用專用名稱，也可以提高閱讀性
export const useCart = () => useContext(CartContext)
