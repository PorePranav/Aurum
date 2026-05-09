import { JwtPayload } from 'jsonwebtoken';

import { User } from '../../prisma/generated';

export interface CustomJwtPayload extends JwtPayload {
  id: string;
}

export type SafeUser = Omit<User, 'password'>;

export type PrismaError = {
  code?: string;
  meta?: {
    target?: string[];
  };
  name?: string;
};
