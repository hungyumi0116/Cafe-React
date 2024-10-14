import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { Carousel } from 'react-responsive-carousel'
import style from '@/pages/product/productldcss.module.css'
import { useCart } from '@/hooks/use-cart'
import card from '@/styles/card.module.css'
import Slider from 'react-slick'
import ProductCard from '@/components/common/ProductCard'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import products from '@/pages/products' // 引入商品數據
import indexcss from '@/styles/index.module.css'
import Soldtier from '@/components/product-compo/soldtier';

const override = {
  display: 'block',
  margin: '0 auto',
  // borderColor: 'red',
}

// 動態路由名稱
// 除了根(索引)路由(index.js)與巢狀路由(有名稱的路由如list.js)之外，都算此路由
export default function Detail(item) {
  // 商品物件狀態
  // 注意1: 初始值至少要空物件，比較好的選擇是加入屬性名稱的物件，初次渲染使用的是初始值
  // 注意2: 在應用程式執行過程中，一定要保持狀態的資料類型一致(物件)
  const [product, setProduct] = useState({
    p_id: 0,
    p_name: '',
    p_price: 0,
  })

  // 向伺服器獲取資料(建議寫在useEffect外，用async-await)
  const getProduct = async (productId) => {
    const baseURL = `http://localhost:3005/api/product_list/${productId}`

    try {
      const res = await fetch(baseURL)
      const resData = await res.json()

      console.log(resData)

      // 設定到狀態中
      // (3.) 設定到狀態後 -> 觸發update(re-render)
      if (resData.status === 'success') {
        setProduct(resData.data.product);
        console.log('product', resData.data.product);
      }
    } catch (e) {
      console.error(e)
    }
  }

  // 第1步: 宣告路由器
  // router.query 一個物件值，裡面會包含productId屬性
  // router.isReady 一個布林值，一開始是false(初次渲染)，當next完成水合化作用(SSR)後，會改變為true，此時可以得到router.query的值
  const router = useRouter()

  // 第2步: 用useEffect監聽router.isReady變化，當為true時代表query裡有productId可以使用
  useEffect(() => {
    if (router.isReady) {
      // 這裡可以確保一定可以得到router.query的值
      console.log(router.query)
      // 向伺服器要求資料
      getProduct(router.query.productId)
    }

    // 以下為省略eslint檢查一行，這裡再加上router.query意義會有所不同目前會是多餘的
    // eslint-disable-next-line
  }, [router.isReady])
// ----------------------------------------------------------------------------

  //購物車hook
  const {
    items,
    totalPrice,
    totalQty,
    handleAdd,
    handleDecrease,
    handleIncrease,
    handleRemove,
    handlecancel,
  } = useCart()

  const [tempQty, setTempQty] = useState(1) // 初始數量

   //商品卡片的輪播效果

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
// ----------------------------------------------------------------------------
  return (
    <>
<div className={style.productbackgrond}>
        <div className={style.product}>
        <div className={style.productcarousel}>
          <Carousel autoPlay interval="5000" transitionTime="500" infiniteLoop>
            {product.p_pic1 !== 'null' ? (
              <div>
                <img
                  src={`http://localhost:3005/img/${product.p_pic1}`}
                  alt="..."
                />
                <p className="legend">{product.p_name}</p>
              </div>
            ) : (
              <div></div>
            )}
            {product.p_pic2 !== 'null' ? (
              <div>
                <img
                  src={`http://localhost:3005/img/${product.p_pic2}`}
                  alt="..."
                />
              </div>
            ) : (
              <div></div>
            )}
            {product.p_pic3 !== 'null' ? (
              <div>
                <img
                  src={`http://localhost:3005/img/${product.p_pic3}`}
                  alt="..."
                />
              </div>
            ) : (
              <div></div>
            )}
            {product.p_pic4 !== 'null' ? (
              <div>
                <img
                  src={`http://localhost:3005/img/${product.p_pic4}`}
                  alt="..."
                />
              </div>
            ) : (
              <div></div>
            )}
            {product.p_pic5 !== 'null' ? (
              <div>
                <img
                  src={`http://localhost:3005/img/${product.p_pic5}`}
                  alt="..."
                />
              </div>
            ) : (
              <div></div>
            )}
          </Carousel>
          </div>
       <div className={style.producttext}>
        <h2>{product.p_name}</h2>
        <p>原價: {product.p_price}</p>
        <p>優惠價：{product.p_discount}</p>
        <p>處理法:{product.p_process}</p>
        <p>烘焙程度:{product.p_roast}</p>
        <p>

        </p>
        <p>已售:{product.p_sold}　庫存:{product.p_stock}</p>
        <p>商品介紹:{product.p_intro}</p>
        <div className={style.buttonbigdiv}>
        <div className={style.buttonbigdiv1}>購買數量 :</div>
        <div className={style.buttondiv}>
        <button className={style.button} onClick={() => {if (tempQty > 1) setTempQty(tempQty - 1)}}>-</button>
        </div>
        <div className={style.buttondiv}>{tempQty}</div>
        <div className={style.buttondiv}>
        <button className={style.button} onClick={() => setTempQty(tempQty + 1)}>+</button>
        </div>
        <div className={style.buttondiv}>
        <button className={style.button2}
          onClick={() => {
            const productWithQty = { ...product, qty: tempQty } // 帶入臨時選擇的數量
            handleAdd(productWithQty, tempQty) // 將數量和商品一起傳入
            alert('已經成功加入購物車:', product.p_name)
          }}
        >
          加入購物車
        </button>
        </div>
        <div className={style.buttondiv}>
        <Link href="/product/list"><button className={style.button2}>繼續購物</button></Link>
        </div>
      </div>
      </div>
      </div>
</div>
      <div className={card.text}>
        <div className={card.h3}>
          <h3>探索咖啡的所有可能</h3>
        </div>
        <div className={card.h2}>
          <h2>推薦商品</h2>
        </div>
      </div>
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
