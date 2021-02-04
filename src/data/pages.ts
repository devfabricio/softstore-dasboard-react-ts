import { ComponentType } from 'react'
import Dashboard from '../views/pages/Dashboard'
import ListProducts from '../views/pages/Products/ListProducts'
import AddProduct from '../views/pages/Products/AddProduct'
import AddCategory from '../views/pages/Products/AddCategory'
import GeneralSettings from '../views/pages/Settings/General'
import AboutCompany from '../views/pages/Settings/AboutCompany'
import SocialMedia from '../views/pages/Settings/SocialMedia'
import UserList from '../views/pages/Users/UserList'
import AddPost from '../views/pages/Posts/AddPost'
import AddPostCategory from '../views/pages/Posts/AddCategory'
import OrderList from '../views/pages/Orders/OrderList'
import Chat from '../views/pages/Chat'
import AddCustomizedImage from '../views/pages/Products/AddCustomizedImage'

interface PageData {
  name: string,
  path: string
  isPrivate: boolean
  isVisible: boolean
  component: ComponentType
}

interface PageSectionData {
  name: string
  icon: string
  subItens: PageData[]
  isVisible: boolean
}

const dashboard: PageData[] = [
  {
    name: 'Dashboard',
    path: '/',
    isPrivate: true,
    component: Dashboard,
    isVisible: true
  }
]

const chat: PageData[] = [
  {
    name: 'Chat',
    path: '/chat',
    isPrivate: true,
    component: Chat,
    isVisible: false
  }
]

const products: PageData[] = [
  {
    name: 'Listar Produtos',
    path: '/produtos/lista',
    isPrivate: true,
    component: ListProducts,
    isVisible: true
  },
  {
    name: 'Novo Produto',
    path: '/produtos/novo',
    isPrivate: true,
    component: AddProduct,
    isVisible: true
  },
  {
    name: 'Categorias',
    path: '/produtos/categorias',
    isPrivate: true,
    component: AddCategory,
    isVisible: true
  },
  {
    name: 'Imagens Personalizadas',
    path: '/produtos/imagens',
    isPrivate: true,
    component: AddCustomizedImage,
    isVisible: true
  }
]

const posts: PageData[] = [
  {
    name: 'Novo Post',
    path: '/post/novo',
    isPrivate: true,
    component: AddPost,
    isVisible: true
  },
  {
    name: 'Categorias',
    path: '/post/novo',
    isPrivate: true,
    component: AddPostCategory,
    isVisible: true
  }
]

const orders: PageData[] = [
  {
    name: 'Lista de Pedidos',
    path: '/pedidos',
    isPrivate: true,
    component: OrderList,
    isVisible: true
  }
]

const users: PageData[] = [
  {
    name: 'Lista de Usuários',
    path: '/usuarios/lista',
    isPrivate: true,
    component: UserList,
    isVisible: true
  }
]

const settings: PageData[] = [
  {
    name: 'Geral',
    path: '/configuracoes/geral',
    isPrivate: true,
    component: GeneralSettings,
    isVisible: true
  },
  {
    name: 'Sobre a Empresa',
    path: '/configuracoes/sobre',
    isPrivate: true,
    component: AboutCompany,
    isVisible: true
  },
  {
    name: 'Redes Sociais',
    path: '/configuracoes/redes-sociais',
    isPrivate: true,
    component: SocialMedia,
    isVisible: true
  }
]

export const pageSections: PageSectionData[] = [
  {
    name: 'Dashboard',
    icon: 'fa-columns',
    subItens: dashboard,
    isVisible: true
  },
  {
    name: 'Chat',
    icon: 'fa-comments',
    subItens: chat,
    isVisible: false
  },
  {
    name: 'Produtos',
    icon: 'fa-box-open',
    subItens: products,
    isVisible: true
  },
  {
    name: 'Vendas',
    icon: 'fa-shopping-bag',
    subItens: orders,
    isVisible: false
  },
  {
    name: 'Clientes',
    icon: 'fa-users',
    subItens: users,
    isVisible: false
  },
  {
    name: 'Blog',
    icon: 'fa-file-alt',
    subItens: posts,
    isVisible: false
  },
  {
    name: 'Configurações',
    icon: 'fa-cog',
    subItens: settings,
    isVisible: true
  }
]

export const pages: PageData[] = [
  ...dashboard,
  ...chat,
  ...products,
  ...orders,
  ...posts,
  ...users,
  ...settings
]
