import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class DownloadRelatorioService {

  constructor() { }


  public baixarRelatorio(response: any, nomeArquivo: string){
    const file = new Blob([response]);
    const blob = window.URL.createObjectURL(file);
    const link = document.createElement('a');
    link.href = blob;
    link.download = nomeArquivo;
    link.click();
    window.URL.revokeObjectURL(blob);
    link.remove();
}
}
