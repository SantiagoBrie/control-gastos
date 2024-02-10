import { useState, useEffect } from "react"
import { CircularProgressbar, buildStyles} from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"
import { formatearMoneda } from "../helpers"

const ControlPresupuesto = ({presupuesto, setPresupuesto, gastos, setGastos, setIsValidPresupuesto}) => {

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
    
    const handleResetApp = ()=> {
        const resultado = confirm("¿Deseas reiniciar presupuesto y gastos?")
        if(resultado){
            setPresupuesto(0)
            setGastos([])
            setIsValidPresupuesto(false)
        }
    }

    return (
        <div className="contenedor-presupuesto contenedor sombra dos-columnas">
            <div>
                <CircularProgressbar
                    value={porcentaje}
                    text={`${porcentaje}% Gastado`}
                    styles={buildStyles({
                        textColor: porcentaje > 100 ? "#DC2626" : "#3b82f6",
                        pathColor: porcentaje > 100 ? "#DC2626" : "#3b82f6",
                        trailColor: "#eeeeee"
                    })}
                />
            </div>

            <div className="contenido-presupuesto">
                <button
                    className="reset-app"
                    type="button"
                    onClick={handleResetApp}       
                >
                    Resetear App
                </button>
                
                <p>
                    <span>Presupuesto: </span> {formatearMoneda(presupuesto)}
                </p>
                
                <p className={`${disponible < 0 ? "negativo" : ""}`}>
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