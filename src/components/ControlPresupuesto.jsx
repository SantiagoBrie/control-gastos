import { useState } from "react"
import { formatearMoneda } from "../helpers"

const ControlPresupuesto = ({presupuesto}) => {

    return (
        <div className="contenedor-presupuesto contenedor sombra dos-columnas">
            <div>
                <p>Gráfica aquí</p>
            </div>

            <div className="contenido-presupuesto">
                <p>
                    <span>Presupuesto: </span> {formatearMoneda(presupuesto)}
                </p>
                
                <p>
                    <span>Disponible: </span> {formatearMoneda(presupuesto)}
                </p>

                <p>
                    <span>Gastado: </span> {formatearMoneda(presupuesto)}
                </p>
            </div>
        </div>
    )
}

export default ControlPresupuesto