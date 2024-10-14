import React from 'react';
export default function BeNavbar() {
  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="http://localhost:3000/product/backend">
            商品後台
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="http://localhost:3000/product/backend"
                >
                  首頁
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="http://localhost:3000/product/backend/add"
                >
                  新增商品
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
