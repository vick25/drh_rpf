import Navbar from "../../components/dashboard/navbar/navbar"
import Sidebar from "../../components/dashboard/sidebar/sidebar"
import styles from "../../components/dashboard/dashboard.module.css"
import Footer from "../../components/dashboard/footer/footer"
import { Suspense } from "react"
import Loading from "./loading"

const Layout = ({ children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <Sidebar />
      </div>

      <div className={styles.content}>
        <Navbar />
        <Suspense fallback={<Loading />}>
          {children}
        </Suspense>
        <Footer />
      </div>
    </div>
  )
}

export default Layout