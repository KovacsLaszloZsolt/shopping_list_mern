export class CustomError {
  message!: string;
  status!: number;
  additionalInfo!: unknown;
  name!: string;

  constructor(message: string, status = 500, additionalInfo: unknown = {}, name = 'Error') {
    this.message = message;
    this.status = status;
    this.additionalInfo = additionalInfo;
    this.name = name;
  }
}
