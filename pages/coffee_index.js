import Image from "next/image"

export default function Test() {
  return (
    <>
    <div>
<div id="carouselExample" className="carousel slide">
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src="/coffee 2.svg" className="d-block w-100" alt="..." />
    </div>
    <div className="carousel-item">
      <img src="/coffee 2.svg" className="d-block w-100" alt="..." />
    </div>
    <div className="carousel-item">
      <img src="/coffee 2.svg" className="d-block w-100" alt="..." />
    </div>
  </div>
  <button
    className="carousel-control-prev"
    type="button"
    data-bs-target="#carouselExample"
    data-bs-slide="prev"
  >
    <span className="carousel-control-prev-icon" aria-hidden="true" />
    <span className="visually-hidden">Previous</span>
  </button>
  <button
    className="carousel-control-next"
    type="button"
    data-bs-target="#carouselExample"
    data-bs-slide="next"
  >
    <span className="carousel-control-next-icon" aria-hidden="true" />
    <span className="visually-hidden">Next</span>
  </button>
</div>

  <img src="品牌理念.svg" className="img-fluid w-100
  " alt="..." />
</div>

    </>
  )
}