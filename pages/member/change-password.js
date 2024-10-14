import React, { useState, useEffect } from 'react'
import Sidebar from '../../components/member/Sidebar' // 引入側邊欄
import styles from '@/styles/member.module.css' // 引入樣式文件
import { useRouter } from 'next/router'
import { PiEyeBold } from 'react-icons/pi'
import { PiEyeClosedLight } from 'react-icons/pi'

function ChangePasswordPage() {
  const [user, setUser] = useState(null)
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isSaving, setIsSaving] = useState(false) // 狀態：是否正在保存
  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'))
    if (currentUser) {
      setUser(currentUser)
    }
  }, [])

  const handleSaveClick = async () => {
    if (newPassword !== confirmPassword) {
      alert('新密碼與確認密碼不相符')
      return
    }

    setIsSaving(true) // 開始保存，禁用按鈕
    try {
      const response = await fetch('/api/members/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          member_id: user.member_id,
          oldPassword,
          newPassword,
        }),
      })

      if (!response.ok) {
        throw new Error('更改密碼失敗')
      }

      const result = await response.json()
      alert(result.message)

      // 更新 localStorage 和用戶狀態
      setOldPassword('')
      setNewPassword('')
      setConfirmPassword('')

      // 跳轉到會員中心
      router.push('/member/member')
    } catch (error) {
      console.error('Error changing password:', error)
      alert('更改密碼失敗，請輸入正確密碼')
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
          <h2 className={styles.sectionTitle}>更改密碼</h2>
          <p className={styles.sectionSubtitle}>
            為了保護你的帳戶，請定期更改密碼
          </p>
          <hr className={styles.divider} />

          <div className={styles.formGroup}>
            <label htmlFor="oldPassword" className={styles.label}>
              舊密碼:
            </label>
            <div className={styles.passwordContainer}>
              <input
                type={showOldPassword ? 'text' : 'password'}
                id="oldPassword"
                className={styles.textInputWithIcon} // 使用修改後的 className
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
              <span
                className={styles.togglePasswordIcon} // 使用新樣式
                onClick={() => setShowOldPassword(!showOldPassword)}
              >
                {showOldPassword ? <PiEyeBold /> : <PiEyeClosedLight />}
              </span>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="newPassword" className={styles.label}>
              新密碼:
            </label>
            <div className={styles.passwordContainer}>
              <input
                type={showNewPassword ? 'text' : 'password'}
                id="newPassword"
                className={styles.textInputWithIcon}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <span
                className={styles.togglePasswordIcon}
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? <PiEyeBold /> : <PiEyeClosedLight />}
              </span>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword" className={styles.label}>
              確認新密碼:
            </label>
            <div className={styles.passwordContainer}>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                className={styles.textInputWithIcon}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <span
                className={styles.togglePasswordIcon}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <PiEyeBold /> : <PiEyeClosedLight />}
              </span>
            </div>
          </div>

          <button
            onClick={handleSaveClick}
            className={styles.submitButton}
            disabled={isSaving} // 按鈕在保存期間禁用
          >
            {isSaving ? '保存中...' : '更改密碼'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChangePasswordPage
