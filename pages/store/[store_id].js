import React from 'react'
import Navbar from '@/components/layout/default-layout/navbar'
import Image from 'next/image'
import store from '@/styles/store.module.css'
import { SlMagnifier } from 'react-icons/sl'
import { FaWifi, FaDog } from 'react-icons/fa'
import { GiCoffeePot } from 'react-icons/gi'
import { ImPowerCord } from 'react-icons/im'
import { SiBuymeacoffee } from 'react-icons/si'

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
                </h4>{' '}
                {/* <img src={`/pic2.jpg`} /> */}
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
                src="/01.jpg"
                style={{
                  width: 610,
                  height: 460,
                }}
              />
            </div>
            <div
              className={[store.vertical, 'd-flex', 'flex-column'].join(' ')}
            >
              <img src="/pic2.jpg" className={store.pic2} />
              <img src="/pic3.jpg" className={store.pic3} />
              <img src="/pic4.jpg" className={store.pic4} />
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
                    信義ATT門市
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
                    className={[
                      store.botton,
                      'rounded-3',
                      'fw-normal',
                      'small',
                    ].join(' ')}
                  >
                    9:00
                  </button>
                  <button
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
                    className={[
                      store.botton,
                      'rounded-3',
                      'fw-normal',
                      'small',
                    ].join(' ')}
                  >
                    13:00
                  </button>
                  <button
                    className={[
                      store.botton,
                      'rounded-3',
                      'fw-normal',
                      'small',
                    ].join(' ')}
                  >
                    15:00
                  </button>
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
                    className={[
                      store.botton,
                      'rounded-3',
                      'fw-normal',
                      'small',
                    ].join(' ')}
                  >
                    17:00
                  </button>
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
                src="/01.jpg"
                style={{
                  width: 610,
                  height: 460,
                }}
              />
            </div>
            <div
              className={[store.vertical, 'd-flex', 'flex-column'].join(' ')}
            >
              <img src="/pic2.jpg" className={store.pic2} />
              <img src="/pic3.jpg" className={store.pic3} />
              <img src="/pic4.jpg" className={store.pic4} />
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
                    className={[
                      store.botton,
                      'rounded-3',
                      'fw-normal',
                      'small',
                    ].join(' ')}
                  >
                    9:00
                  </button>
                  <button
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
                    className={[
                      store.botton,
                      'rounded-3',
                      'fw-normal',
                      'small',
                    ].join(' ')}
                  >
                    13:00
                  </button>
                  <button
                    className={[
                      store.botton,
                      'rounded-3',
                      'fw-normal',
                      'small',
                    ].join(' ')}
                  >
                    15:00
                  </button>
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
                    className={[
                      store.botton,
                      'rounded-3',
                      'fw-normal',
                      'small',
                    ].join(' ')}
                  >
                    17:00
                  </button>
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
