import { SelectorMenu } from './menu/selectorMenu'
import { SelectorAlimento } from './menu/selectorAlimento'
import { reiniciarTodoElCache } from './util/datosPlatos'

const compPlatos: SelectorMenu = new SelectorMenu()
compPlatos.entrantesUL = document.getElementById("entrantes")
compPlatos.primerosUL = document.getElementById("primeros")
compPlatos.segundosUL = document.getElementById("segundos")
compPlatos.postresUL = document.getElementById("postres")

const compAlimentos: SelectorAlimento = new SelectorAlimento()
compAlimentos.menuEntrante = document.getElementById("menuEntrante")
compAlimentos.menuPrimero = document.getElementById("menuPrimero")
compAlimentos.menuSegundo = document.getElementById("menuSegundo")
compAlimentos.menuPostre = document.getElementById("menuPostre")

compAlimentos.listaAlimentos = document.getElementById("listaCompra")
compAlimentos.totalCaloriasElement = document.getElementById("totalCalorias")

// Configurar botón de reinicio de caché
const botonReiniciarCache = document.getElementById("botonReiniciarCache")
if (botonReiniciarCache) {
    botonReiniciarCache.addEventListener("click", () => {
        if (confirm('¿Estás seguro de que deseas reiniciar el caché? Esto recargará todos los datos desde la API.')) {
            reiniciarTodoElCache()
        }
    })
}

export { compPlatos, compAlimentos }
