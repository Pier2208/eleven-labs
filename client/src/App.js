import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import * as ROUTES from './constants/routes';
import Layout from './components/Layout';
import { AstronautProvider } from './context/astronaut';
import { TeamProvider } from './context/team';

const Home = lazy(() => import('./pages/Home'));
const AddEditAstronaut = lazy(() => import('./pages/AddEditAstronaut'));
const NotFound = lazy(() => import('./pages/NotFound'));

const App = () => {
  return (
    <Router>
      <TeamProvider>
        <AstronautProvider>
          <Layout>
            <Suspense fallback={<p>Loading...</p>}>
              <Routes>
                <Route path={ROUTES.HOME} element={<Home />} />
                <Route path={ROUTES.ADD} element={<AddEditAstronaut />} />
                <Route path={`${ROUTES.EDIT}:id`} element={<AddEditAstronaut />} />
                <Route component={NotFound} />
              </Routes>
            </Suspense>
          </Layout>
        </AstronautProvider>
      </TeamProvider>
    </Router>
  );
};

export default App;
