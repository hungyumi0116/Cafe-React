import { useState, useEffect } from 'react'
import '@/styles/globals.scss'
import DefaultLayout from '@/components/layout/default-layout'

import useRWD from '@/components/layout/default-layout/useRWD'

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // 要document物件出現後才能導入 bootstrap的js函式庫
    import('bootstrap/dist/js/bootstrap')
  }, [])

  // 使用預設排版檔案
  // 對應`components/layout/default-layout/index.js`
  const getLayout =
    Component.getLayout || ((page) => <DefaultLayout>{page}</DefaultLayout>)

  const device = useRWD()

  if (device === 'PC') return getLayout(<Component {...pageProps} />)
  else if (device === 'tablet') return getLayout(<Component {...pageProps} />)
  else return getLayout(<Component {...pageProps} />)
}
