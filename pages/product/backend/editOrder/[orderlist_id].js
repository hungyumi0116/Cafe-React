import React, { useEffect, useState } from 'react'
import BeNavbar from '@/components/layout/default-layout/backendbar'
import { useRouter } from 'next/router'
import style from '@/styles/backendedit.module.css';

export default function EditOrder() {
  const router = useRouter()
  const { orderlist_id } = router.query // 獲取 URL 中的 orderlist_id
  const [orderData, setOrderData] = useState(null) // 存儲訂單資料
  const [loading, setLoading] = useState(true) // 加載狀態
  const [error, setError] = useState(null) // 錯誤信息

  // 發送 API 請求來獲取訂單資料
  const getOrderData = async (orderlist_id) => {
    const url = `http://localhost:3005/api/orderlist/${orderlist_id}/get`

    try {
      const res = await fetch(url)
      const resData = await res.json()

      // 檢查響應是否成功
      if (resData.status === 'success' && resData.data.orderlist) {
        console.log('訂單資料:', resData.data.orderlist) // 確認資料是否正確
        setOrderData(resData.data.orderlist) // 更新 orderData 狀態
      } else {
        throw new Error('獲取訂單失敗，請檢查訂單編號')
      }
    } catch (e) {
      console.error(e)
      setError(e.message) // 設置錯誤信息
    } finally {
      setLoading(false) // 無論成功或失敗，都設置加載狀態為 false
    }
  }

  useEffect(() => {
    if (orderlist_id) {
      getOrderData(orderlist_id)
    }
  }, [orderlist_id]) // 當 orderlist_id 變化時觸發

  if (loading) {
    return <p>加載中...</p> // 加載狀態提示
  }

  // 提交編輯訂單的表單
  // 提交編輯訂單的表單
  const handleSubmit = async (e) => {
    e.preventDefault() // 防止頁面重新加載

    // 使用 FormData 獲取表單數據
    const formData = new FormData(e.target) // 確保使用 e.target
    const updatedOrder = {
      orderlist_id: orderData.orderlist_id,
      order_date: formData.get('order_date'),
      member_id: formData.get('member_id'),
      member_name: formData.get('member_name'),
      pay_ornot: formData.get('pay_ornot'),
      pay_id: formData.get('pay_id'),
      send_id: formData.get('send_id'),
      send_tax: formData.get('send_tax'),
      total_price: formData.get('total_price'),
      order_status: formData.get('order_status'),
      recipient_address: formData.get('recipient_address'),
      order_detail_id: formData.get('order_detail_id'),
    }

    try {
      const res = await fetch(
        `http://localhost:3005/api/orderlist/${orderData.orderlist_id}/up`,
        {
          method: 'PUT', // 假設你會用 PUT 方法更新資料
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedOrder),
        }
      )

      if (res.ok) {
        alert('訂單編輯成功')
        router.push('/product/backend/orderlist') // 跳轉回訂單列表
      } else {
        alert('編輯失敗')
      }
    } catch (error) {
      console.error('編輯錯誤:', error)
    }
  }

  return (
    <>

      <div className={style.editbackground}>
        <BeNavbar title="編輯訂單" />
        <div>
          <div >
            <div>
              <div>
                <form  className={style.backedit} name="form1" noValidate onSubmit={handleSubmit}>
                <div className={style.forsort}>

                  {/* 訂單編號 */}
                  <div className={style.inputbigdiv}>
                  <h5>修改：{orderData.member_name}的訂單資料</h5>
                  <div className={style.inputdiv}>
                    <label htmlFor="orderlist_id" className="form-label">
                      訂單編號
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="orderlist_id"
                      id="orderlist_id"
                      value={orderData.orderlist_id || '無資料'}
                      readOnly
                    />
                  </div>

                  {/* 訂單日期 */}
                  <div className={style.inputdiv}>
                    <label htmlFor="order_date" className="form-label">
                      訂單日期
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      name="order_date"
                      id="order_date"
                      value={orderData.order_date || ''}
                      onChange={(e) =>
                        setOrderData({
                          ...orderData,
                          order_date: e.target.value,
                        })
                      }
                      required
                    />
                  </div>



                  {/* 會員名稱 */}
                  <div className={style.inputdiv}>
                    <label htmlFor="member_name" className="form-label">
                      會員名稱
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="member_name"
                      id="member_name"
                      value={orderData.member_name || ''}
                      onChange={(e) =>
                        setOrderData({
                          ...orderData,
                          member_name: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  </div>
                  {/*  */}
                  <div className={style.inputbigdiv}>
                  {/* 是否付款 */}
                  <div className={style.inputdiv}>
                    <label htmlFor="pay_ornot" className="form-label">
                      是否付款
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="pay_ornot"
                      id="pay_ornot"
                      value={orderData.pay_ornot || '無資料'}
                      onChange={(e) =>
                        setOrderData({
                          ...orderData,
                          pay_ornot: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  {/* 運費 */}
                  <div className={style.inputdiv}>
                    <label htmlFor="send_tax" className="form-label">
                      運費
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      name="send_tax"
                      id="send_tax"
                      value={orderData.send_tax || ''}
                      onChange={(e) =>
                        setOrderData({ ...orderData, send_tax: e.target.value })
                      }
                      required
                    />
                  </div>

                  {/* 總金額 */}
                  <div className={style.inputdiv}>
                    <label htmlFor="total_price" className="form-label">
                      總金額
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      name="total_price"
                      id="total_price"
                      value={orderData.total_price || ''}
                      onChange={(e) =>
                        setOrderData({
                          ...orderData,
                          total_price: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  {/* 訂單狀態 */}
                  <div className={style.inputdiv}>
                    <label htmlFor="order_status" className="form-label">
                      訂單狀態
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="order_status"
                      id="order_status"
                      value={orderData.order_status || ''}
                      onChange={(e) =>
                        setOrderData({
                          ...orderData,
                          order_status: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  {/* 地址 */}
                  <div className={style.inputdiv}>
                    <label htmlFor="recipient_address" className="form-label">
                      地址
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="recipient_address"
                      id="recipient_address"
                      value={orderData.recipient_address || ''}
                      onChange={(e) =>
                        setOrderData({
                          ...orderData,
                          recipient_address: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  {/* 訂單明細 */}
                  <div className={style.inputdiv}>
                    <label htmlFor="order_detail_id" className="form-label">
                      訂單明細
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="order_detail_id"
                      id="order_detail_id"
                      value={orderData.order_detail_id || ''}
                      onChange={(e) =>
                        setOrderData({
                          ...orderData,
                          order_detail_id: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  {/* 提交按鈕 */}
                  <button type="submit" className={style.classbutton}>
                    提交編輯
                  </button>
                  </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div >
    </>
  )
}
