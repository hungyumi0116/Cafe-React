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
  // store_type：
  // 1:免費提供wifi
  // 2:手沖體驗門市
  // 3:免費提供插座
  // 4:寵物友善門市
  // 5:冰滴咖啡販售門市
  const [Store, setStore] = useState([
    {
      store_id: 1,
      store_pic1: `/pic2.jpg`,
      store_pic2: `/pic3.jpg`,
      store_pic3: `/pic4.jpg`,
      store_name: `ZZ店`,
      store_description: `我們的咖啡廳注重質感與溫暖氛圍，精心挑選來自世界各地的高品質咖啡豆，由技藝精湛的咖啡師用心沖調每一杯咖啡。無論是追求純粹的風味還是獨特的口感，我們都致力於為您帶來最難忘的咖啡體驗。`,
      store_city: `高雄市`,
      area_city: `新興區`,
      store_address: `11`,
      store_type: `1,2,3`,
      store_ig: `https://www.google.com.tw/?hl=zh_TW`,
      store_goole: `https://www.google.com.tw/?hl=zh_TW`,
      store_time: `10:00-18:00`,
      store_close: `固定每周三`,
      store_phone: `07-5454456`,

    },
    {
      store_id: 2,
      store_pic1: `/pic2.jpg`,
      store_pic2: `/pic3.jpg`,
      store_pic3: `/pic4.jpg`,
      store_name: `XX店`,
      store_description: `我們的咖啡廳注重質感與溫暖氛圍，精心挑選來自世界各地的高品質咖啡豆，由技藝精湛的咖啡師用心沖調每一杯咖啡。無論是追求純粹的風味還是獨特的口感，我們都致力於為您帶來最難忘的咖啡體驗。`,
      store_city: `高雄市`,
      area_city: `新興區`,
      store_address: `22`,
      store_type: `3,4`,
      store_ig: `https://www.google.com.tw/?hl=zh_TW`,
      store_goole: `https://www.google.com.tw/?hl=zh_TW`,
      store_time: `XXX`,
      store_close: `固定每周4`,
      store_phone: `07-1234567`,
    },
  ])
  const [StoreFilter, setStoreFilter] = useState([]);
  // ---這段是點擊右圖換左圖---
  const [leftImg, setLeftImg] = useState({})
  // 初始點擊右圖換左圖之左圖圖片
  useEffect(() => {
    Store.map(s => {
      if (leftImg[s.store_id] === undefined) {
        leftImg[s.store_id] = s.store_pic1
      }
    });

    const params = new URL(location.href).searchParams;
    const param_id = params.get("ID");
    setStoreFilter(Store.filter(s => s.store_id == param_id));
  }, Store);

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

      console.log('Store Data:', resData)
      // console.log(resData)

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
  // 獲取預約資料
  const getReservations = async (params = {}) => {
    const baseURL = 'http://localhost:3005/api/storereserve' // 第二個 API
    const searchParams = new URLSearchParams(params)
    const qs = searchParams.toString()
    const url = `${baseURL}?${qs}`

    try {
      const res = await fetch(url)
      const resData = await res.json()

      console.log('Reservation Data:', resData)

      if (resData.status === 'success') {
        if (Array.isArray(resData.data)) {
          setReserve(resData.data)
        }
      }
    } catch (e) {
      console.error(e)
    }
  }
  // ---這段是點擊右圖換左圖 區域1(結尾1)
  const handleClickRightImage = function (imgsrc) {
    setLeftImg(imgsrc)
  }
  // ---這段是點擊右圖換左圖(結尾)
  // 使用 useEffect 來同時獲取兩個資料
  useEffect(() => {
    getStore() // 獲取商店資料
    getReservations() // 獲取預約資料
  }, []) // 空依賴陣列表示只在組件首次掛載時執行

  // useEffect(() => {
  //   getStore()
  // }, [])

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

      <div className={[list.body1, 'w-100'].join(' ')}>

        {StoreFilter.map((way) => (
          <>
            <div className={[list.body2, 'w-100'].join(' ')}>
              <div className="d-flex justify-content-center">
                <div className={[list.pic01].join(' ')}>
                  <img
                    src={leftImg[way.store_id]}
                    style={{
                      width: 650,
                      height: 525,
                    }}
                  />
                </div>
                <div className={[list.vertical, 'd-flex', 'flex-column'].join(' ')}>
                  <img
                    src={way.store_pic1}
                    className={list.pic2}
                    onClick={() => handleClickRightImage(way.store_id, way.store_pic1)}
                  />
                  <img
                    src={way.store_pic2}
                    className={list.pic3}
                    onClick={() => handleClickRightImage(way.store_id, way.store_pic2)}
                  />
                  <img
                    src={way.store_pic3}
                    className={list.pic4}
                    onClick={() => handleClickRightImage(way.store_id, way.store_pic3)}
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
                      {way.store_name}
                    </h2>
                    <div
                      className={[
                        list.roundedbox,
                        'rounded-pill',
                        'fw-normal',
                      ].join(' ')}
                    >
                      <div className={[list.citytext, 'fw-normal'].join(' ')}>
                        {way.store_city}/{way.area_city}
                      </div>
                    </div>
                  </div>

                  <div class="fw-normal">
                    <p className={[list.content, 'text-light'].join(' ')}>
                      {way.store_description}
                    </p>
                  </div>
                  <div class="pt-5">
                    <a
                      href={way.store_ig}
                      target='_blank'
                      className={[list.botton, 'rounded-pill', 'fw-normal'].join(
                        ' '
                      )}
                    >
                      INSTAGRAM
                    </a>
                    <a
                      href={way.store_goole}
                      target='_blank'
                      className={[list.botton, 'rounded-pill', 'fw-normal'].join(
                        ' '
                      )}
                    >
                      GOOGLE MAPS
                    </a>
                  </div>
                </div>

                <div class="d-flex flex-column">
                  <div className={[list.btheight, 'd-flex'].join(' ')}>
                    {way.store_type.split(`,`).map(t => {
                      if (t == `1`) {
                        return (<button
                          className={[
                            list.botton,
                            'rounded-3',
                            'fw-normal',
                            'small',
                          ].join(' ')}
                        >
                          <FaWifi />
                          提供wifi
                        </button>)
                      } else if (t == `2`) {
                        return (<button
                          className={[
                            list.botton,
                            'rounded-3',
                            'fw-normal',
                            'small',
                          ].join(' ')}
                        >
                          <GiCoffeePot />
                          手沖體驗門市
                        </button>)
                      } else if (t == `3`) {
                        return (<button
                          className={[
                            list.botton,
                            'rounded-3',
                            'fw-normal',
                            'small',
                          ].join(' ')}
                        >
                          <ImPowerCord />
                          提供插座
                        </button>)
                      } else if (t == `4`) {
                        return (<button
                          className={[
                            list.botton,
                            'rounded-3',
                            'fw-normal',
                            'small',
                          ].join(' ')}
                        >
                          <FaDog />
                          寵物友善門市
                        </button>)
                      } else if (t == `5`) {
                        return (<button
                          className={[
                            list.botton,
                            'rounded-3',
                            'fw-normal',
                            'small',
                          ].join(' ')}
                        >
                          <FaWifi />
                          冰滴咖啡販售門市
                        </button>)
                      }
                    })}
                  </div>

                  <p className={[list.detailtext, 'text-light'].join(' ')}>
                    營業時間：{way.store_time}
                    <br />
                    公休日：{way.store_close}
                    <br />
                    TEL：{way.store_phone}
                  </p>
                </div>
              </div>
            </div>
          </>
        ))}

        {StoreFilter.length == 0 && (
          <div>參數錯誤</div>
        )}

      </div>
    </>
  )
}
