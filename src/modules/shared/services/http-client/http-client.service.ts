import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';

import { AxiosRequestConfig } from 'axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class HttpClientService {
  constructor(private readonly httpService: HttpService) {}

  async get<Response>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<Response> {
    try {
      const response = await firstValueFrom(this.httpService.get(url, config));
      return response.data;
    } catch (exception) {
      this.handleException(exception);
    }
  }

  async post<Request, Response>(
    url: string,
    data: Request,
    config?: AxiosRequestConfig,
  ): Promise<Response> {
    try {
      const response = await firstValueFrom(
        this.httpService.post(url, data, config),
      );
      return response.data;
    } catch (exception) {
      this.handleException(exception);
    }
  }

  async patch<Request, Response>(
    url: string,
    data: Request,
    config?: AxiosRequestConfig,
  ): Promise<Response> {
    try {
      const response = await firstValueFrom(
        this.httpService.patch(url, data, config),
      );
      return response.data;
    } catch (exception) {
      this.handleException(exception);
    }
  }

  private handleException(exception): void {
    // eslint-disable-next-line no-console
    console.log({ exception });
    if (exception.response) {
      const { data, status } = exception.response;
      this.checkNotFoundException(status, data);
      this.checkBadRequestException(status, data);
      this.checkUnprocessableEntityException(status, data);
      throw new HttpException(data, status);
    }
    throw exception;
  }

  private checkNotFoundException(status: number, data): void {
    if (status === HttpStatus.NOT_FOUND) {
      throw new NotFoundException(data);
    }
  }

  private checkBadRequestException(status: number, data): void {
    if (status === HttpStatus.BAD_REQUEST) {
      throw new BadRequestException(data);
    }
  }

  private checkUnprocessableEntityException(status: number, data): void {
    if (status === HttpStatus.UNPROCESSABLE_ENTITY) {
      throw new UnprocessableEntityException(data);
    }
  }
}
