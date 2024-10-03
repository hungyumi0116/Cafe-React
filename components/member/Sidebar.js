import React from 'react'
import styles from '@/styles/sidebar.module.css' // 引入CSS模塊

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <div className={styles.userInfo}>
        <div className={styles.avatarPlaceholder}></div>
        <p className={styles.username}>bolin.1234567</p>
        <p className={styles.membershipLevel}>會員等級：新手</p>
        <a href="#" className={styles.membershipLink}>
          會員等級說明
        </a>
      </div>
      <hr className={styles.divider} />
      <ul className={styles.navList}>
        <li>個人檔案</li>
        <li>銀行帳號/信用卡</li>
        <li>更改密碼</li>
        <li>購買清單</li>
        <li>我的優惠券</li>
        <li>查看預約</li>
      </ul>
    </div>
  )
}

export default Sidebar
