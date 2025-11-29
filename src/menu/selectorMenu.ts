import { getPlatosApi } from "../util/datosPlatos"
import { PlatoInterface, PlatoCategory } from "./interfaces/platoInterface"
import { anyadirMenu } from "../util/utilDOM"

/**
 * Clase para gestionar la selección y visualización de platos del menú
 */
export class SelectorMenu {
    private _platos: PlatoInterface[]

    public entrantesUL: HTMLElement
    public primerosUL: HTMLElement
    public segundosUL: HTMLElement
    public postresUL: HTMLElement

    constructor() {
        this._platos = []
        getPlatosApi(this)
    }

    /**
     * Setter para asignar platos al selector
     * @param platos - Array de platos a añadir
     */
    set platos(platos: PlatoInterface[]) {
        platos.forEach(plato => this._platos.push(plato))
    }

    /**
     * Muestra los platos de una categoría específica en el contenedor correspondiente
     * @param categoria - Categoría de platos a mostrar
     */
    mostrarPlatos(categoria: PlatoCategory): void {
        const contenedor = this.obtenerContenedorPorCategoria(categoria)
        
        if (!contenedor) {
            console.error(`Contenedor no encontrado para la categoría: ${categoria}`)
            return
        }

        this._platos.forEach((plato: PlatoInterface) => {
            if (plato.category === categoria) {
                const liElm = this.crearElementoPlato(plato)
                contenedor.appendChild(liElm)
                liElm.addEventListener("click", anyadirMenu)
            }
        })
    }

    /**
     * Crea un elemento li con la información del plato
     * @param plato - Plato a renderizar
     * @returns Elemento li con la estructura del plato
     */
    private crearElementoPlato(plato: PlatoInterface): HTMLLIElement {
        const liElm: HTMLLIElement = document.createElement("li")
        liElm.setAttribute("data-id", `${plato.id}`)
        
        const img: HTMLImageElement = document.createElement("img")
        img.src = plato.image
        img.alt = plato.title
        img.width = 50
        img.setAttribute("data-id", `${plato.id}`)
        
        const p: HTMLParagraphElement = document.createElement("p")
        p.textContent = plato.title
        p.setAttribute("data-id", `${plato.id}`)
        
        liElm.appendChild(img)
        liElm.appendChild(p)
        
        return liElm
    }

    /**
     * Obtiene el contenedor HTML correspondiente a una categoría
     * @param categoria - Categoría del plato
     * @returns Elemento HTML contenedor o undefined si no existe
     */
    private obtenerContenedorPorCategoria(categoria: PlatoCategory): HTMLElement | undefined {
        switch (categoria) {
            case PlatoCategory.ENTRANTES:
                return this.entrantesUL
            case PlatoCategory.PRIMEROS:
                return this.primerosUL
            case PlatoCategory.SEGUNDOS:
                return this.segundosUL
            case PlatoCategory.POSTRES:
                return this.postresUL
            default:
                return undefined
        }
    }

    /**
     * Obtiene un plato por su ID
     * @param id - ID del plato a buscar
     * @returns Plato encontrado o undefined si no existe
     */
    getPlato(id: number): PlatoInterface | undefined {
        return this._platos.find(plato => plato.id === id)
    }
}
