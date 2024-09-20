import React from 'react'
import nav from '@/styles/nav.module.css'
import Image from 'next/image'
import Link from 'next/link'
export default function Navbar() {
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
                alt="Vercel Logo"
                width={45}
                height={45}
                priority
              />
            </li>
            <li className={nav.icon}>
              <Image
                src="/user_circle_light_icon 1.svg"
                alt="Vercel Logo"
                width={45}
                height={45}
                priority
              />
            </li>
          </ul>
        </nav>
      </div>
      <div className={nav.containerforphone}>
        <nav className={nav.navforphone}>
          <li className={nav.logo}>
            <Image
              src="/&&LOGO.svg"
              alt="Logo"
              width={45}
              height={45}
              priority
            />
          </li>
          <ul className={nav.ulforphone}>
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
                alt="Vercel Logo"
                width={45}
                height={45}
                priority
              />
            </li>
            <li className={nav.icon}>
              <Image
                src="/user_circle_light_icon 1.svg"
                alt="Vercel Logo"
                width={45}
                height={45}
                priority
              />
            </li>
          </ul>
        </nav>
      </div>
      {/* Hello world */}
      <div className="logo">
        <a href="#">logo</a>
      </div>
      {/*  塞入label 和 input 來做觸發 (一定要放在被觸發的導覽選單前 )  */}
      <input type="checkbox" id="menu_control" />
      <labe className={nav.menuBtn} />
      <div className={nav.na}>
        <a href="#">項目一</a>
        <a href="#">項目二</a>
        <a href="#">項目三</a>
        <a href="#">項目四</a>
      </div>
    </>
  )
}
