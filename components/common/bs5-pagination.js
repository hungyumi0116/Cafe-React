// boostrap5 sytle pagination
import ReactPaginate from 'react-paginate';
import style from '@/styles/productlist.module.css';

export default function BS5Pagination({ forcePage, onPageChange, pageCount }) {
  return (
    <ReactPaginate
      forcePage={forcePage}
      nextLabel=">"
      onPageChange={onPageChange}
      pageRangeDisplayed={3}
      marginPagesDisplayed={2}
      pageCount={pageCount}
      previousLabel="<"
      pageClassName="pagenation"
      pageLinkClassName=""
      previousClassName="page-item"
      previousLinkClassName=""
      nextClassName="page-item"
      nextLinkClassName=""
      breakLabel="..."
      breakClassName="page-item"
      breakLinkClassName="pagination"
      containerClassName="pagination"
      activeClassName={style.pageactive}
      renderOnZeroPageCount={null}
    />
  );
}
