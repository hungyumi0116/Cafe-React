import { useState, useEffect } from 'react';
import Link from 'next/link';
import BS5Pagination from '@/components/common/bs5-pagination';

// 後端的資料來源: http://localhost:3005/api/my-product
export default function List() {
  // 注意1: 初始值至少要空白陣列。初次render是使用初始值，需要對應伺服器的資料模型
  // 注意2: 在應用程式執行過程中，一定要保持狀態的資料類型一致(務必一定要是陣列)
  // 最後從伺服器得到的資料
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0); // 總筆數
  const [pageCount, setPageCount] = useState(0); // 總頁數

  // 查詢條件用(這裡用的初始值都與伺服器的預設值一致)
  const [nameLike, setNameLike] = useState('');
  const [brands, setBrands] = useState([]); // 字串陣列
  const [priceGte, setPriceGte] = useState(0);
  const [priceLte, setPriceLte] = useState(20000);

  // 品牌選項陣列
  const brandOptions = ['Apple', 'Google', 'Samsung', '小米'];

  // 排序
  const [sort, setSort] = useState('id');
  const [order, setOrder] = useState('asc');

  // 分頁用
  const [page, setPage] = useState(1);
  const [perpage, setPerpage] = useState(10);

  // 與伺服器作fetch獲得資料
  const getProducts = async (params = {}) => {
    const baseUrl = 'http://localhost:3005/api/my-product-sql';
    // 轉換params為查詢字串
    const searchParams = new URLSearchParams(params);
    const qs = searchParams.toString();
    const url = `${baseUrl}?${qs}`;

    // 使用try-catch語句，讓和伺服器連線的程式能作錯誤處理
    try {
      const res = await fetch(url);
      const resData = await res.json();

      if (resData.status === 'success') {
        setPageCount(resData.data.pageCount);
        setTotal(resData.data.total);
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

  // 品牌複選時使用(使用字串陣列狀態)
  const handleBrandChecked = (e) => {
    // 宣告方便使用的tv名稱，取得觸發事件物件的目標值
    const tv = e.target.value;
    // 判斷是否有在陣列中
    if (brands.includes(tv)) {
      // 如果有===>移出陣列
      const nextBrands = brands.filter((v) => v !== tv);
      setBrands(nextBrands);
    } else {
      // 否則===>加入陣列
      const nextBrands = [...brands, tv];
      setBrands(nextBrands);
    }
  };

  // 按下搜尋按鈕
  const handleSearch = () => {
    // 每次搜尋條件後，因為頁數和筆數可能不同，所以要導向第1頁
    setPage(1);

    const params = {
      page: 1, // 每次搜尋條件後，因為頁數和筆數可能不同，所以要導向第1頁，向伺服器要第1頁的資料
      perpage,
      sort: sort,
      order: order,
      name_like: nameLike,
      brands: brands.join(','), // 字串陣列需要轉換為逗點分隔(csv)字串
      price_gte: priceGte,
      price_lte: priceLte,
    };

    getProducts(params);
  };

  // 樣式3 didMount+didUpdate
  useEffect(() => {
    // 建立搜尋參數物件
    const params = {
      page,
      perpage,
      sort,
      order,
    };
    // 向伺服器fetch
    getProducts(params);
  }, [page, perpage, sort, order]);
  //  ^^^^^^^^^^^^^^ 這裡會監聽page,perpage狀態的更動，有更動會向伺服器作fetch

  return (
    <>
      <h1>商品列表頁</h1>
      <div>
        名稱:
        <input
          type="text"
          value={nameLike}
          onChange={(e) => {
            setNameLike(e.target.value);
          }}
        />
      </div>
      <hr />
      <div>
        品牌:
        {brandOptions.map((v, i) => {
          return (
            <label
              // 當初次render後不會再改動，即沒有新增、刪除、更動時，可以用索引當key
              key={i}
            >
              <input
                type="checkbox"
                value={v}
                checked={brands.includes(v)}
                onChange={handleBrandChecked}
              />
              {v}
            </label>
          );
        })}
      </div>
      <div>
        價格大於:
        <input
          type="number"
          value={priceGte}
          onChange={(e) => {
            setPriceGte(Number(e.target.value));
          }}
        />
        小於:
        <input
          type="number"
          value={priceLte}
          onChange={(e) => {
            setPriceLte(Number(e.target.value));
          }}
        />
      </div>
      <hr />
      <div>
        <button onClick={handleSearch}>搜尋</button>
      </div>
      <hr />
      <div>
        <button
          onClick={() => {
            const nextPage = page - 1;
            // 最小是1
            if (nextPage >= 1) {
              setPage(nextPage);
            }
          }}
        >
          上一頁
        </button>
        <button
          onClick={() => {
            const nextPage = page + 1;
            // 最大是pageCount
            if (nextPage <= pageCount) {
              setPage(nextPage);
            }
          }}
        >
          下一頁
        </button>
        每頁幾筆:{' '}
        <select
          value={perpage}
          onChange={(e) => {
            setPerpage(e.target.value);
            // 因改變每頁筆數會造成頁數改變，所以需要跳回第一頁，以免造成操作邏輯上的bug
            setPage(1);
          }}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>{' '}
        目前頁面 {page} / 總頁數: {pageCount} / 總筆數: {total}
      </div>
      <div>
        排序
        <select
          value={`${sort},${order}`}
          onChange={(e) => {
            const tv = e.target.value;
            setSort(tv.split(',')[0]);
            setOrder(tv.split(',')[1]);
            // 因改變排序最好也要跳回第一頁，以免造成使用者操作上的誤解
            setPage(1);
          }}
        >
          <option value="id,asc">ID排序(由小至大)</option>
          <option value="id,desc">ID排序(由大至小)</option>
          <option value="price,asc">價格排序(由低至高)</option>
          <option value="price,desc">價格排序(由高至低)</option>
        </select>
      </div>
      <ul>
        {products.map((v, i) => {
          return (
            <li key={v.id}>
              <Link href={`/cs-0708/product/${v.id}`}>
                {v.id} / {v.name} / {v.price}
              </Link>
            </li>
          );
        })}
      </ul>
      <div>
        {/* 加入分頁列元件 */}
        <BS5Pagination
          forcePage={page - 1}
          pageCount={pageCount}
          onPageChange={(e) => {
            setPage(e.selected + 1);
          }}
        />
      </div>
    </>
  );
}
