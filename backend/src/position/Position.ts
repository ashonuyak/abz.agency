/* eslint-disable prettier/prettier */
import { PositionDto } from '../dto'
import { User } from '../user/User'
import { Column, Entity, PrimaryColumn, OneToMany } from 'typeorm'
import { v4 as uuid } from 'uuid'

@Entity('Position')
export class Position {
  @PrimaryColumn({ default: uuid(), unique: true })
  id: string

  @Column()
  name: string

  @OneToMany(() => User, (user) => user.position)
  users?: User[]

  constructor(data?: PositionDto.Position) {
    if(data) {
      this.id = uuid(),
      this.name = data.name,
      this.users = data.users
    }
  }
}