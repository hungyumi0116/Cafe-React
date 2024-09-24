import styles from '@/styles/addcart.module.css'
import { FaShoppingCart } from 'react-icons/fa'
import { useCart } from '@/hooks/use-cart'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import nav from '@/styles/nav.module.css'
import Image from 'next/image'

export default function Navbar() {
  const { totalQty } = useCart()

  // 宣告路由器
  const router = useRouter()
  // 驗証選單項目的網址路徑是否和路由器目前的路徑一致(套用active樣式用)
  const isActive = (href) => router.pathname === href
  // 為避免重覆套用，先寫出集中選單的陣列再map
  const menuItems = [
    {
      id: 1,
      title: '購物車',
      href: '/addcart/addcart',
    },
    {
      id: 2,
      title: '商品列表',
      href: '/addcart/product',
    },
  ]

  return (
    <>
      <div className={nav.container}>
        <nav className={nav.nav}>
          <li className={nav.logo}>
            <Image
              src="/&&LOGO.svg"
              alt="Logo"
              width={45}
              height={45}
              priority
            />
          </li>
          <ul className={nav.ul}>
            <li className={nav.li}>
              購物商城 <div className={nav.little}>shop</div>
            </li>
            <li className={nav.li}>
              會員中心 <div className={nav.little}>member Center</div>
            </li>
            <li className={nav.li}>
              門市預約 <div className={nav.little}>store</div>
            </li>
            <li className={nav.li}>
              關於我們 <div className={nav.little}>about &&</div>
            </li>
            <li className={nav.icon}>
              <Image
                src="/shopping_cart_light_icon 2.svg"
                alt="Vercel Logo"
                width={45}
                height={45}
                priority
              />
              <div className={styles['badge']}>
                <div className={styles['button']}>
                  <span className={styles['button__badge']}>{totalQty}</span>
                </div>
              </div>
            </li>
          </ul>
        </nav>
      </div>
      <div className={styles['navbar']}>
        <div className={styles['logo']}>網站Logo</div>
        <div className={styles['header']}>
          <h2>購物車範例</h2>
          <div className={styles['menu']}>
            <ul>
              {/* 這裡map選單項目，套用哪個是active的樣式特效 */}
              {menuItems.map((v, i) => {
                return (
                  <li key={v.id}>
                    <Link
                      className={isActive(v.href) ? styles['active'] : ''}
                      href={v.href}
                    >
                      {v.title}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
