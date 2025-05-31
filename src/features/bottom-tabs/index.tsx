import { type FC } from 'react';
import cla from 'classnames';
import { useLocation, useNavigate } from 'react-router-dom';

import css from './index.module.css';
import { buttons } from './bottom-tabs.api';
import { routes } from '@configs';

const BottomTabs: FC = function () {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className={css.container}>
      <div className={css.divider} />

      <div className={css.iconsContainer}>
        {buttons.map(({ path, icon, activeIcon }) => (
          <img
            key={path}
            className={cla(css.icon, {
              [css.active]: location.pathname === path,
              [css.plus]: path === routes.add.path,
            })}
            src={location.pathname === path ? activeIcon : icon}
            onClick={() => navigate(path)}
            alt={`${path.slice(1)} icon`}
          />
        ))}
      </div>
    </div>
  );
};

export default BottomTabs;
