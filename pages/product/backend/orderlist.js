import React, { useEffect, useState } from 'react';

import BeNavbar from '@/components/layout/default-layout/backendbar';
import { useRouter } from 'next/router';
import BS5Pagination2 from '@/components/common/bs5-pagination2';
import style from '@/styles/productbackend.module.css';
import Link from 'next/link';
import { FaPen } from 'react-icons/fa';
import { FaRegTrashCan } from 'react-icons/fa6';

export default function OrderList() {
  const [Orderlist, setOrderlist] = useState([]);
  const [total, setTotal] = useState(0); // 總筆數
  const [pageCount, setPageCount] = useState(0); // 總頁數
  const [isLoading, setIsLoading] = useState(true); // 用於判斷資料是否加載完成
  const [page, setPage] = useState(1); // 分頁用
  const [perpage, setPerpage] = useState(16);

  const getOrderlist = async (params = {}) => {
    const baseURL = 'http://localhost:3005/api/orderlist';
    const searchParams = new URLSearchParams(params);
    const qs = searchParams.toString();
    const url = `${baseURL}?${qs}`;

    try {
      const res = await fetch(url);
      const resData = await res.json();

      if (
        resData.status === 'success' &&
        Array.isArray(resData.data.Orderlist)
      ) {
        setPageCount(resData.data.pageCount);
        setTotal(resData.data.total);
        setOrderlist(resData.data.Orderlist);
      } else {
        console.error('獲取訂單資料失敗或資料格式不正確');
      }
    } catch (e) {
      console.error('API 錯誤:', e);
    } finally {
      setIsLoading(false); // 資料加載完成
    }
  };

  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      const params = { page, perpage };
      getOrderlist(params);
    }
  }, [page, perpage]);

  return (
    <>
      <BeNavbar title="首頁 - 後臺管理" />
      <div className="container">
        {isLoading ? (
          <p>資料加載中...</p> // 資料加載中的提示
        ) : (
          <table className="table table-bordered table-striped">
            <thead>
              <BS5Pagination2
                className={style.page}
                forcePage={page - 1}
                pageCount={pageCount}
                onPageChange={(e) => setPage(e.selected + 1)}
              />
              <p>筆數 {total}</p>
              <tr>
                <th>訂單編號</th>
                <th>下訂日期</th>
                <th>會員帳號</th>
                <th>會員姓名</th>
                <th>是否付款</th>
                <th>付款方式</th>
                <th>寄送方式</th>
                <th>運費</th>
                <th>總金額</th>
                <th>訂單狀態</th>
                <th>地址</th>
                <th>明細</th>
              </tr>
            </thead>
            <tbody>
              {Orderlist.map((ol) => (
                <tr key={ol.orderlist_id}>
                  <td>{ol.orderlist_id}</td>
                  <td>{ol.order_date}</td>
                  <td>{ol.member_id || '無資料'}</td>
                  <td>{ol.member_name || '無資料'}</td>
                  <td>{ol.pay_ornot || '無資料'}</td>
                  <td>{ol.pay_id || '無資料'}</td>
                  <td>{ol.send_id}</td>
                  <td>{ol.send_tax}</td>
                  <td>{ol.total_price}</td>
                  <td>{ol.order_status}</td>
                  <td>{ol.recipient_address || '無資料'}</td>
                  <td>{ol.order_detail_id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
