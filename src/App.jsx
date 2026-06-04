import './App.css'
import AppRouter from './router/AppRouter'
import { CartProvider } from './context/CartContext'

/**
 * App
 * Single responsibility: mount the router.
 * All layout and routing logic lives in AppRouter.
 */
function App() {
  return (
    <CartProvider>
      <AppRouter />
    </CartProvider>
  )
}

export default App
