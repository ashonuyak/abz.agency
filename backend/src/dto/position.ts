import { User } from 'src/user/User'

export interface Position {
  name: string
  users?: User[]
}
