import { ReqType } from '..';

class Api {
  public r: ReqType;

  constructor(request: ReqType) {
    this.r = request;
  }
}

export default Api;
