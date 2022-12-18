import {
  HashRouter,
  Route,
  Routes,
  BrowserRouter as Router,
} from 'react-router-dom';
import { Home, NotFound } from './pages/index';

export function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export function WrappedApp() {
  return (
    <HashRouter>
      <App />
    </HashRouter>
  );
}
