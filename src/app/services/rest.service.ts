import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { JWTService } from './jwt.service';

import { environment } from '../../environments/environment';

export interface HttpPromiseResponse {
  data: any;
  msg: string;
  err: boolean;
}

@Injectable()
export class RestService {
  constructor(private readonly http: HttpClient, private readonly jwt: JWTService) {}

  /**
   * @description Generates a console log
   * @param {string} type
   * @param {string} url
   * @param {*} [dataSent]
   * @param {*} [dataReturned]
   */
  protected generateLogs(type: string, url: string, dataSent?: any, dataReturned?: any): void {
    console.log(`%c ${type.toUpperCase()} API CALL TO`, 'background-color: #333; color: #98bccd;');
    console.log(url);
    console.log(`%c DATA SENT`, 'background-color: #333; color: #fac5c5;');
    console.table(dataSent);
    console.log(`%c DATA RETURNED`, 'background-color: #333; color: #f5f5f5;');
    console.table(dataReturned);
  }

  /**
   * @description Abstracts generating an HTTP promise
   * @param {string} httpMethod
   * @param {string} url
   * @param {*} [body=null]
   * @returns {Promise<any>}
   */
  protected generateHttpPromise(httpMethod: string, url: string, body = null): Promise<HttpPromiseResponse> {
    let promise: Promise<any> = null;

    if (body) {
      promise = this.http[httpMethod](url, body, {
        headers: this.buildOptions()
      })
        .toPromise()
        .catch(err => this.handleError(err));
    } else {
      promise = this.http[httpMethod](url, {
        headers: this.buildOptions()
      })
        .toPromise()
        .catch(err => this.handleError(err));
    }

    if (!environment.production) {
      promise.then(res => {
        this.generateLogs(httpMethod, url, body, res);
      });
    }

    return promise;
  }

  /**
   * Abstracts HTTP POST
   * @param  {string}       url
   * @param  {any}          body
   * @return {Promise<any>}
   */
  post(url: string, body: any): Promise<HttpPromiseResponse> {
    return this.generateHttpPromise('post', url, body);
  }

  /**
   * Abstracts HTTP GET
   * @param  {string}       url
   * @return {Promise<any>}
   */
  get(url: string): Promise<HttpPromiseResponse> {
    return this.generateHttpPromise('get', url);
  }

  /**
   * Abstracts HTTP DELETE
   * @param  {string}       url
   * @return {Promise<any>}
   */
  delete(url: string): Promise<HttpPromiseResponse> {
    return this.generateHttpPromise('delete', url);
  }

  /**
   * Abstracts HTTP PUT
   * @param  {string}       url
   * @param  {any}          body
   * @return {Promise<any>}
   */
  put(url: string, body: any): Promise<HttpPromiseResponse> {
    return this.generateHttpPromise('put', url, body);
  }

  /**
   * Lets use set build options with auth token header on abstracted HTTP calls
   * @return {HttpHeaders}
   */
  buildOptions(): HttpHeaders {
    return new HttpHeaders({
      Accept: 'application/json',
      Authorization: 'Bearer ' + this.jwt.checkToken()
    });
  }

  /**
   * Error handling for all abstracted calls, doesn't reject a Promise
   * @param  {any}          serverError
   */
  handleError(serverError: any): void {
    try {
      if (!environment.production) {
        console.log('Caught try', serverError);
      }
    } catch (e) {
      if (!environment.production) {
        console.log('Caught catch', e);
      }
    }
  }
}
