import React, { Component } from 'react';
import Header from './Header';
import Formulario from './Fromulario';
import { obtenerDiferenciaAnio, calcularMarca, obtenerPlan } from '../helper';
import Resumen from './Resumen';



class App extends Component {

  state = {
    resultado:'',
    datos:{}
  }

  

  cotizarSeguro = (datos) => {
    console.log(datos);
    const {marca, plan, year} = datos;

    //Agregar un base de 2000
    let resultado = 2000;
    
    //Obtener la diferencia de años
    const diferencia = obtenerDiferenciaAnio(year);

    //Por cada año restar 3% al valos del seguro
    resultado -= ((diferencia * 3) * resultado ) /100;

    //Americano 15%, Asiatico 5% y europeo 30% de incremento  al valor actual
    resultado = calcularMarca(marca) * resultado;

    //el plan del auto incrementa el valor 20% y el plan completo 50%
    let incrementoPlan = obtenerPlan(plan);
    resultado = parseFloat(incrementoPlan * resultado).toFixed(2);

    const datosAuto = {
      marca : marca,
      plan : plan,
      year : year 
    }

    this.setState({
      resultado : resultado,
      datos : datosAuto

    })

   
    
  }
  render() {
    return (
      <div className="contenedor">
            <Header
                titulo="Cotizador de seguros de Autos"
            /> 
        <div className="contenedor-formulario">
            <Formulario
              cotizarSeguro={this.cotizarSeguro}
            />
            <Resumen
              datos = {this.props.state.datos}
              resultado = {this.state.resultado}
            />
        </div>
      </div>
    );
  }
}

export default App;
