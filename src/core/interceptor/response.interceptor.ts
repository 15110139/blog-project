import {
	NestInterceptor,
	ExecutionContext,
	CallHandler,
	Injectable,
	HttpException,
} from '@nestjs/common';
import { throwError, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ResponseApiInterface } from 'src/shared/api-interface/base-api-interface';
import { SYSTEM_CODE } from 'src/shared/business/system-code';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
	intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
		return next
			.handle()
			.pipe(
				map(response => {
					return new ResponseApiInterface(
						response,
						'',
						SYSTEM_CODE.SUCCESS,
					);
				}),
			)
			.pipe(
				catchError(err => {
					if (err instanceof HttpException) {
						return throwError(err);
					} else {
						return throwError('PLEASE ADD SYSTEM CODE');
					}
				}),
			);
	}
}
