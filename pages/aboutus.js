import Image from 'next/image'
import { useState, useEffect } from 'react'
import indexcss from '@/styles/index.module.css'
import card from '@/styles/card.module.css'
import Link from 'next/link'
import Slider from 'react-slick'
import ProductCard from '@/components/common/ProductCard'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import products from '@/pages/products' // 引入商品數據
import Soldtier from '@/components/product-compo/soldtier'

export default function Test() {
  const [isVisible, setIsVisible] = useState(false) // 左側淡入圖片的狀態
  const [isRightImageVisible, setIsRightImageVisible] = useState(false) // 右側淡入圖片的狀態
  const [isTextVisible, setIsTextVisible] = useState(false) // 右側淡入文字的狀態
  const [isText2Visible, setIsText2Visible] = useState(false) // 第二段右側淡入文字的狀態
  const [isImage1Visible, setIsImage1Visible] = useState(false)
  const [isImage2Visible, setIsImage2Visible] = useState(false)
  const [isImage3Visible, setIsImage3Visible] = useState(false)

  // 檢查元素是否進入視窗
  const isInViewport = (element) => {
    const rect = element.getBoundingClientRect()
    return rect.top >= 0 && rect.bottom <= window.innerHeight
  }

  // 監聽滾動事件來觸發各個元素的淡入效果
  useEffect(() => {
    const handleScroll = () => {
      const img = document.getElementById('fade-in-img')
      if (img && isInViewport(img)) {
        setIsVisible(true)
      }

      const rightimage = document.getElementById('fade-in-img-right')
      if (rightimage && isInViewport(rightimage)) {
        setIsRightImageVisible(true)
      }

      const text = document.getElementById('fade-in-text')
      if (text && isInViewport(text)) {
        setIsTextVisible(true)
      }

      const text2 = document.getElementById('fade-in-text2')
      if (text2 && isInViewport(text2)) {
        setIsText2Visible(true) // 單獨控制第二段文字的顯示狀態
      }
      const image1 = document.getElementById('fade-in-image1')
      if (image1 && isInViewport(image1)) {
        setIsImage1Visible(true)
      }

      const image2 = document.getElementById('fade-in-image2')
      if (image2 && isInViewport(image2)) {
        setIsImage2Visible(true)
      }

      const image3 = document.getElementById('fade-in-image3')
      if (image3 && isInViewport(image3)) {
        setIsImage3Visible(true)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  //商品卡片的輪播效果

  const settings = {
    dots: true, // 顯示下方的圓點導航
    infinite: true, // 允許無限輪播
    speed: 500, // 切換速度，500ms
    slidesToShow: 3, // 每次顯示的商品數量
    slidesToScroll: 1, // 每次滾動的商品數量
    responsive: [
      {
        breakpoint: 1440, // 當螢幕寬度小於 1440px 時
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
      {/* ------------BANNER------------- */}
      <div>
        <img
          className={indexcss.storycontainerimg}
          src="/trendy-coffee-shop-city.jpg"
        />
        <div id="carouselExample" className="carousel slide">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src="banner.png" className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item">
              <img src="banner.png" className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item">
              <img src="banner.png" className="d-block w-100" alt="..." />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      {/* ------------BANNER------------- */}
      {/* ------------品牌理念------------ */}
      <div className={indexcss.storycontainer}>
        <div className={indexcss.textcontainer}>
          {/* 左側淡入圖片 */}
          <img
            id="fade-in-img"
            className={`${indexcss.img} ${isVisible ? indexcss.visible : ''}`}
            src="咖啡.svg"
            alt="咖啡"
          />
          <div className={indexcss.text}>
            <div className={indexcss.story}>
              <img src="/標題.svg" className={indexcss.title} alt="..." />

              {/* 右側淡入文字 */}
              <span
                id="fade-in-text"
                className={`${indexcss.textRight} ${
                  isTextVisible ? indexcss.textVisible : ''
                }`}
              >
                what is && ?
              </span>
            </div>
            <p>
              在
              &&Cafe，我們相信每一杯咖啡都不僅僅是一種飲品，而是傳遞熱情與匠心的橋樑。我們的品牌名中的
              &&
              象徵著兩個不可或缺的連結：自然與人，品質與細節，咖啡與生活。這些連結緊密相扣，讓每一杯咖啡都成為美好體驗的縮影。
            </p>
            <p>
              我們精選全球各地的優質咖啡豆，尊重每一片土地的獨特風味，並以精湛的手工技藝進行烘焙，讓每一顆咖啡豆都能展現它的最佳狀態。我們的每一步都堅持著對品質的承諾，從農場到您的咖啡杯，&&Cafe
              都力求將這份匠心呈現給每位愛好者，我們提倡的是一種細緻的生活態度。希望每一位品味咖啡的人，不僅能感受到咖啡豆的純粹與濃郁，還能在每一口咖啡中找到自然與工藝的完美交融。每一杯
              &&Cafe，都是對美好生活的致敬，都是屬於您的精彩時刻。
            </p>
            <div className={indexcss.buttondiv}>
              <button className={indexcss.button}>
                <span>關於我們 </span>
              </button>
            </div>
          </div>
          {/* 右側淡入圖片 */}
          <img
            id="fade-in-img-right"
            className={`${indexcss.imageRight} ${
              isRightImageVisible ? indexcss.visibleRight : ''
            }`}
            src="person-serving-cup-coffee.jpg"
            alt="右側咖啡"
          />
        </div>
      </div>

      {/* ------------品牌理念------------ */}

      {/* ------------商品資訊------------ */}
      <div className={indexcss.productcontainer}>
        <div className={indexcss.textcontainer2}>
          <div className={indexcss.text2}>
            <div className={indexcss.story}>
              <img src="/白色標題.svg" className={indexcss.title} alt="..." />

              {/* 右側淡入文字 */}
              <span
                id="fade-in-text"
                className={`${indexcss.textRight} ${
                  isTextVisible ? indexcss.textVisible : ''
                }`}
              >
                Go shopping!
              </span>
            </div>
            <p>
              在
              &&Cafe，我們相信每一杯咖啡都不僅僅是一種飲品，而是傳遞熱情與匠心的橋樑。我們的品牌名中的
              &&
              象徵著兩個不可或缺的連結：自然與人，品質與細節，咖啡與生活。這些連結緊密相扣，讓每一杯咖啡都成為美好體驗的縮影。
            </p>
            <p>
              我們精選全球各地的優質咖啡豆，尊重每一片土地的獨特風味，並以精湛的手工技藝進行烘焙，讓每一顆咖啡豆都能展現它的最佳狀態。我們的每一步都堅持著對品質的承諾，從農場到您的咖啡杯，&&Cafe
              都力求將這份匠心呈現給每位愛好者，我們提倡的是一種細緻的生活態度。希望每一位品味咖啡的人，不僅能感受到咖啡豆的純粹與濃郁，還能在每一口咖啡中找到自然與工藝的完美交融。每一杯
              &&Cafe，都是對美好生活的致敬，都是屬於您的精彩時刻。
            </p>
            <div className={indexcss.buttondiv}>
              <button className={indexcss.button2}>
                <span>前往購物 </span>
              </button>
            </div>
          </div>
          <div className={indexcss.item}>
            <div className={indexcss.item1}>
              {/* 第一張圖片 */}
              <img
                id="fade-in-image1"
                src="/產品圖1.svg"
                className={`${indexcss.fadeIn} ${
                  isImage1Visible ? indexcss.pro : ''
                }`}
                alt="產品圖1"
              />
            </div>
            <div className={indexcss.item1}>
              {/* 第二張圖片 */}
              <img
                id="fade-in-image2"
                src="/產品圖2.svg"
                className={`${indexcss.fadeIn2} ${
                  isImage2Visible ? indexcss.pro : ''
                }`}
                alt="產品圖2"
              />
            </div>
            <div className={indexcss.item1}>
              {/* 第三張圖片 */}
              <img
                id="fade-in-image3"
                src="/產品圖3.svg"
                className={`${indexcss.fadeIn3} ${
                  isImage3Visible ? indexcss.pro : ''
                }`}
                alt="產品圖3"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ------------推薦商品------------ */}
      <div className={card.text}>
        <div className={card.h3}>
          <h3>探索咖啡的所有可能</h3>
        </div>
        <div className={card.h2}>
          <h2>推薦商品</h2>
        </div>
      </div>
      <div className={card.recommend}>
        <img
          className={card.storycontainerimg2}
          src="/close-up-barista-making-cappuccino-bartender-preparing-coffee-drink.jpg"
        />
        <div className={card.card}>
          <Link className={indexcss.link} href={`/product/list`}>
            <Slider {...settings}>
              <Soldtier />
            </Slider>
          </Link>
        </div>
      </div>
      {/* ------------預約門市------------ */}
      <div className={indexcss.reserve}>
        <div className={indexcss.reserveimg}>
          <img src="門市預約.svg" alt="..." className={indexcss.resimg} />
        </div>
        <div className={indexcss.reservetextcontainer}>
          <div className={indexcss.reservetext}>
            <h2>門市預約</h2>
            <br></br>
            <p>
              &&Cafe
              不僅是品味咖啡的好地方，更是放鬆心靈的最佳選擇。我們的店內設計融合了現代簡約與自然元素，營造出舒適、愜意的氛圍。無論是與朋友相聚，還是享受一個人的靜謐時光，我們都期待為您打造一段美好的咖啡時光。
            </p>
            <br></br>
            <p>
              我們相信，每一杯咖啡背後都有一段故事，邀請您一起來 &&Cafe
              品味這一杯咖啡中的心意。
            </p>
            <div className={indexcss.buttondiv}>
              <button className={indexcss.button}>
                <span>前往預約 </span>
              </button>
            </div>
          </div>
        </div>
        <div className={indexcss.storephoto}>
          <div className={indexcss.photo}>
            <img src="門市小圖-1.svg" className="d-block w-20" alt="..." />
          </div>
          <div className={indexcss.photo}>
            <img src="門市小圖-2.svg" className="d-block w-20" alt="..." />
          </div>
          <div className={indexcss.photo}>
            <img src="門市小圖-3.svg" className="d-block w-20" alt="..." />
          </div>
          <div className={indexcss.photo}>
            <img src="門市小圖-4.svg" className="d-block w-20" alt="..." />
          </div>
        </div>
      </div>
    </>
  )
}
