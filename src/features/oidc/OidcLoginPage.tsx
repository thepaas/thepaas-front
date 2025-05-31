import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

function OidcLoginPage() {
  const { uid } = useParams<{ uid: string }>();

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (formRef.current) {
      formRef.current.submit();
    }
  }, []);

  return (
    <form
      ref={formRef}
      autoComplete='off'
      action={`/oidc-provider/interaction/${uid}/login`}
      method='post'
      style={{ visibility: 'hidden' }}
    >
      <input
        required
        defaultValue='basic user'
        type='text'
        name='login'
        placeholder='Enter any login'
      />
      <input
        required
        defaultValue='basic password'
        type='password'
        name='password'
        placeholder='and password'
      />

      <button type='submit' className='login login-submit'>
        Sign-in
      </button>
    </form>
  );
}

export default OidcLoginPage;
