import style from '@/styles/productlist.module.css';
import { useRouter } from 'next/router';

export default function Banner() {
  let sampleLocation = useRouter();
  let myParams = sampleLocation.asPath;

  switch (myParams) {
    case '/product/list?type=%E7%B2%BE%E9%81%B8%E5%92%96%E5%95%A1':
      return <img className={style.banner} src={`/img/beans.png`} alt="" />;
    case '/product/list?type=%E6%8E%A8%E8%96%A6%E9%80%81%E7%A6%AE':
      return <img className={style.banner} src={`/img/gift.png`} alt="" />;
    case '/product/list?type=%E5%AD%A3%E7%AF%80%E9%99%90%E5%AE%9A':
      return <img className={style.banner} src={`/img/season.png`} alt="" />;
    default:
      return <img className={style.banner} src={`/img/all.png`} alt="" />;
  }
}
