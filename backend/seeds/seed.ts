import { faker } from '@faker-js/faker'
import { Position } from '../src/position/Position'
import { User } from '../src/user/User'
import { createConnection, getRepository } from 'typeorm'
import { v4 as uuid } from 'uuid'
import { Token } from '../src/token/Token'

const operators = ['50', '66', '67', '68', '90', '95', '98', '99']
const positions = ['Designer', 'Security', 'Developer', 'Architector', 'Software Engineer', 'CEO']

const seed = async (): Promise<void> => {
  await createConnection({
    type: 'postgres',
    host: 'jelani.db.elephantsql.com',
    username: 'dtmdeyqt',
    password: 'FzF-zo-c1gv7O_HIB6OFE8mJihhtH6f-',
    database: 'dtmdeyqt',
    entities: [User, Position, Token],
  })
  const userRepository = getRepository(User)
  const positionRepository = getRepository(Position)

  positions.forEach(async (position, index) => {
    await positionRepository.save({
      id: (++index).toString(),
      name: position,
    })
  })

  for (let i = 0; i < 45; i++) {
    const operator = operators[Math.floor(Math.random() * operators.length)]

    const randomName = faker.name.fullName()
    const randomEmail = faker.internet.email()
    const randomPhone = faker.phone.number(`+380${operator}#######`)
    const randomPosition = (Math.floor(Math.random() * positions.length) + 1).toString()
    const randomPhoto =
      'https://s3.eu-central-1.amazonaws.com/abz.agency/users/ecf9a54a-09d4-4659-b64d-667e46406c7f'

    await userRepository.save({
      id: uuid(),
      name: randomName,
      email: randomEmail,
      phone: randomPhone,
      photo: randomPhoto,
      position: { id: randomPosition },
      registration_timestamp: (new Date().getTime() + Math.floor(Math.random() * 1000)).toString(),
    })
  }
}

seed()
