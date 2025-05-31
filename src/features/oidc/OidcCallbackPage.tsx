import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { api } from '@configs';

function OidcCallbackPage() {
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get('code');
    const error = searchParams.get('error');

    if (error) {
      console.error(
        'Authorization error:',
        error,
        searchParams.get('error_description')
      );
      return;
    }

    if (code) {
      // Exchange authorization code for tokens

      api
        .post(
          '/oidc-provider/oidc/token',
          {
            grant_type: 'authorization_code',
            code,
            redirect_uri: `${import.meta.env.VITE_API_HOST}/front/cb`,
            client_id: 'oidc_client',
            client_secret: 'a_different_secret',
            code_verifier: localStorage.getItem('code_verifier'), // Retrieve stored code verifier
          },
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            withCredentials: true,
          }
        )
        .then(() => {
          window.close();
        })
        .catch((err) => {
          console.error('Token exchange error:', err);
          window.close();
        });
    }
  }, [location]);

  return <div>Processing authorization...</div>;
}

export default OidcCallbackPage;
