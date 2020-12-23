import { ComponentType } from 'react'
import Dashboard from '../views/pages/Dashboard'
import ListProducts from '../views/pages/Products/ListProducts'
import AddProduct from '../views/pages/Products/AddProduct'
import AddCategory from '../views/pages/Products/AddCategory'

type PageSectionsTypes = 'dashboard' | 'products' | 'sales' | 'finantial' | 'costumers' | 'posts' | 'store'

interface PageData {
  name: string,
  path: string
  isPrivate: boolean,
  component: ComponentType
  section: PageSectionsTypes
}

interface PageSectionData {
  id: PageSectionsTypes
  name: string
}

export const pageSections: PageSectionData[] = [
  {
    id: 'dashboard',
    name: 'Dashboard'
  },
  {
    id: 'products',
    name: 'Produtos'
  },
  {
    id: 'sales',
    name: 'Vendas'
  },
  {
    id: 'finantial',
    name: 'Financeiro'
  },
  {
    id: 'costumers',
    name: 'Clientes'
  },
  {
    id: 'posts',
    name: 'Publicações'
  },
  {
    id: 'store',
    name: 'Loja'
  }
]

export const pages: PageData[] = [
  {
    name: 'Dashboard',
    path: '/',
    isPrivate: true,
    component: Dashboard,
    section: 'dashboard'
  },
  {
    name: 'Listar Produtos',
    path: '/produtos/lista',
    isPrivate: true,
    component: ListProducts,
    section: 'products'
  },
  {
    name: 'Novo Produto',
    path: '/produtos/novo',
    isPrivate: true,
    component: AddProduct,
    section: 'products'
  },
  {
    name: 'Categorias',
    path: '/produtos/categorias',
    isPrivate: true,
    component: AddCategory,
    section: 'products'
  }
]
