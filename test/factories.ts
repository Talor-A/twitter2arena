import { Prisma } from "db"
import faker from "faker"

export const getUserAttributes = (
  attrs?: Partial<Prisma.UserCreateArgs>
): Prisma.UserCreateArgs => ({
  ...attrs,

  data: {
    email: faker.internet.email(),
    name: faker.name.findName(),
    createdAt: new Date(),
    updatedAt: new Date(),
    role: "USER",
    ...attrs?.data,
  },
})
