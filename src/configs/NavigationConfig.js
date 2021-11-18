import {
  DashboardOutlined,
  ShoppingOutlined,
  DropboxOutlined,
  TeamOutlined,
  UserOutlined,
  UnorderedListOutlined,
  FileOutlined,
} from '@ant-design/icons';

import { APP_PREFIX_PATH } from 'configs/AppConfig';
import navigationAdminConfig from './NavigationAdminConfig';

// const dashBoardNavTree = [
//   {
//     key: 'home',
//     title: 'main_menu',
//     icon: DashboardOutlined,
//     breadcrumb: false,
//     submenu: [
//       {
//         key: 'home',
//         path: `${APP_PREFIX_PATH}/admin`,
//         title: 'home',
//         icon: DashboardOutlined,
//         breadcrumb: false,
//         submenu: [],
//       },
//     ],
//   },
// ];

const productNavTree = [
  {
    key: 'quadrants',
    title: 'quadrants',
    breadcrumb: true,
    submenu: [


      {
        key: 'todo',
        title: 'Todo',
        icon: UserOutlined,
        breadcrum: true,
        submenu: [
          {
            key: 'todo_list',
            path: `${APP_PREFIX_PATH}/todo/list`,
            title: 'List',
            breadcrum: true,
            submenu: [],
          },
        ],
      },
 
    ],
  },
];

const navigationConfig = [...productNavTree];
// ..dashBoardNavTree

export default navigationConfig;
