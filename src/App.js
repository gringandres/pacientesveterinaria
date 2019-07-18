import React, { Component } from 'react';
import './bootstrap.min.css';
import Header from './components/Header';
import NuevaCita from './components/NuevaCita';
import Listacitas from './components/Listacitas';
import PropTypes from 'prop-types';

export default class App extends Component {
  state = {
    citas: []
  }

  // cuando la app carga
  componentDidMount(){
    const citasLS = localStorage.getItem('citas');
    if(citasLS) {
      this.setState({
        citas : JSON.parse(citasLS)
      })
    }
  }

  // cuando eliminamos o agg una nueva cita
  componentDidUpdate(){
    localStorage.setItem('citas', JSON.stringify(this.state.citas))
  }

  crearNuevaCita = (datos) => {
    //copiar el State actual
    const citas = [...this.state.citas, datos];
    //agg el nuevo state
    this.setState({ citas })
  }

  //elimina las citas del state

  eliminarCita = (id) =>{
    //tomar una copia del state
    const citasActuales = [...this.state.citas];

    //utilizar filter para sacar el elemeto id    se hace diferente de porq se selecciona los q son diferentes
    const citas = citasActuales.filter(cita => cita.id !== id)
    
    //actualizar el state
    this.setState({ citas })
  }

  render() {
    return (
      <div className="container">
        <Header
          titulo='Administrador Paciente Veterinaria'
        />
        <div className="row">
          <div className="col-md-10 mx-auto">
            <NuevaCita
              crearNuevaCita={this.crearNuevaCita}
            />
          </div>
          <div className="mt-5 col*md-10 mx-auto">
            <Listacitas
              citas={this.state.citas}
              eliminarCita={this.eliminarCita}
            />
          </div>
        </div>
      </div>
    )
  }
}

NuevaCita.propTypes = {
  crearNuevaCita : PropTypes.func.isRequired
}