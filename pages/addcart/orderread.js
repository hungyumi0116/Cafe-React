import React, { useEffect, useState } from 'react'
import BeNavbar from '@/components/layout/default-layout/backendbar'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { FaPen, FaRegTrashCan } from 'react-icons/fa'
import styles from '@/styles/member.module.css' // 引入樣式文件
import st from '@/styles/orderread.module.css' // 引入樣式文件
import Sidebar from '../../components/member/Sidebar' // 引入側邊欄

export default function OrderList() {
  const router = useRouter()
  const { orderlist_id } = router.query // 獲取 URL 中的 orderlist_id
  const [order, setOrder] = useState(null) // 存儲最新訂單資料
  const [isLoading, setIsLoading] = useState(true)
  const orderTypes = ['目前訂單', '已完成', '已取消'] // 訂單類型選項
  const [selectedOrderType, setSelectedOrderType] = useState('目前訂單') // 新增狀態來追蹤選擇的訂單類型

  // 獲取最新訂單資料
  const getLatestOrder = async (orderlist_id) => {
    const baseURL = `http://localhost:3005/api/orderlist/${orderlist_id}/get`

    try {
      const res = await fetch(baseURL)
      const resData = await res.json()

      if (resData.status === 'success' && resData.data.orderlist) {
        setOrder(resData.data.orderlist) // 設置最新訂單
      } else {
        console.error('獲取訂單資料失敗或資料格式不正確')
      }
    } catch (e) {
      console.error('API 錯誤:', e)
    } finally {
      setIsLoading(false)
    }
  }

  // 刪除訂單功能
  const deleteOrder = async (orderId) => {
    const confirmDelete = window.confirm('您確定要取消這個訂單嗎？')

    if (confirmDelete) {
      try {
        const res = await fetch(
          `http://localhost:3005/api/orderlist/${orderId}`,
          {
            method: 'DELETE',
          }
        )

        if (res.ok) {
          setOrder(null) // 刪除後設置 order 為 null
          alert('訂單刪除成功')
        } else {
          alert('刪除失敗')
        }
      } catch (error) {
        console.error('刪除錯誤:', error)
        alert('刪除時發生錯誤')
      }
    } else {
      alert('訂單未被取消')
    }
  }

  // 當組件載入時請求最新訂單資料
  useEffect(() => {
    getLatestOrder()
  }, [])

  // 處理訂單類型的變更
  const handleOrderTypeChange = (type) => {
    setSelectedOrderType(type)
  }

  const [user, setUser] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [updatedUser, setUpdatedUser] = useState({})
  const [isSaving, setIsSaving] = useState(false) // 狀態：是否正在保存
  const [selectedFile, setSelectedFile] = useState(null) // 狀態：選擇的圖片

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'))
    if (currentUser) {
      setUser(currentUser)
      setUpdatedUser(currentUser) // 初始化更新的會員資料
    }
  }, [])

  const handleEditClick = () => {
    setIsEditing(true)
  }

  const handleChange = (e) => {
    const { id, value } = e.target
    setUpdatedUser({ ...updatedUser, [id]: value }) // 更新會員資料
  }

  const handleFileChange = async (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedFile(file)
      try {
        const formData = new FormData()
        formData.append('file', file)

        const uploadResponse = await fetch('/api/members/upload', {
          method: 'POST',
          body: formData,
        })

        if (!uploadResponse.ok) {
          throw new Error('圖片上傳失敗')
        }

        const uploadResult = await uploadResponse.json()
        const updatedUserWithPhoto = {
          ...updatedUser,
          member_photo: uploadResult.filePath,
        }
        setUpdatedUser(updatedUserWithPhoto)

        // 直接更新到 JSON 中
        const response = await fetch('/api/members/update', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedUserWithPhoto),
        })

        if (!response.ok) {
          throw new Error('更新失敗')
        }

        const result = await response.json()
        alert(result.message)

        // 更新 localStorage 和用戶狀態
        localStorage.setItem(
          'currentUser',
          JSON.stringify(updatedUserWithPhoto)
        )
        setUser(updatedUserWithPhoto)
      } catch (error) {
        console.error('Error updating member data:', error)
        alert('更新失敗，請稍後重試')
      }
    }
  }

  const handleSaveClick = async () => {
    setIsSaving(true) // 開始保存，禁用按鈕
    try {
      const response = await fetch('/api/members/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      })

      if (!response.ok) {
        throw new Error('更新失敗')
      }

      const result = await response.json()
      alert(result.message)

      // 更新 localStorage 和用戶狀態
      localStorage.setItem('currentUser', JSON.stringify(updatedUser))
      setUser(updatedUser)
      setIsEditing(false)
    } catch (error) {
      console.error('Error updating member data:', error)
      alert('更新失敗，請稍後重試')
    } finally {
      setIsSaving(false) // 保存結束，重新啟用按鈕
    }
  }

  if (!user) {
    return <p>載入中...</p>
  }

  return (
    <>
      <div className={styles.profilePageContainer}>
        <Sidebar /> {/* 側邊欄 */}
        <div className={styles.profileContent}>
          <div className={styles.leftSection}>
            <h2 className={styles.sectionTitle}>訂單管理</h2>
            <p className={styles.sectionSubtitle}>檢視並管理的商品訂單</p>
            <hr />

            {/* 顯示用戶資料 */}
            <div className={styles.formGroup}>
              <label htmlFor="member_name" className={styles.label}>
                訂購人姓名:
              </label>
              <input
                type="text"
                id="member_name"
                className={styles.textInput}
                value={isEditing ? updatedUser.member_name : user.member_name}
                onChange={handleChange}
                disabled
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                電子郵件:
              </label>
              <input
                type="email"
                id="email"
                className={styles.textInput}
                value={isEditing ? updatedUser.email : user.email}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="address" className={styles.label}>
                地址:
              </label>
              <input
                type="text"
                id="address"
                className={styles.textInput}
                value={isEditing ? updatedUser.address : user.address}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="birthday" className={styles.label}>
                生日:
              </label>
              <input
                type="text"
                id="birthday"
                className={styles.textInput}
                value={isEditing ? updatedUser.birthday : user.birthday}
                onChange={handleChange}
                disabled
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="mobile" className={styles.label}>
                手機號碼:
              </label>
              <input
                type="text"
                id="mobile"
                className={styles.textInput}
                value={isEditing ? updatedUser.mobile : user.mobile}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>

            <div className={st.navbar}>
              <button
                className={st.navbartext}
                onClick={() => handleOrderTypeChange('目前訂單')}
              >
                目前訂單
              </button>
              <button
                className={st.navbartext}
                onClick={() => handleOrderTypeChange('已完成')}
              >
                已完成
              </button>
              <button
                className={st.navbartext}
                onClick={() => handleOrderTypeChange('已取消')}
              >
                已取消
              </button>
            </div>

            <div className={st.thead}>
              {selectedOrderType === '目前訂單' && order ? (
                <>
                  <div className={st.titlediv}>
                    訂單編號：{order.orderlist_id}
                  </div>
                  <div className={st.titlediv}>
                    下訂日期：{order.order_date}
                  </div>
                  <div className={st.titlediv}>
                    收購人姓名：{order.member_name || '無資料'}
                  </div>
                  <div className={st.titlediv}>
                    是否付款：{order.pay_ornot || '無資料'}
                  </div>
                  <div className={st.titlediv}>運費：{order.send_tax}元</div>
                  <div className={st.titlediv}>
                    總金額：{order.total_price}元
                  </div>
                  <div className={st.titlediv}>
                    訂單狀態：{order.order_status}
                  </div>
                  <div className={st.titlediv}>
                    收件地址：{order.recipient_address || '無資料'}
                  </div>
                  <div className={st.titlediv}>
                    明細：{order.order_detail_id}
                  </div>
                  <div className={st.titlediv}>
                    操作：{' '}
                    <button onClick={() => deleteOrder(order.orderlist_id)}>
                      取消訂單
                    </button>
                  </div>
                </>
              ) : selectedOrderType === '已取消' ||
                selectedOrderType === '已完成' ? (
                <p className={st.ptext}>目前無訂單資料</p>
              ) : (
                <p className={st.ptext}>訂單資料加載中或無訂單資料</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}