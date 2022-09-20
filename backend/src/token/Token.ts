/* eslint-disable prettier/prettier */
import { Column, Entity, Index, PrimaryColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'

@Entity('Token')
export class Token {
  @PrimaryColumn({ default: uuid(), unique: true })
  id: string

  @Column()
  @Index('UNIQUE_HASH', { unique: true })
  hash: string

  constructor(data?: Omit<Token, 'id'>) {
    if(data) {
      this.id = uuid(),
      this.hash = data.hash
    }
  }
}