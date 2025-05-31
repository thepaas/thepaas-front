import homeImg from '@assets/icons/home-gray.png';
import homeActiveImg from '@assets/icons/home-black.png';
import govImg from '@assets/icons/gov-gray.png';
import govActiveImg from '@assets/icons/gov-black.png';
import plusImg from '@assets/icons/plus-gray.png';
import plusActiveImg from '@assets/icons/plus-black.png';
import ticketImg from '@assets/icons/ticket-gray.png';
import ticketActiveImg from '@assets/icons/ticket-black.png';
import flagImg from '@assets/icons/flag-gray.png';
import flagActiveImg from '@assets/icons/flag-black.png';
import { routes } from '@configs';

export const buttons: { path: string; icon: string; activeIcon: string }[] = [
  { path: routes.home.path, icon: homeImg, activeIcon: homeActiveImg },
  { path: routes.bank.path, icon: govImg, activeIcon: govActiveImg },
  { path: routes.add.path, icon: plusImg, activeIcon: plusActiveImg },
  { path: routes.ticket.path, icon: ticketImg, activeIcon: ticketActiveImg },
  { path: routes.government.path, icon: flagImg, activeIcon: flagActiveImg },
];
