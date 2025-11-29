import { compPlatos, compAlimentos } from "../appMenu"

function anyadirMenu(event: any) {
    const platoElm: HTMLElement = event.target
    const id: number = parseInt(platoElm.dataset.id)
    compAlimentos.setPlato(compPlatos.getPlato(id))
}

export { anyadirMenu }