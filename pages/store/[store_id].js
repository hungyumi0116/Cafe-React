import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useNavigate, BrowserRouter, Route, Routes } from 'react-router-dom'
import store from '@/styles/store.module.css'
import { SlMagnifier } from 'react-icons/sl'
import { FaWifi, FaDog } from 'react-icons/fa'
import { GiCoffeePot } from 'react-icons/gi'
import { ImPowerCord } from 'react-icons/im'
import { SiBuymeacoffee } from 'react-icons/si'
import ReserviceModalCss from '@/styles/reserviceModal.module.css'
import ReserviceModal from '@/pages/store/ReserviceModal'

// import CarouselImage from 'pic2.jpg'

export default function Storeid() {
  const [Store, setStore] = useState([])
  const [total, setTotal] = useState(0) //總筆數
  const [pageCount, setPageCount] = useState(0) //總頁數
  const getStore = async (params = {}) => {
    const baseURL = 'http://localhost:3005/api/storecafe'
    // 轉換params為查詢字串
    const searchParams = new URLSearchParams(params)
    const qs = searchParams.toString()
    const url = `${baseURL}?${qs}`

    try {
      const res = await fetch(url)
      const resData = await res.json()

      console.log('resData', resData)

      // 設定到狀態中
      // (3.) 設定到狀態後 -> 觸發update(re-render)
      if (resData.status === 'success') {
        setPageCount(resData.data.pageCount)
        setTotal(resData.data.total)
        // 設定到狀態中 ===> 進入update階段，觸發重新渲染(re-render)，呈現資料
        // 確定資料是陣列資料類型才設定到狀態中(最基本的保護)
        if (Array.isArray(resData.data.store)) {
          setStore(resData.data.store)
        }
      }
    } catch (e) {
      console.error(e)
    }
  }
  useEffect(() => {
    getStore()
  }, [])

  // ---這段是點擊右圖換左圖---
  const [leftImg, setLeftImg] = useState('/pic2.jpg')
  const [leftImg1, setLeftImg1] = useState('/pic2.jpg')

  const handleClickRightImage = function (imgsrc) {
    setLeftImg(imgsrc)
  }
  const handleClickRightImage1 = function (imgsrc) {
    setLeftImg1(imgsrc)
  }
  // ---這段是點擊右圖換左圖(結尾)

  //--預約彈跳視窗--
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleButtonClick = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }
  //搜尋
  // const handleSerch = () => {
  //   setPage(1)

  //   // 要送至伺服器的query string參數
  //   // 註: 重新載入資料需要跳至第一頁
  //   const params = {
  //     page: 1, // 跳至第一頁
  //     perpage,
  //     sort: sort,
  //     order: order,
  //     name_like: name_like,
  //     country: country.join(','),
  //     breeds: breeds.join(','),
  //     process: process.join(','),
  //     roast: roast.join(','),
  //     price_gte: price_gte, // 會有'0'price_gte
  //     price_lte: price_lte, // 會有'0'字串的情況，注意要跳過此條件
  //   }

  //   getProducts(params)
  // }

  return (
    <>
      {Store.filter((way) => way.store_id).map((way) => (
        <div key={way.store_id}>
          <h2
            style={{
              color: '#F37423',
            }}
            key={way.store_id}
          >
            {way.store_name}
          </h2>
          <p key={way.store_id}>{way.open_time}</p>
          <p key={way.store_id}>{way.close_time}</p>
        </div>
      ))}

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
        className="mx-auto w-100 "
        style={{
          width: 1440,
          height: 380,
          backgroundColor: '#535353',
        }}
      >
        <div className={[store.contentcenter, 'align-items-center'].join(' ')}>
          <h4 className={[store.addresstitle, 'fw-normal'].join(' ')}>
            依門市地址
          </h4>
          <div class="d-flex align-items-center">
            <select className={[store.addressbutton, 'form-select'].join(' ')}>
              <option selected>縣市</option>
              {Store.filter((way) => way.store_city).map((way) => (
                <option key={way.store_id} value={way.store_id}>
                  <option selected>{way.store_city}</option>
                </option>
              ))}
            </select>

            <select className={[store.addressbutton, 'form-select'].join(' ')}>
              <option selected>地區</option>
              {Store.filter((way) => way.area_city).map((way) => (
                <option key={way.store_id} value={way.store_id}>
                  <option selected>{way.area_city}</option>
                </option>
              ))}
            </select>
            <input
              type="text"
              className={[store.formcontrol].join(' ')}
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
                  className={[store.formcontrol].join(' ')}
                  placeholder="請輸入門市名稱..."
                />
              </div>
              <div>
                <h4 className={[store.addresstitle, 'fw-normal'].join(' ')}>
                  依門市型態
                </h4>{' '}
                {/* <img src={`/pic2.jpg`} /> */}
                <select className={[store.storeserve].join(' ')}>
                  <option selected>選擇門市型態</option>
                  {Store.filter((way) => way.service_type).map((way) => (
                    <option key={way.store_id} value={way.store_id}>
                      <option selected>{way.service_type}</option>
                    </option>
                  ))}
                </select>
              </div>
              <input
                type="text"
                className={[store.formcontrol].join(' ')}
                placeholder="請輸入完整地址..."
                // value={searchKeyword} // 綁定狀態
                // onChange={(e) => setSearchKeyword(e.target.value)} // 更新關鍵字狀態
              />
              <button className={store.selectbutton}>
                查詢
                <SlMagnifier />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div id="body-pic">
        <div
          className="mx-auto w-100 d-flex justify-content-center"
          style={{
            width: 1440,
            height: 500,
            backgroundColor: '#FFFFFF',
          }}
        >
          <div className="d-flex justify-content-center">
            <div className={[store.pic01].join(' ')}>
              <img
                src={leftImg}
                style={{
                  width: 630,
                  height: 460,
                }}
              />
            </div>
            <div
              className={[store.vertical, 'd-flex', 'flex-column'].join(' ')}
            >
              <img
                src="/pic2.jpg"
                className={store.pic2}
                onClick={() => handleClickRightImage('/pic2.jpg')}
              />
              <img
                src="/pic3.jpg"
                className={store.pic3}
                onClick={() => handleClickRightImage('/pic3.jpg')}
              />
              <img
                src="/pic4.jpg"
                className={store.pic4}
                onClick={() => handleClickRightImage('/pic4.jpg')}
              />
            </div>
          </div>
        </div>
        <div className="">
          <div
            className="mx-auto w-100 d-flex pb-4"
            style={{
              width: 1440,
              backgroundColor: '#1C1B1B',
            }}
          >
            <div className="d-flex mx-auto" style={{ maxWidth: 1440 }}>
              <div>
                <div className={[store.title].join(' ')}>
                  {Store.filter((way) => way.store_city).map((way) => (
                    <h2
                      style={{
                        color: '#F37423',
                      }}
                      key={way.store_id}
                    >
                      {way.store_name}
                    </h2>
                  ))}

                  <div
                    className={[
                      store.roundedbox,
                      'rounded-pill',
                      'fw-normal',
                    ].join(' ')}
                  >
                    <div className={[store.citytext, 'fw-normal'].join(' ')}>
                      台北市/信義區
                    </div>
                  </div>
                </div>

                <div class="fw-normal">
                  <p className={[store.content, 'text-light'].join(' ')}>
                    我們的咖啡廳注重質感與溫暖氛圍，精心挑選來自世界各地的高品質咖啡豆，
                    由技藝精湛的咖啡師用心沖調每一杯咖啡。無論是追求純粹的風味還是獨特的
                    口感，我們都致力於為您帶來最難忘的咖啡體驗。
                  </p>
                </div>
                <div class="pt-5">
                  <button
                    onClick={handleButtonClick}
                    className={[
                      store.botton,
                      'rounded-3',
                      'fw-normal',
                      'small',
                    ].join(' ')}
                  >
                    9:00
                  </button>
                  <ReserviceModal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                  />
                  <button
                    onClick={handleButtonClick}
                    className={[
                      store.botton,
                      'rounded-3',
                      'fw-normal',
                      'small',
                    ].join(' ')}
                  >
                    11:00
                  </button>
                  <button
                    onClick={handleButtonClick}
                    className={[
                      store.botton,
                      'rounded-3',
                      'fw-normal',
                      'small',
                    ].join(' ')}
                  >
                    13:00
                  </button>
                  <ReserviceModal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                  />
                  <button
                    onClick={handleButtonClick}
                    className={[
                      store.botton,
                      'rounded-3',
                      'fw-normal',
                      'small',
                    ].join(' ')}
                  >
                    15:00
                  </button>
                  <ReserviceModal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                  />
                  <button
                    onClick={handleButtonClick}
                    className={[
                      store.botton1,
                      'rounded-3',
                      'fw-normal',
                      'small',
                    ].join(' ')}
                  >
                    16:00
                  </button>
                  <ReserviceModal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                  />
                  <button
                    onClick={handleButtonClick}
                    className={[
                      store.botton,
                      'rounded-3',
                      'fw-normal',
                      'small',
                    ].join(' ')}
                  >
                    17:00
                  </button>
                  <ReserviceModal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                  />
                  <button
                    onClick={handleButtonClick}
                    className={[
                      store.botton1,
                      'rounded-3',
                      'fw-normal',
                      'small',
                    ].join(' ')}
                  >
                    19:00
                  </button>
                  <ReserviceModal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                  />
                  <button
                    onClick={handleButtonClick}
                    className={[
                      store.botton1,
                      'rounded-3',
                      'fw-normal',
                      'small',
                    ].join(' ')}
                  >
                    20:00
                  </button>
                  <ReserviceModal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="body-pic">
        <div
          className="mx-auto w-100 d-flex justify-content-center"
          style={{
            width: 1440,
            height: 500,
            backgroundColor: '#DFDFDF',
          }}
        >
          <div className="d-flex justify-content-center">
            <div className={[store.pic01].join(' ')}>
              <img
                src={leftImg1}
                style={{
                  width: 630,
                  height: 460,
                }}
              />
            </div>
            <div
              className={[store.vertical, 'd-flex', 'flex-column'].join(' ')}
            >
              <img
                src="/pic2.jpg"
                className={store.pic2}
                onClick={() => handleClickRightImage1('/pic2.jpg')}
              />
              <img
                src="/pic3.jpg"
                className={store.pic3}
                onClick={() => handleClickRightImage1('/pic3.jpg')}
              />
              <img
                src="/pic4.jpg"
                className={store.pic4}
                onClick={() => handleClickRightImage1('/pic4.jpg')}
              />
            </div>
          </div>
        </div>
        <div className="">
          <div
            className="mx-auto w-100 d-flex pb-4"
            style={{
              width: 1440,
              backgroundColor: '#1C1B1B',
            }}
          >
            <div className="d-flex mx-auto" style={{ maxWidth: 1440 }}>
              <div>
                <div className={[store.title].join(' ')}>
                  <h2
                    style={{
                      color: '#F37423',
                    }}
                  >
                    JR東日本大飯店門市
                  </h2>
                  <div
                    className={[
                      store.roundedbox,
                      'rounded-pill',
                      'fw-normal',
                    ].join(' ')}
                  >
                    <div className={[store.citytext, 'fw-normal'].join(' ')}>
                      台北市/松山區
                    </div>
                  </div>
                </div>

                <div class="fw-normal">
                  <p className={[store.content, 'text-light'].join(' ')}>
                    我們的咖啡廳注重質感與溫暖氛圍，精心挑選來自世界各地的高品質咖啡豆，
                    由技藝精湛的咖啡師用心沖調每一杯咖啡。無論是追求純粹的風味還是獨特的
                    口感，我們都致力於為您帶來最難忘的咖啡體驗。
                  </p>
                </div>
                <div class="pt-5">
                  <button
                    onClick={handleButtonClick}
                    className={[
                      store.botton,
                      'rounded-3',
                      'fw-normal',
                      'small',
                    ].join(' ')}
                  >
                    9:00
                  </button>
                  <ReserviceModal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                  />
                  <button
                    onClick={handleButtonClick}
                    className={[
                      store.botton,
                      'rounded-3',
                      'fw-normal',
                      'small',
                    ].join(' ')}
                  >
                    11:00
                  </button>
                  <ReserviceModal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                  />
                  <button
                    onClick={handleButtonClick}
                    className={[
                      store.botton,
                      'rounded-3',
                      'fw-normal',
                      'small',
                    ].join(' ')}
                  >
                    13:00
                  </button>
                  <ReserviceModal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                  />
                  <button
                    onClick={handleButtonClick}
                    className={[
                      store.botton,
                      'rounded-3',
                      'fw-normal',
                      'small',
                    ].join(' ')}
                  >
                    15:00
                  </button>
                  <ReserviceModal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                  />
                  <button
                    className={[
                      store.botton1,
                      'rounded-3',
                      'fw-normal',
                      'small',
                    ].join(' ')}
                  >
                    16:00
                  </button>

                  <button
                    onClick={handleButtonClick}
                    className={[
                      store.botton,
                      'rounded-3',
                      'fw-normal',
                      'small',
                    ].join(' ')}
                  >
                    17:00
                  </button>
                  <ReserviceModal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                  />
                  <button
                    className={[
                      store.botton1,
                      'rounded-3',
                      'fw-normal',
                      'small',
                    ].join(' ')}
                  >
                    19:00
                  </button>
                  <button
                    className={[
                      store.botton1,
                      'rounded-3',
                      'fw-normal',
                      'small',
                    ].join(' ')}
                  >
                    20:00
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
