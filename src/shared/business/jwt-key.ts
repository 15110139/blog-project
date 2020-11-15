import { IsString } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';
import { ClassType } from 'class-transformer/ClassTransformer';

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
export class PartnerKey extends JWTKey {
  @IsString()
  @Expose()
  public partner_id!: string;

  constructor(partner_id: string) {
    super();
    this.partner_id = partner_id;
  }

  public serialize(): string {
    return JSON.stringify({ partner_id: this.partner_id });
  }
}

@Exclude()
export class PartnerSystemKey extends JWTKey {
  @IsString()
  @Expose()
  public partner_id!: string;

  constructor(partner_id: string) {
    super();
    this.partner_id = partner_id;
  }

  public serialize(): string {
    return JSON.stringify({ partner_id: this.partner_id });
  }
}

@Exclude()
export class PartnerUserKey extends JWTKey {
  @IsString()
  @Expose()
  public partner_id!: string;

  @IsString()
  @Expose()
  public partner_account_id!: string;

  constructor(partner_id: string, partner_account_id: string) {
    super();
    this.partner_id = partner_id;
    this.partner_account_id = partner_account_id;
  }

  public serialize(): string {
    return JSON.stringify({
      partner_id: this.partner_id,
      partner_account_id: this.partner_account_id,
    });
  }
}

@Exclude()
export class PartnerUserFastcardKey extends JWTKey {
  @IsString()
  @Expose()
  public partner_id!: string;

  @IsString()
  @Expose()
  public partner_account_id!: string;

  constructor(partner_id: string, partner_account_id: string) {
    super();
    this.partner_id = partner_id;
    this.partner_account_id = partner_account_id;
  }

  public serialize(): string {
    return JSON.stringify({
      partner_id: this.partner_id,
      partner_account_id: this.partner_account_id,
    });
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
