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

interface PageData {
  name: string,
  path: string
  isPrivate: boolean,
  component: ComponentType
}

interface PageSectionData {
  name: string
  icon: string
  subItens: PageData[]
}

const dashboard: PageData[] = [
  {
    name: 'Dashboard',
    path: '/',
    isPrivate: true,
    component: Dashboard
  }
]

const chat: PageData[] = [
  {
    name: 'Chat',
    path: '/chat',
    isPrivate: true,
    component: Chat
  }
]

const products: PageData[] = [
  {
    name: 'Listar Produtos',
    path: '/produtos/lista',
    isPrivate: true,
    component: ListProducts
  },
  {
    name: 'Novo Produto',
    path: '/produtos/novo',
    isPrivate: true,
    component: AddProduct
  },
  {
    name: 'Categorias',
    path: '/produtos/categorias',
    isPrivate: true,
    component: AddCategory
  }
]

const posts: PageData[] = [
  {
    name: 'Novo Post',
    path: '/post/novo',
    isPrivate: true,
    component: AddPost
  },
  {
    name: 'Categorias',
    path: '/post/novo',
    isPrivate: true,
    component: AddPostCategory
  }
]

const orders: PageData[] = [
  {
    name: 'Lista de Pedidos',
    path: '/pedidos',
    isPrivate: true,
    component: OrderList
  }
]

const users: PageData[] = [
  {
    name: 'Lista de Usuários',
    path: '/usuarios/lista',
    isPrivate: true,
    component: UserList
  }
]

const settings: PageData[] = [
  {
    name: 'Geral',
    path: '/configuracoes/geral',
    isPrivate: true,
    component: GeneralSettings
  },
  {
    name: 'Sobre a Empresa',
    path: '/configuracoes/sobre',
    isPrivate: true,
    component: AboutCompany
  },
  {
    name: 'Redes Sociais',
    path: '/configuracoes/redes-sociais',
    isPrivate: true,
    component: SocialMedia
  }
]

export const pageSections: PageSectionData[] = [
  {
    name: 'Dashboard',
    icon: 'fa-columns',
    subItens: dashboard
  },
  {
    name: 'Chat',
    icon: 'fa-comments',
    subItens: chat
  },
  {
    name: 'Produtos',
    icon: 'fa-box-open',
    subItens: products
  },
  {
    name: 'Vendas',
    icon: 'fa-shopping-bag',
    subItens: orders
  },
  {
    name: 'Clientes',
    icon: 'fa-users',
    subItens: users
  },
  {
    name: 'Blog',
    icon: 'fa-file-alt',
    subItens: posts
  },
  {
    name: 'Configurações',
    icon: 'fa-cog',
    subItens: settings
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
