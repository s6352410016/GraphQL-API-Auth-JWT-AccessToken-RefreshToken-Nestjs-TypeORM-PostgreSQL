import { AuthGuard } from "@nestjs/passport";
import { GqlExecutionContext } from "@nestjs/graphql";
import { ExecutionContext , Injectable } from '@nestjs/common';

@Injectable()
export class RtAuthGuard extends AuthGuard("jwt-refresh"){
    getRequest(context: ExecutionContext){
        const ctx = GqlExecutionContext.create(context);
        return ctx.getContext().req;
    }
}