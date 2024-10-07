import React, { useState, useEffect } from 'react'
import Sidebar from '../../components/member/Sidebar' // 引入側邊欄
import styles from '@/styles/member.module.css' // 引入樣式文件

function ProfilePage() {
  const [user, setUser] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [updatedUser, setUpdatedUser] = useState({})

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

  const handleSaveClick = () => {
    // 更新 localStorage
    localStorage.setItem('currentUser', JSON.stringify(updatedUser))

    // 這裡可以添加更新後端的程式碼
    fetch('/api/updateMember', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUser),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('更新失敗')
        }
        return response.json()
      })
      .then(() => {
        alert('更新成功！')
        setUser(updatedUser) // 更新顯示的資料
        setIsEditing(false) // 退出編輯模式
      })
      .catch((error) => console.error('Error updating member data:', error))
  }

  if (!user) {
    return <p>載入中...</p>
  }

  return (
    <div className={styles.profilePageContainer}>
      <Sidebar /> {/* 側邊欄 */}
      <div className={styles.profileContent}>
        <div className={styles.leftSection}>
          <h2 className={styles.sectionTitle}>我的檔案</h2>
          <p className={styles.sectionSubtitle}>管理你的檔案以保護你的帳戶</p>
          <hr className={styles.divider} />

          <div className={styles.formGroup}>
            <label htmlFor="member_name" className={styles.label}>
              使用者姓名:
            </label>
            <input
              type="text"
              id="member_name"
              className={styles.textInput}
              value={isEditing ? updatedUser.member_name : user.member_name}
              onChange={handleChange}
              disabled={!isEditing} // 只在編輯模式下可編輯
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
              disabled={!isEditing}
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

          {isEditing ? (
            <button onClick={handleSaveClick} className={styles.submitButton}>
              儲存變更
            </button>
          ) : (
            <a
              href="#"
              className={styles.editProfileLink}
              onClick={handleEditClick}
            >
              變更個人資料
            </a>
          )}
        </div>

        <div className={styles.rightSection}>
          <div className={styles.avatarPlaceholder}></div>
          <button className={styles.uploadButton}>選擇圖片</button>
          <p className={styles.fileHint}>檔案大小: 最大1MB</p>
          <p className={styles.fileHint}>檔案類型: JPEG, PNG</p>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
