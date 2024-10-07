import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const override = {
  display: 'block',
  margin: '0 auto',
  // borderColor: 'red',
};

// 動態路由名稱
// 除了根(索引)路由(index.js)與巢狀路由(有名稱的路由如list.js)之外，都算此路由
export default function Detail(item) {
  // 商品物件狀態
  // 注意1: 初始值至少要空物件，比較好的選擇是加入屬性名稱的物件，初次渲染使用的是初始值
  // 注意2: 在應用程式執行過程中，一定要保持狀態的資料類型一致(物件)
  const [product, setProduct] = useState({
    p_id: 0,
    p_name: '',
    p_price: 0,
  });

  // 向伺服器獲取資料(建議寫在useEffect外，用async-await)
  const getProduct = async (productId) => {
    const baseURL = `http://localhost:3005/api/product_list/${productId}`;

    try {
      const res = await fetch(baseURL);
      const resData = await res.json();

      console.log(resData);

      // 設定到狀態中
      // (3.) 設定到狀態後 -> 觸發update(re-render)
      if (resData.status === 'success') {
        setProduct(resData.data.product);
        console.log('product', resData.data.product);
      }
    } catch (e) {
      console.error(e);
    }
  };

  // 第1步: 宣告路由器
  // router.query 一個物件值，裡面會包含productId屬性
  // router.isReady 一個布林值，一開始是false(初次渲染)，當next完成水合化作用(SSR)後，會改變為true，此時可以得到router.query的值
  const router = useRouter();

  // 第2步: 用useEffect監聽router.isReady變化，當為true時代表query裡有productId可以使用
  useEffect(() => {
    if (router.isReady) {
      // 這裡可以確保一定可以得到router.query的值
      console.log(router.query);
      // 向伺服器要求資料
      getProduct(router.query.productId);
    }

    // 以下為省略eslint檢查一行，這裡再加上router.query意義會有所不同目前會是多餘的
    // eslint-disable-next-line
  }, [router.isReady])



  return (
    <>
      <h1>商品詳細頁</h1>
      <hr />
      <div className="product">
        <div>
          <h2>My Photo Gallery</h2>

          <Carousel autoPlay interval="5000" transitionTime="500" infiniteLoop>
            {product.p_pic1 !== 'null' ? (
              <div>
                <img
                  src={`http://localhost:3005/img/${product.p_pic1}`}
                  alt="..."
                />
                <p className="legend">{product.p_id}</p>
              </div>
            ) : (
              <div></div>
            )}
            {product.p_pic2 !== 'null' ? (
              <div>
                <img
                  src={`http://localhost:3005/img/${product.p_pic2}`}
                  alt="..."
                />
                <p className="legend">{product.p_id}</p>
              </div>
            ) : (
              <div></div>
            )}
            {product.p_pic3 !== 'null' ? (
              <div>
                <img
                  src={`http://localhost:3005/img/${product.p_pic3}`}
                  alt="..."
                />
                <p className="legend">{product.p_id}</p>
              </div>
            ) : (
              <div></div>
            )}
            {product.p_pic4 !== 'null' ? (
              <div>
                <img
                  src={`http://localhost:3005/img/${product.p_pic4}`}
                  alt="..."
                />
                <p className="legend">{product.p_id}</p>
              </div>
            ) : (
              <div></div>
            )}
            {product.p_pic5 !== 'null' ? (
              <div>
                <img
                  src={`http://localhost:3005/img/${product.p_pic5}`}
                  alt="..."
                />
                <p className="legend">{product.p_id}</p>
              </div>
            ) : (
              <div></div>
            )}
          </Carousel>
        </div>
        <h2>{product.p_name}</h2>
        <p>價格: {product.p_price}</p>
        <p>折價後價格：{product.p_discount}</p>
        <p>處理法:{product.p_process}</p>
        <p>烘焙程度:{product.p_roast}</p>
        <p>
          庫存:
          {product.p_stock}
        </p>
        <p>已售:{product.p_sold}</p>
        <p>商品介紹:{product.p_intro}</p>
      </div>
      <Link href="/product/list">回列表頁</Link>
    </>
  );
}
