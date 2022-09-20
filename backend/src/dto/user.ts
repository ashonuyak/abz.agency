import { Position } from '../position/Position'
import { User } from '../user/User'

export interface CreateUser {
  name: string
  email: string
  phone: string
  position: Position
  photo: string
}

export interface UserAggregated extends Omit<User, 'position'> {
  position_id: string
  position: string
}

export interface GetUsersRequest {
  page?: number
  offset?: number
  count?: number
}

export interface GetUsersResponse {
  page: number
  total_pages: number
  total_users: number
  count: number
  links: { next_url: string | null; prev_url: string | null }
  users: UserAggregated[]
}
