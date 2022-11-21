import * as http from 'request';
import { merge } from 'lodash';

http.defaults({
  encoding: 'utf-8',
  json: true
});

export interface AccountData {
  email: string;
  user: string;
  ip: string;
  plan: string;
  domain: string;
  diskused: string;
  is_locked: number;
  maxaddons: string;
  maxsub: string;
  disklimit: string;
  maxparked: string;
  theme: string;
  outgoing_mail_hold: number;
  outgoing_mail_suspended: number;
  partition: string;
  owner: string;
  maxsql: string;
  max_email_per_hour: string;
  min_defer_fail_to_trigger_protection: string;
  suspendedtime: number;
  legacy_backup: number;
  maxpop: string;
  unix_startdate: number;
  suspendreason: string;
  startdate: string;
  backup: number;
  suspended: number;
  max_defere_fail_percentage: string;
  ipv6: any[],
  maxlst: string;
  shell: string;
  maxftp: string;
}

export interface CreateAccountOptions {
  username: string;
  domain: string;
  password: string;
  plan: string;
}

export class Client {

  private api: API;

  constructor(options: WHMOptions){
    this.api = new API(options);
  }

  /**
   * Lists the accounts that you have now
   * @returns {Promise<any>}
   */
  listAccounts(): Promise<AccountData[]> {
    return this.api.get('listaccts');
  }

  /**
   * List IP addresses available
   * @returns {Promise<any>}
   */
  listIPAddresses(): Promise<any> {
    return this.api.get('listips');
  }

  /**
   * Create an account
   * @returns {Promise<any>}
   */
  createAccount(options: CreateAccountOptions): Promise<any> {
    return this.api.get('createacct', options);
  }

  terminateAccount(user: string): Promise<any>  {
    let params: any = {
      user: user
    };
    return this.api.get('removeacct', params);
  }

}
export interface WHMOptions {
  apiType?: string;
  version?: number;
  serverUrl: string;
  username: string;
  remoteAccessKey: string;
}

class API {

  private defaultOptions: any = {
    apiType: 'json-api',
    version: 1
  };

  constructor(private options: WHMOptions){
    merge(this.options, this.defaultOptions);
  }

  get(action: string, query?: string | any): Promise<any> {
    if(query && typeof query != 'string') query = Utils.objectToQs(query);
    let requestOptions: any = {
      url: this.options.serverUrl + '/' + this.options.apiType + '/' + action + '?api.version=' + this.options.version + '&' + query,
      headers: {
        Authorization: 'WHM ' + this.options.username + ':' + this.options.remoteAccessKey
      }
    };
    console.log(requestOptions);
    return new Promise<any>((resolve, reject) => {

      http.get(requestOptions, (err, res, resp) => {
      let endres = JSON.parse(resp)
        if(err) {
          console.error('Error');
          reject({error: err});
        } else if(!endres.metadata.result) {
          reject({error: endres.metadata.reason});
        }        
        else resolve(endres);
      });

    });
  }
}

class Utils {
  static qsToObject(querystring: string): any {
    let object = {};
    let splitQs: any = querystring.split('&');
    splitQs.forEach(
        item => {
          item = item.split('=');
          object[item[0]] = item[1];
        }
    );
    return object;
  }

  static objectToQs(object: any): string {
    let qs: string = '';
    for(let prop in object){
      if(qs.length > 0) qs += '&';
      qs += encodeURIComponent(prop) + '=' + encodeURIComponent(object[prop]);
    }
    console.log(object);
    console.log(qs);
    return qs;
  }
}
