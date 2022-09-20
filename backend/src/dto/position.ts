import { User } from '../user/User'

export interface Position {
  name: string
  users?: User[]
}
