export default class LocalStorageService {

  static setItem(chave, valor){
    localStorage.setItem(chave, valor);
  }

  static getItem(chave){
    return localStorage.getItem(chave);
  }

  static getItemObj(chave){
    return JSON.parse(LocalStorageService.getItem(chave));
  }
}
