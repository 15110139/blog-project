import { Exclude, Expose } from 'class-transformer';
import { IsEnum, IsIn, IsNumber, IsString } from 'class-validator';
import { ConstructorFunction } from 'src/@type/util';
import { TOKEN_TYPE } from 'src/shared/business/jwt-key';

type TokenMap<T extends JWTPayload> = {
  [k in TOKEN_TYPE]: ConstructorFunction<T>;
};

export const REFRESH_TOKEN: TOKEN_TYPE[] = [
	TOKEN_TYPE.BASE,
];

@Exclude()
export class EncryptPayload {
  @IsString()
  @Expose()
  public data!: string;
}

@Exclude()
export abstract class JWTPayload {
  @IsEnum(TOKEN_TYPE)
  @Expose()
  public abstract readonly type: TOKEN_TYPE = TOKEN_TYPE.BASE;

  @IsNumber()
  @Expose()
  public time!: number;

  @Expose()
  public exp?: number;

  @Expose()
  public iat?: number;

  @Expose()
  public aud?: string;

  @Expose()
  public iss?: string;

  @Expose()
  public sub?: string;

  /**
   * Return string of session identification for particular token. For example user_id
   */
  protected abstract _sessionBoundId(): string | undefined;

  public sessionBoundId(): string | undefined {
    const res = this._sessionBoundId();
    return res ? `${this.type}:${res}` : undefined;
  }

  @Exclude()
  public deleteTokenAttribute(this: JWTPayload): void {
    delete this.exp;
    delete this.iat;
    delete this.aud;
    delete this.iss;
    delete this.sub;
  }
}

@Exclude()
export class OctoUserJWTPayload extends JWTPayload {
  @IsString()
  @Expose()
  public user_id!: string;

  @IsIn([TOKEN_TYPE.BASE])
  @Expose()
  public readonly type: TOKEN_TYPE = TOKEN_TYPE.BASE;

  public _sessionBoundId(): string {
    return this.user_id;
  }

  constructor(userId: string) {
    super();
    this.user_id = userId;
  }
}

export class TokenTypeMap implements TokenMap<JWTPayload> {
  public [TOKEN_TYPE.BASE] = JWTPayload as ConstructorFunction<JWTPayload>;
}
export const TOKEN_TYPE_MAP = new TokenTypeMap();
