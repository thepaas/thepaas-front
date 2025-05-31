import { useState, type FC } from 'react';

import './index.css';
import GovImg from '@assets/icons/gov-black.png';
import TicketImg from '@assets/icons/ticket-black.png';
import FlagImg from '@assets/icons/flag-black.png';
import {
  credentialCategories,
  type CredentialCategories,
} from '@enums/credential-categories';

type Option = { name: CredentialCategories; icon: string };

const options: Option[] = [
  { name: credentialCategories.government, icon: GovImg },
  { name: credentialCategories.events, icon: TicketImg },
  { name: credentialCategories.milestone, icon: FlagImg },
];

type Props = {
  value: CredentialCategories;
  onChange: (selectedCategory: CredentialCategories) => void;
};

const CategorySelect: FC<Props> = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: CredentialCategories) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className='govt-select-wrapper'>
      <button
        className='govt-select'
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className='govt-text'>{value}</span>
        <img
          className='govt-icon'
          src={options.find((o) => o.name === value)?.icon}
        />
        <span className='dropdown-arrow'>▾</span>
      </button>
      {isOpen && (
        <ul className='govt-dropdown'>
          {options.map(({ name }) => (
            <li
              key={name}
              className='govt-option'
              onClick={() => handleSelect(name)}
            >
              {name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategorySelect;
