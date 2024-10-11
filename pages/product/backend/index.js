import React, { useEffect, useState } from 'react';

import BeNavbar from '@/components/layout/default-layout/backendbar';
import { useRouter } from 'next/router';
import BS5Pagination2 from '@/components/common/bs5-pagination2';
import style from '@/styles/productbackend.module.css';
import Link from 'next/link';
import { FaPen } from 'react-icons/fa';
import { FaRegTrashCan } from 'react-icons/fa6';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0); // 總筆數
  const [pageCount, setPageCount] = useState(0); // 總頁數
  const [page, setPage] = useState(1); // 分頁用
  const [perpage, setPerpage] = useState(16);

  const getProducts = async (params = {}) => {
    const baseURL = 'http://localhost:3005/api/product_list';
    const searchParams = new URLSearchParams(params);
    const qs = searchParams.toString();
    const url = `${baseURL}?${qs}`;

    try {
      const res = await fetch(url);
      const resData = await res.json();

      if (resData.status === 'success') {
        setPageCount(resData.data.pageCount);
        setTotal(resData.data.total);

        if (Array.isArray(resData.data.products)) {
          setProducts(resData.data.products);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const deleteItem = (p_id) => {
    fetch(`http://localhost:3005/api/product_list/api/${p_id}`, {
      method: 'DELETE',
    })
      .then((r) => r.json())
      .then((result) => {
        if (result.success) {
          router.reload();
        }
      })
      .catch((ex) => console.log(ex));
  };

  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      const params = { page, perpage };
      getProducts(params);
    }
  }, [page, perpage]);

  return (
    <>
      <BeNavbar title="首頁 - 後臺管理"></BeNavbar>
      <div className="container">
        <div>
          <BS5Pagination2
            className={style.page}
            forcePage={page - 1}
            pageCount={pageCount}
            onPageChange={(e) => {
              setPage(e.selected + 1);
            }}
          />
          <p>筆數{total}</p>
        </div>
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>
                <FaRegTrashCan />
              </th>
              <th>編輯</th>
              <th>編號</th>
              <th>名稱</th>
              <th>原價</th>
              <th>折價後價格</th>
              <th>分類</th>
              <th>產地</th>
              <th>品種</th>
              <th>處理法</th>
              <th>烘焙法</th>
              <th>介紹</th>
              <th>庫存</th>
              <th>銷量</th>
              <th>商品照片</th>
              <th>上架日期</th>
            </tr>
          </thead>
          <tbody>
            {products.map((r) => (
              <tr key={r.p_id}>
                <td>
                  <a
                    href="#/"
                    onClick={(e) => {
                      e.preventDefault();
                      deleteItem(r.p_id);
                    }}
                  >
                    <FaRegTrashCan />
                  </a>
                </td>
                <td>
                  <Link href={`/product/backend/edit/${r.p_id}`}>
                    <FaPen />
                  </Link>
                </td>
                <td>{r.p_id}</td>
                <td className={style.td}>{r.p_name}</td>
                <td>{r.p_price}</td>
                <td>{r.p_discount}</td>
                <td>{r.p_type}</td>
                <td>{r.p_country}</td>
                <td>{r.p_breed}</td>
                <td>{r.p_process}</td>
                <td>{r.p_roast}</td>
                <td>
                  <p className={style.intro}>{r.p_intro}</p>
                </td>
                <td>{r.p_stock}</td>
                <td>{r.p_sold}</td>
                <td>
                  <img
                    width={150}
                    src={`http://localhost:3005/img/${r.p_pic1}`}
                    alt=""
                  />
                </td>
                <td>{r.p_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

// 自定義 getLayout 函數，使用自己的 BeNavbar
ProductList.getLayout = function getLayout(page) {
  return <>{page}</>;
};
