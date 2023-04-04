import { INavbarData } from './helper';

export const navbarData: INavbarData[] = [
  {
    routeLink: 'dashboard',
    icon: 'fal fa-chart-bar',
    label: 'Dashboard',
  },
  {
    routeLink: 'empresa',
    icon: 'fal fa-building',
    label: 'Empresa',
  },
  {
    routeLink: 'utilizadores',
    icon: 'fal fa-users',
    label: 'Utilizadores',
    items: [
      {
        routeLink: 'utilizadores/gerarconvite',
        label: 'Convite',
      },
      {
        routeLink: 'utilizadores/outracoisa',
        label: 'Outra Coisa',
      },
    ],
  },
];
