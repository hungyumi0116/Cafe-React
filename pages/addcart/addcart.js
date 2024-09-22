import CartList from '@/components/cart-checkout/cart-list'
import CartLayout from '@/components/cart-layout/'

export default function Cart() {
  return (
    <>
      <h3>購物車</h3>
      <hr />
      <CartList />
    </>
  )
}

Cart.getLayout = function (page) {
  return <CartLayout>{page}</CartLayout>
}
