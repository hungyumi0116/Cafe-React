import React from 'react'
import nav from '@/styles/nav.module.css'
import Image from 'next/image'
export default function Navbar() {
  return <>
 <nav className={nav.nav}>
 <li className={nav.logo}><Image
                src="/&&LOGO.svg"
                alt="Logo"
     
                width={45}
                height={45}
                priority
              /></li>
  <ul className={nav.ul}>
 
    <li className={nav.li}>購物商城 <div className={nav.little}>shop</div></li>
    <li className={nav.li}>預約用餐 <div className={nav.little}>reserve</div></li>
    <li className={nav.li}>門市查詢 <div className={nav.little}>store</div></li>
    <li className={nav.li}>關於我們 <div className={nav.little}>about &&</div></li>
    <li className={nav.icon}><Image
                src="/shopping_cart_light_icon 2.svg"
                alt="Vercel Logo"
     
                width={45}
                height={45}
                priority
              /></li>
    <li className={nav.icon}><Image
                src="/user_circle_light_icon 1.svg"
                alt="Vercel Logo"
                width={45}
                height={45}
                priority
              /></li>
  
  </ul>
 </nav>
  </>
}
