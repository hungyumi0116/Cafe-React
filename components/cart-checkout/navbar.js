import styles from '@/styles//addcart.module.css'
import { FaShoppingCart } from 'react-icons/fa'
import { useCart } from '@/hooks/use-cart'
import Link from 'next/link'

export default function Navbar() {
  const { totalQty } = useCart()

  return (
    <>
      <div className={styles['navbar']}>
        <div className={styles['logo']}>網站Logo</div>
        <div className={styles['header']}>
          <h2>購物車範例</h2>
          <div className={styles['menu']}>
            <ul>
              <li>
                <Link href="/cs-0819/cart">購物車</Link>
              </li>
              <li>
                <Link href="/cs-0819/products">商品列表</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles['badge']}>
          <div className={styles['button']}>
            <FaShoppingCart />
            <span className={styles['button__badge']}>{totalQty}</span>
          </div>
        </div>
      </div>
    </>
  )
}
