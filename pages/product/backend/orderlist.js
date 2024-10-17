import React, { useEffect, useState } from 'react'
import BeNavbar from '@/components/layout/default-layout/backendbar'
import { useRouter } from 'next/router'
import BS5Pagination2 from '@/components/common/bs5-pagination2'
import style from '@/styles/productbackend.module.css'
import Link from 'next/link'
import { FaPen, FaRegTrashCan } from 'react-icons/fa'

export default function OrderList() {
  const [Orderlist, setOrderlist] = useState([])
  const [total, setTotal] = useState(0)
  const [pageCount, setPageCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [perpage, setPerpage] = useState(16)

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
        setPageCount(resData.data.pageCount)
        setTotal(resData.data.total)
        setOrderlist(resData.data.Orderlist)
      } else {
        console.error('獲取訂單資料失敗或資料格式不正確')
      }
    } catch (e) {
      console.error('API 錯誤:', e)
    } finally {
      setIsLoading(false)
    }
  }

  const deleteOrder = async (orderId) => {
    const confirmDelete = window.confirm(`您確定要取消${orderId}號的訂單嗎？`)
    if (confirmDelete) {
    try {
      const res = await fetch(
        `http://localhost:3005/api/orderlist/${orderId}`,
        {
          method: 'DELETE',
        }
      )

      if (res.ok) {
        setOrderlist(
          Orderlist.filter((order) => order.orderlist_id !== orderId)
        )
        alert('訂單刪除成功')
      } else {
        alert('刪除失敗')
      }
    } catch (error) {
      console.error('刪除錯誤:', error)
      alert('刪除時發生錯誤')
    }
  }
  }

  const router = useRouter()

  useEffect(() => {
    if (router.isReady) {
      const params = { page, perpage }
      getOrderlist(params)
    }
  }, [page, perpage])

  return (
    <>
      <BeNavbar title="首頁 - 後臺管理" />
      <div className="container">
        <BS5Pagination2
          className={style.page}
          forcePage={page - 1}
          pageCount={pageCount}
          onPageChange={(e) => setPage(e.selected + 1)}
        />
        {isLoading ? (
          <p>資料加載中...</p>
        ) : (
          <table className="table table-bordered table-striped">
            <thead>
              <p>筆數 {total}</p>
              <tr>
                <th>訂單編號</th>
                <th>下訂日期</th>
                <th>收件人姓名</th>
                <th>是否付款</th>
                <th>運費</th>
                <th>總金額</th>
                <th>訂單狀態</th>
                <th>地址</th>
                <th>明細</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {Orderlist.map((ol) => (
                <tr key={ol.orderlist_id}>
                  <td>{ol.orderlist_id}</td>
                  <td>{ol.order_date}</td>
                  <td>{ol.member_name || '無資料'}</td>
                  <td>{ol.pay_ornot || '無資料'}</td>
                  <td>{ol.send_tax}</td>
                  <td>{ol.total_price}</td>
                  <td>{ol.order_status}</td>
                  <td>{ol.recipient_address || '無資料'}</td>
                  <td>{ol.order_detail_id}</td>
                  <td>
                    <Link
                      href={`/product/backend/editOrder/${ol.orderlist_id}`}
                    >
                      <button className="btn btn-warning">編輯</button>
                    </Link>
                    <button
                      onClick={() => deleteOrder(ol.orderlist_id)}
                      className="btn btn-danger"
                    >
                      刪除
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  )
}

// 定義 getLayout，使用自訂佈局
OrderList.getLayout = function getLayout(page) {
  return <>{page}</>
}
