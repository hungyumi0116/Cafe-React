import React from 'react'
import Sidebar from '../../components/member/Sidebar' // 分離的側邊導覽
import styles from '@/styles/vip.module.css' // 引入CSS Modules

function Vip() {
  return (
    <div className={styles.vipPageContainer}>
      <Sidebar /> {/* 使用側邊欄 */}
      <div className={styles.mainContent}>
        <div className={styles.membershipLevels}>
          <div className={styles.level}>
            <p className={styles.levelTitle}>目前等級</p>
            <div className={styles.generalMember}>一般會員</div>
          </div>
          <div className={styles.level}>
            <p className={styles.levelTitle}>高級等級</p>
            <div className={styles.premiumMember}>高級會員</div>
          </div>
          <div className={styles.level}>
            <p className={styles.levelTitle}>VIP等級</p>
            <div className={styles.vipMember}>VIP會員</div>
          </div>
        </div>

        <div className={styles.infoSection}>
          <h3>VIP會員</h3>
          <ul className={styles.benefitsList}>
            <li>入會方式：單筆消費滿NT$10,000，方可入會。</li>
            <li>會籍期限：入會後有效期一年。</li>
            <li>會員福利：</li>
            <ul>
              <li>消費回饋：每消費NT$10可獲得1點。</li>
              <li>生日禮券：提供限量優惠券。</li>
              <li>專屬活動：定期活動邀請。</li>
            </ul>
          </ul>
        </div>

        <div className={styles.conditionsSection}>
          <h4>升等條件</h4>
          <p>達成一條條件即升至高級會員</p>
          <ul>
            <li>前一年累積消費滿NT$10,000</li>
            <li>當日消費滿NT$10,000</li>
          </ul>
        </div>

        <div className={styles.renewalSection}>
          <h4>續等條件</h4>
          <p>達成條件後自動續會，累積消費滿NT$10,000可續等</p>
        </div>
      </div>
    </div>
  )
}

export default Vip
