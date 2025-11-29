import { PlatoInterface, PlatoCategory } from '../menu/interfaces/platoInterface'
import { SelectorAlimento } from '../menu/selectorAlimento'
import { SelectorMenu } from '../menu/selectorMenu'
import { AlimentoInterface } from '../menu/interfaces/alimentoInterface'
import { NutritionInterface } from '../menu/interfaces/nutritionInterface'

/**
 * Configuración del sistema de caché para platos
 */
const CACHE_KEY = 'wonderfood_platos_cache'
const CACHE_EXPIRATION_MS = 24 * 60 * 60 * 1000

/**
 * Configuración del sistema de caché para ingredientes
 */
const CACHE_KEY_INGREDIENTES = 'wonderfood_ingredientes_cache'
const CACHE_EXPIRATION_INGREDIENTES_MS = 24 * 60 * 60 * 1000

/**
 * Configuración del sistema de caché para nutrición
 */
const CACHE_KEY_NUTRITION = 'wonderfood_nutrition_cache'
const CACHE_EXPIRATION_NUTRITION_MS = 24 * 60 * 60 * 1000 

/**
 * Interface para la estructura del caché de platos
 */
interface CacheData {
    timestamp: number
    platos: Record<PlatoCategory, PlatoInterface[]>
}

/**
 * Interface para la estructura del caché de ingredientes
 */
interface CacheIngredientesData {
    timestamp: number
    ingredientes: Record<number, AlimentoInterface[]>
}

/**
 * Interface para la estructura del caché de nutrición
 */
interface CacheNutritionData {
    timestamp: number
    nutrition: Record<number, NutritionInterface>
}

/**
 * Configuración de tipos de platos por categoría
 */
const TIPO_PLATO_CONFIG: Record<PlatoCategory, string> = {
    [PlatoCategory.ENTRANTES]: 'appetizer',
    [PlatoCategory.PRIMEROS]: 'main%20course',
    [PlatoCategory.SEGUNDOS]: 'salad',
    [PlatoCategory.POSTRES]: 'dessert'
}

/**
 * Guarda los platos en localStorage con timestamp
 * @param platos - Objeto con platos organizados por categoría
 */
const guardarPlatosEnCache = (platos: Record<PlatoCategory, PlatoInterface[]>): void => {
    try {
        const cacheData: CacheData = {
            timestamp: Date.now(),
            platos: platos
        }
        localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData))
        console.log('✅ Platos guardados en caché local')
    } catch (error) {
        console.error('Error al guardar en caché:', error)
    }
}

/**
 * Obtiene los platos desde localStorage si existen y no han expirado
 * @returns Platos en caché o null si no existen o están expirados
 */
const obtenerPlatosDeCache = (): Record<PlatoCategory, PlatoInterface[]> | null => {
    try {
        const cached = localStorage.getItem(CACHE_KEY)
        
        if (!cached) {
            console.log('📦 No hay datos en caché')
            return null
        }

        const cacheData: CacheData = JSON.parse(cached)
        const tiempoTranscurrido = Date.now() - cacheData.timestamp

        if (tiempoTranscurrido > CACHE_EXPIRATION_MS) {
            console.log('⏰ Caché expirado, se eliminará')
            localStorage.removeItem(CACHE_KEY)
            return null
        }

        console.log('✅ Datos obtenidos del caché local')
        return cacheData.platos
    } catch (error) {
        console.error('Error al leer caché:', error)
        return null
    }
}

/**
 * Limpia el caché de platos
 */
const limpiarCache = (): void => {
    localStorage.removeItem(CACHE_KEY)
    console.log('🗑️ Caché limpiado')
}

/**
 * Guarda los ingredientes de un plato en localStorage con timestamp
 * @param idPlato - ID del plato
 * @param ingredientes - Array de ingredientes del plato
 */
const guardarIngredientesEnCache = (idPlato: number, ingredientes: AlimentoInterface[]): void => {
    try {
        const cached = localStorage.getItem(CACHE_KEY_INGREDIENTES)
        let cacheData: CacheIngredientesData

        if (cached) {
            cacheData = JSON.parse(cached)
            cacheData.ingredientes[idPlato] = ingredientes
            cacheData.timestamp = Date.now()
        } else {
            cacheData = {
                timestamp: Date.now(),
                ingredientes: { [idPlato]: ingredientes }
            }
        }

        localStorage.setItem(CACHE_KEY_INGREDIENTES, JSON.stringify(cacheData))
        console.log(`✅ Ingredientes del plato ${idPlato} guardados en caché`)
    } catch (error) {
        console.error('Error al guardar ingredientes en caché:', error)
    }
}

/**
 * Obtiene los ingredientes de un plato desde localStorage si existen y no han expirado
 * @param idPlato - ID del plato
 * @returns Ingredientes en caché o null si no existen o están expirados
 */
const obtenerIngredientesDeCache = (idPlato: number): AlimentoInterface[] | null => {
    try {
        const cached = localStorage.getItem(CACHE_KEY_INGREDIENTES)
        
        if (!cached) {
            console.log('📦 No hay ingredientes en caché')
            return null
        }

        const cacheData: CacheIngredientesData = JSON.parse(cached)
        const tiempoTranscurrido = Date.now() - cacheData.timestamp

        if (tiempoTranscurrido > CACHE_EXPIRATION_INGREDIENTES_MS) {
            console.log('⏰ Caché de ingredientes expirado, se eliminará')
            localStorage.removeItem(CACHE_KEY_INGREDIENTES)
            return null
        }

        if (!cacheData.ingredientes[idPlato]) {
            console.log(`📦 No hay ingredientes en caché para el plato ${idPlato}`)
            return null
        }

        console.log(`✅ Ingredientes del plato ${idPlato} obtenidos del caché`)
        return cacheData.ingredientes[idPlato]
    } catch (error) {
        console.error('Error al leer caché de ingredientes:', error)
        return null
    }
}

/**
 * Limpia el caché de ingredientes
 */
const limpiarCacheIngredientes = (): void => {
    localStorage.removeItem(CACHE_KEY_INGREDIENTES)
    console.log('🗑️ Caché de ingredientes limpiado')
}

/**
 * Guarda la información nutricional de un plato en localStorage con timestamp
 * @param idPlato - ID del plato
 * @param nutrition - Información nutricional del plato
 */
const guardarNutritionEnCache = (idPlato: number, nutrition: NutritionInterface): void => {
    try {
        const cached = localStorage.getItem(CACHE_KEY_NUTRITION)
        let cacheData: CacheNutritionData

        if (cached) {
            cacheData = JSON.parse(cached)
            cacheData.nutrition[idPlato] = nutrition
            cacheData.timestamp = Date.now()
        } else {
            cacheData = {
                timestamp: Date.now(),
                nutrition: { [idPlato]: nutrition }
            }
        }

        localStorage.setItem(CACHE_KEY_NUTRITION, JSON.stringify(cacheData))
        console.log(`✅ Nutrición del plato ${idPlato} guardada en caché`)
    } catch (error) {
        console.error('Error al guardar nutrición en caché:', error)
    }
}

/**
 * Obtiene la información nutricional de un plato desde localStorage si existe y no ha expirado
 * @param idPlato - ID del plato
 * @returns Información nutricional en caché o null si no existe o está expirada
 */
const obtenerNutritionDeCache = (idPlato: number): NutritionInterface | null => {
    try {
        const cached = localStorage.getItem(CACHE_KEY_NUTRITION)
        
        if (!cached) {
            console.log('📦 No hay información nutricional en caché')
            return null
        }

        const cacheData: CacheNutritionData = JSON.parse(cached)
        const tiempoTranscurrido = Date.now() - cacheData.timestamp

        if (tiempoTranscurrido > CACHE_EXPIRATION_NUTRITION_MS) {
            console.log('⏰ Caché de nutrición expirado, se eliminará')
            localStorage.removeItem(CACHE_KEY_NUTRITION)
            return null
        }

        if (!cacheData.nutrition[idPlato]) {
            console.log(`📦 No hay información nutricional en caché para el plato ${idPlato}`)
            return null
        }

        console.log(`✅ Nutrición del plato ${idPlato} obtenida del caché`)
        return cacheData.nutrition[idPlato]
    } catch (error) {
        console.error('Error al leer caché de nutrición:', error)
        return null
    }
}

/**
 * Limpia el caché de nutrición
 */
const limpiarCacheNutrition = (): void => {
    localStorage.removeItem(CACHE_KEY_NUTRITION)
    console.log('🗑️ Caché de nutrición limpiado')
}

/**
 * Limpia todos los cachés (platos, ingredientes y nutrición) y recarga la página
 */
const reiniciarTodoElCache = (): void => {
    console.log('🔄 Reiniciando todo el caché...')
    limpiarCache()
    limpiarCacheIngredientes()
    limpiarCacheNutrition()
    console.log('✅ Todos los cachés han sido limpiados')
    console.log('🔄 Recargando la página...')
    window.location.reload()
}

/**
 * Obtiene platos de una categoría específica desde la API de Spoonacular
 * @param tipo - Tipo de plato a buscar
 * @param categoria - Categoría de plato a asignar
 * @param numero - Cantidad de platos a obtener
 * @returns Promise con array de platos
 */
const fetchPlatosPorCategoria = async (
    tipo: string,
    categoria: PlatoCategory,
    numero: number = 4
): Promise<PlatoInterface[]> => {
    try {
        const response = await fetch(
            `https://api.spoonacular.com/recipes/complexSearch?type=${tipo}&number=${numero}&apiKey=${process.env.SPOONACULAR_API_KEY}`
        )

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`)
        }

        const data = await response.json()
        const platos: PlatoInterface[] = data.results || []

        platos.forEach((plato: PlatoInterface) => {
            plato.category = categoria
        })

        return platos
    } catch (error) {
        console.error(`Error al obtener platos de tipo ${tipo}:`, error)
        return []
    }
}

/**
 * Carga todos los platos verificando primero el caché local
 * Si no existe caché o está expirado, obtiene desde la API y guarda en caché
 * @param sMenu - Instancia del selector de menú donde mostrar los platos
 */
const getPlatosApi = async (sMenu: SelectorMenu): Promise<void> => {
    const categorias: PlatoCategory[] = [
        PlatoCategory.ENTRANTES,
        PlatoCategory.PRIMEROS,
        PlatoCategory.SEGUNDOS,
        PlatoCategory.POSTRES
    ]

    const platosCache = obtenerPlatosDeCache()

    if (platosCache) {
        console.log('📱 Mostrando platos desde caché')
        setTimeout(() => {
            categorias.forEach(categoria => {
                if (platosCache[categoria]) {
                    sMenu.platos = platosCache[categoria]
                    sMenu.mostrarPlatos(categoria)
                }
            })
        }, 0)
        return
    }

    console.log('🌐 Obteniendo platos desde API...')
    const promesas = categorias.map(categoria =>
        fetchPlatosPorCategoria(TIPO_PLATO_CONFIG[categoria], categoria)
    )

    try {
        const resultados = await Promise.all(promesas)
        
        const platosParaCache: Record<PlatoCategory, PlatoInterface[]> = {} as Record<PlatoCategory, PlatoInterface[]>

        resultados.forEach((platos, index) => {
            const categoria = categorias[index]
            platosParaCache[categoria] = platos
            sMenu.platos = platos
            sMenu.mostrarPlatos(categoria)
        })

        guardarPlatosEnCache(platosParaCache)

    } catch (error) {
        console.error('Error al cargar los platos:', error)
    }
}

/**
 * Carga todos los alimentos (ingredientes) necesarios para la lista de la compra desde la API y los muestra en el selector de menú
 * Verifica primero el caché antes de hacer la llamada a la API
 * @param sAlimentos - Instancia del selector de alimentos donde mostrar los alimentos (ingredientes) necesarios para cada plato.
 * @param id - ID del plato seleccionado
 */
const getAlimentoApi = async (sAlimento: SelectorAlimento, id: number): Promise<void> => {
    const ingredientesCache = obtenerIngredientesDeCache(id)

    if (ingredientesCache) {
        console.log(`📱 Mostrando ingredientes del plato ${id} desde caché`)
        ingredientesCache.forEach((alimento: AlimentoInterface) => {
            alimento.platoId = id
            sAlimento.cestaAlimentos = alimento
        })
        sAlimento.mostrarAlimentos()
        return
    }

    console.log(`🌐 Obteniendo ingredientes del plato ${id} desde API...`)
    try {
        const response = await fetch(
            `https://api.spoonacular.com/recipes/${id}/ingredientWidget.json?apiKey=${process.env.SPOONACULAR_API_KEY}`
        )

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`)
        }

        const data = await response.json()
        const ingredientes: AlimentoInterface[] = []

        ;(data.ingredients).forEach((element: any) => {
            const alimento: AlimentoInterface = {
                name: element.name,
                image: element.image,
                platoId: id
            }
            ingredientes.push(alimento)
            sAlimento.cestaAlimentos = alimento
        })

        sAlimento.mostrarAlimentos()

        guardarIngredientesEnCache(id, ingredientes)

    } catch (error) {
        console.error(`Error al obtener ingredientes del plato ${id}:`, error)
    }
}

/**
 * Obtiene la información nutricional de un plato desde la API de Spoonacular
 * Verifica primero el caché antes de hacer la llamada a la API
 * @param id - ID del plato
 * @returns Promise con la información nutricional o null si hay error
 */
const getNutritionApi = async (id: number): Promise<NutritionInterface | null> => {
    const nutritionCache = obtenerNutritionDeCache(id)

    if (nutritionCache) {
        console.log(`📱 Mostrando nutrición del plato ${id} desde caché`)
        return nutritionCache
    }

    console.log(`🌐 Obteniendo nutrición del plato ${id} desde API...`)
    try {
        const response = await fetch(
            `https://api.spoonacular.com/recipes/${id}/nutritionWidget.json?apiKey=${process.env.SPOONACULAR_API_KEY}`
        )

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`)
        }

        const data = await response.json()
        
        const nutrition: NutritionInterface = {
            calories: parseFloat(data.calories),
            carbs: data.carbs,
            fat: data.fat,
            protein: data.protein
        }

        guardarNutritionEnCache(id, nutrition)

        return nutrition
    } catch (error) {
        console.error(`Error al obtener nutrición del plato ${id}:`, error)
        return null
    }
}

export { getPlatosApi, getAlimentoApi, getNutritionApi, limpiarCache, limpiarCacheIngredientes, limpiarCacheNutrition, reiniciarTodoElCache }
