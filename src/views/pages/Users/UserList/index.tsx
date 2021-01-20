import React from 'react'
import PageContent from '../../../components/Common/PageContent'
import PageCard from '../../../components/Common/PageCard'
import { Table, UncontrolledTooltip } from 'reactstrap'
import { Link } from 'react-router-dom'
import { AdministratorData } from '../../../../services/api/administrator'

const UserList: React.FC = () => {
  const users: AdministratorData[] = []

  return (<PageContent>
    <PageCard title={'Lista de Usuários'} description={'Confira abaixo a lista de usuários cadastrados em sua loja'}>
      <div className="table-responsive">
        <Table className="table mb-0">
          <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>Telefone/E-mail</th>
            <th>Endereço</th>
            <th>Compras</th>
            <th>Data de Cadastro</th>
            <th>Ação</th>
          </tr>
          </thead>
          <tbody>
          {users.map((user, index) => {
            return (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>Rua Willian Saliba, 80, APT 302, Cidade Nobre - Ipatinga - MG</td>
                <td>R$ 50,00</td>
                <td>01/11/2020</td>
                <td>
                  <Link to={`/categoria/${user._id}`} className="mr-3 text-primary">
                    <i className="mdi mdi-pencil font-size-18 mr-3" id="edittooltip" />
                    <UncontrolledTooltip placement="top" target="edittooltip">
                      Visualizar
                    </UncontrolledTooltip>
                  </Link>
                  <Link to="#" className="text-danger">
                    <i className="mdi mdi-close font-size-18 mr-3" id="deletetooltip" />
                    <UncontrolledTooltip placement="top" target="deletetooltip"
                                         onClick={() => {}}>
                      Deletar
                    </UncontrolledTooltip>
                  </Link>
                </td>
              </tr>
            )
          })}
          </tbody>
        </Table>
      </div>
    </PageCard>
  </PageContent>)
}

export default UserList
