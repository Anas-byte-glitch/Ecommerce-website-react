import './App.css'
import AppRouter from './router/AppRouter'

/**
 * App
 * Single responsibility: mount the router.
 * All layout and routing logic lives in AppRouter.
 */
function App() {
  return <AppRouter />
}

export default App