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
let listaGastos = []
let listaGastos2 = []
let clasificaciones = []
let bancos = []
let origenEntrada = []
//origenEntrada.push({"nombre": "Sueldo", "usuario": 0})
let gastosArray =[]
let bancosArray = []
//!objetos
class Banco{
    constructor(nombre, monto){
        this.nombre = nombre;
        this.monto = monto;
    }
}
class Gasto{
    constructor(monto, banco, nombre, clasificacion, fecha){
        this.monto = monto;
        this.banco = banco;
        this.nombre = nombre;
        this.clasificacion = clasificacion;
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
    let selectNombre_class = document.getElementById("select_clasificacion").value
    if(montoGasto != "" && selectBancoGasto != "" && selectNombre_gasto != ""){
        const nuevoGasto = new Gasto(montoGasto, selectBancoGasto, selectNombre_gasto,selectNombre_class, fecha)
        gastosArray.push(nuevoGasto);
        console.log(gastosArray)

        if(localStorage.getItem("gasto")){
            let gastJson = localStorage.getItem("gasto")
            let gastB= JSON.parse(gastJson)
            gastB.forEach(gasto => {
            let nuevodatolocal = new Gasto(`${gasto.monto}`,`${gasto.banco}`,`${gasto.nombre}`,`${gasto.clasificacion}`,`${gasto.fecha}`)
            gastosArray.push(nuevodatolocal)
            })
        }


        let gastoJson = JSON.stringify(gastosArray)
        localStorage.setItem("gasto", gastoJson);

        Swal.fire({
            title: 'Se Registro Gasto correctamente',
            confirmButtonText: 'Ok',
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                location.reload();
            }
          })
    }
    else{
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
            let nombreBanco = banco
            let montoBanco = monto
            const nuevoBanco = new Banco(nombreBanco,montoBanco)
            bancosArray.push(nuevoBanco)
            if(localStorage.getItem("bancos")){
                let bancoLocalJson = localStorage.getItem("bancos")
                let arayB= JSON.parse(bancoLocalJson)
                arayB.forEach(banco => {
                let nuevodatolocal = new Banco(`${banco.nombre}`,`${banco.monto}`)
                bancosArray.push(nuevodatolocal)
                })
            }
            localStorage.setItem('bancos', JSON.stringify(bancosArray));
            Swal.fire('Banco agregado correctamente')
            Swal.fire({
                title: 'Se Registro Banco correctamente!',
                confirmButtonText: 'Ok',
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    location.reload();
                }
            })
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
            const nuevoclasificacion = new Clasificacion(gasto,clasificacion)
            listaGastos2.push(nuevoclasificacion)
            console.log(listaGastos2)

            //bancosArray.push(nuevoBanco)
            if(localStorage.getItem("clasificacion")){
                
                let classJson = localStorage.getItem("clasificacion")
                let arayclass= JSON.parse(classJson)
                arayclass.forEach(clas => {
                let nuevoclasslocal = new Clasificacion(`${clas.gasto}`,`${clas.clasificacion}`)
                listaGastos2.push(nuevoclasslocal)
                })
            }
            localStorage.setItem('clasificacion', JSON.stringify(listaGastos2));
            Swal.fire({
                title: 'Clasificacion agregado correctamente',
                confirmButtonText: 'Ok',
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    location.reload();
                }
            })
        }else{
            Swal.fire('Error en datos')
        }
        
        })()



/*          listaGastos.push(nuevoclasificacion)
            let gastoJSON = JSON.stringify(listaGastos)
            localStorage.setItem("clasificacion", gastoJSON)
            Swal.fire('Gasto agregado correctamente')
            location.reload();
        }else{
            Swal.fire('Error en datos')
        }
        
        })()*/
}
llenadoSelect();
function cerrarSesion(){
    localStorage.setItem("sesion", false);
    window.location.href = "./pages/login.html"
}
//jalamos datos de la BD similada
async function llenadoSelect(){
    const resp = await fetch('./js/DB.json')
    listaGastos = await resp.json()
    
    console.log(listaGastos)

   //if(localStorage.getItem("clasificacion")){
        console.log("entro aqui")    
        let classJson2 = localStorage.getItem("clasificacion")
        let arayclass2= JSON.parse(classJson2)
        arayclass2.forEach(clas2 => {
        let nuevoclasslocal2 = new Clasificacion(`${clas2.gasto}`,`${clas2.clasificacion}`)
        listaGastos2.push(nuevoclasslocal2)
        console.log(listaGastos2)
      })
    //  }

    let listadoGastos = listaGastos.concat(listaGastos2)
    console.log(listadoGastos)

  
    listadoGastos.forEach(gasto => {
        let select_gasto = document.getElementById("select_gasto")
        let contenido = `${gasto.gasto}`
        let option = document.createElement("option")
        option.text = contenido
        option.value = contenido
        select_gasto.add(option)
    })
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
//con esta funcion validamos el contenido del select de la clasificacion y filtramos
//dependiendo del gasto
let select_g = document.getElementById("select_gasto")
select_g.addEventListener('change', function(){
    console.log('cambio de clasificacion')
    select_g = document.getElementById("select_gasto").value
    async function llenadoSelectClasificacion(){
        const respuesta = await fetch('./js/DB.json')
        let listaGastosClasificacion = await respuesta.json()

        let todoslosGastos = listaGastosClasificacion.concat(listaGastos2)
        console.log("entro a la asincronia")
        todoslosGastos.forEach(gasto => {
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
//!grafica  
anychart.onDocumentLoad(function () {
    if(localStorage.getItem("gasto")){
        let gastJson = localStorage.getItem("gasto")
        let gastB= JSON.parse(gastJson)
        gastB.forEach(gasto => {
        let nuevodatolocal = new Banco(`${banco.nombre}`,`${banco.monto}`)
        bancosArray.push(nuevodatolocal)
        })
    }




    // create an instance of a pie chart
    var chart = anychart.pie();
    // set the data
    chart.data([
      ["Chocolate", 5],
      ["Rhubarb compote", 2],
      ["Crêpe Suzette", 2],
      ["American blueberry", 2],
      ["Buttermilk", 1]
    ]);
    // set chart title
    chart.title("Porcentages de gastos");
    // set the container element 
    chart.container("grafica");
    // initiate chart display
    chart.draw();
  });
