// boostrap5 sytle pagination
import ReactPaginate from 'react-paginate';
import style from '@/styles/productlist.module.css';

export default function BS5Pagination({ forcePage, onPageChange, pageCount }) {
  return (
    <ReactPaginate
      forcePage={forcePage}
      nextLabel="下一頁 >"
      onPageChange={onPageChange}
      pageRangeDisplayed={3}
      marginPagesDisplayed={2}
      pageCount={pageCount}
      previousLabel="< 上一頁"
      pageClassName="pagenation"
      pageLinkClassName=""
      previousClassName="page-item"
      previousLinkClassName=""
      nextClassName="page-item"
      nextLinkClassName=""
      breakLabel="..."
      breakClassName="page-item"
      breakLinkClassName=""
      containerClassName="pagination"
      activeClassName={style.pageactive}
      renderOnZeroPageCount={null}
    />
  );
}
