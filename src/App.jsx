import { useState, useEffect } from 'react'
import Header from './components/Header'
import Filtros from './components/Filtros'
import ListadoGastos from './components/ListadoGastos'
import Modal from './components/Modal'
import { generarId } from './helpers'
import IconoNuevoGasto from "./img/nuevo-gasto.svg"

function App() {

  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem("presupuesto")) ?? 0 /// busca en LocalStorage y si no encuentra lo setea en 0
  )
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)
  const [modal, setModal] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)
  const [gastoEditar, setGastoEditar] = useState({})
  const [gastos, setGastos] = useState(
    localStorage.getItem("gastos") ? JSON.parse(localStorage.getItem("gastos")) : []
  )
  const [filtro, setFiltro] =useState("")
  const [gastosFiltrados, setGastosFiltrados] = useState([])

  useEffect(()=> {
    if(Object.keys(gastoEditar).length>0){
      setModal(true)
      setTimeout(()=> {
        setAnimarModal(true)
      }, 400)
      }
  },[gastoEditar])

  useEffect(()=> {
      localStorage.setItem("presupuesto", presupuesto ?? 0)
  },[presupuesto])

  useEffect(()=> {
      localStorage.setItem("gastos", JSON.stringify(gastos) ?? [])
  },[gastos])

  useEffect(()=> {
    const presupuestoLS = Number(localStorage.getItem("presupuesto")) ?? 0

    if(presupuestoLS > 0){
      setIsValidPresupuesto(true)
    }
  },[])

  useEffect(()=>{
    if(filtro){
      const gastosFiltrados = gastos.filter(gasto => gasto.categoría === filtro)
      setGastosFiltrados(gastosFiltrados)
    }
  },[filtro])

  const handleNuevoGasto = () => {
    setModal(true)
    setGastoEditar({})
    setTimeout(()=> {
      setAnimarModal(true)
    }, 400)
  }

  const guardarGasto = gasto => {
    if(gasto.id){
      const gastosActualizados = gastos.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState)
      setGastos(gastosActualizados)
      setGastoEditar({})
    }else{
      gasto.id = generarId()
      gasto.fecha = Date.now()
      setGastos([...gastos, gasto])
  }
    setAnimarModal(false)
    setTimeout(()=> {
        setModal(false)
    }, 400)      
  }

  const eliminarGasto = id => {
    const gastosActualizados = gastos.filter(gasto => gasto.id !== id)
    setGastos(gastosActualizados)
  }

  return (
    <div className={modal ? "fijar" : ""}>
      <Header
        gastos={gastos}
        setGastos = {setGastos}
        presupuesto = {presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
      />

      {isValidPresupuesto && ( // en el Ternario si coloco && me evito tenes que colocar el :
        <>
          <main>
            <Filtros
              filtro = {filtro}
              setFiltro={setFiltro}            
            />
            <ListadoGastos
              gastos={gastos}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
              gastosFiltrados={gastosFiltrados}
              filtro={filtro}
            />
          </main>
          <div className="nuevo-gasto">
            <img 
              src={IconoNuevoGasto} 
              alt="IconoNuevoGasto"
              onClick={handleNuevoGasto}
            />
          </div>
        </>
      )}

      {modal && 
        <Modal 
          setModal = {setModal}
          animarModal = {animarModal}
          setAnimarModal = {setAnimarModal}
          guardarGasto = {guardarGasto}
          gastoEditar = {gastoEditar}
          setGastoEditar = {setGastoEditar}
        />}

    </div>
  )
}

export default App
