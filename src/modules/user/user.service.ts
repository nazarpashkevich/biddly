import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { AuthConstants } from '../auth/constants/auth.constants';
import { EmailAlreadyExistsException } from '../auth/exceptions/email-already-exists.exception';
import { JwtPayloadInterface } from '../auth/interfaces/jwt-payload.interface';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create({ email, password }: { email: string; password: string }) {
    const existingUser = await this.findByEmail(email);
    if (existingUser) {
      throw new EmailAlreadyExistsException();
    }

    const hashedPassword = await bcrypt.hash(
      password,
      AuthConstants.password.saltRounds
    );

    return this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
  }

  async validatePassword(user: User, password: string) {
    return bcrypt.compare(password, user.password);
  }

  async findById(id: number): Promise<null | User> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async findByEmail(email: string): Promise<null | User> {
    const normalizedEmail = email.toLowerCase();
    return this.prisma.user.findUnique({
      where: { email: normalizedEmail },
    });
  }

  public async me(user: JwtPayloadInterface): Promise<User> {
    const dbUser = await this.findById(user.id);

    if (!dbUser) {
      throw new UnauthorizedException();
    }

    return dbUser;
  }

  public async update(user: User, data: Prisma.UserUpdateInput): Promise<User> {
    return this.prisma.user.update({
      where: { id: user.id },
      data,
    });
  }
}
