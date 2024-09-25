import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useCart } from '@/hooks/use-cart'
import toast from 'react-hot-toast'

export default function Detail() {
  const {
    items,
    totalPrice,
    totalQty,
    handleAdd,
    handleDecrease,
    handleIncrease,
    handleRemove,
    handlecancel,
  } = useCart()

  const notify = (productName) => {
    toast.success(productName + ' 已成功加入購物車!')
  }

  const [product, setProduct] = useState({
    p_id: 0,
    p_name: '',
    p_price: 0,
    p_discount: 0,
  })

  const [tempQty, setTempQty] = useState(1) // 初始數量

  const getProduct = async (productId) => {
    const baseURL = `http://localhost:3005/api/product_list/${productId}`
    try {
      const res = await fetch(baseURL)
      const resData = await res.json()
      if (resData.status === 'success') {
        setProduct(resData.data.product)
      }
    } catch (e) {
      console.error(e)
    }
  }

  const router = useRouter()

  useEffect(() => {
    if (router.isReady) {
      getProduct(router.query.productId)
    }
  }, [router.isReady])

  return (
    <>
      <h1>商品詳細頁</h1>
      <hr />
      <div className="product">
        <h2>{product.p_name}</h2>
        <p>價格: {product.p_discount}</p>
      </div>
      <div>
        <button
          onClick={() => {
            const productWithQty = { ...product, qty: tempQty } // 帶入臨時選擇的數量
            handleAdd(productWithQty, tempQty) // 將數量和商品一起傳入
            notify(product.p_name)
          }}
        >
          加入購物車
        </button>
        <button onClick={() => setTempQty(tempQty + 1)}>+</button>
        <p>數量: {tempQty}</p>
        <button
          onClick={() => {
            if (tempQty > 1) setTempQty(tempQty - 1)
          }}
        >
          -
        </button>
      </div>
      <Link href="/product/list">回列表頁</Link>
    </>
  )
}
