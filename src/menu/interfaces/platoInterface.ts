enum PlatoCategory{
    ENTRANTES,
    PRIMEROS,
    SEGUNDOS,
    POSTRES
}

interface PlatoInterface{
    id: number,
    title: string,
    image: string,

    imageType?: string,
    category?:PlatoCategory,
    calories?: number
}

export{PlatoInterface,PlatoCategory}
