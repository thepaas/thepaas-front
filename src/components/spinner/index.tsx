import type { FC, HTMLProps } from 'react';

import spinnerIcon from '@assets/icons/spinner.gif';

const Spinner: FC<HTMLProps<HTMLDivElement>> = (props) => (
  <div {...props}>
    <img style={{ height: 50 }} src={spinnerIcon} />
  </div>
);

export default Spinner;
