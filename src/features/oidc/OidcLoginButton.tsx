// import { randomBytes, createHash } from 'crypto';
// import { useCallback } from 'react';

import connectIcon from '@assets/images/connect.png';
import { useCredentials } from '@hooks/use-credentials';

function OidcLoginButton() {
  // Generate PKCE code verifier and challenge
  // const generateCodeVerifier = () => {
  //   const buffer = randomBytes(32);
  //   return buffer
  //     .toString('base64')
  //     .replace(/\+/g, '-')
  //     .replace(/\//g, '_')
  //     .replace(/=/g, '');
  // };

  // const generateCodeChallenge = (codeVerifier: string) => {
  //   const hash = createHash('sha256').update(codeVerifier).digest();
  //   return hash
  //     .toString('base64')
  //     .replace(/\+/g, '-')
  //     .replace(/\//g, '_')
  //     .replace(/=/g, '');
  // };

  // const handleLogin = useCallback(() => {
  //   const codeVerifier = generateCodeVerifier();
  //   const codeChallenge = generateCodeChallenge(codeVerifier);

  //   // Store code verifier for token exchange
  //   localStorage.setItem('code_verifier', codeVerifier);

  //   // Redirect to OIDC auth endpoint
  //   const authUrl = `${
  //     import.meta.env.VITE_API_HOST
  //   }/oidc-provider/oidc/auth?client_id=oidc_client&response_type=code&response_mode=query&redirect_uri=${
  //     import.meta.env.VITE_API_HOST
  //   }/front/cb&code_challenge=${codeChallenge}&code_challenge_method=S256&scope=openid`;
  //   window.location.href = authUrl;
  // }, []);

  const { credentials } = useCredentials();

  // useEffect(() => {
  //   if (!digitalIds.length) return;

  //   const message = { type: 'data', value: digitalIds };
  //   const targetOrigin = import.meta.env.VITE_TICKETS_HOST;

  //   window.opener.postMessage(message, targetOrigin);
  //   window.close();
  // }, [digitalIds]);

  const handleSubmit = () => {
    if (!credentials.length) return alert('No credentials found');

    const message = {
      type: 'data',
      value: credentials.map((c) => c.credential),
    };
    const targetOrigin = import.meta.env.VITE_TICKETS_HOST;
    window.opener.postMessage(message, targetOrigin);
    window.close();
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: '1rem',
      }}
    >
      <div
        onClick={handleSubmit}
        style={{
          marginTop: 'auto',
          backgroundColor: 'black',
          color: 'white',
          fontFamily: 'League Spartan',
          fontWeight: 'bold',
          padding: '12px 16px',
          borderRadius: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
        }}
      >
        <span>grant permission</span>
      </div>

      <img
        src={connectIcon}
        alt='Connection Logo'
        style={{ height: 65, marginTop: '3rem' }}
      />
    </div>
  );
}

export default OidcLoginButton;
