import React, { useState, useEffect } from 'react'
import nav from '@/styles/nav.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn')
    if (loggedInStatus) {
      setIsLoggedIn(true)
    }

    // 監聽登入狀態變更事件
    const handleStatusChange = () => {
      const loggedInStatus = localStorage.getItem('isLoggedIn')
      setIsLoggedIn(!!loggedInStatus) // 將狀態設為 true 或 false
    }

    window.addEventListener('loginStatusChanged', handleStatusChange)

    return () => {
      window.removeEventListener('loginStatusChanged', handleStatusChange)
    }
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev)
  }

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('currentUser')
    setIsLoggedIn(false)
    window.dispatchEvent(new Event('loginStatusChanged')) // 派發登出事件
    alert('已登出')
    router.push('/member/login')
  }

  return (
    <>
      <div className={nav.container}>
        <nav className={nav.nav}>
          <Link className={nav.link} href={`/coffee`}>
            <li className={nav.logo}>
              <Image
                src="/&&LOGO.svg"
                alt="Logo"
                width={40}
                height={40}
                priority
              />
            </li>
          </Link>
          <ul className={nav.ul}>
            <Link className={nav.link} href={`/product/list`}>
              <li className={nav.li}>
                購物商城 <div className={nav.little}>shop</div>
              </li>
            </Link>
            <Link className={nav.link} href={`/member/login`}>
              <li className={nav.li}>
                會員中心 <div className={nav.little}>center</div>
              </li>
            </Link>
            <Link className={nav.link} href={`/store/index`}>
              <li className={nav.li}>
                門市預約 <div className={nav.little}>store</div>
              </li>
            </Link>
            <li className={nav.li}>
              關於我們 <div className={nav.little}>about &&</div>
            </li>
            <Link className={nav.link} href={`/addcart/addcart`}>
              <li className={nav.icon}>
                <Image
                  src="/shopping_cart_light_icon 2.svg"
                  alt="Cart Icon"
                  width={40}
                  height={40}
                  priority
                />
              </li>
            </Link>
            <li className={nav.icon2} onClick={toggleMenu}>
              <Image
                src="/list_light_icon 2.svg"
                alt="Menu Icon"
                width={40}
                height={40}
                priority
              />
            </li>
            {/* 登入後顯示登出按鈕，統一樣式 */}
            {isLoggedIn && (
              <li className={nav.li}>
                <button className={nav.logoutButton} onClick={handleLogout}>
                  登出
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>

      <div className={`${nav.menu} ${isMenuOpen ? nav.open : ''}`}>
        <ul>
          <li>
            <Link className={nav.link} href="#1">
              會員中心
            </Link>
          </li>
          <li>
            <Link className={nav.link} href="#2">
              購物商城
            </Link>
          </li>
          <li>
            <Link className={nav.link} href="#3">
              預約用餐
            </Link>
          </li>
          <li>
            <Link className={nav.link} href="#3">
              門市查詢
            </Link>
          </li>
        </ul>
      </div>
    </>
  )
}
