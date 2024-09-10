import Navbar from './navbar'
import Footer from './footer'

export default function DefaultLayout({ children }) {
  return (
    <>
    <useMedia>
      <Navbar />
      <main>{children}</main>
      <Footer />
      </useMedia>
    </>
  )
}
