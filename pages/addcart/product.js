import ProductList from '@/components/cart-checkout/product-list'
import CartLayout from '@/components/cart-layout'

export default function Product() {
  return (
    <>
      <h3>商品列表</h3>
      <hr />
      <ProductList />
    </>
  )
}

// 這裡代表要套用CartLayout，取代原本的DefaultLayout
// 要寫在元件的函式之外
Product.getLayout = function (page) {
  return <CartLayout>{page}</CartLayout>
}
