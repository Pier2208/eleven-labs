import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import * as ROUTES from './constants/routes';
import Layout from './components/Layout';

const Home = lazy(() => import('./pages/Home'));
const AddAstronaut = lazy(() => import('./pages/AddAstronaut'));
const EditAstronaut = lazy(() => import('./pages/EditAstronaut'));
const NotFound = lazy(() => import('./pages/NotFound'));

const App = () => {
  return (
    <Router>
      <Layout>
        <Suspense fallback={<p>Loading...</p>}>
          <Routes>
            <Route path={ROUTES.HOME} element={<Home />} />
            <Route path={ROUTES.ADD} element={<AddAstronaut />} />
            <Route path={ROUTES.EDIT} element={<EditAstronaut />} />
            <Route component={NotFound} />
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  );
};

export default App;
