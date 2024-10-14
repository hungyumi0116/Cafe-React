import { useState } from 'react';
import style from '@/styles/productlist.module.css';
import { FaFilter } from 'react-icons/fa';
import 'react-responsive-modal/styles.css';
export default function Filterbtn() {
  return (
    <div>
      <FaFilter className={style.fafilter} />
      篩選器
    </div>
  );
}
