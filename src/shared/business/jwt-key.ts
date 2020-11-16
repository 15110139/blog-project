import { IsString } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

export enum TOKEN_TYPE {
  BASE = 'BASE',
}

export abstract class JWTKey {
  public abstract serialize(): string;

  public hashCode(hashFunc: (data: string) => string): string {
    return hashFunc(this.serialize());
  }
}

@Exclude()
export class BaseKey extends JWTKey {
  constructor() {
    super();
  }

  public serialize(): string {
    return JSON.stringify({});
  }
}

@Exclude()
export class UserKey extends JWTKey {
  @IsString()
  @Expose()
  public user_id!: string;

  constructor(user_id: string) {
    super();
    this.user_id = user_id;
  }

  public serialize(): string {
    return JSON.stringify({ user_id: this.user_id });
  }
}
