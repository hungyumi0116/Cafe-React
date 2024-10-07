import React, { useEffect, useState } from 'react';

const FinishOrder = () => {
  const [orderInfo, setOrderInfo] = useState({
    orderlist_id: '',
    totalAmount: '',
    itemQty: '',
    orderItem: '',
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search); // 使用 window.location
    setOrderInfo({
      orderlist_id: params.get('orderlist_id'),
      totalAmount: params.get('totalAmount'),
      itemQty: params.get('itemQty'),
      orderItem: params.get('orderItem'),
    });
  }, []);

  return (
    <div>
      <h1>訂單完成</h1>
      <p>感謝您的購買，您的訂單已成功完成！</p>
      <p><strong>訂單編號：</strong> {orderInfo.orderlist_id}</p>
      <p><strong>訂單總金額：</strong> {orderInfo.totalAmount} 元</p>
      <p><strong>商品數量：</strong> {orderInfo.itemQty}</p>
      <p><strong>商品內容：</strong> {orderInfo.orderItem}</p>
    </div>
  );
};

export default FinishOrder;
