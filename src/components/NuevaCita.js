import React, { Component } from 'react'
import uuid from 'uuid';

const stateInicial ={
    cita: {
        mascota: "",
        propietario: "",
        fecha: "",
        hora: "",
        sintomas: ""
    },
    error: false
}

export default class NuevaCita extends Component {

    state = {
        // cita: {
        //     mascota: "",
        //     propietario: "",
        //     fecha: "",
        //     hora: "",
        //     sintomas: ""
        // },
        // error: false
        ...stateInicial    // asi siempre agg este y mas facil de reiniciar
    }


    // cuando escribe en los inputs
    handleChange = (e) => {
        //colocar lo que el usuario escribe en el state
        this.setState({
            cita: {
                ...this.state.cita,
                [e.target.name]: e.target.value   //name se tiene que llamar igual a arriba en el state
            }
        })
    }

    //cuando le das en el boton
    handleSubmit = (e) => {
        e.preventDefault();

        //extraer los valores del state
        const {
            mascota,
            propietario,
            fecha,
            hora,
            sintomas
        } = this.state.cita


        //validar que todos los campos esten llenos
        if (mascota === "" || propietario === "" || fecha === "" || hora === "" || sintomas === "") {
            this.setState({
                error: true
            });

            //detener la ejecucion
            return;
        }

        //generar un obj con los datos
        const nuevaCita = { ...this.state.cita }
        nuevaCita.id = uuid();

        //agg la cita al state de app
        this.props.crearNuevaCita(nuevaCita)
        //de esta forma los datos del componente hijo pasan al padre,,
        //por medio de una funcion que toma datos 

        // colorcar los campos vacidos
        this.setState({
            // cita: {
            //     mascota: "",
            //     propietario: "",
            //     fecha: "",
            //     hora: "",
            //     sintomas: ""
            // },
            // error: false
            ...stateInicial
        })
    }

    render() {

        const {
            mascota,
            propietario,
            fecha,
            hora,
            sintomas
        } = this.state.cita;

        const {
            error
        } = this.state;

        return (
            <div className="card mt-5 py-5">
                <div className="card-body">
                    <h2 className="card-title text-center mb-5">
                        LLena el formulario para crear una nueva cita
                    </h2>

                    { error ? <div className="alert alert-danger mt-2 mb-5
                    text-center"> Todos los campos son obligatorios</div> : null }

                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group row">
                            <label className="col-sm-4 col-lg-2 col-form-label">Nombre Mascota</label>
                            <div className="col-sm-8 col-lg-10">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre Mascota"
                                    name="mascota"
                                    onChange={this.handleChange}
                                    value={mascota}
                                />
                            </div>
                        </div> {/* form group */}

                        <div className="form-group row">
                            <label className="col-sm-4 col-lg-2 col-form-label">Nombre Dueño</label>
                            <div className="col-sm-8 col-lg-10">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre Dueño Mascota"
                                    name="propietario"
                                    onChange={this.handleChange}
                                    value={propietario}
                                />
                            </div>
                        </div> {/* form group */}

                        <div className="form-group row">
                            <label className="col-sm-4 col-lg-2 col-form-label">Fecha</label>
                            <div className="col-sm-8 col-lg-4">
                                <input
                                    type="date"
                                    className="form-control"
                                    name="fecha"
                                    onChange={this.handleChange}
                                    value={fecha}
                                />
                            </div>
                            <label className="col-sm-4 col-lg-2 col-form-label">Hora</label>
                            <div className="col-sm-8 col-lg-4">
                                <input
                                    type="time"
                                    className="form-control"
                                    name="hora"
                                    onChange={this.handleChange}
                                    value={hora}
                                />
                            </div>
                        </div> {/* form group */}

                        <div className="form-group row">
                            <label className="col-sm-4 col-lg-2 col-form-label">Sintomas</label>
                            <div className="col-sm-8 col-lg-10">
                                <textarea
                                    className="form-control"
                                    name="sintomas"
                                    placeholder="Describe los sintomas"
                                    onChange={this.handleChange}
                                    value={sintomas}
                                ></textarea>
                            </div>
                        </div> {/* form group */}

                        <input type="submit" className="py-3 mt-2 btn btn-success btn-block"
                            value="Agregar Nueva cita" />
                    </form>
                </div>
            </div>
        )
    }
}
