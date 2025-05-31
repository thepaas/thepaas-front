import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { api } from '@configs';
import OidcLoginPage from './OidcLoginPage';
import OidcAuthorizationPage from './OidcAuthorizationPage';

const OidcInteractionPage = () => {
  const { uid } = useParams<{ uid: string }>();

  const [promptName, setPromptName] = useState('');

  // Fetch interaction details
  useEffect(() => {
    api
      .get<{ promptName: string }>(
        `/oidc-provider/interaction/${uid}/details`,
        { withCredentials: true }
      )
      .then((r) => {
        setPromptName(r.data.promptName);
      })
      .catch((err) => {
        console.error('Error fetching interaction details:', err);
      });
  }, [uid]);

  if (promptName === 'login') {
    return <OidcLoginPage />;
  } else {
    return <OidcAuthorizationPage />;
  }
};

export default OidcInteractionPage;
