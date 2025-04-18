import { useState, useEffect } from "react"
import Mensaje from "./Mensaje"
import CerrarImg from "../img/cerrar.svg"

const Modal = ({setModal, animarModal, setAnimarModal, guardarGasto, gastoEditar, setGasteEditar}) => {

    const [mensaje, setMensaje] = useState("")
    const [nombre, setNombre] = useState("")
    const [cantidad, setCantidad] = useState("")
    const [categoría, setCategoría] = useState("")
    const [fecha, setFecha] = useState("")
    const [id, setId]= useState("")

    useEffect(()=> {
        if(Object.keys(gastoEditar).length>0){
            setNombre(gastoEditar.nombre),
            setCantidad(gastoEditar.cantidad),
            setCategoría(gastoEditar.categoría)
            setId(gastoEditar.id)
            setFecha(gastoEditar.fecha)
        }
    },[])
    
    const OcultarModal = () =>{
        //setModal(false)
        setAnimarModal(false)
        setGasteEditar({})
        setTimeout(()=> {
            setModal(false)
        }, 400)      
    }

    const handleSubmit = e => {
        e.preventDefault()

        if([nombre, cantidad, categoría].includes("")){
            setMensaje("Todos los campos son obligatorios")

            setTimeout(()=>{
                setMensaje("")
            }, 3000)
            return
        }
        guardarGasto({nombre, cantidad,categoría, id, fecha})
    }

    return (
        <div className="modal">
            <div className="cerrar-modal">
                <img 
                    src={CerrarImg} 
                    alt="Botón Cerrar" 
                    onClick={OcultarModal}
                />
            </div>

            <form 
                onSubmit={handleSubmit}
                className={`formulario ${animarModal ? "animar" : "cerrar"}`}>
                <legend>{gastoEditar.nombre ? "Editar Gasto" : "Nuevo Gasto"}</legend>

                {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}

                <div className="campo">
                    <label htmlFor="nombre">Nombre Gasto</label>
                    <input 
                        id="nombre"
                        type="text" 
                        placeholder="Añade el nombre del gasto" 
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                    />
                </div>
                <div className="campo">
                    <label htmlFor="cantidad">Cantidad Gasto</label>
                    <input 
                        id="cantidad"
                        type="number" 
                        placeholder="Añade la cantidad del gasto: ej. 300" 
                        value={cantidad}
                        onChange={e => setCantidad(Number(e.target.value))}
                    />
                </div>
                <div className="campo">
                    <label htmlFor="categoría">Categoría</label>
                    <select  
                        id="categoría"
                        value={categoría}
                        onChange={e => setCategoría(e.target.value)}
                    >
                        <option value="">-- Seleccione --</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Comida</option>
                        <option value="casa">Casa</option>
                        <option value="gastos">Gastos Varios</option>
                        <option value="ocio">Ocio</option>
                        <option value="salud">Salud</option>
                        <option value="suscripciones">Suscripciones</option>
                    </select>
                </div>

                <input 
                    type="submit" 
                    value={gastoEditar.nombre ? "Guardar Cambios" : "Añadir Gasto"} 
                />
            </form>
        </div>
    )
}

export default Modal