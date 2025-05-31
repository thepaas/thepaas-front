import cla from 'classnames';

import styles from './sign-in.module.css';
import { Page, Spinner } from '@components';
import { ArgentWalletConnector } from '@features';
import { useAuthorization } from './sign-in.hooks';
import icon from '@assets/images/logo.png';

const SignIn = () => {
  const { isLoading } = useAuthorization();

  return (
    <Page>
      <div className={styles.container}>
        <img src={icon} alt='Logo' className={styles.logo} />

        <div>
          <div
            className={cla([styles.submitButton], {
              [styles.hidden]: isLoading,
            })}
          >
            <ArgentWalletConnector />
          </div>

          <div className={styles.spinnerContainer}>
            {isLoading && <Spinner />}
          </div>

          {isLoading && (
            <p
              style={{
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 22,
                marginTop: 10,
              }}
            >
              loading...
            </p>
          )}
        </div>
      </div>
    </Page>
  );
};

export default SignIn;
