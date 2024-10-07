import React from 'react';
// import LoadingImageSvg from './loading-image-svg'

import Link from 'next/link';
import style from '@/styles/productlist.module.css';

export default function ProductCard({ item }) {
  if (item.p_discount < item.p_price) {
    return (
      <Link className={style.card} href={`/product/${item.p_id}`}>
        <div>
          <div>
            <img className={style.saletag} src={`/img/sale.png`} alt="" />
          </div>
          <img
            className={style.cardimg}
            src={`http://localhost:3005/img/${item.p_pic1}`}
            alt="..."
          />
          <div className={style.cardtitle}>
            <p>{item.p_name}</p>
            <div className={style.price_block}>
              <p className={style.price_ori}>(原價NT.{item.p_price})</p>
              <p className={style.price_sale}>NT.{item.p_discount}</p>
            </div>
          </div>
        </div>
      </Link>
    );
  } else if (item.p_discount > item.p_price) {
    <Link className={style.card} href={`/product/${item.p_id}`}>
      <div>
        <img className={style.cardimg} src={`http://localhost:3005/img/${item.p_pic1}`} alt="..." />
        <div className={style.cardtitle}>
          <p>{item.p_name}</p>
          <p>NT.{item.p_price}</p>
        </div>
      </div>
    </Link>;
  }

  return (
    <>
      <Link className={style.card} href={`/product/${item.p_id}`}>
        <div>
          <img
            className={style.cardimg}
            src={`http://localhost:3005/img/${item.p_pic1}`}
            alt="..."
          />
          <div className={style.cardtitle}>
            <p>{item.p_name}</p>
            <p>NT.{item.p_price}</p>
          </div>
        </div>
      </Link>
    </>
  );
}
