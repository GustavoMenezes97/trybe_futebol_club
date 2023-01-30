// Créditos da customização de erros para o Daniel Outeiro - T23A, com base no site: https://javascript.info/custom-errors

export default class customError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);

    this.status = status;
  }
}
