// # errors.filter.ts
import { ExceptionFilter, Catch, HttpException, ArgumentsHost, HttpStatus } from '@nestjs/common';

@Catch()
export class ErrorFilter implements ExceptionFilter {
  catch(error: Error, host: ArgumentsHost) {
    let response = host.switchToHttp().getResponse();
    let status = (error instanceof HttpException) ? error.getStatus(): HttpStatus.INTERNAL_SERVER_ERROR;
    console.log(error.message);
    let finalResponse = {
      error : true,
      message: error.message,
      stack : error.stack,
      name: error.name
    } 
      
    console.error(finalResponse);
    if (true || process.env.NODE_ENV === 'production') {
      delete finalResponse.stack;
    }

    if (status === HttpStatus.UNAUTHORIZED) 
      return response.status(status).send(finalResponse);
    if (status === HttpStatus.NOT_FOUND) 
      return response.status(status).send(finalResponse);
    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
        return response.status(status).send(finalResponse);         
    } else {
      return response.status(status).send(finalResponse);
    }
  }
}