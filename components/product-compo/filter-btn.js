import React from 'react';
import style from '@/styles/productlist.module.css';
import { FaFilter } from 'react-icons/fa';

export default function Filterbtn() {
  return (
    <div className={style.filter_btn}>
      <FaFilter className={style.fafilter} />
      篩選
    </div>
  );
}
