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
          console.log('resData.data.store', resData.data)

          setLeftImg(`/img/${resData.data.store.store_pic1}`)
        }
      }
    } catch (e) {
      console.error(e)
    }
  }
  useEffect(() => {
    getStore()
  }, [])

  // 定義核取方塊的狀態，初始值設為 false (未勾選)
  const [isChecked, setIsChecked] = useState(false)
  const [isChecked1, setIsChecked1] = useState(false)
  const [isChecked2, setIsChecked2] = useState(false)
  const [isChecked3, setIsChecked3] = useState(false)
  const [isChecked4, setIsChecked4] = useState(false)

  // 處理核取方塊狀態變化的函數
  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked) // 更新核取狀態
  }
  const handleCheckboxChange1 = (event) => {
    setIsChecked1(event.target.checked)
  }
  const handleCheckboxChange2 = (event) => {
    setIsChecked2(event.target.checked)
  }
  const handleCheckboxChange3 = (event) => {
    setIsChecked3(event.target.checked)
  }
  const handleCheckboxChange4 = (event) => {
    setIsChecked4(event.target.checked)
  }

  // ---這段是點擊右圖換左圖---
  const [leftImg, setLeftImg] = useState('')
  const [leftImg1, setLeftImg1] = useState('')

  const handleClickRightImage = function (imgsrc) {
    setLeftImg(imgsrc)
  }
  const handleClickRightImage1 = function (imgsrc) {
    setLeftImg1(imgsrc)
  }
  // ---這段是點擊右圖換左圖(結尾)

  // ---假設你有一個 API 端點可以獲取所有門市的數據---
  useEffect(() => {
    const fetchStore = async () => {
      try {
        const response = await fetch('/api/get-store_id') // 替換為你的 API 端點
        const resData = await response.json()
        setStore(resData.data.store_id) // 假設返回的數據結構
      } catch (error) {
        console.error('Error fetching store:', error)
      }
    }

    fetchStore()
  }, [])

  const handleImageClick = (index) => {
    // 在這裡可以處理圖片點擊事件，例如更換圖片或更新狀態
    const newStores = [store] // 生成 stores 的一個副本
    newStores[store].activeImage =
      newStores[store].activeImage === newStores[store].store_pic1
        ? newStores[store].store_pic2 // 假設每個門市有兩張圖片
        : newStores[store].store_pic1 // 切換圖片
    setStore(newStores) // 更新狀態
  }

  //--預約彈跳視窗--
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleButtonClick = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

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
        <div
          className="mx-auto w-100 "
          style={{
            width: 1440,
            height: 350,
            backgroundColor: '#535353',
          }}
        >
          <div className="">
            <div className="d-flex align-items-start">
              <div className="d-flex flex-column">
                <h4 className={[store.addresstitle, 'fw-normal'].join(' ')}>
                  依門市名稱
                </h4>
                <div className="d-flex">
                  <input
                    type="text"
                    className={[store.formcontrol].join(' ')}
                    placeholder="請輸入門市名稱..."
                  />

                  <div className="d-flex flex-column">
                    <h4 className={[store.addresstitle, 'fw-normal'].join(' ')}>
                      依門市地址
                    </h4>
                  </div>
                  <input
                    type="text"
                    className={[store.formcontrol].join(' ')}
                    placeholder="請輸入完整地址..."
                  />
                  <button className={store.selectbutton}>
                    查詢
                    <SlMagnifier />
                  </button>
                </div>
              </div>

              <div className="d-flex flex-column">
                <h4 className={[store.addresstitle, 'fw-normal'].join(' ')}>
                  依門市型態
                </h4>
                <label>
                  <input
                    type="checkbox"
                    checked={isChecked} // 由狀態控制是否勾選
                    onChange={handleCheckboxChange} // 當值改變時觸發
                  />
                  <FaWifi />
                  免費提供wifi
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={isChecked1}
                    onChange={handleCheckboxChange1}
                  />
                  <GiCoffeePot />
                  手沖體驗門市
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={isChecked2}
                    onChange={handleCheckboxChange2}
                  />
                  <ImPowerCord />
                  免費提供插座
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={isChecked3}
                    onChange={handleCheckboxChange3}
                  />
                  <FaDog />
                  寵物友善門市
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={isChecked4}
                    onChange={handleCheckboxChange4}
                  />
                  <SiBuymeacoffee />
                  冰滴咖啡販售門市
                </label>
                <div className="d-flex">
                  <button className={store.selectbutton}>
                    查詢
                    <SlMagnifier />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {Store.map((store, index) => (
          <div key={store.id}>
            <img
              src={`/img/${store.store_pic1}`}
              className={store.pic2}
              onClick={() => handleImageClick(index)} // 确保在这里定义了 index
              alt="..."
            />
            <img
              src={`/img/${store.store_pic2}`}
              className={store.pic2}
              onClick={() => handleImageClick(index)} // 同样也要传递 index
              alt="..."
            />
          </div>
        ))}

        {/* {Store.filter((way) => way.store_id).map((way) => (
          <div key={way.store_id}>
            <div className="d-flex justify-content-center">
              <div className={store.pic01}>
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
                  src={`/img/${way.store_pic1}`}
                  className={store.pic2}
                  onClick={() => handleImageClick(store)}
                  alt="..."
                />
                <img
                  src={`/img/${way.store_pic2}`}
                  className={store.pic3}
                  onClick={() => handleImageClick(store)}
                  alt="..."
                />
                <img
                  src={`/img/${way.store_pic3}`}
                  className={store.pic4}
                  onClick={() => handleImageClick(store)}
                  alt="..."
                />
              </div>
            </div>
            <div>
              <h2>
                {way.store_name}
                {way.store_city}/{way.area_city}
              </h2>
            </div>
            <div>
              {' '}
              <button
                onClick={handleButtonClick}
                className={[
                  store.botton,
                  'rounded-3',
                  'fw-normal',
                  'small',
                ].join(' ')}
              >
                我要預約
              </button>
            </div>
          </div>
        ))} */}

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
            height: 350,
            backgroundColor: '#535353',
          }}
        >
          <div className="">
            <div className="d-flex align-items-start">
              <div className="d-flex flex-column">
                <h4 className={[store.addresstitle, 'fw-normal'].join(' ')}>
                  依門市名稱
                </h4>
                <div className="d-flex">
                  <input
                    type="text"
                    className={[store.formcontrol].join(' ')}
                    placeholder="請輸入門市名稱..."
                  />

                  <div className="d-flex flex-column">
                    <h4 className={[store.addresstitle, 'fw-normal'].join(' ')}>
                      依門市地址
                    </h4>
                  </div>
                  <input
                    type="text"
                    className={[store.formcontrol].join(' ')}
                    placeholder="請輸入完整地址..."
                  />
                  <button className={store.selectbutton}>
                    查詢
                    <SlMagnifier />
                  </button>
                </div>
              </div>

              <div className="d-flex flex-column">
                <h4 className={[store.addresstitle, 'fw-normal'].join(' ')}>
                  依門市型態
                </h4>
                <label>
                  <input
                    type="checkbox"
                    checked={isChecked} // 由狀態控制是否勾選
                    onChange={handleCheckboxChange} // 當值改變時觸發
                  />
                  <FaWifi />
                  免費提供wifi
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={isChecked1}
                    onChange={handleCheckboxChange1}
                  />
                  <GiCoffeePot />
                  手沖體驗門市
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={isChecked2}
                    onChange={handleCheckboxChange2}
                  />
                  <ImPowerCord />
                  免費提供插座
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={isChecked3}
                    onChange={handleCheckboxChange3}
                  />
                  <FaDog />
                  寵物友善門市
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={isChecked4}
                    onChange={handleCheckboxChange4}
                  />
                  <SiBuymeacoffee />
                  冰滴咖啡販售門市
                </label>
                <div className="d-flex">
                  <button className={store.selectbutton}>
                    查詢
                    <SlMagnifier />
                  </button>
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
                    <h2
                      style={{
                        color: '#F37423',
                      }}
                    >
                      ATT門市
                    </h2>

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
                      我要預約
                    </button>
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
                      我要預約
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
