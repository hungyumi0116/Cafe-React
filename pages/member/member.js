import React, { useState, useEffect } from 'react'
import Sidebar from '../../components/member/Sidebar' // 引入側邊欄
import styles from '@/styles/member.module.css' // 引入樣式文件

function ProfilePage() {
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

          {isEditing ? (
            <button
              onClick={handleSaveClick}
              className={styles.submitButton}
              disabled={isSaving} // 按鈕在保存期間禁用
            >
              {isSaving ? '保存中...' : '儲存變更'}
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

        {/* <div className={styles.rightSection}>
          <div className={styles.avatarPlaceholder}></div>
          <input
            type="file"
            className={styles.uploadButton}
            onChange={handleFileChange}
            accept="image/jpeg, image/png"
          />
          <p className={styles.fileHint}>檔案大小: 最大1MB</p>
          <p className={styles.fileHint}>檔案類型: JPEG, PNG</p>
        </div> */}
      </div>
    </div>
  )
}

export default ProfilePage
