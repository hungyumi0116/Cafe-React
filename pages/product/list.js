import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ProductCard from '@/components/product-compo/productcard';
import Categoraylist from '@/components/product-compo/categoraylist';
import InputIme from '@/components/product-compo/input-ime';
import style from '@/styles/productlist.module.css';
import { FaPlus } from 'react-icons/fa';
import { BsDashLg } from 'react-icons/bs';
import { IoSearch } from 'react-icons/io5';
import BS5Pagination from '@/components/common/bs5-pagination';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import Banner from '@/components/product-compo/banner';
import Filterbtn from '@/components/product-compo/filter-btn';
import 'react-responsive-modal/styles.css';
import Soldtier from '@/components/product-compo/soldtier';
// 有名稱的路由(巢狀路由)
export default function List(item) {
  // 商品物件陣列狀態
  // 注意1: 初始值至少要空陣列，初次渲染使用的是初始值
  // 注意2: 在應用程式執行過程中，一定要保持狀態的資料類型一致(陣列)
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0); //總筆數
  const [pageCount, setPageCount] = useState(0); //總頁數

  // 查詢條件用(這裡用的初始值都與伺服器的預設值一致)
  const [name_like, setNameLike] = useState('');
  const [country, setCountry] = useState([]); // 字串陣列
  const [breeds, setBreeds] = useState([]); // 字串陣列
  const [process, setProcess] = useState([]); // 字串陣列
  const [roast, setRoast] = useState([]); // 字串陣列
  const [price_gte, setPriceGte] = useState(0);
  const [price_lte, setPriceLte] = useState(4000);

  //filter-open
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const toggleFilter = () => {
    setIsFilterOpen((prev) => !prev);
  };
  const router = useRouter();

  // 品牌選項陣列
  const countryOptions = [
    '台灣',
    '衣索比亞',
    '肯亞',
    '巴拿馬',
    '哥斯大黎加',
    '瓜地馬拉',
    '哥倫比亞',
    '巴西',
    '祕魯',
  ];
  const breedsOptions = ['阿拉比卡', '卡杜拉', '藝妓', '帝比卡'];

  const processOptions = [
    '水洗處理',
    '日曬處理',
    '半水洗處理',
    '半日曬處理',
    '葡萄乾蜜處理',
  ];

  const roastOptions = ['深烘焙', '中烘焙', '淺烘焙'];

  // 排序
  const [sort, setSort] = useState('p_id');
  const [order, setOrder] = useState('asc');

  // 分頁用
  const [page, setPage] = useState(1);
  const [perpage, setPerpage] = useState(16);

  // 向伺服器獲取資料(建議寫在useEffect外，用async-await)

  const getProductsByTypeID = async (typeID) => {
    const baseURL = `http://localhost:3005/api/product_list/type/${typeID}?page=${page}&perpage=${perpage}&sort=${sort}&order=${order}&country=${country}&breeds=${breeds}&process=${process}&price_gte=${price_gte}&price_lte=${price_lte}&name_like=${name_like}`;

    try {
      const res = await fetch(baseURL);
      const resData = await res.json();

      // 設定到狀態中
      // (3.) 設定到狀態後 -> 觸發update(re-render)
      if (resData.status === 'success') {
        setProducts(resData.data.products);
        setPageCount(resData.data.pageCount);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const getProducts = async (params = {}) => {
    const baseURL = 'http://localhost:3005/api/product_list';
    // 轉換params為查詢字串
    const searchParams = new URLSearchParams(params);
    const qs = searchParams.toString();
    const url = `${baseURL}?${qs}`;

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
    if (country.includes(tv)) {
      // 如果有===>移出陣列
      const nextCountry = country.filter((v) => v !== tv);
      setCountry(nextCountry);
    } else {
      // 否則===>加入陣列
      const nextCountry = [...country, tv];
      setCountry(nextCountry);
    }
  };

  //品種複選
  const handleBreedChecked = (e) => {
    // 宣告方便使用的tv名稱，取得觸發事件物件的目標值
    const tv = e.target.value;
    // 判斷是否有在陣列中
    if (breeds.includes(tv)) {
      // 如果有===>移出陣列
      const nextBreeds = breeds.filter((v) => v !== tv);
      setBreeds(nextBreeds);
    } else {
      // 否則===>加入陣列
      const nextBreeds = [...breeds, tv];
      setBreeds(nextBreeds);
    }
  };

  //處理法複選
  const handleProcessChecked = (e) => {
    // 宣告方便使用的tv名稱，取得觸發事件物件的目標值
    const tv = e.target.value;
    // 判斷是否有在陣列中
    if (process.includes(tv)) {
      // 如果有===>移出陣列
      const nextProcess = process.filter((v) => v !== tv);
      setProcess(nextProcess);
    } else {
      // 否則===>加入陣列
      const nextProcess = [...process, tv];
      setProcess(nextProcess);
    }
  };

  // 烘焙法複選時使用(使用字串陣列狀態)
  const handleRoastChecked = (e) => {
    // 宣告方便使用的tv名稱，取得觸發事件物件的目標值
    const tv = e.target.value;
    // 判斷是否有在陣列中
    if (roast.includes(tv)) {
      // 如果有===>移出陣列
      const nextRoast = roast.filter((v) => v !== tv);
      setRoast(nextRoast);
    } else {
      // 否則===>加入陣列
      const nextRoast = [...roast, tv];
      setRoast(nextRoast);
    }
  };

  // 分頁元件的頁碼改變時

  const handleLoadDataType = () => {
    setPage(1);

    getProductsByTypeID(router.query.type);
    console.log('123', 123);
  };

  const handleLoadData = () => {
    setPage(1);

    // 要送至伺服器的query string參數
    // 註: 重新載入資料需要跳至第一頁
    const params = {
      page: 1, // 跳至第一頁
      perpage,
      sort: sort,
      order: order,
      name_like: name_like,
      country: country.join(','),
      breeds: breeds.join(','),
      process: process.join(','),
      roast: roast.join(','),
      price_gte: price_gte, // 會有'0'price_gte
      price_lte: price_lte, // 會有'0'字串的情況，注意要跳過此條件
    };

    getProducts(params);
  };

  // 樣式2: didMount
  useEffect(() => {
    // 建立查詢字串用的參數值
    const params = {
      page,
      perpage,
      sort,
      order,
      country,
      breeds,
      process,
      roast,
      price_gte,
      price_lte,
      name_like,
    };

    // 向伺服器要求資料
    if (router.query.type) {
      getProductsByTypeID(router.query.type);
    } else {
      getProducts(params);
    }
  }, [page, perpage, sort, order, name_like]);

  useEffect(() => {
    if (router.isReady) {
      // 這裡可以確保一定可以得到router.query的值
      console.log(router.query);
      // 向伺服器要求資料
      if (router.query.type) {
        getProductsByTypeID(router.query.type);
      } else {
        // 建立查詢字串用的參數值
        const params = {
          page,
          perpage,
          sort,
          order,
          country,
          breeds,
          process,
          roast,
          price_gte,
          price_lte,
          name_like,
        };

        // 向伺服器要求資料
        getProducts(params);
      }
    }

    // 以下為省略eslint檢查一行，這裡再加上router.query意義會有所不同目前會是多餘的
    // eslint-disable-next-line
  }, [router.isReady, router.query])
  return (
    <>
      <div className={style.all}>
        <Banner {...item} />

        <div className={style.container}>
          <div className={style.sidebar}>
            <Categoraylist />
            <div>
              <IoSearch className={style.searchname} />

              <InputIme
                className={style.searchbox}
                value={name_like}
                placeholder="輸入查詢名稱"
                onChange={(e) => {
                  setNameLike(e.target.value);
                  console.log(e.target.value);
                }}
              />
            </div>
            <button className={style.filter_btn} onClick={toggleFilter}>
              <Filterbtn />
            </button>

            <div
              className={`${style.filter} ${isFilterOpen ? style.open : ''}`}
            >
              <div className={style.filter_block}>
                <p className={style.filter_price_title}>價格區間</p>
                <p className={style.filter_price_intro}>
                  (原始區間NT.0~NT.4000)
                </p>
                <div>
                  <div className={style.filter_price_box}>
                    <p>最低</p>
                    <p>最高</p>
                  </div>

                  <div className={style.filter_price_box}>
                    <input
                      className={style.filter_price_input}
                      type="text"
                      value={price_gte}
                      onChange={(e) => {
                        setPriceGte(Number(e.target.value));
                      }}
                    />
                    <BsDashLg className={style.filter_price_dash} />
                    <input
                      className={style.filter_price_input}
                      type="text"
                      value={price_lte}
                      onChange={(e) => {
                        setPriceLte(Number(e.target.value));
                      }}
                    />
                  </div>
                </div>
              </div>

              <Accordion allowMultipleExpanded>
                <div className={style.filter_block}>
                  <AccordionItem>
                    <AccordionItemHeading>
                      <AccordionItemButton>
                        <p className={style.filter_title}>國家</p>
                        <FaPlus className={style.filter_icon} />
                      </AccordionItemButton>
                    </AccordionItemHeading>

                    <AccordionItemPanel>
                      {countryOptions.map((v, i) => {
                        return (
                          <label
                            className={style.filter_opt}
                            // 當初次render後不會再改動，即沒有新增、刪除、更動時，可以用索引當key
                            key={i}
                          >
                            <input
                              className={style.filter_box}
                              type="checkbox"
                              value={v}
                              checked={country.includes(v)}
                              onChange={handleBrandChecked}
                            />
                            {v}
                            <span className={style.filter_mark}></span>
                          </label>
                        );
                      })}
                    </AccordionItemPanel>
                  </AccordionItem>
                </div>

                <div className={style.filter_block}>
                  <AccordionItem>
                    <AccordionItemHeading>
                      <AccordionItemButton>
                        <p className={style.filter_title}>品種</p>
                        <FaPlus className={style.filter_icon} />
                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                      {breedsOptions.map((v, i) => {
                        return (
                          <label
                            className={style.filter_opt}
                            // 當初次render後不會再改動，即沒有新增、刪除、更動時，可以用索引當key
                            key={i}
                          >
                            <input
                              className={style.filter_box}
                              type="checkbox"
                              value={v}
                              checked={breeds.includes(v)}
                              onChange={handleBreedChecked}
                            />
                            {v}
                            <span className={style.filter_mark}></span>
                          </label>
                        );
                      })}
                    </AccordionItemPanel>
                  </AccordionItem>
                </div>

                <div className={style.filter_block}>
                  <AccordionItem>
                    <AccordionItemHeading>
                      <AccordionItemButton>
                        <p className={style.filter_title}>處理法</p>
                        <FaPlus className={style.filter_icon} />
                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                      {processOptions.map((v, i) => {
                        return (
                          <label
                            className={style.filter_opt}
                            // 當初次render後不會再改動，即沒有新增、刪除、更動時，可以用索引當key
                            key={i}
                          >
                            <input
                              className={style.filter_box}
                              type="checkbox"
                              value={v}
                              checked={process.includes(v)}
                              onChange={handleProcessChecked}
                            />
                            {v}
                            <span className={style.filter_mark}></span>
                          </label>
                        );
                      })}
                    </AccordionItemPanel>
                  </AccordionItem>
                </div>
                <div className={style.filter_block}>
                  <AccordionItem>
                    <AccordionItemHeading>
                      <AccordionItemButton>
                        <p className={style.filter_title}>烘焙程度</p>
                        <FaPlus className={style.filter_icon} />
                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                      {roastOptions.map((v, i) => {
                        return (
                          <label
                            className={style.filter_opt}
                            // 當初次render後不會再改動，即沒有新增、刪除、更動時，可以用索引當key
                            key={i}
                          >
                            <input
                              type="checkbox"
                              value={v}
                              checked={roast.includes(v)}
                              onChange={handleRoastChecked}
                            />
                            {v}
                            <span className={style.filter_mark}></span>
                          </label>
                        );
                      })}{' '}
                    </AccordionItemPanel>
                  </AccordionItem>
                </div>
              </Accordion>
            </div>
            <button
              onClick={router.query.type ? handleLoadDataType : handleLoadData}
            >
              搜尋
            </button>
          </div>
          <div>
            <div className={style.order}>
              <select
                value={`${sort},${order}`}
                onChange={(e) => {
                  const tv = e.target.value;
                  setSort(tv.split(',')[0]);
                  setOrder(tv.split(',')[1]);
                  // 因改變排序最好也要跳回第一頁，以免造成使用者操作上的誤解
                  setPage(1);
                  console.log(tv);
                }}
              >
                <option value="p_id,asc">ID排序(由小至大)</option>
                <option value="p_id,desc">ID排序(由大至小)</option>
                <option value="p_discount,asc">價格排序(由低至高)</option>
                <option value="p_discount,desc">價格排序(由高至低)</option>
                <option value="p_sold,desc">銷量(由高至低)</option>
                <option value="p_date,desc">上架日期(由新至舊)</option>
                <option value="p_date,asc">上架日期(由舊至新)</option>
              </select>
            </div>

            {products.length === 0 ? (
              <div className={style.context1}>
                <p className={style.wrong_msg}>很抱歉，無此查詢結果</p>
                <p className={style.wrong_msg}>或許您會喜歡：</p>
                <Soldtier />
              </div>
            ) : (
              <div className={style.context}>
                {products.map((item) => {
                  return <ProductCard item={item} key={item.id} />;
                })}
              </div>
            )}

            {/*  呈現分頁元件 */}
            <div className={style.pagenation}>
              <BS5Pagination
                forcePage={page - 1}
                pageCount={pageCount}
                onPageChange={(e) => {
                  setPage(e.selected + 1);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
