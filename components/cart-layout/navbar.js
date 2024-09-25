import styles from '@/styles/addcart.module.css'
import { FaShoppingCart } from 'react-icons/fa'
import { useCart } from '@/hooks/use-cart'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React,{useState} from 'react'
import nav from '@/styles/nav.module.css'
import Image from 'next/image'

export default function Navbar() {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

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
              width={40}
              height={40}
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
            <Link href={`/store/index`}>
              <li className={nav.li}>
                門市查詢 <div className={nav.little}>store</div>
              </li>
            </Link>
            <li className={nav.li}>
              關於我們 <div className={nav.little}>about &&</div>
            </li>
            <li className={nav.icon}>
              <Image
                src="/shopping_cart_light_icon 2.svg"
                alt="Cart Icon"
                width={40}
                height={40}
                priority
              />
            </li>
            <li className={nav.icon}>
              <Image
                src="/user_circle_light_icon 1.svg"
                alt="User Icon"
                width={40}
                height={40}
                priority
              />
            </li>
            <li className={nav.icon2} onClick={toggleMenu}>
              <Image
                src="/list_light_icon 2.svg"
                alt="Menu Icon"
                width={40}
                height={40}
                priority
              />
            </li>
          </ul>
        </nav>
      </div>

      <div className={`${nav.menu} ${isMenuOpen ? nav.open : ''}`}>
        <ul>
          <li><Link href="#1">會員中心</Link></li>
          <li><Link href="#2">購物商城</Link></li>
          <li><Link href="#3">預約用餐</Link></li>
          <li><Link href="#3">門市查詢</Link></li>
        </ul>
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
