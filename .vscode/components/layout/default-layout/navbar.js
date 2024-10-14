import React, { useState } from 'react';
import nav from '@/styles/nav.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

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
              預約用餐 <div className={nav.little}>reserve</div>
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
    </>
  );
}