import { useState, useEffect } from "react"
import { CircularProgressbar, buildStyles} from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"
import { formatearMoneda } from "../helpers"

const ControlPresupuesto = ({presupuesto, gastos}) => {

    const [disponible, setDisponible] = useState(0)
    const [gastado, setGastado] = useState(0)
    const [porcentaje, setPorcentaje] =useState(0)

    useEffect(()=> {
        const totalGastado = gastos.reduce((total, gasto) => gasto.cantidad + total, 0)
        const totalDisponible = presupuesto - totalGastado
        const porcentajeActual = (((presupuesto - totalDisponible)/ presupuesto)*100).toFixed(2) /// .toFixed redondea los decimales a 2 dígitos
        setGastado(totalGastado)
        setDisponible(totalDisponible)
        setTimeout(()=>{
            setPorcentaje(porcentajeActual)
        },800)
    },[gastos])
    
    return (
        <div className="contenedor-presupuesto contenedor sombra dos-columnas">
            <div>
                <CircularProgressbar
                    value={porcentaje}
                    text={`${porcentaje}% Gastado`}
                    styles={buildStyles({
                        textColor: "#3b82f6",
                        pathColor: "#3b82f6",
                        trailColor: "#eeeeee"
                    })}
                />
            </div>

            <div className="contenido-presupuesto">
                <p>
                    <span>Presupuesto: </span> {formatearMoneda(presupuesto)}
                </p>
                
                <p>
                    <span>Disponible: </span> {formatearMoneda(disponible)}
                </p>

                <p>
                    <span>Gastado: </span> {formatearMoneda(gastado)}
                </p>
            </div>
        </div>
    )
}

export default ControlPresupuesto