import { Resolver, Query, Mutation, Arg } from 'type-graphql'
import bcrypt from 'bcryptjs'
import { User } from '../../entity/User'

@Resolver(User)
export class RegisterResolver {
  @Query(() => String, { nullable: true })
  async helloWorld() {
    return 'helloWorld'
  }

  @Mutation(() => User)
  async register(
    @Arg('firstName') firstName: string,
    @Arg('lastName') lastName: string,
    @Arg('email') email: string,
    @Arg('password') password: string,
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 12)
    const user = await User.create({
      firstName,
      lastName, 
      email,
      password: hashedPassword
    }).save()

    return user
  }
}
