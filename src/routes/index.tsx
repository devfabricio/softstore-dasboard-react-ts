import React from 'react'
import { Switch } from 'react-router-dom'
import Route from './Route'
import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'
import AddProduct from '../pages/Products/AddProduct'
import ProductCategories from '../pages/Products/ProductCategories'
import ListProducts from '../pages/Products/ListProducts'
import EditProduct from '../pages/Products/EditProduct'
import ListInboxMessage from '../pages/Messages/ListInboxMessages'
import SingleInboxMessage from '../pages/Messages/SingleInboxMessage'

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path={'/login'} component={Login} />
      <Route path={'/produtos/lista'} exact isPrivate={true} component={ListProducts} />
      <Route path={'/produtos/adicionar'} exact isPrivate={true} component={AddProduct} />
      <Route path={'/produtos/categorias'} exact isPrivate={true} component={ProductCategories} />
      <Route path={'/produto/:id'} exact isPrivate={true} component={EditProduct} />
      <Route path={'/mensagens/:inboxId'} exact isPrivate={true} component={SingleInboxMessage} />
      <Route path={'/mensagens'} exact isPrivate={true} component={ListInboxMessage} />
      <Route path={'/'} isPrivate={true} exact component={Dashboard} />
    </Switch>
  )
}

export default Routes
