import CartList from '@/components/cart-checkout/cart-list'
import styles from '@/styles/addcart.module.css'
import Navbar from '@/components/layout/default-layout/navbar'
import CartLayout from '@/components/cart-layout/'

export default function Cart() {
  return (
    <>
      <div className={styles.little1}>
          <span>購物車</span>
          <span>填寫資料</span>
          <span>完成訂單</span>
        </div>
      <CartList />
    </>
  )
}

