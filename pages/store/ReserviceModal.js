import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import Image from 'next/image'
import ReserviceModalCss from '@/styles/reserviceModal.module.css'

// Modal.setAppElement('#root') // 設定應用的根元素，以提高可訪問性
const ReserviceModal = ({ isOpen, onRequestClose }) => {
  const [formData, setFormData] = useState({
    reserve_id: '',
    customer_name: '',
    customer_number: '',
    store_id: '',
    reserve_date: '',
    reserve_time: '',
    people: '',
    seat_available: '',
  })

  const [Reserve, setReserve] = useState([])
  const [total, setTotal] = useState(0) //總筆數
  const [pageCount, setPageCount] = useState(0) //總頁數
  const getStore = async (params = {}) => {
    const baseURL = 'http://localhost:3005/api/storereserve'
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
        setPageCount(resData.data.pageCount)
        setTotal(resData.data.total)
        // 設定到狀態中 ===> 進入update階段，觸發重新渲染(re-render)，呈現資料
        // 確定資料是陣列資料類型才設定到狀態中(最基本的保護)
        if (Array.isArray(resData.data.store)) {
          setReserve(resData.data.store)
        }
      }
    } catch (e) {
      console.error(e)
    }
  }
  useEffect(() => {
    getStore()
  }, [])

  // 處理表單變更
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  // 新增或更新預約
  const handleSubmit = async (e) => {
    e.preventDefault()
    const method = formData.id ? 'PUT' : 'POST'
    const url = formData.id
      ? `http://localhost:3005/api/storereserve/${formData.id}`
      : 'http://localhost:3005/api/storereserve'

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to save reservation')
      }

      const result = await response.json()

      if (method === 'POST') {
        setReserve([...Reserve, result])
      } else {
        setReserve(Reserve.map((res) => (res.id === result.id ? result : res)))
      }

      // 清空表單並關閉 Modal
      setFormData({
        reserve_id: '',
        customer_name: '',
        customer_number: '',
        store_id: '',
        reserve_date: '',
        reserve_time: '',
        people: '',
        seat_available: '',
      })
      onRequestClose()
      getStore() // 重新獲取預約資料
    } catch (error) {
      console.error('Error saving reservation:', error)
    }
  }

  // 刪除預約
  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3005/api/storereserve/${id}`,
        {
          method: 'DELETE',
        }
      )

      if (!response.ok) {
        throw new Error('Failed to delete reservation')
      }

      setReserve(Reserve.filter((reservation) => reservation.id !== id))
    } catch (error) {
      console.error('Error deleting reservation:', error)
    }
  }

  // 編輯預約
  const handleEdit = (reservation) => {
    setFormData(reservation)
    onRequestClose() // 確保這裡的邏輯正確
  }

  return (
    <div>
      <ul>
        {Reserve.map((reservation) => (
          <li key={reservation.reserve_id}>
            {reservation.customer_name} - {reservation.reserve_date} -{' '}
            {reservation.reserve_time}
            <button onClick={() => handleEdit(reservation.reserve_id)}>
              編輯
            </button>
            <button onClick={() => handleDelete(reservation.reserve_id)}>
              刪除
            </button>
          </li>
        ))}
      </ul>

      <Modal
        className={ReserviceModalCss.contentALL}
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel="BookingModal"
      >
        <h2 className={ReserviceModalCss.h2}>
          {formData.id ? '編輯預約' : '新增預約'}
        </h2>
        <form onSubmit={handleSubmit} className={ReserviceModalCss.modalshape}>
          <div>
            <label className={ReserviceModalCss.labelcss} htmlFor="date">
              預約日期:
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className={ReserviceModalCss.labelcss} htmlFor="time">
              預約時間:
            </label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className={ReserviceModalCss.labelcss} htmlFor="name">
              姓名:
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className={ReserviceModalCss.labelcss} htmlFor="phone">
              電話:
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="people">人數:</label>
            <input
              type="number"
              name="people"
              value={formData.people}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="email">電子郵件:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">{formData.id ? '更新預約' : '確認送出'}</button>
        </form>
      </Modal>
    </div>
  )
}
export default ReserviceModal
