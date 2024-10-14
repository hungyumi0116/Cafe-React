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
      store_pic1: `/01.jpg`,
      store_pic2: `/02.jpg`,
      store_pic3: `/18.jpg`,
      store_name: `信義ATT門市店`,
      store_description: `我們的咖啡廳注重質感與溫暖氛圍，精心挑選來自世界各地的高品質咖啡豆，由技藝精湛的咖啡師用心沖調每一杯咖啡。無論是追求純粹的風味還是獨特的口感，我們都致力於為您帶來最難忘的咖啡體驗。`,
      store_city: `台北市`,
      area_city: `信義區`,
      store_address: `松壽路12號5樓`,
      store_type: `1,2,3,4,5`,
      store_ig: `https://www.instagram.com/coffee/`,
      store_goole: `https://maps.app.goo.gl/h8PyWWpykZgw65ru9`,
      store_time: `11:00-22:00`,
      store_close: `每周一`,
      store_phone: `02-77378707`,
    },
    {
      store_id: 2,
      store_pic1: `/03.jpg`,
      store_pic2: `/04.jpg`,
      store_pic3: `/15.jpg`,
      store_name: `JR東日本大飯店門市`,
      store_description: `嚴選來自世界各地的精品咖啡豆，由專業咖啡師精心製作，為您打造溫馨、雅緻的咖啡時光無論是追求純粹的風味還是獨特的口感，我們都致力於為您帶來最難忘的咖啡體驗。`,
      store_city: `台北市`,
      area_city: `中山區`,
      store_address: `南京東路三段133號-1`,
      store_type: `1,2,3,4`,
      store_ig: `https://www.instagram.com/coffee/`,
      store_goole: `https://maps.app.goo.gl/EQGWBXBZsYrwS1bt6`,
      store_time: `11:30-21:00`,
      store_close: `每周一`,
      store_phone: `02-25458686`,
    },
    {
      store_id: 3,
      store_pic1: `/05.jpg`,
      store_pic2: `/06.jpg`,
      store_pic3: `/11.jpg`,
      store_name: `中山旗艦門市`,
      store_description: `以自然光充足的空間為主題，漫步咖啡坊提供多樣化的精品咖啡及自製甜點，是讀書、工作或與朋友小聚的最佳選擇，無論是追求純粹的風味還是獨特的口感，我們都致力於為您帶來最難忘的咖啡體驗。`,
      store_city: `台北市`,
      area_city: `中山區`,
      store_address: `南京西路65號`,
      store_type: `1,2,3,4,5`,
      store_ig: `https://www.instagram.com/coffee/`,
      store_goole: `https://maps.app.goo.gl/EQGWBXBZsYrwS1bt6`,
      store_time: `7:00-22:00`,
      store_close: `每周一`,
      store_phone: `02-25550121`,
    },
    {
      store_id: 4,
      store_pic1: `/07.jpg`,
      store_pic2: `/08.jpg`,
      store_pic3: `/10.jpg`,
      store_name: `板橋門市`,
      store_description: `以溫馨的氛圍和柔和的燈光打造放鬆的空間，搭配香醇咖啡與手工甜點讓人留連忘返。無論是追求純粹的風味還是獨特的口感，我們都致力於為您帶來最難忘的咖啡體驗。`,
      store_city: `新北市`,
      area_city: `板橋區`,
      store_address: `文化路一段309之37號1樓`,
      store_type: `1,3`,
      store_ig: `https://www.instagram.com/coffee/`,
      store_goole: `https://maps.app.goo.gl/eT7xnS6TKtu6oKEAA`,
      store_time: `7:00-22:00`,
      store_close: `每周二`,
      store_phone: `02-89696655`,
    },
    {
      store_id: 5,
      store_pic1: `/09.jpg`,
      store_pic2: `/10.jpg`,
      store_pic3: `/13.jpg`,
      store_name: `南勢角門市`,
      store_description: `以輕鬆明亮的設計吸引顧客，專注於高品質咖啡與季節限定甜點，是愜意的日常休憩之選。無論是追求純粹的風味還是獨特的口感，我們都致力於為您帶來最難忘的咖啡體驗。`,
      store_city: `新北市`,
      area_city: `中和區`,
      store_address: `捷運路63號`,
      store_type: `1,3`,
      store_ig: `https://www.instagram.com/coffee/`,
      store_goole: `https://maps.app.goo.gl/tt2qyfcxe6xFMUmc8`,
      store_time: `7:00-21:00`,
      store_close: `每周一、二`,
      store_phone: `02-29425922`,
    },
    {
      store_id: 6,
      store_pic1: `/11.jpg`,
      store_pic2: `/12.jpg`,
      store_pic3: `/13.jpg`,
      store_name: `龍享門市`,
      store_description: `以優質早餐和手工咖啡聞名，清晨咖啡屋提供活力滿滿的早晨時光，讓您以充沛精神展開一天。無論是追求純粹的風味還是獨特的口感，我們都致力於為您帶來最難忘的咖啡體驗。`,
      store_city: `新竹縣`,
      area_city: `竹北市`,
      store_address: `自強南路36號1F`,
      store_type: `1,3`,
      store_ig: `https://www.instagram.com/coffee/`,
      store_goole: `https://maps.app.goo.gl/xoUuruBaqibxFnF28`,
      store_time: `9*:00-22:00`,
      store_close: `每周一、二`,
      store_phone: `03-6670663`,
    },
    {
      store_id: 7,
      store_pic1: `/13.jpg`,
      store_pic2: `/14.jpg`,
      store_pic3: `/18.jpg`,
      store_name: `崇德門市`,
      store_description: `以輕鬆明亮的設計吸引顧客，專注於高品質咖啡與季節限定甜點，是愜意的日常休憩之選。無論是追求純粹的風味還是獨特的口感，我們都致力於為您帶來最難忘的咖啡體驗。`,
      store_city: `台中市`,
      area_city: `北屯區`,
      store_address: `崇德路三段207號`,
      store_type: `1,3`,
      store_ig: `https://www.instagram.com/coffee/`,
      store_goole: `https://maps.app.goo.gl/uHcCHrpfRZ9bbrer9`,
      store_time: `9:00-22:00`,
      store_close: `每周二、三`,
      store_phone: `04-24220302`,
    },
    {
      store_id: 8,
      store_pic1: `/15.jpg`,
      store_pic2: `/26.jpg`,
      store_pic3: `/10.jpg`,
      store_name: `台南永華門市`,
      store_description: `以輕鬆明亮的設計吸引顧客，專注於高品質咖啡與季節限定甜點，是愜意的日常休憩之選。無論是追求純粹的風味還是獨特的口感，我們都致力於為您帶來最難忘的咖啡體驗。`,
      store_city: `台南市`,
      area_city: `安平區`,
      store_address: `永華路二段705號`,
      store_type: `1,3`,
      store_ig: `https://www.instagram.com/coffee/`,
      store_goole: `https://maps.app.goo.gl/pr6YTKaKcXsmuxhj6`,
      store_time: `9:00-21:30`,
      store_close: `每周二、三`,
      store_phone: `06-2956980`,
    },
    {
      store_id: 9,
      store_pic1: `/16.jpg`,
      store_pic2: `/28.jpg`,
      store_pic3: `/15.jpg`,
      store_name: `高雄台鋁門市`,
      store_description: `以輕鬆明亮的設計吸引顧客，專注於高品質咖啡與季節限定甜點，是愜意的日常休憩之選。無論是追求純粹的風味還是獨特的口感，我們都致力於為您帶來最難忘的咖啡體驗。`,
      store_city: `高雄市`,
      area_city: `前鎮區`,
      store_address: `忠勤路8號`,
      store_type: `1,2,3`,
      store_ig: `https://www.instagram.com/coffee/`,
      store_goole: `https://maps.app.goo.gl/iFGAXJmJDjT433569`,
      store_time: `10:00-21:30`,
      store_close: `每周三`,
      store_phone: `07-5369929`,
    },
    {
      store_id: 10,
      store_pic1: `/17.jpg`,
      store_pic2: `/19.jpg`,
      store_pic3: `/11.jpg`,
      store_name: `巨蛋門市`,
      store_description: `自家烘焙的咖啡豆散發出迷人的香氣，豆子咖啡工坊擁有專業咖啡師現場沖泡，適合咖啡愛好者細細品味。無論是追求純粹的風味還是獨特的口感，我們都致力於為您帶來最難忘的咖啡體驗。`,
      store_city: `高雄市`,
      area_city: `鼓山區`,
      store_address: `文忠路2號`,
      store_type: `1,2,3,4,5`,
      store_ig: `https://www.instagram.com/coffee/`,
      store_goole: `https://maps.app.goo.gl/iFGAXJmJDjT433569`,
      store_time: `9:00-21:30`,
      store_close: `依照門市公告`,
      store_phone: `07-5525885`,
    },
    {
      store_id: 11,
      store_pic1: `/24.jpg`,
      store_pic2: `/25.jpg`,
      store_pic3: `/04.jpg`,
      store_name: `高雄文山門市`,
      store_description: `午後時光以其溫暖的氛圍和溫馨的裝潢著稱，專注於手沖咖啡和健康輕食，提供讓人放鬆的休憩空間。無論是追求純粹的風味還是獨特的口感，我們都致力於為您帶來最難忘的咖啡體驗。`,
      store_city: `高雄市`,
      area_city: `鼓山區`,
      store_address: `文衡路489號`,
      store_type: `1,2,5`,
      store_ig: `https://www.instagram.com/coffee/`,
      store_goole: `https://maps.app.goo.gl/A9YVdrBnpX2Y4Ufv6`,
      store_time: `9:00-21:30`,
      store_close: `每周三`,
      store_phone: `07-7678997`,
    },
    {
      store_id: 12,
      store_pic1: `/21.jpg`,
      store_pic2: `/22.jpg`,
      store_pic3: `/15.jpg`,
      store_name: `高美門市`,
      store_description: `隱身於巷弄中的小店，樹蔭咖啡提供舒適靜謐的環境，特調手沖咖啡與招牌輕食，讓您遠離塵囂靜心享受。無論是追求純粹的風味還是獨特的口感，我們都致力於為您帶來最難忘的咖啡體驗。`,
      store_city: `高雄市`,
      area_city: `鼓山區`,
      store_address: `文美術東二路432號`,
      store_type: `1,2,5`,
      store_ig: `https://www.instagram.com/coffee/`,
      store_goole: `https://maps.app.goo.gl/A9YVdrBnpX2Y4Ufv6`,
      store_time: `9:00-21:30`,
      store_close: `依照門市公告`,
      store_phone: `07-5223238`,
    },
    {
      store_id: 13,
      store_pic1: `/23.jpg`,
      store_pic2: `/24.jpg`,
      store_pic3: `/10.jpg`,
      store_name: `岡山直營門市`,
      store_description: `自家烘焙的咖啡豆散發出迷人的香氣，豆子咖啡工坊擁有專業咖啡師現場沖泡，適合咖啡愛好者細細品味。無論是追求純粹的風味還是獨特的口感，我們都致力於為您帶來最難忘的咖啡體驗。`,
      store_city: `高雄市`,
      area_city: `岡山區`,
      store_address: `捷安路1巷2號3樓`,
      store_type: `1,2,3,4`,
      store_ig: `https://www.instagram.com/coffee/`,
      store_goole: `https://maps.app.goo.gl/hnou632NfgyCv6TH8`,
      store_time: `11:00-22:00`,
      store_close: `依照門市公告`,
      store_phone: `07-6251171`,
    },
    {
      store_id: 14,
      store_pic1: `/27.jpg`,
      store_pic2: `/18.jpg`,
      store_pic3: `/11.jpg`,
      store_name: `文化中心門市`,
      store_description: `自家烘焙的咖啡豆散發出迷人的香氣，豆子咖啡工坊擁有專業咖啡師現場沖泡，適合咖啡愛好者細細品味。無論是追求純粹的風味還是獨特的口感，我們都致力於為您帶來最難忘的咖啡體驗。`,
      store_city: `高雄市`,
      area_city: `前金區`,
      store_address: `五福一路67號`,
      store_type: `1,2,3,4`,
      store_ig: `https://www.instagram.com/coffee/`,
      store_goole: `https://maps.app.goo.gl/hnou632NfgyCv6TH8`,
      store_time: `11:00-22:00`,
      store_close: `依照門市公告`,
      store_phone: `07-6251171`,
    },
    {
      store_id: 15,
      store_pic1: `/09.jpg`,
      store_pic2: `/15.jpg`,
      store_pic3: `/18.jpg`,
      store_name: `中央公園門市`,
      store_description: `風味咖啡廳結合地道風味與咖啡文化，提供多款精選咖啡飲品與手工點心，讓您在悠閒氛圍中細細品味無論是追求純粹的風味還是獨特的口感，我們都致力於為您帶來最難忘的咖啡體驗。`,
      store_city: `高雄市`,
      area_city: `前金區`,
      store_address: `五福三路31號`,
      store_type: `1,3,4,5`,
      store_ig: `https://www.instagram.com/coffee/`,
      store_goole: `https://maps.app.goo.gl/GxT3DaLpvazz2hBQ8`,
      store_time: `09:00-22:00`,
      store_close: `每周二、三`,
      store_phone: `07-2211459`,
    },
  ])
  const [StoreFilter, setStoreFilter] = useState([])
  // ---這段是點擊右圖換左圖---
  const [leftImg, setLeftImg] = useState({})
  // 初始點擊右圖換左圖之左圖圖片
  useEffect(() => {
    Store.map((s) => {
      if (leftImg[s.store_id] === undefined) {
        leftImg[s.store_id] = s.store_pic1
      }
    })

    const params = new URL(location.href).searchParams
    const param_id = params.get('ID')
    setStoreFilter(Store.filter((s) => s.store_id == param_id))
  }, Store)

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
  const handleClickRightImage = function (store_id, imgsrc) {
    leftImg[store_id] = imgsrc
    const newObj = JSON.parse(JSON.stringify(leftImg))
    setLeftImg(newObj)
  }
  // ---這段是點擊右圖換左圖(結尾)g
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
      <div
        className={[
          'd-flex',
          'flex-column',
          //'align-items-center',
          'justify-content-center',
        ].join(' ')}
      >
        <img src="/bn.jpg" className={list.bannercotainer} />
        {/* <h2 class="text-light py-5">門市資訊</h2>
        <h6 class="text-light py-5 fw-normal">
          查詢鄰近門市，立即享受便捷服務。
        </h6> */}
      </div>

      <div className={[list.body1, 'w-100'].join(' ')}>
        {StoreFilter.map((way) => (
          <>
            <div className="">
              <div
                className={[
                  list.leftright,
                  'd-flex',
                  'justify-content-center',
                ].join(' ')}
              >
                <div className={[list.pic01].join(' ')}>
                  <img
                    src={leftImg[way.store_id]}
                    style={{
                      width: 630,
                      height: 460,
                    }}
                  />
                </div>
                <div
                  className={[list.vertical, 'd-flex', 'flex-column'].join(' ')}
                >
                  <img
                    src={way.store_pic1}
                    className={list.pic2}
                    onClick={() =>
                      handleClickRightImage(way.store_id, way.store_pic1)
                    }
                  />
                  <img
                    src={way.store_pic2}
                    className={list.pic3}
                    onClick={() =>
                      handleClickRightImage(way.store_id, way.store_pic2)
                    }
                  />
                  <img
                    src={way.store_pic3}
                    className={list.pic4}
                    onClick={() =>
                      handleClickRightImage(way.store_id, way.store_pic3)
                    }
                  />
                </div>
              </div>
            </div>

            <div className={[list.clickphoto, 'd-flex', 'pb-4'].join(' ')}>
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
                      target="_blank"
                      className={[
                        list.linkbotton,
                        'text-center',
                        'rounded-3',
                        'p-2',
                        'smaill',
                        'text-decoration-none',
                      ].join(' ')}
                      style={{
                        width: 140,
                        height: 30,
                        fontSize: 12,
                      }}
                    >
                      INSTAGRAM
                    </a>
                    <a
                      href={way.store_goole}
                      target="_blank"
                      className={[
                        list.linkbotton,
                        'text-center',
                        'rounded-3',
                        'p-2',
                        'smaill',
                        'text-decoration-none',
                      ].join(' ')}
                      style={{
                        width: 140,
                        height: 30,
                        fontSize: 12,
                      }}
                    >
                      GOOGLE MAPS
                    </a>
                  </div>
                </div>

                <div class={[list.rightcaption, 'flex-column'].join(' ')}>
                  <div className={[list.btheight, 'd-flex'].join(' ')}>
                    {way.store_type.split(`,`).map((t) => {
                      if (t == `1`) {
                        return (
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
                        )
                      } else if (t == `2`) {
                        return (
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
                        )
                      } else if (t == `3`) {
                        return (
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
                        )
                      } else if (t == `4`) {
                        return (
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
                        )
                      } else if (t == `5`) {
                        return (
                          <button
                            className={[
                              list.botton,
                              'rounded-3',
                              'fw-normal',
                              'small',
                            ].join(' ')}
                          >
                            <SiBuymeacoffee />
                            冰滴咖啡販售門市
                          </button>
                        )
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

        {StoreFilter.length == 0 && <div className={list.error}>參數錯誤</div>}
      </div>
    </>
  )
}
