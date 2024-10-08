import React, { useEffect, useState } from 'react'
import style from '@/styles/productbackend.module.css'
import { symbol } from 'prop-types'

export default function OrderList() {
  const [Orderlist, setOrderlist] = useState([])

  const getOrderlist = async (params = {}) => {
    const baseURL = 'http://localhost:3005/api/orderlist'
    const searchParams = new URLSearchParams(params)
    const qs = searchParams.toString()
    const url = `${baseURL}?${qs}`

    try {
      const res = await fetch(url)
      const resData = await res.json()

      if (
        resData.status === 'success' &&
        Array.isArray(resData.data.Orderlist)
      ) {
        setOrderlist(resData.data.Orderlist)
      } else {
        console.error('獲取訂單資料失敗或資料格式不正確')
      }
    } catch (e) {
      console.error('API 錯誤:', e)
    }
  }

  useEffect(() => {
    getOrderlist()
  }, [])

  return (
    <div className="container">
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>訂單編號</th>
            <th>下訂日期</th>
            <th>會員帳號</th>
            <th>是否付款</th>
            <th>付款方式</th>
            <th>寄送方式</th>
            <th>運費</th>
            <th>總金額</th>
            <th>訂單狀態</th>
            <th>地址</th>
            <th>明細</th>
          </tr>
        </thead>
        <tbody>
          {Orderlist.map((ol) => (
            <tr key={ol.orderlist_id}>
              <td>{ol.orderlist_id}</td> {/* 訂單編號 */}
              <td>{ol.order_date}</td> {/* 下訂日期 */}
              <td>{ol.member_id || '無資料'}</td> {/* 會員帳號 */}
              <td>{ol.pay_ornot || '無資料'}</td> {/* 是否付款 */}
              <td>{ol.pay_id || '無資料'}</td> {/* 付款方式 */}
              <td>{ol.send_id}</td> {/* 寄送方式 */}
              <td>{ol.send_tax}</td> {/* 運費 */}
              <td>{ol.total_price}</td> {/* 總金額 */}
              <td>{ol.order_status}</td> {/* 訂單狀態 */}
              <td>{ol.recipient_address || '無資料'}</td> {/* 地址 */}
              <td>{ol.order_detail_id}</td> {/* 明細 */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
