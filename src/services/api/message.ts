import api from './index'
import { AdministratorData } from './administrator'

export interface MessageData {
  user: string | AdministratorData
  messageInbox: string
  sender: 'user' | 'store'
  messageText?: string
  messageImg?: string
  messageProduct?: string
}

export interface MessageInboxData {
  user: string | AdministratorData
  read: boolean
  lastSender: 'user' | 'store'
  lastMessageText: string
}

export interface MessageDataResponse extends MessageData{
  _id: string
  user: AdministratorData
}

export interface MessageInboxDataResponse extends MessageInboxData{
  _id: string
  user: AdministratorData
}

export const listInboxMessage = async (callback: (data: MessageInboxDataResponse[]) => void): Promise<void> => {
  const response = await api.get('message-inbox')
  callback(response.data)
}

export const listMessage = async (messageInbox: string, callback: (data: MessageDataResponse[]) => void): Promise<void> => {
  const response = await api.get(`message/dashboard/${messageInbox}`)
  callback(response.data)
}

export const sendMessage = async (data: MessageData, callback: (data: MessageDataResponse) => void): Promise<void> => {
  const response = await api.post('message/dashboard', data)
  callback(response.data)
}
