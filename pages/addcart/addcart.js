import CartList from '@/components/cart-checkout/cart-list'
import styles from '@/styles/addcart.module.css'
import Slider from 'react-slick'
import ProductCard from '@/components/common/ProductCard'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import products from '@/pages/products' // 引入商品數據
import indexcss from '@/styles/index.module.css'
import card from '@/styles/card.module.css'


export default function Cart() {
  const settings = {
    dots: true, // 顯示下方的圓點導航
    infinite: true, // 允許無限輪播
    speed: 500, // 切換速度，500ms
    slidesToShow: 5, // 每次顯示的商品數量
    slidesToScroll: 1, // 每次滾動的商品數量
    responsive: [
      {
        breakpoint: 1550, // 當螢幕寬度小於 1440px 時
        settings: {
          slidesToShow: 3, // 顯示3個商品
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1000, // 當螢幕寬度小於 600px 時
        settings: {
          slidesToShow: 2, // 顯示一個商品
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 800, // 當螢幕寬度小於 600px 時
        settings: {
          slidesToShow: 1, // 顯示一個商品
          slidesToScroll: 1,
        },
      },
    ],
  }
  return (
    <>
      <CartList />
      <div className={card.recommend}>
      <img className={card.storycontainerimg2} src="/close-up-barista-making-cappuccino-bartender-preparing-coffee-drink.jpg"/>
        <div className={card.card}>
        <Slider {...settings}>
          {products.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </Slider>
        </div>
      </div>
    </>
  )
}
