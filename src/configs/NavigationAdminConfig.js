import { 
  DashboardOutlined,ShoppingOutlined
} from '@ant-design/icons';
import { APP_PREFIX_PATH } from 'configs/AppConfig'

const adminNavTree = [
    {
      key: 'admin',
      title: 'Admin',
      icon: DashboardOutlined,
      breadcrumb: false,
      submenu: [
          {
              key: 'admin',
              path: `${APP_PREFIX_PATH}/home`,
              title: 'Settings',
              icon: DashboardOutlined,
              breadcrumb: false,
              submenu: []
          }
      ]
    }
]


const navigationAdminConfig = [
  ...adminNavTree
]

export default navigationAdminConfig;
