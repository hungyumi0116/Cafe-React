import React, { useState, useContext, createContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import axiosInstance from '@/services/axios-instance'
import { checkAuth, getFavs } from '@/services/user'

const AuthContext = createContext(null)

// 註: 如果使用google登入會多幾個欄位(iat, exp是由jwt token來的)
// 上面資料由express來(除了password之外)
//   {
//     "id": 1,
//     "name": "哈利",
//     "username": "herry",
//     "email": "herry@test.com",
//     "birth_date": "1980-07-13",
//     "sex": "男",
//     "phone": "0906102808",
//     "postcode": "330",
//     "address": "桃園市桃園區劉南路377號18樓",
//     "google_uid": null,
//     "line_uid": null,
//     "photo_url": null,
//     "line_access_token": null,
//     "created_at": "2023-11-01T14:12:59.000Z",
//     "updated_at": "2023-11-01T14:12:59.000Z",
//     "iat": 1698852277,
//     "exp": 1698938677
// }

// 初始化會員狀態(登出時也要用)
// 只需要必要的資料即可，沒有要多個頁面或元件用的資料不需要加在這裡
// !!注意JWT存取令牌中只有id, username, google_uid, line_uid在登入時可以得到
export const initUserData = {
  id: 0,
  username: '',
  google_uid: '',
  line_uid: '',
  name: '',
  email: '',
}

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuth: false,
    userData: initUserData,
  })

  // 我的最愛清單使用
  const [favorites, setFavorites] = useState([])

  // 得到我的最愛
  const handleGetFavorites = async () => {
    const res = await getFavs()
    //console.log(res.data)
    if (res.data.status === 'success') {
      setFavorites(res.data.data.favorites)
    }
  }

  useEffect(() => {
    if (auth.isAuth) {
      // 成功登入後要執行一次向伺服器取得我的最愛清單
      handleGetFavorites()
    } else {
      // 登出時要設回空陣列
      setFavorites([])
    }
  }, [auth])

  const router = useRouter()

  // 登入頁路由
  const loginRoute = '/test/user'
  // 隱私頁面路由，未登入時會，檢查後跳轉至登入頁
  const protectedRoutes = [
    '/test/user/status',
    '/test/user/profile',
    '/test/user/profile-password',
  ]

  // 檢查會員認証用
  // 每次重新到網站中，或重新整理，都會執行這個函式，用於向伺服器查詢取回原本登入會員的資料
  const handleCheckAuth = async () => {
    const res = await checkAuth()

    // 伺服器api成功的回應為 { status:'success', data:{ user } }
    if (res.data.status === 'success') {
      // 只需要initUserData的定義屬性值
      const dbUser = res.data.data.user
      const userData = { ...initUserData }

      for (const key in userData) {
        if (Object.hasOwn(dbUser, key)) {
          userData[key] = dbUser[key] || ''
        }
      }
      // 設到全域狀態中
      setAuth({ isAuth: true, userData })
    } else {
      console.warn(res.data)

      // 在這裡實作隱私頁面路由的跳轉
      if (protectedRoutes.includes(router.pathname)) {
        router.push(loginRoute)
      }
    }
  }

  // didMount(初次渲染)後，向伺服器要求檢查會員是否登入中
  useEffect(() => {
    if (router.isReady && !auth.isAuth) {
      handleCheckAuth()
    }
    // 下面加入router.pathname，是為了要在向伺服器檢查後，
    // 如果有比對到是隱私路由，就執行跳轉到登入頁面工作
    // 注意有可能會造成向伺服器要求多次，此為簡單的實作範例
    // eslint-disable-next-line
  }, [router.isReady, router.pathname])

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        favorites,
        setFavorites,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
