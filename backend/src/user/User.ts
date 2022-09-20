/* eslint-disable prettier/prettier */
import { Position } from '../position/Position'
import { Column, Entity, Index, PrimaryColumn, ManyToOne } from 'typeorm'
import { v4 as uuid } from 'uuid'

@Entity('User')
export class User {
  @PrimaryColumn({ default: uuid(), unique: true })
  id: string

  @Column()
  name: string

  @Column()
  @Index('UNIQUE_EMAIL', { unique: true })
  email: string

  @Column()
  @Index('UNIQUE_PHONE', { unique: true })
  phone: string

  @ManyToOne(() => Position, (position) => position.users)
  position: Position

  @Column()
  photo: string

  @Column({ default: new Date().getTime(), type: 'bigint' })
  registration_timestamp: string

  constructor(data?: Omit<User, 'id' | 'registration_timestamp'>) {
    if(data) {
      this.id = uuid(),
      this.name = data.name,
      this.email = data.email,
      this.phone = data.phone,
      this.position = data.position
      this.photo = data.photo
      this.registration_timestamp = new Date().getTime().toString()
    }
  }
}