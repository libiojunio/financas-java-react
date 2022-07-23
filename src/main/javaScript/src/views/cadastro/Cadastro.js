import React from 'react';
import Container from '../../componentes/Container';
import Card from '../../componentes/Card';
import FormGroup from '../../componentes/FormGroup';
import Button from '../../componentes/Button';
import {Link} from 'react-router-dom';
import {styleLink} from '../../utils/constantes';

class Cadastro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputNome: '',
      inputEmail: '',
      inputSenha: '',
      inputSenhaRepeticao: '',
      style: {
        position: 'relative',
        left: '300px'
      }
    };
  }
  
  cadastrar = () => {
    console.log('entrei', this.state)
  }

  onChange = (value) => {
    const state = this.state;
    state[value.target.id] = value.target.value;
    this.setState(state);
  }

  render() {
    const idNome = 'inputNome';
    const idEmail = 'inputEmail';
    const idSenha = 'inputSenha';
    const idSenhaRepeticao = 'inputSenhaRepeticao';

    const descricaoCancelar = <Link style={styleLink} to={'/login'}>Cancelar</Link>;

    return (
      <Container tipo={'bsDocs'}>
        <Card titulo={'Cadastro de usuário'}>
          <FormGroup label={'Nome: *'} htmlFor={idNome}>
            <input
              type="text" className="form-control" id={idNome} name={'nome'} onChange={this.onChange}
              placeholder="Digite o nome" value={this.state.inputNome} />
          </FormGroup>
          <FormGroup label={'Email: *'} htmlFor={idEmail}>
            <input
              type="email" className="form-control" id={idEmail} name={'email'} onChange={this.onChange}
              aria-describedby="emailHelp" placeholder="Digite o email" value={this.state.inputEmail} />
          </FormGroup>
          <FormGroup label={'Senha: *'} htmlFor={idEmail}>
            <input
              type="password" className="form-control" id={idSenha} name={'senha'} onChange={this.onChange}
              placeholder="Digite a senha" value={this.state.inputSenha} />
          </FormGroup>
          <FormGroup label={'Repitar a senha: *'} htmlFor={idSenhaRepeticao}>
            <input
              type="password" className="form-control" id={idSenhaRepeticao} name={'senhaRepeticao'} onChange={this.onChange}
              placeholder="Digite a senha novamente" value={this.state.inputSenhaRepeticao} />
          </FormGroup>
          <Button descricao={'Salvar'} className={'btn btn-success'} onClick={this.cadastrar} />
          <Button descricao={descricaoCancelar} className={'btn btn-danger'} />
        </Card>
      </Container>
    )
  }
}

export default Cadastro;
