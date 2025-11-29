let nombre:string
const enum TipoActividad{
    baja=1,
    moderada,
    alta
}

const sexoSelect:HTMLSelectElement=document.getElementById("sexo") as HTMLSelectElement
const actividadSelect:HTMLSelectElement=document.getElementById("actividad") as HTMLSelectElement
const pesoInput:HTMLInputElement=<HTMLInputElement>document.getElementById("peso")
const alturaInput:HTMLInputElement=<HTMLInputElement>document.getElementById("altura")
const edadInput:HTMLInputElement=<HTMLInputElement>document.getElementById("edad")

const KcalOpt:HTMLInputElement=document.getElementById("KcalOpt") as HTMLInputElement
const botonCalculo:HTMLButtonElement=<HTMLButtonElement>document.getElementById("botonCalculo")

function calcularTMB(peso:number,altura:number,edad:number,sexo:number):number{
    if(sexo==1){
        return ((10*peso)+(6.25*altura)-(5*edad)-161)
    }else{
        return ((10*peso)+(6.25*altura)-(5*edad)+5)
    }
}

function calcularKcal(actividad:number,tmb:number):number{
    if(actividad==1) return (tmb*1.375)/1000
    else if(actividad==2) return (tmb*1.55)/1000
    else return (tmb*1.725)/1000
}

function transformar(elemento:HTMLInputElement):number{
    let valor:number|any

    valor=parseFloat(elemento.value)
    if(isNaN(valor)) valor=0
    return valor
}
function transformarSelect(elemento:HTMLSelectElement):number{
    let valor:number|any

    valor=parseFloat(elemento.options[sexoSelect.selectedIndex].value)
    if(isNaN(valor)) valor=0
    return valor
}

function recogidaDatos(event:any){
    let peso:number
    let altura:number
    let edad:number
    let sexo:number
    let actividad:number

    let tmb:number
    let kcalmin:number

    event?.preventDefault()

    peso=transformar(pesoInput)
    altura=transformar(alturaInput)
    edad=transformar(edadInput)

    sexo=transformarSelect(sexoSelect)
    actividad=transformarSelect(actividadSelect)

    console.log(peso)
    console.log(altura)
    console.log(edad)
    console.log(sexo)
    console.log(actividad)

    tmb=calcularTMB(peso,altura,edad,sexo)
    kcalmin=calcularKcal(actividad,tmb)

    console.log(tmb)
    console.log(kcalmin)

    KcalOpt.value=kcalmin.toString()
    
}

botonCalculo.addEventListener("click",recogidaDatos)

