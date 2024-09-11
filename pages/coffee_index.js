import Image from 'next/image'
import { useState, useEffect } from 'react'
import indexcss from '@/styles/index.module.css'

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
      const img = document.getElementById('fade-in-image')
      if (img && isInViewport(img)) {
        setIsVisible(true)
      }

      const rightImg = document.getElementById('fade-in-image-right')
      if (rightImg && isInViewport(rightImg)) {
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
      const img1 = document.getElementById('fade-in-image1')
      if (img1 && isInViewport(img1)) {
        setIsImage1Visible(true)
      }

      const img2 = document.getElementById('fade-in-image2')
      if (img2 && isInViewport(img2)) {
        setIsImage2Visible(true)
      }

      const img3 = document.getElementById('fade-in-image3')
      if (img3 && isInViewport(img3)) {
        setIsImage3Visible(true)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      <div className={indexcss.main}>
        {/* ------------BANNER------------- */}
        <div>
          <div
            id="carouselExample"
            className={`${indexcss.car}"carousel slide"`}
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src="/coffee 2.svg" className="d-block w-100" alt="..." />
              </div>
              <div className="carousel-item">
                <img src="/coffee 2.svg" className="d-block w-100" alt="..." />
              </div>
              <div className="carousel-item">
                <img src="/coffee 2.svg" className="d-block w-100" alt="..." />
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
          <div className={indexcss.story}>
            <img src="/標題.svg" className="d-block w-20" alt="..." />

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
          <div className={indexcss.textcontainer}>
            {/* 左側淡入圖片 */}
            <img
              id="fade-in-image"
              className={`${indexcss.image} ${
                isVisible ? indexcss.visible : ''
              }`}
              src="咖啡.svg"
              alt="咖啡"
            />
            <div className={indexcss.text}>
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
            </div>
            {/* 右側淡入圖片 */}
            <img
              id="fade-in-image-right"
              className={`${indexcss.imageRight} ${
                isRightImageVisible ? indexcss.visibleRight : ''
              }`}
              src="person-serving-cup-coffee.jpg"
              alt="右側咖啡"
            />
          </div>
        </div>
      </div>
      {/* ------------品牌理念------------ */}

      {/* ------------商品資訊------------ */}
      <div className={indexcss.products}>
        <div className={indexcss.textcontainer2}>
          <div className={indexcss.story}>
            <img src="/白色標題.svg" className="d-block w-20" alt="..." />

            {/* 右側淡入文字 */}
            <span
              id="fade-in-text"
              className={`${indexcss.textRight2} ${
                isTextVisible ? indexcss.textVisible : ''
              }`}
            >
              what is && ?
            </span>
          </div>
          <div className={indexcss.text2}>
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
    </>
  )
}
