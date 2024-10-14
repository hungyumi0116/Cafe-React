import { useState } from 'react';
import Link from 'next/link';
import style from '@/styles/categoraylist.module.css';

export default function Categoraylist() {
  const [categoraylist, setCategorayList] = useState([]);
  const type = ['精選咖啡', '季節限定', '推薦送禮'];

  return (
    <>
      <div className={style.categoraylist_block}>
        <Link href={`/product/list`} className={style.categoraylist}>
          所有商品
        </Link>
        {type.map((v, i) => {
          return (
            <Link
              className={style.categoraylist}
              href={`/product/list?type=${v}`}
              key={i}
            >
              {v}
            </Link>
          );
        })}
      </div>
    </>
  );
}
