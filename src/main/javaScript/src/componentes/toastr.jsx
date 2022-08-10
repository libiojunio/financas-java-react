import toastr from 'toastr';

toastr.options = {
  closeButton: true,
  debug: false,
  newestOnTop: false,
  progressBar: true,
  positionClass: 'toast-top-right',
  preventDuplicates: false,
  onclick: null,
  showDuration: 300,
  hideDuration: 1000,
  timeOut: 5000,
  extendedTimeOut: 1000,
  showEasing: 'swing',
  hideEasing: 'linear',
  showMethod: 'fadeIn',
  hideMethod: 'fadeOut'
};

function exibirMensagem(mensagem, titulo, tipo){
  toastr[tipo](mensagem, titulo);
}

export function exibirMensagemErro(mensagem){
  exibirMensagem(mensagem, 'Erro', 'error');
}

export function exibirMensagemErroApi(error){
  if (error.response.status === 400) {
    exibirMensagemErro(error.response.data.message);
  }
  else if (!error.response.data) {
    exibirMensagemErro('Erro 404 - Servidor indisponível!');
  }
  else {
    exibirMensagemErro(error.response.data);
  }
}

export function exibirMensagemSucesso(mensagem){
  exibirMensagem(mensagem, 'Sucesso', 'success');
}

export function exibirMensagemAlerta(mensagem){
  exibirMensagem(mensagem, 'Alerta', 'warning');
}

