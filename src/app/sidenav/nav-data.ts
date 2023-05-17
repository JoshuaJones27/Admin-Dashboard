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
    items: [
      {
        routeLink: 'empresa/adicionarempresa',
        label: 'Criar Empresa',
      },
      {
        routeLink: 'empresa/gerarconvite',
        label: 'Convite Grupo',
      },
    ],
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
        routeLink: 'utilizadores/registarutilizador',
        label: 'Registar Utilizador',
      },
    ],
  },
  {
    routeLink: 'pedidos',
    icon: 'fal fa-inbox',
    label: 'Pedidos',
    items: [
      {
        routeLink: 'pedidos/fazerpedido',
        label: 'Fazer Pedido',
      },
      {
        routeLink: 'pedidos/editarpedido',
        label: 'Editar Pedido',
      },
      {
        routeLink: 'pedidos/criaropcaopedido',
        label: 'Criar Opção Pedido',
      },
    ],
  },
  {
    routeLink: 'formulario',
    icon: 'fal fa-sticky-note',
    label: 'Formulario',
  },
];
