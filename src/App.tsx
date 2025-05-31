import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ArgentProvider } from './features/argent/argent-provider';
import { ToastContainer } from 'react-toastify';

// pages
import Home from '@pages/home';
import SignIn from '@pages/auth/sign-in';
import Add from '@pages/add';
import Government from '@pages/government';
import Events from '@pages/events';
import Milestones from '@pages/milestones';

import {
  OidcCallbackPage,
  OidcInteractionPage,
  OidcLoginButton,
  ProtectedRoute,
} from '@features';

function App() {
  return (
    <>
      <ToastContainer autoClose={5000} hideProgressBar />

      <ArgentProvider>
        <BrowserRouter>
          <Routes>
            {/* auth */}
            <Route path='/front/sign-in' element={<SignIn />} />

            {/* main */}
            <Route
              path='/front'
              element={<ProtectedRoute element={<Home />} />}
            />
            <Route
              path='/front/government'
              element={<ProtectedRoute element={<Government />} />}
            />
            <Route
              path='/front/add'
              element={<ProtectedRoute element={<Add />} />}
            />
            <Route
              path='/front/events'
              element={<ProtectedRoute element={<Events />} />}
            />
            <Route
              path='/front/milestones'
              element={<ProtectedRoute element={<Milestones />} />}
            />
            <Route path='*' element={<Home />} />

            {/* oidc */}
            <Route
              path='/front/oidc-login'
              element={
                <>
                  <OidcLoginButton />
                </>
              }
            />
            <Route
              path='/front/interaction/:uid'
              element={<OidcInteractionPage />}
            />
            <Route path='/front/cb' element={<OidcCallbackPage />} />
          </Routes>
        </BrowserRouter>
      </ArgentProvider>
    </>
  );
}

export default App;
