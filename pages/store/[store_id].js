import React from 'react'
import Navbar from '@/components/layout/default-layout/navbar'
import Image from 'next/image'
import store from '@/styles/store.module.css'
import { SlMagnifier } from 'react-icons/sl'
import { Swiper, SwiperSlide } from 'swiper/react'

// import CarouselImage from 'pic2.jpg'

export default function Storeid() {
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
          <h2 class="text-light py-5">門市查詢</h2>
          <h6 class="text-light py-5 fw-normal">
            查詢鄰近門市，立即享受便捷服務。
          </h6>
        </div>
      </div>
      <div
        className="mx-auto w-100"
        style={{
          width: 1440,
          height: 380,
          backgroundColor: '#535353',
        }}
      >
        <div>
          <h4 className={[store.addresstitle, 'fw-normal'].join(' ')}>
            依門市地址
          </h4>
          <div class="d-flex align-items-center">
            <select className={[store.addressbutton, 'form-select'].join(' ')}>
              <option selected>縣市</option>
              <option value="1">台北市</option>
              <option value="2">新北市</option>
              <option value="3">新竹縣</option>
            </select>
            <select className={[store.addressbutton, 'form-select'].join(' ')}>
              <option selected>地區</option>
              <option value="1">信義區</option>
              <option value="2">板橋區</option>
              <option value="3">竹北市</option>
            </select>
            <input
              type="text"
              className={[store.formcontrol, 'form-control'].join(' ')}
              placeholder="請輸入完整地址..."
            />
          </div>

          <div class="">
            <div className="d-flex align-items-end">
              <div>
                <h4 className={[store.addresstitle, 'fw-normal'].join(' ')}>
                  依門市名稱
                </h4>
                <input
                  type="text"
                  className={[store.formcontrol, 'form-control'].join(' ')}
                  placeholder="請輸入門市名稱..."
                />
              </div>
              <div>
                <h4 className={[store.addresstitle, 'fw-normal'].join(' ')}>
                  依門市型態
                </h4>

                <select className={[store.storeserve, 'form-select'].join(' ')}>
                  <option selected>選擇門市型態</option>
                  <option value="1">免費提供wifi</option>
                  <option value="2">手沖咖啡體驗門市</option>
                  <option value="3">寵物友善</option>
                </select>
              </div>
              <button
                className={[
                  store.selectbutton,
                  'form-control',
                  'text-light',
                ].join(' ')}
              >
                查詢
                <SlMagnifier />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="body-pic">
        <div
          className="mx-auto w-100 mb-5"
          style={{
            width: 1440,
            backgroundColor: '#FFFFFF',
          }}
        ></div>
        <div>
          <img src="/left-cafe1.jpg" />
        </div>
        <div>
          <Swiper
            spaceBetween={50} //Slide之間的距離
            slidesPerView={2} //一頁顯示幾個slide
            navigation //左右箭頭導航
            pagination={{ clickable: true }} //頁數
            scrollbar={{ draggable: true }} //滾動條
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
            className="flex flex-col justify-center w-6/12"
          >
            <SwiperSlide>
              <img src="/pic2.jpg"></img>
            </SwiperSlide>
            <SwiperSlide>
              <img src="/pic3.jpg"></img>
            </SwiperSlide>
            <SwiperSlide>
              <img src="/pic4.jpg"></img>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </>
  )
}
