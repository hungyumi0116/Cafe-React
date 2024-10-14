import React, { useState, useEffect } from 'react'
import nav from '@/styles/nav.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCart } from '@/hooks/use-cart' // 引入 useCart

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userName, setUserName] = useState('') // 新增 userName 狀態
  const { totalQty } = useCart() // 從購物車 hook 中獲取購物車內的商品數量
  const router = useRouter() // 初始化 useRouter

  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn')
    const currentUser = localStorage.getItem('currentUser')

    if (loggedInStatus) {
      setIsLoggedIn(true)
      if (currentUser) {
        const user = JSON.parse(currentUser)
        setUserName(user.member_name) // 設定 userName
      }
    }

    // 監聽登入狀態變更事件
    const handleStatusChange = () => {
      const loggedInStatus = localStorage.getItem('isLoggedIn')
      const currentUser = localStorage.getItem('currentUser')
      
      if (loggedInStatus && currentUser) {
        setIsLoggedIn(true)
        const user = JSON.parse(currentUser)
        setUserName(user.name) // 更新 userName
      } else {
        setIsLoggedIn(false)
        setUserName('')
      }
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
    setUserName('') // 清空 userName
    window.dispatchEvent(new Event('loginStatusChanged')) // 派發登出事件
    alert(`${userName}，您已成功登出`) // 顯示提示訊息
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
            {isLoggedIn && (
              <>
                <li className={nav.li}>
                  <button className={nav.logoutButton} onClick={handleLogout}>
                    會員登出 <div className={nav.little}>logout</div>
                  </button>
                </li>
              </>
            )}
            <Link className={nav.link} href={`/addcart/addcart`}>
              <li className={nav.cartIcon}>
                <div style={{ position: 'relative' }}>
                  <Image
                    src="/shopping_cart_light_icon 2.png"
                    alt="Cart Icon"
                    width={40}
                    height={40}
                    priority
                  />
                  {totalQty > 0 && (
                    <span className={nav.cartQty}>{totalQty}</span>
                  )}
                </div>
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
            {/* 登入後顯示會員名稱和登出按鈕 */}
          </ul>
        </nav>

        {/* 手機版導航菜單 */}
        <div className={`${nav.menu} ${isMenuOpen ? nav.open : ''}`}>
          <ul>
            <li>
              <Link href="/member/member">會員中心</Link>
            </li>
            <li>
              <Link href="/product/list">購物商城</Link>
            </li>
            <li>
              <Link href="/store/index">門市查詢</Link>
            </li>
            <li>
              <Link href="#3">關於我們</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}
