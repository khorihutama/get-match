export interface JwtPayload {
  id: string;
  email: string;
  premium?: boolean;
  verified?: boolean;
}
