//!validar sesion
const sesion2 = JSON.parse(localStorage.getItem("sesion"))
if(!sesion2){
    window.location.href = "./pages/login.html"
}
//!VARIABLES
let hoy = new Date()
let fecha = hoy.toLocaleDateString('en-US');
let montoMovimiento = document.getElementById("montoMovimiento").value
let selectBancoOrigen = document.getElementById("banco4").value
let selectBancoDestino = document.getElementById("banco5").value
let montoEntrada = document.getElementById("montoMovimiento").value
let selectBancoEntrada = document.getElementById("banco2").value

//!ARRAY
let clasificaciones = []
let bancos = []
let origenEntrada = []
//origenEntrada.push({"nombre": "Sueldo", "usuario": 0})
let gastosArray =[]
let bancosArray = []
console.log(gastosArray)
//!objetos
class Banco{
    constructor(nombre, monto){
        this.nombre = nombre;
        this.monto = monto;
    }
}
class Gasto{
    constructor(monto, banco, nombre, fecha){
        this.monto = monto;
        this.banco = banco;
        this.nombre = nombre;
        this.fecha = fecha;
    }
    agregarGastoArray(){

    }
}
class Movimiento{
    constructor(monto, bancoOrigen, bancoDestino){
        this.monto = monto;
        this.bancoOrigen = bancoOrigen;
        this.bancoDestino = bancoDestino;
    }
}
class Clasificacion{
    constructor(gasto,clasificacion){
        this.gasto = gasto;
        this.clasificacion = clasificacion;
    }
}
//!eventos
//script para que muestre dependiendo el select de index
let select = document.getElementById("transaccion")
let compra = document.getElementById("pagos")
let entrada = document.getElementById("entrada")
let movimiento = document.getElementById("movimientos")

entrada.style.display = "none"
movimiento.style.display = "none"
compra.style.display = "block"
//con esta funcion validamos el contenido del select
select.addEventListener('change', function(){
    console.log('cambio')
    select = document.getElementById("transaccion").value
    console.log(select)
    if(select == 'pagos'){
        entrada.style.display = 'none'
        movimiento.style.display = 'none'
        compra.style.display = 'block'

    }
    if(select == 'entradas'){
        compra.style.display = 'none'
        movimiento.style.display = 'none'
        entrada.style.display = 'block'
    }
    if(select == 'movimientos'){
        compra.style.display = 'none';
        movimiento.style.display = 'block'
        entrada.style.display = 'none'
    }
});

//!FUNCIONES
select = document.getElementById("transaccion").value
function generarPago(){
    event.preventDefault();
    let montoGasto = document.getElementById("montoGasto").value
    let selectBancoGasto = document.getElementById("banco").value
    let selectNombre_gasto = document.getElementById("select_gasto").value
    if(montoGasto != "" && selectBancoGasto != "" && selectNombre_gasto != ""){
        const nuevoGasto = new Gasto(montoGasto, selectBancoGasto, selectNombre_gasto, fecha)
        gastosArray.push(nuevoGasto);
        console.log(gastosArray)
        let gastoJson = JSON.stringify(gastosArray)
        localStorage.setItem("gasto", gastoJson);
        Swal.fire('Se registro Gasto')
    }else{
        Swal.fire('Faltan campos por llenar')
    }
        
    
}
function addGasto(){
    event.preventDefault();
    (async () => {

        const { value: banco } = await Swal.fire({
          title: 'Ingresa nombre de la cuenta o banco',
          input: 'text',
          inputLabel: 'Banco',
          inputPlaceholder: 'Banco'
          
        })
        const { value: monto } = await Swal.fire({
            title: 'Ingresa el monto de la cuenta',
            input: 'text',
            inputLabel: 'Monto',
            inputPlaceholder: 'monto'
            
          })
        if (banco && monto) {
            console.log(`Entered email: ${banco}`)
            let nombreBanco = banco
            let montoBanco = monto
            const nuevoBanco = new Banco(nombreBanco,montoBanco)
            bancosArray.push(nuevoBanco)
            let bancoJSON = JSON.stringify(bancosArray)
            localStorage.setItem("bancos", bancoJSON)
            Swal.fire('Banco agregado correctamente')
        }else{
            Swal.fire('Error en datos')
        }
        
        })()
}
function addTipoGasto(){
    event.preventDefault();
    (async () => {

        const { value: gasto } = await Swal.fire({
          title: 'Ingresa nombre del Gasto',
          input: 'text',
          inputLabel: 'Gasto',
          inputPlaceholder: 'Gasto'
          
        })
        const { value: clasificacion } = await Swal.fire({
            title: 'Ingresa su Clasificación',
            input: 'text',
            inputLabel: 'Clasificación',
            inputPlaceholder: 'Clasificación'
            
          })
        if (gasto && clasificacion) {
            console.log(`Entered email: ${gasto}`)
            let nombregasto = gasto
            let clasificacion2 = clasificacion
            const nuevoclasificacion = new Clasificacion(nombregasto,clasificacion2)
            listaGastos.push(nuevoclasificacion)
            let gastoJSON = JSON.stringify(listaGastos)
            localStorage.setItem("clasificacion", gastoJSON)
            Swal.fire('Gasto agregado correctamente')
        }else{
            Swal.fire('Error en datos')
        }
        
        })()
}
function cerrarSesion(){
    localStorage.setItem("sesion", false);
    window.location.href = "./pages/login.html"
}



//se cargan los bancos guardados en el array
//el de gastos
let araybank
if(localStorage.getItem("bancos")){
    let bankJson = localStorage.getItem("bancos")
    araybank = JSON.parse(bankJson)

    araybank.forEach(banco => {
        let select_banco = document.getElementById("banco")
        
        let contenido = `${banco.nombre}`
        let option = document.createElement("option")
        option.text = contenido
        option.value = contenido
        select_banco.add(option)
    })
}
let araybank2
if(localStorage.getItem("bancos")){
    let bankJson2 = localStorage.getItem("bancos")
    araybank2 = JSON.parse(bankJson2)

    araybank2.forEach(banco2 => {
        let select_banco2 = document.getElementById("banco2")
        
        let contenido = `${banco2.nombre}`
        let option = document.createElement("option")
        option.text = contenido
        option.value = contenido
        select_banco2.add(option)
    })
}
// el de entradas Origen
if(origenEntrada != null){
origenEntrada.forEach(entrada => {
    let select_entrada = document.getElementById("entradas")
    
    let contenido = `${entrada.nombre}`
    let option = document.createElement("option")
    option.text = contenido
    option.value = contenido
    select_entrada.add(option)
})}
//el de movimientos
let araybank4
if(localStorage.getItem("bancos")){
    let bankJson4 = localStorage.getItem("bancos")
    araybank4 = JSON.parse(bankJson4)

    araybank4.forEach(banco4 => {
        let select_banco4 = document.getElementById("banco4")
        
        let contenido = `${banco4.nombre}`
        let option = document.createElement("option")
        option.text = contenido
        option.value = contenido
        select_banco4.add(option)
    })
}
let araybank5
if(localStorage.getItem("bancos")){
    let bankJson5 = localStorage.getItem("bancos")
    araybank5 = JSON.parse(bankJson5)

    araybank5.forEach(banco5 => {
        let select_banco5 = document.getElementById("banco5")
        
        let contenido = `${banco5.nombre}`
        let option = document.createElement("option")
        option.text = contenido
        option.value = contenido
        select_banco5.add(option)
    })
}
//jalamos datos de la BD similada
async function llenadoSelect(){
    const resp = await fetch('./js/DB.json')
    let listaGastos = await resp.json()
  
    listaGastos.forEach(gasto => {
        let select_gasto = document.getElementById("select_gasto")
        let contenido = `${gasto.gasto}`
        let option = document.createElement("option")
        option.text = contenido
        option.value = contenido
        select_gasto.add(option)
    })
}
llenadoSelect();
//con esta funcion validamos el contenido del select de la clasificacion y filtramos
//dependiendo del gasto
let select_g = document.getElementById("select_gasto")
select_g.addEventListener('change', function(){
    console.log('cambio de clasificacion')
    select_g = document.getElementById("select_gasto").value
    async function llenadoSelectClasificacion(){
        const respuesta = await fetch('./js/DB.json')
        let listaGastosClasificacion = await respuesta.json()
        console.log("entro a la asincronia")
        listaGastosClasificacion.forEach(gasto => {
            let contenido = `${gasto.gasto}`
            if(select_g == contenido){
                let clasificacion = `${gasto.clasificacion}`
                let select_gasto = document.getElementById("select_clasificacion")
                let option = document.createElement("option")
                option.text = clasificacion
                option.value = clasificacion
                select_gasto.remove(select_gasto.selectedIndex)
                select_gasto.add(option)
            }else{
                console.log("no se pudo")
            }
            
        })
    }
    llenadoSelectClasificacion()
});
