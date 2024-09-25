import React from 'react'
import Sidebar from '../../components/member-layout/Sidebar' // 引入側邊欄
import styles from '@/styles/member.module.css' // 引入樣式文件

function ProfilePage() {
  return (
    <div className={styles.profilePageContainer}>
      <Sidebar /> {/* 側邊欄 */}
      <div className={styles.profileContent}>
        <div className={styles.leftSection}>
          <h2 className={styles.sectionTitle}>我的檔案</h2>
          <p className={styles.sectionSubtitle}>管理你的檔案以保護你的帳戶</p>
          <hr className={styles.divider} />

          <div className={styles.formGroup}>
            <label htmlFor="username" className={styles.label}>
              使用者帳號:
            </label>
            <input
              type="text"
              id="username"
              className={styles.textInput}
              value="bolin.1234567"
              disabled
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>
              姓名:
            </label>
            <input
              type="text"
              id="name"
              className={styles.textInput}
              placeholder="輸入姓名"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="address" className={styles.label}>
              收件地址:
            </label>
            <input
              type="text"
              id="address"
              className={styles.textInput}
              placeholder="輸入地址"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="birthday" className={styles.label}>
              生日:
            </label>
            <div className={styles.birthdayGroup}>
              <select id="day" className={styles.select}>
                <option>日</option>
              </select>
              <select id="month" className={styles.select}>
                <option>月</option>
              </select>
              <select id="year" className={styles.select}>
                <option>年</option>
              </select>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="phone" className={styles.label}>
              手機號碼:
            </label>
            <input
              type="text"
              id="phone"
              className={styles.textInput}
              placeholder="輸入手機號碼"
            />
          </div>

          <a href="#" className={styles.editProfileLink}>
            變更個人資料
          </a>
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
