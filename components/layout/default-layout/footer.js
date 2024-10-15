import React, { useEffect, useState } from 'react';
import footer from '@/styles/footer.module.css';
import { GoArrowUp } from "react-icons/go";

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false); // 控制按鈕的可見性

  // 監聽滾動事件來顯示/隱藏按鈕
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) { // 當滾動超過300px時顯示按鈕
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // 點擊按鈕時滾動到頁面頂部
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // 'smooth' 提供平滑滾動效果
  };

  return (
    <>
      <footer className={footer.footer}>
        <p>© 2024 AND Cafe</p>
        {/* 返回頂部按鈕 */}
        {isVisible && (
          <button onClick={scrollToTop} className={footer.scrollToTopButton}>
            <GoArrowUp style={{ fontSize: '32px' }}/>
          </button>
        )}
      </footer>
    </>
  );
}
