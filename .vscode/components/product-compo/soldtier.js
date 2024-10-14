import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Link from 'next/link';
import style from '@/styles/productlist.module.css';
import ProductCard from '@/components/product-compo/productcard';

export default function Soldtier(item) {
  const [products, setProducts] = useState([]);

  const getProducts = async (params = {}) => {
    const baseURL = 'http://localhost:3005/api/product_list/sold';
    // 轉換params為查詢字串
    const searchParams = new URLSearchParams(params);
    const qs = searchParams.toString();
    const url = `${baseURL}?${qs}`;

    // 使用try-catch語句，讓和伺服器連線的程式能作錯誤處理
    try {
      const res = await fetch(url);
      const resData = await res.json();

      if (resData.status === 'success') {
        // 設定到狀態中 ===> 進入update階段，觸發重新渲染(re-render)，呈現資料
        // 確定資料是陣列資料類型才設定到狀態中(最基本的保護)
        if (Array.isArray(resData.data.products)) {
          setProducts(resData.data.products);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };
  const router = useRouter();
  useEffect(() => {
    if (router.isReady) {
      // 這裡可以確保一定可以得到router.query的值
      console.log(router.query);
      // 向伺服器要求資料

      // 向伺服器要求資料
      getProducts();
    }
  }, []);

  return (
    <>
      <div className={style.context2}>
        {products.map((item) => {
          return <ProductCard item={item} key={item.id} />;
        })}
      </div>
    </>
  );
}
