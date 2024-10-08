import React, { useEffect, useState } from 'react'
import styles from '@/styles/sidebar.module.css' // 引入CSS模塊

function Sidebar() {
  const [user, setUser] = useState({})

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'))
    if (currentUser) {
      setUser(currentUser)
    }
  }, [])

  return (
    <div className={styles.sidebar}>
      <div className={styles.userInfo}>
        {user.member_photo && (
          <img
            src={user.member_photo}
            alt="User Avatar"
            className={styles.avatar}
          />
        )}
        <div className={styles.avatarPlaceholder}></div>
        <p className={styles.username}>{user.member_name}</p>

        <a href="#" className={styles.membershipLink}>
          會員等級說明
        </a>
      </div>
      <hr className={styles.divider} />
      <ul className={styles.navList}>
        <li>個人檔案</li>
        <li>更改密碼</li>
      </ul>
    </div>
  )
}

export default Sidebar
