import { CustomJwtPayload } from './customTypes';

declare global {
  interface ExpressRequest {
    user?: CustomJwtPayload;
  }
}

declare module 'express-serve-static-core' {
  interface Request {
    user?: CustomJwtPayload;
  }
}

export {};
