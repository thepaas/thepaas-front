import { useParams } from 'react-router-dom';

function OidcAuthorizationPage() {
  const { uid } = useParams();

  return (
    <div
      style={{
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <form
        autoComplete='off'
        action={`/oidc-provider/interaction/${uid}/confirm`}
        method='post'
      >
        <button type='submit' className='login login-submit'>
          Grant permission
        </button>
      </form>
    </div>
  );
}

export default OidcAuthorizationPage;
