import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import MainLayout from '../layouts/MainLayout'
// import DashboardLayout from '../layouts/DashboardLayout'

// Public pages
import HomePage from '../pages/HomePage'
import ShopPage from '../pages/ShopPage'
import ProductDetailPage from '../pages/ProductDetailPage'
import CartPage from '../pages/CartPage'
import CheckoutPage from '../pages/CheckoutPage'
import LoginPage from '../pages/LoginPage'
import AboutPage from '../pages/AboutPage'
import ContactPage from '../pages/ContactPage'

// Dashboard pages
// import DashboardOverviewPage from '../pages/dashboard/DashboardOverviewPage'
// import ProductsManagementPage from '../pages/dashboard/ProductsManagementPage'
// import OrdersManagementPage from '../pages/dashboard/OrdersManagementPage'
// import CustomersPage from '../pages/dashboard/CustomersPage'

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ── Public routes (Navbar + Footer) ── */}
        <Route element={<MainLayout />}>
          <Route path="/"              element={<HomePage />} />
          <Route path="/shop"          element={<ShopPage />} />
          <Route path="/shop/:id"      element={<ProductDetailPage />} />
          <Route path="/cart"          element={<CartPage />} />
          <Route path="/checkout"      element={<CheckoutPage />} />
          <Route path="/about"         element={<AboutPage />} />
          <Route path="/contact"       element={<ContactPage />} />
        </Route>

        {/* ── Auth routes (no layout) ── */}
        <Route path="/login"    element={<LoginPage />} />

        {/* ── Dashboard routes (Sidebar only, no Navbar/Footer) ── */}
        {/* <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Navigate to="overview" replace />} />
          <Route path="overview"  element={<DashboardOverviewPage />} />
          <Route path="products"  element={<ProductsManagementPage />} />
          <Route path="orders"    element={<OrdersManagementPage />} />
          <Route path="customers" element={<CustomersPage />} />
        </Route> */}

        {/* ── 404 fallback ── */}
        {/* <Route path="*" element={<Navigate to="/" replace />} /> */}

      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter