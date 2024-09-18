import Navbar from './navbar'
import styles from '@/styles//addcart.module.css'

export default function CartLayout({ children }) {
  return (
    <>
      <Navbar />
      <div className={styles['container']}>{children}</div>
    </>
  )
}
