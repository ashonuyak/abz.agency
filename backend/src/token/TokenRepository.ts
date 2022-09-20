import { Repository } from 'src/utils'
import { getManager } from 'typeorm'
import { Token } from './Token'

export class TokenRepository extends Repository<Token>(Token) {
  async delete(token: string, em = getManager()): Promise<void> {
    em.createQueryBuilder().delete().from(Token).where('hash = :hash', { hash: token }).execute()
  }
}
