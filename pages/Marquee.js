import React from 'react';
import style from 'styles/Marquee.module.css'; // 引入 CSS 文件

const Marquee = ({ text }) => {
  return (
    <div className={style.bigdiv}>
    <div className={style.marqueecontainer}>
      <div className={style.marqueecontent}>
        {text}
      </div>
    </div>
    </div>
  );
};

export default Marquee;
