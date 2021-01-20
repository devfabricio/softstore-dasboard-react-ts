import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { isEmpty, map } from 'lodash'
import { format } from 'date-fns'
import {
  Button,
  Card,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  Media,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
  UncontrolledDropdown,
  UncontrolledTooltip
} from 'reactstrap'
import classnames from 'classnames'
import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css'
import images from '../../../assets/images'
import PageContent from '../../components/Common/PageContent'

const Chat: React.FC<any> = (props) => {
  console.log('chegou aqui no chat')
  const { chats = [], groups = [], contacts = [], messages = [] } = props
  const [messageBox, setMessageBox] = useState<any>(null)
  // const Chat_Box_Username2 = "Henry Wells"
  const [currentRoomId, setCurrentRoomId] = useState(1)
  // eslint-disable-next-line no-unused-vars
  const [currentUser, setCurrentUser] = useState({
    name: 'Henry Wells',
    isActive: true
  })
  const [notificationMenu, setnotificationMenu] = useState(false)
  const [searchMenu, setsearchMenu] = useState(false)
  const [settingsMenu, setsettingsMenu] = useState(false)
  const [otherMenu, setotherMenu] = useState(false)
  const [activeTab, setactiveTab] = useState('1')
  const [ChatBoxUsername, setChatBoxUsername] = useState('Steven Franklin')
  // eslint-disable-next-line no-unused-vars
  const [ChatBoxUserStatus, setChatBoxUserStatus] = useState('online')
  const [curMessage, setcurMessage] = useState('')

  useEffect(() => {
    const { onGetChats = () => {}, onGetGroups = () => {}, onGetContacts = () => {}, onGetMessages = () => {} } = props
    onGetChats()
    onGetGroups()
    onGetContacts()
    onGetMessages(currentRoomId)
  }, [props, currentRoomId])

  useEffect(() => {
    if (!isEmpty(messages)) scrollToBottom()
  }, [props, messages])

  const toggleNotification = () => {
    setnotificationMenu(!notificationMenu)
  }

  // Toggle Chat Box Menus
  const toggleSearch = () => {
    setsearchMenu(!searchMenu)
  }

  const toggleSettings = () => {
    setsettingsMenu(!settingsMenu)
  }

  const toggleOther = () => {
    setotherMenu(!otherMenu)
  }

  const toggleTab = (tab: any) => {
    if (activeTab !== tab) {
      setactiveTab(tab)
    }
  }

  // Use For Chat Box
  const userChatOpen = (id: any, name: any, status: any, roomId: any) => {
    const { onGetMessages } = props
    setChatBoxUsername(name)
    setCurrentRoomId(roomId)
    onGetMessages(roomId)
  }

  const addMessage = (roomId: any, sender: any) => {
    const { onAddMessage } = props
    const message = {
      id: Math.floor(Math.random() * 100),
      roomId,
      sender,
      message: curMessage,
      createdAt: new Date()
    }
    setcurMessage('')
    onAddMessage(message)
  }

  const scrollToBottom = () => {
    if (messageBox) {
      messageBox.scrollTop = messageBox.scrollHeight + 1000
    }
  }

  const onKeyPress = (e: any) => {
    const { key, value } = e
    if (key === 'Enter') {
      setcurMessage(value)
      addMessage(currentRoomId, currentUser.name)
    }
  }

  return (
    <PageContent>
      <div className="d-lg-flex">
        <div className="chat-leftsidebar mr-lg-4">
          <div className="">
            <div className="py-4 border-bottom">
              <Media>
                <div className="align-self-center mr-3">
                  <img
                    src={images.avatar1}
                    className="avatar-xs rounded-circle"
                    alt=""
                  />
                </div>
                <Media body>
                  <h5 className="font-size-15 mt-0 mb-1">
                    {currentUser.name}
                  </h5>
                  <p className="text-muted mb-0">
                    <i className="mdi mdi-circle text-success align-middle mr-1" />
                    Active
                  </p>
                </Media>

                <div>
                  <Dropdown
                    isOpen={notificationMenu}
                    toggle={toggleNotification}
                    className="chat-noti-dropdown active"
                  >
                    <DropdownToggle className="btn" tag="i">
                      <i className="bx bx-bell bx-tada" />
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem href="#">Action</DropdownItem>
                      <DropdownItem href="#">
                        Another action
                      </DropdownItem>
                      <DropdownItem href="#">
                        Something else here
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </Media>
            </div>

            <div className="search-box chat-search-box py-4">
              <div className="position-relative">
                <Input
                  type="text"
                  className="form-control"
                  placeholder="Search..."
                />
                <i className="bx bx-search-alt search-icon" />
              </div>
            </div>

            <div className="chat-leftsidebar-nav">
              <Nav pills justified>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: activeTab === '1'
                    })}
                    onClick={() => {
                      toggleTab('1')
                    }}
                  >
                    <i className="bx bx-chat font-size-20 d-sm-none" />
                    <span className="d-none d-sm-block">Chat</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: activeTab === '2'
                    })}
                    onClick={() => {
                      toggleTab('2')
                    }}
                  >
                    <i className="bx bx-group font-size-20 d-sm-none" />
                    <span className="d-none d-sm-block">Group</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: activeTab === '3'
                    })}
                    onClick={() => {
                      toggleTab('3')
                    }}
                  >
                    <i className="bx bx-book-content font-size-20 d-sm-none" />
                    <span className="d-none d-sm-block">Contacts</span>
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={activeTab} className="py-4">
                <TabPane tabId="1">
                  <div>
                    <h5 className="font-size-14 mb-3">Recent</h5>
                    <ul className="list-unstyled chat-list">
                      <PerfectScrollbar style={{ height: '410px' }}>
                        {map(chats, (chat: any) => (
                          <li
                            key={chat.id + chat.status}
                            className={
                              currentRoomId === chat.roomId
                                ? 'active'
                                : ''
                            }
                          >
                            <Link
                              to="#"
                              onClick={() => {
                                userChatOpen(
                                  chat.id,
                                  chat.name,
                                  chat.status,
                                  chat.roomId
                                )
                              }}
                            >
                              <Media>
                                <div className="align-self-center mr-3">
                                  <i
                                    className={
                                      chat.status === 'online'
                                        ? 'mdi mdi-circle text-success font-size-10'
                                        : chat.status === 'intermediate'
                                          ? 'mdi mdi-circle text-warning font-size-10'
                                          : 'mdi mdi-circle font-size-10'
                                    }
                                  />
                                </div>
                                <div className="align-self-center mr-3">
                                  <img
                                    src={''}
                                    className="rounded-circle avatar-xs"
                                    alt=""
                                  />
                                </div>

                                <Media className="overflow-hidden" body>
                                  <h5 className="text-truncate font-size-14 mb-1">
                                    {chat.name}
                                  </h5>
                                  <p className="text-truncate mb-0">
                                    {chat.description}
                                  </p>
                                </Media>
                                <div className="font-size-11">
                                  {chat.time}
                                </div>
                              </Media>
                            </Link>
                          </li>
                        ))}
                      </PerfectScrollbar>
                    </ul>
                  </div>
                </TabPane>

                <TabPane tabId="2">
                  <h5 className="font-size-14 mb-3">Group</h5>
                  <ul className="list-unstyled chat-list">
                    <PerfectScrollbar style={{ height: '410px' }}>
                      {groups &&
                      groups.map((group: any) => (
                        <li key={'test' + group.image}>
                          <Link
                            to="#"
                            onClick={() => {
                              userChatOpen(
                                group.id,
                                group.name,
                                group.status,
                                Math.floor(Math.random() * 100)
                              )
                            }}
                          >
                            <Media className="align-items-center">
                              <div className="avatar-xs mr-3">
                                  <span className="avatar-title rounded-circle bg-soft-primary text-primary">
                                    {group.image}
                                  </span>
                              </div>

                              <Media body>
                                <h5 className="font-size-14 mb-0">
                                  {group.name}
                                </h5>
                              </Media>
                            </Media>
                          </Link>
                        </li>
                      ))}
                    </PerfectScrollbar>
                  </ul>
                </TabPane>

                <TabPane tabId="3">
                  <h5 className="font-size-14 mb-3">Contact</h5>

                  <div>
                    <PerfectScrollbar style={{ height: '410px' }}>
                      {contacts &&
                      contacts.map((contact: any) => (
                        <div
                          key={'test_' + contact.category}
                          className={
                            contact.category === 'A' ? '' : 'mt-4'
                          }
                        >
                          <div className="avatar-xs mb-3">
                              <span className="avatar-title rounded-circle bg-soft-primary text-primary">
                                {contact.category}
                              </span>
                          </div>

                          <ul className="list-unstyled chat-list">
                            {contact.child.map((array: any) => (
                              <li key={'test' + array.id}>
                                <Link
                                  to="#"
                                  onClick={() => {
                                    userChatOpen(
                                      array.id,
                                      array.name,
                                      array.status,
                                      Math.floor(Math.random() * 100)
                                    )
                                  }}
                                >
                                  <h5 className="font-size-14 mb-0">
                                    {array.name}
                                  </h5>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </PerfectScrollbar>
                  </div>
                </TabPane>
              </TabContent>
            </div>
          </div>
        </div>
        <div className="w-100 user-chat">
          <Card>
            <div className="p-4 border-bottom ">
              <Row>
                <Col md="4" xs="9">
                  <h5 className="font-size-15 mb-1">
                    {ChatBoxUsername}
                  </h5>

                  <p className="text-muted mb-0">
                    <i
                      className={
                        ChatBoxUserStatus === 'online'
                          ? 'mdi mdi-circle text-success align-middle mr-1'
                          : ChatBoxUserStatus === 'intermediate'
                            ? 'mdi mdi-circle text-warning align-middle mr-1'
                            : 'mdi mdi-circle align-middle mr-1'
                      }
                    />
                    {ChatBoxUserStatus}
                  </p>
                </Col>
                <Col md="8" xs="3">
                  <ul className="list-inline user-chat-nav text-right mb-0">
                    <li className="list-inline-item d-none d-sm-inline-block">
                      <Dropdown
                        isOpen={searchMenu}
                        toggle={toggleSearch}
                      >
                        <DropdownToggle className="btn nav-btn" tag="i">
                          <i className="bx bx-search-alt-2" />
                        </DropdownToggle>
                        <DropdownMenu
                          className="dropdown-menu-md"
                          right
                        >
                          <Form className="p-3">
                            <FormGroup className="m-0">
                              <InputGroup>
                                <Input
                                  type="text"
                                  className="form-control"
                                  placeholder="Search ..."
                                  aria-label="Recipient's username"
                                />
                                <InputGroupAddon addonType="append">
                                  <Button color="primary" type="submit">
                                    <i className="mdi mdi-magnify" />
                                  </Button>
                                </InputGroupAddon>
                              </InputGroup>
                            </FormGroup>
                          </Form>
                        </DropdownMenu>
                      </Dropdown>
                    </li>
                    <li className="list-inline-item  d-none d-sm-inline-block">
                      <Dropdown
                        isOpen={settingsMenu}
                        toggle={toggleSettings}
                      >
                        <DropdownToggle className="btn nav-btn" tag="i">
                          <i className="bx bx-cog" />
                        </DropdownToggle>
                        <DropdownMenu right>
                          <DropdownItem href="#">
                            View Profile
                          </DropdownItem>
                          <DropdownItem href="#">
                            Clear chat
                          </DropdownItem>
                          <DropdownItem href="#">Muted</DropdownItem>
                          <DropdownItem href="#">Delete</DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </li>
                    <li className="list-inline-item">
                      <Dropdown
                        isOpen={otherMenu}
                        toggle={toggleOther}
                      >
                        <DropdownToggle className="btn nav-btn" tag="i">
                          <i className="bx bx-dots-horizontal-rounded" />
                        </DropdownToggle>
                        <DropdownMenu right>
                          <DropdownItem href="#">Action</DropdownItem>
                          <DropdownItem href="#">
                            Another Action
                          </DropdownItem>
                          <DropdownItem href="#">
                            Something else
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </li>
                  </ul>
                </Col>
              </Row>
            </div>

            <div>
              <div className="chat-conversation p-3">
                <ul className="list-unstyled">
                  <PerfectScrollbar
                    style={{ height: '470px' }}
                    containerRef={(ref: any) => setMessageBox(ref)}
                  >
                    <li>
                      <div className="chat-day-title">
                        <span className="title">Today</span>
                      </div>
                    </li>
                    {messages &&
                    map(messages, (message: any) => (
                      <li
                        key={'test_k' + message.id}
                        className={
                          message.sender === currentUser.name
                            ? 'right'
                            : ''
                        }
                      >
                        <div className="conversation-list">
                          <UncontrolledDropdown>
                            <DropdownToggle
                              href="#"
                              className="btn nav-btn"
                              tag="i"
                            >
                              <i className="bx bx-dots-vertical-rounded" />
                            </DropdownToggle>
                            <DropdownMenu direction="right">
                              <DropdownItem href="#">
                                Copy
                              </DropdownItem>
                              <DropdownItem href="#">
                                Save
                              </DropdownItem>
                              <DropdownItem href="#">
                                Forward
                              </DropdownItem>
                              <DropdownItem href="#">
                                Delete
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                          <div className="ctext-wrap">
                            <div className="conversation-name">
                              {message.sender}
                            </div>
                            <p>{message.message}</p>
                            <p className="chat-time mb-0">
                              <i className="bx bx-time-five align-middle mr-1" />
                              {format(message.createdAt, 'DD-MM-YY hh:mm')}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </PerfectScrollbar>
                </ul>
              </div>
              <div className="p-3 chat-input-section">
                <Row>
                  <Col>
                    <div className="position-relative">
                      <input
                        type="text"
                        value={curMessage}
                        onKeyPress={onKeyPress}
                        onChange={e => setcurMessage(e.target.value)}
                        className="form-control chat-input"
                        placeholder="Enter Message..."
                      />
                      <div className="chat-input-links">
                        <ul className="list-inline mb-0">
                          <li className="list-inline-item">
                            <Link to="#">
                              <i
                                className="mdi mdi-emoticon-happy-outline"
                                id="Emojitooltip"
                              />
                              <UncontrolledTooltip
                                placement="top"
                                target="Emojitooltip"
                              >
                                Emojis
                              </UncontrolledTooltip>
                            </Link>
                          </li>
                          <li className="list-inline-item">
                            <Link to="#">
                              <i
                                className="mdi mdi-file-image-outline"
                                id="Imagetooltip"
                              />
                              <UncontrolledTooltip
                                placement="top"
                                target="Imagetooltip"
                              >
                                Images
                              </UncontrolledTooltip>
                            </Link>
                          </li>
                          <li className="list-inline-item">
                            <Link to="#">
                              <i
                                className="mdi mdi-file-document-outline"
                                id="Filetooltip"
                              />
                              <UncontrolledTooltip
                                placement="top"
                                target="Filetooltip"
                              >
                                Add Files
                              </UncontrolledTooltip>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </Col>
                  <Col className="col-auto">
                    <Button
                      type="button"
                      color="primary"
                      onClick={() =>
                        addMessage(currentRoomId, currentUser.name)
                      }
                      className="btn-rounded chat-send w-md waves-effect waves-light"
                    >
                      <span className="d-none d-sm-inline-block mr-2">
                        Send
                      </span>{' '}
                      <i className="mdi mdi-send" />
                    </Button>
                  </Col>
                </Row>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </PageContent>
  )
}

export default Chat
