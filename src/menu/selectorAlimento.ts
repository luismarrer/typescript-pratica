import { PlatoInterface, PlatoCategory } from "./interfaces/platoInterface"
import { AlimentoInterface } from "./interfaces/alimentoInterface"
import { getAlimentoApi, getNutritionApi } from "../util/datosPlatos"

export class SelectorAlimento {
    private _menu:PlatoInterface[]
    private _cestaAlimentos:AlimentoInterface[]
    private _totalCalorias:number

    public menuEntrante:HTMLElement
    public menuPrimero:HTMLElement
    public menuSegundo:HTMLElement
    public menuPostre:HTMLElement

    public listaAlimentos:HTMLElement
    public totalCaloriasElement:HTMLElement

    constructor(){
        this._menu=[]
        this._cestaAlimentos=[]
        this._totalCalorias=0
    }
    
    async setPlato(plato:PlatoInterface):Promise<void> {
        // Buscar si ya existe un plato de la misma categoría
        const indexExistente = this._menu.findIndex(p => p.category === plato.category)
        
        if (indexExistente !== -1) {
            // Reemplazar el plato existente de la misma categoría
            this._menu[indexExistente] = plato
        } else {
            // Limitar a 4 platos como máximo
            if (this._menu.length >= 4) {
                alert('El menú ya tiene 4 platos. Selecciona un plato de una categoría ya elegida para reemplazarlo.')
                return
            }
            // Agregar el nuevo plato
            this._menu.push(plato)
        }

        let liElegido:HTMLElement

        switch(plato.category){
            case PlatoCategory.ENTRANTES:
                liElegido=this.menuEntrante
                break
            case PlatoCategory.PRIMEROS:
                liElegido=this.menuPrimero
                break
            case PlatoCategory.SEGUNDOS:
                liElegido=this.menuSegundo
                break
            case PlatoCategory.POSTRES:
                liElegido=this.menuPostre
                break
        }

        liElegido.innerHTML = `<img src="${plato.image}" alt="${plato.title}" width="100"> <p>${plato.title}</p>`
        
        await this.reconstruirListaAlimentos()
    }

    set cestaAlimentos(alimento:AlimentoInterface){
        this._cestaAlimentos.push(alimento)
    }

    /**
     * Reconstruye la lista de alimentos basándose en los platos actualmente seleccionados
     */
    private async reconstruirListaAlimentos():Promise<void> {
        this._cestaAlimentos = []
        this._totalCalorias = 0
        
        const promesas = this._menu.map(async plato => {
            await getAlimentoApi(this, plato.id)
            const nutrition = await getNutritionApi(plato.id)
            if (nutrition) {
                plato.calories = nutrition.calories
                this._totalCalorias += nutrition.calories
            }
        })
        
        await Promise.all(promesas)
        this.actualizarTotalCalorias()
    }

    mostrarAlimentos():void {
        if (!this.listaAlimentos) return
        
        this.listaAlimentos.innerHTML = ''
        
        this._cestaAlimentos.forEach(alimento => {
            const li = document.createElement('li')
            li.textContent = alimento.name
            this.listaAlimentos.appendChild(li)
        })
        
        this.mostrarListaEnConsola()
    }
    
    /**
     * Muestra la lista de alimentos agrupados por plato en consola
     */
    private mostrarListaEnConsola():void {
        console.log('\n📋 Lista de alimentos por plato:')
        console.log('================================')
        
        this._menu.forEach((plato, index) => {
            const categoria = this.obtenerNombreCategoria(plato.category)
            const alimentosDelPlato = this._cestaAlimentos
                .filter(alimento => alimento.platoId === plato.id)
                .map(alimento => alimento.name)
                .join(', ')
            
            console.log(`${index + 1}. ${categoria} - ${plato.title}: ${alimentosDelPlato}`)
        })
        
        console.log('================================\n')
    }
    
    /**
     * Obtiene el nombre de la categoría en formato legible
     */
    private obtenerNombreCategoria(categoria: PlatoCategory): string {
        switch(categoria) {
            case PlatoCategory.ENTRANTES:
                return 'Entrante'
            case PlatoCategory.PRIMEROS:
                return 'Primero'
            case PlatoCategory.SEGUNDOS:
                return 'Segundo'
            case PlatoCategory.POSTRES:
                return 'Postre'
            default:
                return 'Desconocido'
        }
    }
    
    /**
     * Actualiza el elemento HTML con el total de calorías
     */
    private actualizarTotalCalorias():void {
        if (!this.totalCaloriasElement) return
        
        this.totalCaloriasElement.innerHTML = `
            <strong>Total de calorías del menú:</strong> 
            <span class="caloria-valor">${this._totalCalorias.toFixed(0)} kcal</span>
        `
        
        console.log(`\n🔥 Total de calorías del menú: ${this._totalCalorias.toFixed(0)} kcal`)
        
        this._menu.forEach(plato => {
            const categoria = this.obtenerNombreCategoria(plato.category)
            console.log(`   ${categoria} - ${plato.title}: ${plato.calories?.toFixed(0) || 'N/A'} kcal`)
        })
    }
}
