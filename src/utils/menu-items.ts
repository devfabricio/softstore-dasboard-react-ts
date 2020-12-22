import { IconType } from 'react-icons'
import { BsFillInboxFill, BsFillBagFill, BsFillTagFill, BsTextLeft, BsHeartFill, BsFillPeopleFill } from 'react-icons/bs'
import { FaRegMoneyBillAlt } from 'react-icons/fa'

interface MenuSubItems {
  itemName: string,
  itemUrl: string
}

interface MenuItems {
  itemName: string,
  icon: IconType
  subItems: MenuSubItems[]
}

export const menuSidebarItems: MenuItems[] = [
  {
    itemName: 'Painel Principal',
    icon: BsFillInboxFill,
    subItems: [
      {
        itemName: 'Dashboard 1',
        itemUrl: '/dashboard1'
      },
      {
        itemName: 'Dashboard 2',
        itemUrl: '/dashboard1'
      },
      {
        itemName: 'Dashboard 3',
        itemUrl: '/dashboard1'
      }
    ]
  },
  {
    itemName: 'Vendas',
    icon: FaRegMoneyBillAlt,
    subItems: [
      {
        itemName: 'Listar vendas',
        itemUrl: '/interface1'
      }
    ]
  },
  {
    itemName: 'Mensagens',
    icon: BsFillInboxFill,
    subItems: [
      {
        itemName: 'Listar mensagens',
        itemUrl: '/mensagens'
      },
      {
        itemName: 'Adicionar ofertas',
        itemUrl: '/interface2'
      }
    ]
  },
  {
    itemName: 'Produtos',
    icon: BsFillBagFill,
    subItems: [
      {
        itemName: 'Listar Produtos',
        itemUrl: '/produtos/lista'
      },
      {
        itemName: 'Adicionar Produtos',
        itemUrl: '/produtos/adicionar'
      },
      {
        itemName: 'Categorias',
        itemUrl: '/produtos/categorias'
      }
    ]
  },
  {
    itemName: 'Ofertas',
    icon: BsFillTagFill,
    subItems: [
      {
        itemName: 'Listar ofertas',
        itemUrl: '/interface1'
      },
      {
        itemName: 'Adicionar ofertas',
        itemUrl: '/interface2'
      }
    ]
  },
  {
    itemName: 'Usuários',
    icon: BsFillPeopleFill,
    subItems: [
      {
        itemName: 'Listar Usuários',
        itemUrl: '/interface1'
      }
    ]
  },
  {
    itemName: 'Publicações',
    icon: BsTextLeft,
    subItems: [
      {
        itemName: 'Listar posts',
        itemUrl: '/interface1'
      },
      {
        itemName: 'Criar nova publicação',
        itemUrl: '/interface2'
      }
    ]
  },
  {
    itemName: 'Depoimentos',
    icon: BsHeartFill,
    subItems: [
      {
        itemName: 'Listar depoimentos',
        itemUrl: '/interface1'
      }
    ]
  }
]
