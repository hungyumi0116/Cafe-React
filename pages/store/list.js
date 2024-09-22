import { useEffect } from 'react'
import Navbar from '@/components/layout/default-layout/navbar'
import Image from 'next/image'
import store from '@/styles/store.module.css'
import Carousel from 'react-bootstrap/Carousel'

export default function List() {
  return (
    <>
      <div className="banner-container">
        <div
          className={[
            store.bannertext,
            'd-flex',
            'flex-column',
            'align-items-center',
            'justify-content-center',
          ].join(' ')}
          style={{
            backgroundImage: "url('/bn.jpg')",
          }}
        >
          <h2 class="text-light py-5">門市資訊</h2>
          <h6 class="text-light py-5 fw-normal">
            查詢鄰近門市，立即享受便捷服務。
          </h6>
        </div>
      </div>
      <div className="body-pic">
        <div class="w-100 py-5 px-5 mb-5">
          <div className={[store.pic1].join(' ')}>
            <div className="d-flex align-items-center">
              <img src="/left-cafe1.jpg" />
              <div className={store.picCarousel}>
                <Carousel className="h-100">
                  <Carousel.Item>
                    <img src="/pic2.jpg" width="100%" className={store.imgc} />
                  </Carousel.Item>
                  <Carousel.Item>
                    <img src="/pic3.jpg" width="100%" className={store.imgc} />
                  </Carousel.Item>
                  <Carousel.Item>
                    <img src="/pic4.jpg" width="100%" className={store.imgc} />
                  </Carousel.Item>
                </Carousel>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex">
      <div
        className="mx-auto w-100"
        style={{
          width: 1440,
          height: 600,
          backgroundColor: '#000000',
        }}
      >
      <p>高雄前金門市</p>
      </div>
       
      </div>
    </>
  )
}
