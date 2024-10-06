// boostrap5 sytle pagination
import ReactPaginate from 'react-paginate';
import style from '@/styles/productlist.module.css';

export default function BS5Pagination2({ forcePage, onPageChange, pageCount }) {
  return (
    <ReactPaginate
      forcePage={forcePage}
      nextLabel="下一頁 >"
      onPageChange={onPageChange}
      pageRangeDisplayed={3}
      marginPagesDisplayed={2}
      pageCount={pageCount}
      previousLabel="< 上一頁"
      pageClassName="page-item"
      pageLinkClassName="page-link"
      previousClassName="page-item"
      previousLinkClassName="page-link"
      nextClassName="page-item"
      nextLinkClassName="page-link"
      breakLabel="..."
      breakClassName="page-item"
      breakLinkClassName="page-link"
      containerClassName="pagination"
      activeClassName="active"
      renderOnZeroPageCount={null}
    />
  )
}
