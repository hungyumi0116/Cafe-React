import { useRouter } from 'next/router'
import { BrowserRouter } from 'react-router-dom' // 引入 BrowserRouter

// 只作導向到 store/list
export default function ProductIndex() {
  const router = useRouter()

  // 確認window(瀏覽器)開始運作
  if (typeof window !== 'undefined') {
    router.push('/store/list')
  }

  return <></>
}
