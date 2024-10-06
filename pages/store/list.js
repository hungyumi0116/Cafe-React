import Navbar from '@/components/layout/default-layout/navbar'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import store from '@/styles/store.module.css'
import list from '@/styles/list.module.css'
import Carousel from 'react-bootstrap/Carousel'
import { FaWifi, FaDog } from 'react-icons/fa'
import { GiCoffeePot } from 'react-icons/gi'
import { ImPowerCord } from 'react-icons/im'
import { SiBuymeacoffee } from 'react-icons/si'

export default function List() {
  // ---這段是點擊右圖換左圖---
  const [leftImg, setLeftImg] = useState('/pic2.jpg')
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

      console.log('resdata', resData)

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
  const handleClickRightImage = function (imgsrc) {
    setLeftImg(imgsrc)
  }
  useEffect(() => {
    getStore()
  }, [])
  // ---這段是點擊右圖換左圖(結尾)

  return (
    <>
      {Store.map((v, i) => {
        ;<div key={v.store_id}>{v.store_name}111</div>
      })}
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

      <div className={[list.body1, 'w-100'].join(' ')}>
        <div className="d-flex justify-content-center">
          <div className={[list.pic01].join(' ')}>
            <img
              src={leftImg}
              style={{
                width: 650,
                height: 525,
              }}
            />
          </div>
          <div className={[list.vertical, 'd-flex', 'flex-column'].join(' ')}>
            <img
              src="/pic2.jpg"
              className={list.pic2}
              onClick={() => handleClickRightImage('/pic2.jpg')}
            />
            <img
              src="/pic3.jpg"
              className={list.pic3}
              onClick={() => handleClickRightImage('/pic3.jpg')}
            />
            <img
              src="/pic4.jpg"
              className={list.pic4}
              onClick={() => handleClickRightImage('/pic4.jpg')}
            />
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
                <div className={[list.title].join(' ')}>
                  <h2
                    style={{
                      color: '#F37423',
                    }}
                  >
                    高雄前金門市
                  </h2>
                  <div
                    className={[
                      list.roundedbox,
                      'rounded-pill',
                      'fw-normal',
                    ].join(' ')}
                  >
                    <div className={[list.citytext, 'fw-normal'].join(' ')}>
                      高雄市/前金區
                    </div>
                  </div>
                </div>

                <div class="fw-normal">
                  <p className={[list.content, 'text-light'].join(' ')}>
                    我們的咖啡廳注重質感與溫暖氛圍，精心挑選來自世界各地的高品質咖啡豆，
                    由技藝精湛的咖啡師用心沖調每一杯咖啡。無論是追求純粹的風味還是獨特的
                    口感，我們都致力於為您帶來最難忘的咖啡體驗。
                  </p>
                </div>
                <div class="pt-5">
                  <button
                    className={[list.botton, 'rounded-pill', 'fw-normal'].join(
                      ' '
                    )}
                  >
                    INSTAGRAM
                  </button>
                  <button
                    className={[list.botton, 'rounded-pill', 'fw-normal'].join(
                      ' '
                    )}
                  >
                    GOOGLE MAPS
                  </button>
                </div>
              </div>

              <div class="d-flex flex-column">
                <div className={[list.btheight, 'd-flex'].join(' ')}>
                  <button
                    className={[
                      list.botton,
                      'rounded-3',
                      'fw-normal',
                      'small',
                    ].join(' ')}
                  >
                    <FaWifi />
                    提供wifi
                  </button>
                  <button
                    className={[
                      list.botton,
                      'rounded-3',
                      'fw-normal',
                      'small',
                    ].join(' ')}
                  >
                    <ImPowerCord />
                    提供插座
                  </button>
                  <button
                    className={[
                      list.botton,
                      'rounded-3',
                      'fw-normal',
                      'small',
                    ].join(' ')}
                  >
                    <GiCoffeePot />
                    手沖體驗門市
                  </button>
                </div>

                <p className={[list.detailtext, 'text-light'].join(' ')}>
                  營業時間：10:00-18:00
                  <br />
                  公休日：固定每周三
                  <br />
                  TEL：07-5454456
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className={[list.body2, 'w-100'].join(' ')}>
          <div className="d-flex justify-content-center">
            <div className={[list.pic01].join(' ')}>
              <img
                src={leftImg}
                style={{
                  width: 650,
                  height: 525,
                }}
              />
            </div>
            <div className={[list.vertical, 'd-flex', 'flex-column'].join(' ')}>
              <img
                src="/pic2.jpg"
                className={list.pic2}
                onClick={() => handleClickRightImage('/pic2.jpg')}
              />
              <img
                src="/pic3.jpg"
                className={list.pic3}
                onClick={() => handleClickRightImage('/pic3.jpg')}
              />
              <img
                src="/pic4.jpg"
                className={list.pic4}
                onClick={() => handleClickRightImage('/pic4.jpg')}
              />
            </div>
          </div>
        </div>

        <div
          className="mx-auto w-100 d-flex pb-4"
          style={{
            width: 1440,
            backgroundColor: '#1C1B1B',
          }}
        >
          <div className="d-flex mx-auto" style={{ maxWidth: 1440 }}>
            <div>
              <div className={[list.title].join(' ')}>
                <h2
                  style={{
                    color: '#F37423',
                  }}
                >
                  高雄岡山門市
                </h2>
                <div
                  className={[
                    list.roundedbox,
                    'rounded-pill',
                    'fw-normal',
                  ].join(' ')}
                >
                  <div className={[list.citytext, 'fw-normal'].join(' ')}>
                    高雄市/岡山區
                  </div>
                </div>
              </div>

              <div class="fw-normal">
                <p className={[list.content, 'text-light'].join(' ')}>
                  我們的咖啡廳注重質感與溫暖氛圍，精心挑選來自世界各地的高品質咖啡豆，
                  由技藝精湛的咖啡師用心沖調每一杯咖啡。無論是追求純粹的風味還是獨特的
                  口感，我們都致力於為您帶來最難忘的咖啡體驗。
                </p>
              </div>
              <div class="pt-5">
                <button
                  className={[list.botton, 'rounded-pill', 'fw-normal'].join(
                    ' '
                  )}
                >
                  INSTAGRAM
                </button>
                <button
                  className={[list.botton, 'rounded-pill', 'fw-normal'].join(
                    ' '
                  )}
                >
                  GOOGLE MAPS
                </button>
              </div>
            </div>

            <div class="d-flex flex-column">
              <div className={[list.btheight, 'd-flex'].join(' ')}>
                <button
                  className={[
                    list.botton,
                    'rounded-3',
                    'fw-normal',
                    'small',
                  ].join(' ')}
                >
                  <FaWifi />
                  提供wifi
                </button>
                <button
                  className={[
                    list.botton,
                    'rounded-3',
                    'fw-normal',
                    'small',
                  ].join(' ')}
                >
                  <ImPowerCord />
                  提供插座
                </button>
                <button
                  className={[
                    list.botton,
                    'rounded-3',
                    'fw-normal',
                    'small',
                  ].join(' ')}
                >
                  <GiCoffeePot />
                  手沖體驗門市
                </button>
                <button
                  className={[
                    list.botton,
                    'rounded-3',
                    'fw-normal',
                    'small',
                  ].join(' ')}
                >
                  <FaDog />
                  寵物友善門市
                </button>
              </div>

              <p className={[list.detailtext, 'text-light'].join(' ')}>
                營業時間：10:00-18:00
                <br />
                公休日：固定每周三
                <br />
                TEL：07-5454456
              </p>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-center">
          <div className={[list.pic01].join(' ')}>
            <img
              src={leftImg}
              style={{
                width: 650,
                height: 525,
              }}
            />
          </div>
          <div className={[list.vertical, 'd-flex', 'flex-column'].join(' ')}>
            <img
              src="/pic2.jpg"
              className={list.pic2}
              onClick={() => handleClickRightImage('/pic2.jpg')}
            />
            <img
              src="/pic3.jpg"
              className={list.pic3}
              onClick={() => handleClickRightImage('/pic3.jpg')}
            />
            <img
              src="/pic4.jpg"
              className={list.pic4}
              onClick={() => handleClickRightImage('/pic4.jpg')}
            />
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
                <div className={[list.title].join(' ')}>
                  <h2
                    style={{
                      color: '#F37423',
                    }}
                  >
                    高雄巨蛋門市
                  </h2>
                  <div
                    className={[
                      list.roundedbox,
                      'rounded-pill',
                      'fw-normal',
                    ].join(' ')}
                  >
                    <div className={[list.citytext, 'fw-normal'].join(' ')}>
                      高雄市/鼓山區
                    </div>
                  </div>
                </div>

                <div class="fw-normal">
                  <p className={[list.content, 'text-light'].join(' ')}>
                    我們的咖啡廳注重質感與溫暖氛圍，精心挑選來自世界各地的高品質咖啡豆，
                    由技藝精湛的咖啡師用心沖調每一杯咖啡。無論是追求純粹的風味還是獨特的
                    口感，我們都致力於為您帶來最難忘的咖啡體驗。
                  </p>
                </div>
                <div class="pt-5">
                  <button
                    className={[list.botton, 'rounded-pill', 'fw-normal'].join(
                      ' '
                    )}
                  >
                    INSTAGRAM
                  </button>
                  <button
                    className={[list.botton, 'rounded-pill', 'fw-normal'].join(
                      ' '
                    )}
                  >
                    GOOGLE MAPS
                  </button>
                </div>
              </div>

              <div class="d-flex flex-column">
                <div className={[list.btheight, 'd-flex'].join(' ')}>
                  <button
                    className={[
                      list.botton,
                      'rounded-3',
                      'fw-normal',
                      'small',
                    ].join(' ')}
                  >
                    <FaWifi />
                    提供wifi
                  </button>
                  <button
                    className={[
                      list.botton,
                      'rounded-3',
                      'fw-normal',
                      'small',
                    ].join(' ')}
                  >
                    <ImPowerCord />
                    提供插座
                  </button>
                  <button
                    className={[
                      list.botton,
                      'rounded-3',
                      'fw-normal',
                      'small',
                    ].join(' ')}
                  >
                    <GiCoffeePot />
                    手沖體驗門市
                  </button>
                  <button
                    className={[
                      list.botton,
                      'rounded-3',
                      'fw-normal',
                      'small',
                    ].join(' ')}
                  >
                    <FaDog />
                    寵物友善門市
                  </button>
                  <button
                    className={[
                      list.botton,
                      'rounded-3',
                      'fw-normal',
                      'small',
                    ].join(' ')}
                  >
                    <SiBuymeacoffee />
                    冰滴咖啡門市
                  </button>
                </div>

                <p className={[list.detailtext, 'text-light'].join(' ')}>
                  營業時間：10:00-18:00
                  <br />
                  公休日：固定每周三
                  <br />
                  TEL：07-5454456
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
