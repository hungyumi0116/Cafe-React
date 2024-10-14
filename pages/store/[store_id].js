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
      store_name: `信義ATT門市`,
      store_description: `我們的咖啡廳注重質感與溫暖氛圍，精心挑選來自世界各地的高品質咖啡豆，由技藝精湛的咖啡師用心沖調每一杯咖啡。無論是追求純粹的風味還是獨特的口感，我們都致力於為您帶來最難忘的咖啡體驗。`,
      store_city: `台北市`,
      area_city: `信義區`,
      store_address: `台北市信義區松壽路12號5樓`,
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
      store_address: `台北市中山區南京東路三段133號-1`,
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
      store_address: `台北市中山區南京西路65號`,
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
      store_address: `新北市板橋區文化路一段309之37號1樓`,
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
      store_address: `新北市中和區捷運路63號`,
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
      store_address: `新竹縣竹北市自強南路36號1F`,
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
      store_address: `台中市北屯區崇德路三段207號`,
      store_type: `1,3`,
      store_ig: `https://www.instagram.com/coffee/`,
      store_goole: `https://maps.app.goo.gl/uHcCHrpfRZ9bbrer9`,
      store_time: `9:00-22:00`,
      store_close: `每周二、三`,
      store_phone: `04-24220302`,
    },
    {
      store_id: 8,
      store_pic1: `/26.jpg`,
      store_pic2: `/05.jpg`,
      store_pic3: `/10.jpg`,
      store_name: `台南永華門市`,
      store_description: `以輕鬆明亮的設計吸引顧客，專注於高品質咖啡與季節限定甜點，是愜意的日常休憩之選。無論是追求純粹的風味還是獨特的口感，我們都致力於為您帶來最難忘的咖啡體驗。`,
      store_city: `台南市`,
      area_city: `安平區`,
      store_address: `台南市安平區永華路二段705號`,
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
      store_address: `高雄市前鎮區忠勤路8號`,
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
      store_address: `高雄市鼓山區文忠路2號`,
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
      store_address: `高雄市鼓山區文衡路489號`,
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
      store_address: `高雄市鼓山區文美術東二路432號`,
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
      store_address: `高雄市岡山區捷安路1巷2號3樓`,
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
      store_address: `高雄市前金區五福一路67號`,
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
      store_address: `高雄市前金區五福三路31號`,
      store_type: `1,3,4,5`,
      store_ig: `https://www.instagram.com/coffee/`,
      store_goole: `https://maps.app.goo.gl/GxT3DaLpvazz2hBQ8`,
      store_time: `09:00-22:00`,
      store_close: `每周二、三`,
      store_phone: `07-2211459`,
    },
  ])
  const [StoreFilter, setStoreFilter] = useState([])
  const [StoreFilterName, setStoreFilterName] = useState('')
  const [StoreFilterAddress, setStoreFilterAddress] = useState('')
  // const [Reserve, setReserve] = useState([]) //第二張資料表
  const [total, setTotal] = useState(0) //總筆數
  const [pageCount, setPageCount] = useState(0) //總頁數
  const getStore = async (params = {}) => {
    const baseURL = 'http://localhost:3005/api/storecafe'
    // const baseURL = 'http://localhost:3005/api/storereserve'// 第二張資料表

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

  const handleFilterNameChange = (e) => {
    e.preventDefault()
    setStoreFilterName(e.target.value)
  }
  const handleFilterAddressChange = (e) => {
    e.preventDefault()
    setStoreFilterAddress(e.target.value)
  }
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

  const handleFilterStore = (event) => {
    console.log(StoreFilterName)
    console.log(StoreFilterAddress)
    console.log(isChecked)
    console.log(isChecked1)
    console.log(isChecked2)
    console.log(isChecked3)
    console.log(isChecked4)
    let newFilterStore = Store.filter(
      (s) => s.store_name.indexOf(StoreFilterName) > -1
    ).filter((s) => s.store_address.indexOf(StoreFilterAddress) > -1)
    if (isChecked) {
      // 1:免費提供wifi
      newFilterStore = newFilterStore.filter(
        (s) => s.store_type.split(',').indexOf('1') > -1
      )
    }
    if (isChecked1) {
      // 2:手沖體驗門市
      newFilterStore = newFilterStore.filter(
        (s) => s.store_type.split(',').indexOf('2') > -1
      )
    }
    if (isChecked2) {
      // 3:免費提供插座
      newFilterStore = newFilterStore.filter(
        (s) => s.store_type.split(',').indexOf('3') > -1
      )
    }
    if (isChecked3) {
      // 4:寵物友善門市
      newFilterStore = newFilterStore.filter(
        (s) => s.store_type.split(',').indexOf('4') > -1
      )
    }
    if (isChecked4) {
      // 5:冰滴咖啡販售門市
      newFilterStore = newFilterStore.filter(
        (s) => s.store_type.split(',').indexOf('5') > -1
      )
    }
    setStoreFilter(newFilterStore)
  }

  // ---這段是點擊右圖換左圖---
  const [leftImg, setLeftImg] = useState({})

  // 初始點擊右圖換左圖之左圖圖片
  useEffect(() => {
    Store.map((s) => {
      if (leftImg[s.store_id] === undefined) {
        leftImg[s.store_id] = s.store_pic1
      }
    })
    setStoreFilter(Store)
  }, Store)

  const handleClickRightImage = function (store_id, imgsrc) {
    leftImg[store_id] = imgsrc
    const newObj = JSON.parse(JSON.stringify(leftImg))
    setLeftImg(newObj)
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
  // 點擊預約表單跳轉往指
  const handleReserveonClick = (sID) => {
    console.log(sID)
    location.href = `/store/list?ID=${sID}`
  }

  return (
    <>
      <div className="banner-container">
        <div><img src="/bn.jpg" className={store.bannertext}></img></div>
        <div
          className="mx-auto w-100"
          style={{
            width: 1440,
            height: 350,
            backgroundColor: '#535353',
          }}
        >
          <div className="d-flex justify-content-center ">
            <div className="d-flex justify-content-center align-items-center">
              <div className="d-flex flex-column">
                <h4 className={store.addresstitle}>依門市名稱</h4>
                <div className="d-flex flex-column">
                  <input
                    type="text"
                    className={[
                      store.formcontrol,
                      'rounded-pill',
                      'fw-normal',
                    ].join(' ')}
                    placeholder="請輸入門市名稱..."
                    value={StoreFilterName}
                    onChange={handleFilterNameChange}
                  />

                  <div className="d-flex flex-column">
                    <h4 className={store.addresstitle}>依門市地址</h4>
                  </div>
                  <input
                    type="text"
                    className={[
                      store.formcontrol,
                      'rounded-pill',
                      'fw-normal',
                    ].join(' ')}
                    placeholder="請輸入完整地址..."
                    value={StoreFilterAddress}
                    onChange={handleFilterAddressChange}
                  />
                  {/* <button className={store.selectbutton}>
                    查詢
                    <SlMagnifier />
                  </button> */}
                </div>
              </div>

              <div className="d-flex flex-column">
                <h4 className={[store.checkboxtitle].join(' ')}>依門市型態</h4>
                <label
                  className={[store.checkbox, 'align-items-center'].join(' ')}
                >
                  <input
                    className="me-1"
                    type="checkbox"
                    checked={isChecked} // 由狀態控制是否勾選
                    onChange={handleCheckboxChange} // 當值改變時觸發
                  />
                  <FaWifi className="me-1" />
                  免費提供wifi
                </label>
                <label
                  className={[store.checkbox, 'align-items-center'].join(' ')}
                >
                  <input
                    className="me-1"
                    type="checkbox"
                    checked={isChecked1}
                    onChange={handleCheckboxChange1}
                  />
                  <GiCoffeePot />
                  手沖體驗門市
                </label>
                <label
                  className={[store.checkbox, 'align-items-center'].join(' ')}
                >
                  <input
                    className="me-1"
                    type="checkbox"
                    checked={isChecked2}
                    onChange={handleCheckboxChange2}
                  />
                  <ImPowerCord />
                  免費提供插座
                </label>
                <label
                  className={[store.checkbox, 'align-items-center'].join(' ')}
                >
                  <input
                    className="me-1"
                    type="checkbox"
                    checked={isChecked3}
                    onChange={handleCheckboxChange3}
                  />
                  <FaDog />
                  寵物友善門市
                </label>
                <label
                  className={[store.checkbox, 'align-items-center'].join(' ')}
                >
                  <input
                    className="me-1"
                    type="checkbox"
                    checked={isChecked4}
                    onChange={handleCheckboxChange4}
                  />
                  <SiBuymeacoffee />
                  冰滴咖啡販售門市
                </label>
                <div className="d-flex">
                  <button
                    className={store.selectbutton1}
                    onClick={handleFilterStore}
                  >
                    查詢
                    <SlMagnifier />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {StoreFilter.map((way) => (
          <div className="body-pic">
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
                    src={leftImg[way.store_id]}
                    style={{
                      width: 630,
                      height: 460,
                    }}
                  />
                </div>
                <div
                  className={[store.vertical, 'd-flex', 'flex-column'].join(
                    ' '
                  )}
                >
                  <img
                    src={way.store_pic1}
                    className={store.pic2}
                    onClick={() =>
                      handleClickRightImage(way.store_id, way.store_pic1)
                    }
                  />
                  <img
                    src={way.store_pic2}
                    className={store.pic3}
                    onClick={() =>
                      handleClickRightImage(way.store_id, way.store_pic2)
                    }
                  />
                  <img
                    src={way.store_pic3}
                    className={store.pic4}
                    onClick={() =>
                      handleClickRightImage(way.store_id, way.store_pic3)
                    }
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
                        {way.store_name}
                      </h2>
                      <div
                        className={[
                          store.roundedbox,
                          'rounded-pill',
                          'fw-normal',
                        ].join(' ')}
                      >
                        <div
                          className={[store.citytext, 'fw-normal'].join(' ')}
                        >
                          {way.store_city}/{way.area_city}
                        </div>
                      </div>

                      <div class="d-flex flex-column">
                        <div
                          className={[store.btheight, 'd-flex', 'mx-2'].join(
                            ' '
                          )}
                        >
                          {way.store_type.split(`,`).map((t) => {
                            if (t == `1`) {
                              return (
                                <button
                                  className={[
                                    store.typebotton,
                                    'rounded-3',
                                    'fw-normal',
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
                                    store.typebotton,
                                    'rounded-3',
                                    'fw-normal',
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
                                    store.typebotton,
                                    'rounded-3',
                                    'fw-normal',
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
                                    store.typebotton,
                                    'rounded-3',
                                    'fw-normal',
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
                                    store.typebotton,
                                    'rounded-3',
                                    'fw-normal',
                                  ].join(' ')}
                                >
                                  <SiBuymeacoffee />
                                  冰滴咖啡販售門市
                                </button>
                              )
                            }
                          })}
                        </div>
                      </div>
                    </div>

                    <div class="fw-normal">
                      <p className={[store.content, 'text-light'].join(' ')}>
                        {way.store_description}
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
                      <button
                        onClick={() => handleReserveonClick(way.store_id)}
                        className={[
                          store.botton,
                          'rounded-3',
                          'fw-normal',
                          'small',
                        ].join(' ')}
                      >
                        詳細資訊
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {StoreFilter.length == 0 && (
          <div className={store.error}>
            找不到資料！無適合門市，請重新查詢☺️。
          </div>
        )}
      </div>

      <ReserviceModal isOpen={isModalOpen} onRequestClose={closeModal} />
    </>
  )
}