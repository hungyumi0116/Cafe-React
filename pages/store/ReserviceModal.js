import React, { useState } from 'react'
import Modal from 'react-modal'
import Image from 'next/image'
import ReserviceModalCss from '@/styles/reserviceModal.module.css'

// Modal.setAppElement('#root') // 設定應用的根元素，以提高可訪問性

const ReserviceModal = ({ isOpen, onRequestClose }) => {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    name: '',
    phone: '',
    people: '',
    email: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // 在這裡處理提交邏輯，比如發送請求
    console.log(formData)
    // 清空表單
    setFormData({
      date: '',
      time: '',
      name: '',
      phone: '',
      people: '',
      email: '',
    })
    onRequestClose() // 關閉 Modal
  }

  return (
    <Modal
      className={[ReserviceModalCss.contentALL].join(' ')}
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="BookingModal"
    >
      <h2 className={[ReserviceModalCss.h2].join(' ')}>預約表單</h2>
      <form
        onSubmit={handleSubmit}
        className={[ReserviceModalCss.modalshape].join(' ')}
      >
        <div>
          <label htmlFor="date">預約日期:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="time">預約時間:</label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="name">姓名:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="phone">電話:</label>
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
        <button type="submit">確認送出</button>
      </form>
    </Modal>
  )
}
export default ReserviceModal
