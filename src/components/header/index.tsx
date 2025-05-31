import type { FC } from 'react';

import styles from './index.module.css';
import icon from '@assets/images/logo.png';
import { useNavigate } from 'react-router-dom';
import { routes } from '@configs';

const Header: FC = () => {
  const navigate = useNavigate();

  const logoClickHandler = () => navigate(routes.home.path);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <img
          src={icon}
          onClick={logoClickHandler}
          className={styles.logo}
          alt='Logo'
        />
      </div>

      <div className={styles.divider} />
    </div>
  );
};

export default Header;
