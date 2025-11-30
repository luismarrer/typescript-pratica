/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/appMenu.ts":
/*!************************!*\
  !*** ./src/appMenu.ts ***!
  \************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.compAlimentos = exports.compPlatos = void 0;
const selectorMenu_1 = __webpack_require__(/*! ./menu/selectorMenu */ "./src/menu/selectorMenu.ts");
const selectorAlimento_1 = __webpack_require__(/*! ./menu/selectorAlimento */ "./src/menu/selectorAlimento.ts");
const datosPlatos_1 = __webpack_require__(/*! ./util/datosPlatos */ "./src/util/datosPlatos.ts");
const compPlatos = new selectorMenu_1.SelectorMenu();
exports.compPlatos = compPlatos;
compPlatos.entrantesUL = document.getElementById("entrantes");
compPlatos.primerosUL = document.getElementById("primeros");
compPlatos.segundosUL = document.getElementById("segundos");
compPlatos.postresUL = document.getElementById("postres");
const compAlimentos = new selectorAlimento_1.SelectorAlimento();
exports.compAlimentos = compAlimentos;
compAlimentos.menuEntrante = document.getElementById("menuEntrante");
compAlimentos.menuPrimero = document.getElementById("menuPrimero");
compAlimentos.menuSegundo = document.getElementById("menuSegundo");
compAlimentos.menuPostre = document.getElementById("menuPostre");
compAlimentos.listaAlimentos = document.getElementById("listaCompra");
compAlimentos.totalCaloriasElement = document.getElementById("totalCalorias");
// Configurar botón de reinicio de caché
const botonReiniciarCache = document.getElementById("botonReiniciarCache");
if (botonReiniciarCache) {
    botonReiniciarCache.addEventListener("click", () => {
        if (confirm('¿Estás seguro de que deseas reiniciar el caché? Esto recargará todos los datos desde la API.')) {
            (0, datosPlatos_1.reiniciarTodoElCache)();
        }
    });
}


/***/ }),

/***/ "./src/appTMB.ts":
/*!***********************!*\
  !*** ./src/appTMB.ts ***!
  \***********************/
/***/ (() => {


let nombre;
const sexoSelect = document.getElementById("sexo");
const actividadSelect = document.getElementById("actividad");
const pesoInput = document.getElementById("peso");
const alturaInput = document.getElementById("altura");
const edadInput = document.getElementById("edad");
const KcalOpt = document.getElementById("KcalOpt");
const botonCalculo = document.getElementById("botonCalculo");
function calcularTMB(peso, altura, edad, sexo) {
    if (sexo == 1) {
        return ((10 * peso) + (6.25 * altura) - (5 * edad) - 161);
    }
    else {
        return ((10 * peso) + (6.25 * altura) - (5 * edad) + 5);
    }
}
function calcularKcal(actividad, tmb) {
    if (actividad == 1)
        return (tmb * 1.375) / 1000;
    else if (actividad == 2)
        return (tmb * 1.55) / 1000;
    else
        return (tmb * 1.725) / 1000;
}
function transformar(elemento) {
    let valor;
    valor = parseFloat(elemento.value);
    if (isNaN(valor))
        valor = 0;
    return valor;
}
function transformarSelect(elemento) {
    let valor;
    valor = parseFloat(elemento.options[sexoSelect.selectedIndex].value);
    if (isNaN(valor))
        valor = 0;
    return valor;
}
function recogidaDatos(event) {
    let peso;
    let altura;
    let edad;
    let sexo;
    let actividad;
    let tmb;
    let kcalmin;
    event === null || event === void 0 ? void 0 : event.preventDefault();
    peso = transformar(pesoInput);
    altura = transformar(alturaInput);
    edad = transformar(edadInput);
    sexo = transformarSelect(sexoSelect);
    actividad = transformarSelect(actividadSelect);
    console.log(peso);
    console.log(altura);
    console.log(edad);
    console.log(sexo);
    console.log(actividad);
    tmb = calcularTMB(peso, altura, edad, sexo);
    kcalmin = calcularKcal(actividad, tmb);
    console.log(tmb);
    console.log(kcalmin);
    KcalOpt.value = kcalmin.toString();
}
botonCalculo.addEventListener("click", recogidaDatos);


/***/ }),

/***/ "./src/menu/interfaces/platoInterface.ts":
/*!***********************************************!*\
  !*** ./src/menu/interfaces/platoInterface.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PlatoCategory = void 0;
var PlatoCategory;
(function (PlatoCategory) {
    PlatoCategory[PlatoCategory["ENTRANTES"] = 0] = "ENTRANTES";
    PlatoCategory[PlatoCategory["PRIMEROS"] = 1] = "PRIMEROS";
    PlatoCategory[PlatoCategory["SEGUNDOS"] = 2] = "SEGUNDOS";
    PlatoCategory[PlatoCategory["POSTRES"] = 3] = "POSTRES";
})(PlatoCategory || (PlatoCategory = {}));
exports.PlatoCategory = PlatoCategory;


/***/ }),

/***/ "./src/menu/selectorAlimento.ts":
/*!**************************************!*\
  !*** ./src/menu/selectorAlimento.ts ***!
  \**************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SelectorAlimento = void 0;
const platoInterface_1 = __webpack_require__(/*! ./interfaces/platoInterface */ "./src/menu/interfaces/platoInterface.ts");
const datosPlatos_1 = __webpack_require__(/*! ../util/datosPlatos */ "./src/util/datosPlatos.ts");
class SelectorAlimento {
    constructor() {
        this._menu = [];
        this._cestaAlimentos = [];
        this._totalCalorias = 0;
    }
    setPlato(plato) {
        return __awaiter(this, void 0, void 0, function* () {
            // Buscar si ya existe un plato de la misma categoría
            const indexExistente = this._menu.findIndex(p => p.category === plato.category);
            if (indexExistente !== -1) {
                // Reemplazar el plato existente de la misma categoría
                this._menu[indexExistente] = plato;
            }
            else {
                // Limitar a 4 platos como máximo
                if (this._menu.length >= 4) {
                    alert('El menú ya tiene 4 platos. Selecciona un plato de una categoría ya elegida para reemplazarlo.');
                    return;
                }
                // Agregar el nuevo plato
                this._menu.push(plato);
            }
            let liElegido;
            switch (plato.category) {
                case platoInterface_1.PlatoCategory.ENTRANTES:
                    liElegido = this.menuEntrante;
                    break;
                case platoInterface_1.PlatoCategory.PRIMEROS:
                    liElegido = this.menuPrimero;
                    break;
                case platoInterface_1.PlatoCategory.SEGUNDOS:
                    liElegido = this.menuSegundo;
                    break;
                case platoInterface_1.PlatoCategory.POSTRES:
                    liElegido = this.menuPostre;
                    break;
            }
            liElegido.innerHTML = `<img src="${plato.image}" alt="${plato.title}" width="100"> <p>${plato.title}</p>`;
            yield this.reconstruirListaAlimentos();
        });
    }
    set cestaAlimentos(alimento) {
        this._cestaAlimentos.push(alimento);
    }
    /**
     * Reconstruye la lista de alimentos basándose en los platos actualmente seleccionados
     */
    reconstruirListaAlimentos() {
        return __awaiter(this, void 0, void 0, function* () {
            this._cestaAlimentos = [];
            this._totalCalorias = 0;
            const promesas = this._menu.map((plato) => __awaiter(this, void 0, void 0, function* () {
                yield (0, datosPlatos_1.getAlimentoApi)(this, plato.id);
                const nutrition = yield (0, datosPlatos_1.getNutritionApi)(plato.id);
                if (nutrition) {
                    plato.calories = nutrition.calories;
                    this._totalCalorias += nutrition.calories;
                }
            }));
            yield Promise.all(promesas);
            this.actualizarTotalCalorias();
        });
    }
    mostrarAlimentos() {
        if (!this.listaAlimentos)
            return;
        this.listaAlimentos.innerHTML = '';
        this._cestaAlimentos.forEach(alimento => {
            const li = document.createElement('li');
            li.textContent = alimento.name;
            this.listaAlimentos.appendChild(li);
        });
        this.mostrarListaEnConsola();
    }
    /**
     * Muestra la lista de alimentos agrupados por plato en consola
     */
    mostrarListaEnConsola() {
        console.log('\n📋 Lista de alimentos por plato:');
        console.log('================================');
        this._menu.forEach((plato, index) => {
            const categoria = this.obtenerNombreCategoria(plato.category);
            const alimentosDelPlato = this._cestaAlimentos
                .filter(alimento => alimento.platoId === plato.id)
                .map(alimento => alimento.name)
                .join(', ');
            console.log(`${index + 1}. ${categoria} - ${plato.title}: ${alimentosDelPlato}`);
        });
        console.log('================================\n');
    }
    /**
     * Obtiene el nombre de la categoría en formato legible
     */
    obtenerNombreCategoria(categoria) {
        switch (categoria) {
            case platoInterface_1.PlatoCategory.ENTRANTES:
                return 'Entrante';
            case platoInterface_1.PlatoCategory.PRIMEROS:
                return 'Primero';
            case platoInterface_1.PlatoCategory.SEGUNDOS:
                return 'Segundo';
            case platoInterface_1.PlatoCategory.POSTRES:
                return 'Postre';
            default:
                return 'Desconocido';
        }
    }
    /**
     * Actualiza el elemento HTML con el total de calorías
     */
    actualizarTotalCalorias() {
        if (!this.totalCaloriasElement)
            return;
        this.totalCaloriasElement.innerHTML = `
            <strong>Total de calorías del menú:</strong> 
            <span class="caloria-valor">${this._totalCalorias.toFixed(0)} kcal</span>
        `;
        console.log(`\n🔥 Total de calorías del menú: ${this._totalCalorias.toFixed(0)} kcal`);
        this._menu.forEach(plato => {
            var _a;
            const categoria = this.obtenerNombreCategoria(plato.category);
            console.log(`   ${categoria} - ${plato.title}: ${((_a = plato.calories) === null || _a === void 0 ? void 0 : _a.toFixed(0)) || 'N/A'} kcal`);
        });
    }
}
exports.SelectorAlimento = SelectorAlimento;


/***/ }),

/***/ "./src/menu/selectorMenu.ts":
/*!**********************************!*\
  !*** ./src/menu/selectorMenu.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SelectorMenu = void 0;
const datosPlatos_1 = __webpack_require__(/*! ../util/datosPlatos */ "./src/util/datosPlatos.ts");
const platoInterface_1 = __webpack_require__(/*! ./interfaces/platoInterface */ "./src/menu/interfaces/platoInterface.ts");
const utilDOM_1 = __webpack_require__(/*! ../util/utilDOM */ "./src/util/utilDOM.ts");
/**
 * Clase para gestionar la selección y visualización de platos del menú
 */
class SelectorMenu {
    constructor() {
        this._platos = [];
        (0, datosPlatos_1.getPlatosApi)(this);
    }
    /**
     * Setter para asignar platos al selector
     * @param platos - Array de platos a añadir
     */
    set platos(platos) {
        platos.forEach(plato => this._platos.push(plato));
    }
    /**
     * Muestra los platos de una categoría específica en el contenedor correspondiente
     * @param categoria - Categoría de platos a mostrar
     */
    mostrarPlatos(categoria) {
        const contenedor = this.obtenerContenedorPorCategoria(categoria);
        if (!contenedor) {
            console.error(`Contenedor no encontrado para la categoría: ${categoria}`);
            return;
        }
        this._platos.forEach((plato) => {
            if (plato.category === categoria) {
                const liElm = this.crearElementoPlato(plato);
                contenedor.appendChild(liElm);
                liElm.addEventListener("click", utilDOM_1.anyadirMenu);
            }
        });
    }
    /**
     * Crea un elemento li con la información del plato
     * @param plato - Plato a renderizar
     * @returns Elemento li con la estructura del plato
     */
    crearElementoPlato(plato) {
        const liElm = document.createElement("li");
        liElm.setAttribute("data-id", `${plato.id}`);
        const img = document.createElement("img");
        img.src = plato.image;
        img.alt = plato.title;
        img.width = 50;
        img.setAttribute("data-id", `${plato.id}`);
        const p = document.createElement("p");
        p.textContent = plato.title;
        p.setAttribute("data-id", `${plato.id}`);
        liElm.appendChild(img);
        liElm.appendChild(p);
        return liElm;
    }
    /**
     * Obtiene el contenedor HTML correspondiente a una categoría
     * @param categoria - Categoría del plato
     * @returns Elemento HTML contenedor o undefined si no existe
     */
    obtenerContenedorPorCategoria(categoria) {
        switch (categoria) {
            case platoInterface_1.PlatoCategory.ENTRANTES:
                return this.entrantesUL;
            case platoInterface_1.PlatoCategory.PRIMEROS:
                return this.primerosUL;
            case platoInterface_1.PlatoCategory.SEGUNDOS:
                return this.segundosUL;
            case platoInterface_1.PlatoCategory.POSTRES:
                return this.postresUL;
            default:
                return undefined;
        }
    }
    /**
     * Obtiene un plato por su ID
     * @param id - ID del plato a buscar
     * @returns Plato encontrado o undefined si no existe
     */
    getPlato(id) {
        return this._platos.find(plato => plato.id === id);
    }
}
exports.SelectorMenu = SelectorMenu;


/***/ }),

/***/ "./src/util/datosPlatos.ts":
/*!*********************************!*\
  !*** ./src/util/datosPlatos.ts ***!
  \*********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.reiniciarTodoElCache = exports.limpiarCacheNutrition = exports.limpiarCacheIngredientes = exports.limpiarCache = exports.getNutritionApi = exports.getAlimentoApi = exports.getPlatosApi = void 0;
const platoInterface_1 = __webpack_require__(/*! ../menu/interfaces/platoInterface */ "./src/menu/interfaces/platoInterface.ts");
/**
 * Configuración del sistema de caché para platos
 */
const CACHE_KEY = 'wonderfood_platos_cache';
const CACHE_EXPIRATION_MS = 24 * 60 * 60 * 1000;
/**
 * Configuración del sistema de caché para ingredientes
 */
const CACHE_KEY_INGREDIENTES = 'wonderfood_ingredientes_cache';
const CACHE_EXPIRATION_INGREDIENTES_MS = 24 * 60 * 60 * 1000;
/**
 * Configuración del sistema de caché para nutrición
 */
const CACHE_KEY_NUTRITION = 'wonderfood_nutrition_cache';
const CACHE_EXPIRATION_NUTRITION_MS = 24 * 60 * 60 * 1000;
/**
 * Configuración de tipos de platos por categoría
 */
const TIPO_PLATO_CONFIG = {
    [platoInterface_1.PlatoCategory.ENTRANTES]: 'appetizer',
    [platoInterface_1.PlatoCategory.PRIMEROS]: 'main%20course',
    [platoInterface_1.PlatoCategory.SEGUNDOS]: 'salad',
    [platoInterface_1.PlatoCategory.POSTRES]: 'dessert'
};
/**
 * Guarda los platos en localStorage con timestamp
 * @param platos - Objeto con platos organizados por categoría
 */
const guardarPlatosEnCache = (platos) => {
    try {
        const cacheData = {
            timestamp: Date.now(),
            platos: platos
        };
        localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
        console.log('✅ Platos guardados en caché local');
    }
    catch (error) {
        console.error('Error al guardar en caché:', error);
    }
};
/**
 * Obtiene los platos desde localStorage si existen y no han expirado
 * @returns Platos en caché o null si no existen o están expirados
 */
const obtenerPlatosDeCache = () => {
    try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (!cached) {
            console.log('📦 No hay datos en caché');
            return null;
        }
        const cacheData = JSON.parse(cached);
        const tiempoTranscurrido = Date.now() - cacheData.timestamp;
        if (tiempoTranscurrido > CACHE_EXPIRATION_MS) {
            console.log('⏰ Caché expirado, se eliminará');
            localStorage.removeItem(CACHE_KEY);
            return null;
        }
        console.log('✅ Datos obtenidos del caché local');
        return cacheData.platos;
    }
    catch (error) {
        console.error('Error al leer caché:', error);
        return null;
    }
};
/**
 * Limpia el caché de platos
 */
const limpiarCache = () => {
    localStorage.removeItem(CACHE_KEY);
    console.log('🗑️ Caché limpiado');
};
exports.limpiarCache = limpiarCache;
/**
 * Guarda los ingredientes de un plato en localStorage con timestamp
 * @param idPlato - ID del plato
 * @param ingredientes - Array de ingredientes del plato
 */
const guardarIngredientesEnCache = (idPlato, ingredientes) => {
    try {
        const cached = localStorage.getItem(CACHE_KEY_INGREDIENTES);
        let cacheData;
        if (cached) {
            cacheData = JSON.parse(cached);
            cacheData.ingredientes[idPlato] = ingredientes;
            cacheData.timestamp = Date.now();
        }
        else {
            cacheData = {
                timestamp: Date.now(),
                ingredientes: { [idPlato]: ingredientes }
            };
        }
        localStorage.setItem(CACHE_KEY_INGREDIENTES, JSON.stringify(cacheData));
        console.log(`✅ Ingredientes del plato ${idPlato} guardados en caché`);
    }
    catch (error) {
        console.error('Error al guardar ingredientes en caché:', error);
    }
};
/**
 * Obtiene los ingredientes de un plato desde localStorage si existen y no han expirado
 * @param idPlato - ID del plato
 * @returns Ingredientes en caché o null si no existen o están expirados
 */
const obtenerIngredientesDeCache = (idPlato) => {
    try {
        const cached = localStorage.getItem(CACHE_KEY_INGREDIENTES);
        if (!cached) {
            console.log('📦 No hay ingredientes en caché');
            return null;
        }
        const cacheData = JSON.parse(cached);
        const tiempoTranscurrido = Date.now() - cacheData.timestamp;
        if (tiempoTranscurrido > CACHE_EXPIRATION_INGREDIENTES_MS) {
            console.log('⏰ Caché de ingredientes expirado, se eliminará');
            localStorage.removeItem(CACHE_KEY_INGREDIENTES);
            return null;
        }
        if (!cacheData.ingredientes[idPlato]) {
            console.log(`📦 No hay ingredientes en caché para el plato ${idPlato}`);
            return null;
        }
        console.log(`✅ Ingredientes del plato ${idPlato} obtenidos del caché`);
        return cacheData.ingredientes[idPlato];
    }
    catch (error) {
        console.error('Error al leer caché de ingredientes:', error);
        return null;
    }
};
/**
 * Limpia el caché de ingredientes
 */
const limpiarCacheIngredientes = () => {
    localStorage.removeItem(CACHE_KEY_INGREDIENTES);
    console.log('🗑️ Caché de ingredientes limpiado');
};
exports.limpiarCacheIngredientes = limpiarCacheIngredientes;
/**
 * Guarda la información nutricional de un plato en localStorage con timestamp
 * @param idPlato - ID del plato
 * @param nutrition - Información nutricional del plato
 */
const guardarNutritionEnCache = (idPlato, nutrition) => {
    try {
        const cached = localStorage.getItem(CACHE_KEY_NUTRITION);
        let cacheData;
        if (cached) {
            cacheData = JSON.parse(cached);
            cacheData.nutrition[idPlato] = nutrition;
            cacheData.timestamp = Date.now();
        }
        else {
            cacheData = {
                timestamp: Date.now(),
                nutrition: { [idPlato]: nutrition }
            };
        }
        localStorage.setItem(CACHE_KEY_NUTRITION, JSON.stringify(cacheData));
        console.log(`✅ Nutrición del plato ${idPlato} guardada en caché`);
    }
    catch (error) {
        console.error('Error al guardar nutrición en caché:', error);
    }
};
/**
 * Obtiene la información nutricional de un plato desde localStorage si existe y no ha expirado
 * @param idPlato - ID del plato
 * @returns Información nutricional en caché o null si no existe o está expirada
 */
const obtenerNutritionDeCache = (idPlato) => {
    try {
        const cached = localStorage.getItem(CACHE_KEY_NUTRITION);
        if (!cached) {
            console.log('📦 No hay información nutricional en caché');
            return null;
        }
        const cacheData = JSON.parse(cached);
        const tiempoTranscurrido = Date.now() - cacheData.timestamp;
        if (tiempoTranscurrido > CACHE_EXPIRATION_NUTRITION_MS) {
            console.log('⏰ Caché de nutrición expirado, se eliminará');
            localStorage.removeItem(CACHE_KEY_NUTRITION);
            return null;
        }
        if (!cacheData.nutrition[idPlato]) {
            console.log(`📦 No hay información nutricional en caché para el plato ${idPlato}`);
            return null;
        }
        console.log(`✅ Nutrición del plato ${idPlato} obtenida del caché`);
        return cacheData.nutrition[idPlato];
    }
    catch (error) {
        console.error('Error al leer caché de nutrición:', error);
        return null;
    }
};
/**
 * Limpia el caché de nutrición
 */
const limpiarCacheNutrition = () => {
    localStorage.removeItem(CACHE_KEY_NUTRITION);
    console.log('🗑️ Caché de nutrición limpiado');
};
exports.limpiarCacheNutrition = limpiarCacheNutrition;
/**
 * Limpia todos los cachés (platos, ingredientes y nutrición) y recarga la página
 */
const reiniciarTodoElCache = () => {
    console.log('🔄 Reiniciando todo el caché...');
    limpiarCache();
    limpiarCacheIngredientes();
    limpiarCacheNutrition();
    console.log('✅ Todos los cachés han sido limpiados');
    console.log('🔄 Recargando la página...');
    window.location.reload();
};
exports.reiniciarTodoElCache = reiniciarTodoElCache;
/**
 * Obtiene platos de una categoría específica desde la API de Spoonacular
 * @param tipo - Tipo de plato a buscar
 * @param categoria - Categoría de plato a asignar
 * @param numero - Cantidad de platos a obtener
 * @returns Promise con array de platos
 */
const fetchPlatosPorCategoria = (tipo, categoria, numero = 4) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(`https://api.spoonacular.com/recipes/complexSearch?type=${tipo}&number=${numero}&apiKey=${"0a020876129b45a7a321abaeda7299b3"}`);
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
        }
        const data = yield response.json();
        const platos = data.results || [];
        platos.forEach((plato) => {
            plato.category = categoria;
        });
        return platos;
    }
    catch (error) {
        console.error(`Error al obtener platos de tipo ${tipo}:`, error);
        return [];
    }
});
/**
 * Carga todos los platos verificando primero el caché local
 * Si no existe caché o está expirado, obtiene desde la API y guarda en caché
 * @param sMenu - Instancia del selector de menú donde mostrar los platos
 */
const getPlatosApi = (sMenu) => __awaiter(void 0, void 0, void 0, function* () {
    const categorias = [
        platoInterface_1.PlatoCategory.ENTRANTES,
        platoInterface_1.PlatoCategory.PRIMEROS,
        platoInterface_1.PlatoCategory.SEGUNDOS,
        platoInterface_1.PlatoCategory.POSTRES
    ];
    const platosCache = obtenerPlatosDeCache();
    if (platosCache) {
        console.log('📱 Mostrando platos desde caché');
        setTimeout(() => {
            categorias.forEach(categoria => {
                if (platosCache[categoria]) {
                    sMenu.platos = platosCache[categoria];
                    sMenu.mostrarPlatos(categoria);
                }
            });
        }, 0);
        return;
    }
    console.log('🌐 Obteniendo platos desde API...');
    const promesas = categorias.map(categoria => fetchPlatosPorCategoria(TIPO_PLATO_CONFIG[categoria], categoria));
    try {
        const resultados = yield Promise.all(promesas);
        const platosParaCache = {};
        resultados.forEach((platos, index) => {
            const categoria = categorias[index];
            platosParaCache[categoria] = platos;
            sMenu.platos = platos;
            sMenu.mostrarPlatos(categoria);
        });
        guardarPlatosEnCache(platosParaCache);
    }
    catch (error) {
        console.error('Error al cargar los platos:', error);
    }
});
exports.getPlatosApi = getPlatosApi;
/**
 * Carga todos los alimentos (ingredientes) necesarios para la lista de la compra desde la API y los muestra en el selector de menú
 * Verifica primero el caché antes de hacer la llamada a la API
 * @param sAlimentos - Instancia del selector de alimentos donde mostrar los alimentos (ingredientes) necesarios para cada plato.
 * @param id - ID del plato seleccionado
 */
const getAlimentoApi = (sAlimento, id) => __awaiter(void 0, void 0, void 0, function* () {
    const ingredientesCache = obtenerIngredientesDeCache(id);
    if (ingredientesCache) {
        console.log(`📱 Mostrando ingredientes del plato ${id} desde caché`);
        ingredientesCache.forEach((alimento) => {
            alimento.platoId = id;
            sAlimento.cestaAlimentos = alimento;
        });
        sAlimento.mostrarAlimentos();
        return;
    }
    console.log(`🌐 Obteniendo ingredientes del plato ${id} desde API...`);
    try {
        const response = yield fetch(`https://api.spoonacular.com/recipes/${id}/ingredientWidget.json?apiKey=${"0a020876129b45a7a321abaeda7299b3"}`);
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
        }
        const data = yield response.json();
        const ingredientes = [];
        (data.ingredients).forEach((element) => {
            const alimento = {
                name: element.name,
                image: element.image,
                platoId: id
            };
            ingredientes.push(alimento);
            sAlimento.cestaAlimentos = alimento;
        });
        sAlimento.mostrarAlimentos();
        guardarIngredientesEnCache(id, ingredientes);
    }
    catch (error) {
        console.error(`Error al obtener ingredientes del plato ${id}:`, error);
    }
});
exports.getAlimentoApi = getAlimentoApi;
/**
 * Obtiene la información nutricional de un plato desde la API de Spoonacular
 * Verifica primero el caché antes de hacer la llamada a la API
 * @param id - ID del plato
 * @returns Promise con la información nutricional o null si hay error
 */
const getNutritionApi = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const nutritionCache = obtenerNutritionDeCache(id);
    if (nutritionCache) {
        console.log(`📱 Mostrando nutrición del plato ${id} desde caché`);
        return nutritionCache;
    }
    console.log(`🌐 Obteniendo nutrición del plato ${id} desde API...`);
    try {
        const response = yield fetch(`https://api.spoonacular.com/recipes/${id}/nutritionWidget.json?apiKey=${"0a020876129b45a7a321abaeda7299b3"}`);
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
        }
        const data = yield response.json();
        const nutrition = {
            calories: parseFloat(data.calories),
            carbs: data.carbs,
            fat: data.fat,
            protein: data.protein
        };
        guardarNutritionEnCache(id, nutrition);
        return nutrition;
    }
    catch (error) {
        console.error(`Error al obtener nutrición del plato ${id}:`, error);
        return null;
    }
});
exports.getNutritionApi = getNutritionApi;


/***/ }),

/***/ "./src/util/utilDOM.ts":
/*!*****************************!*\
  !*** ./src/util/utilDOM.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.anyadirMenu = void 0;
const appMenu_1 = __webpack_require__(/*! ../appMenu */ "./src/appMenu.ts");
function anyadirMenu(event) {
    const platoElm = event.target;
    const id = parseInt(platoElm.dataset.id);
    appMenu_1.compAlimentos.setPlato(appMenu_1.compPlatos.getPlato(id));
}
exports.anyadirMenu = anyadirMenu;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	__webpack_require__("./src/appTMB.ts");
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/appMenu.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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bmRlcmZvb2QvLi9zcmMvYXBwVE1CLnRzIiwid2VicGFjazovL3dvbmRlcmZvb2QvLi9zcmMvbWVudS9pbnRlcmZhY2VzL3BsYXRvSW50ZXJmYWNlLnRzIiwid2VicGFjazovL3dvbmRlcmZvb2QvLi9zcmMvbWVudS9zZWxlY3RvckFsaW1lbnRvLnRzIiwid2VicGFjazovL3dvbmRlcmZvb2QvLi9zcmMvbWVudS9zZWxlY3Rvck1lbnUudHMiLCJ3ZWJwYWNrOi8vd29uZGVyZm9vZC8uL3NyYy91dGlsL2RhdG9zUGxhdG9zLnRzIiwid2VicGFjazovL3dvbmRlcmZvb2QvLi9zcmMvdXRpbC91dGlsRE9NLnRzIiwid2VicGFjazovL3dvbmRlcmZvb2Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd29uZGVyZm9vZC93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL3dvbmRlcmZvb2Qvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL3dvbmRlcmZvb2Qvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5jb21wQWxpbWVudG9zID0gZXhwb3J0cy5jb21wUGxhdG9zID0gdm9pZCAwO1xuY29uc3Qgc2VsZWN0b3JNZW51XzEgPSByZXF1aXJlKFwiLi9tZW51L3NlbGVjdG9yTWVudVwiKTtcbmNvbnN0IHNlbGVjdG9yQWxpbWVudG9fMSA9IHJlcXVpcmUoXCIuL21lbnUvc2VsZWN0b3JBbGltZW50b1wiKTtcbmNvbnN0IGRhdG9zUGxhdG9zXzEgPSByZXF1aXJlKFwiLi91dGlsL2RhdG9zUGxhdG9zXCIpO1xuY29uc3QgY29tcFBsYXRvcyA9IG5ldyBzZWxlY3Rvck1lbnVfMS5TZWxlY3Rvck1lbnUoKTtcbmV4cG9ydHMuY29tcFBsYXRvcyA9IGNvbXBQbGF0b3M7XG5jb21wUGxhdG9zLmVudHJhbnRlc1VMID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlbnRyYW50ZXNcIik7XG5jb21wUGxhdG9zLnByaW1lcm9zVUwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByaW1lcm9zXCIpO1xuY29tcFBsYXRvcy5zZWd1bmRvc1VMID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWd1bmRvc1wiKTtcbmNvbXBQbGF0b3MucG9zdHJlc1VMID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwb3N0cmVzXCIpO1xuY29uc3QgY29tcEFsaW1lbnRvcyA9IG5ldyBzZWxlY3RvckFsaW1lbnRvXzEuU2VsZWN0b3JBbGltZW50bygpO1xuZXhwb3J0cy5jb21wQWxpbWVudG9zID0gY29tcEFsaW1lbnRvcztcbmNvbXBBbGltZW50b3MubWVudUVudHJhbnRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtZW51RW50cmFudGVcIik7XG5jb21wQWxpbWVudG9zLm1lbnVQcmltZXJvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtZW51UHJpbWVyb1wiKTtcbmNvbXBBbGltZW50b3MubWVudVNlZ3VuZG8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1lbnVTZWd1bmRvXCIpO1xuY29tcEFsaW1lbnRvcy5tZW51UG9zdHJlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtZW51UG9zdHJlXCIpO1xuY29tcEFsaW1lbnRvcy5saXN0YUFsaW1lbnRvcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibGlzdGFDb21wcmFcIik7XG5jb21wQWxpbWVudG9zLnRvdGFsQ2Fsb3JpYXNFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0b3RhbENhbG9yaWFzXCIpO1xuLy8gQ29uZmlndXJhciBib3TDs24gZGUgcmVpbmljaW8gZGUgY2FjaMOpXG5jb25zdCBib3RvblJlaW5pY2lhckNhY2hlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJib3RvblJlaW5pY2lhckNhY2hlXCIpO1xuaWYgKGJvdG9uUmVpbmljaWFyQ2FjaGUpIHtcbiAgICBib3RvblJlaW5pY2lhckNhY2hlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIGlmIChjb25maXJtKCfCv0VzdMOhcyBzZWd1cm8gZGUgcXVlIGRlc2VhcyByZWluaWNpYXIgZWwgY2FjaMOpPyBFc3RvIHJlY2FyZ2Fyw6EgdG9kb3MgbG9zIGRhdG9zIGRlc2RlIGxhIEFQSS4nKSkge1xuICAgICAgICAgICAgKDAsIGRhdG9zUGxhdG9zXzEucmVpbmljaWFyVG9kb0VsQ2FjaGUpKCk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xubGV0IG5vbWJyZTtcbmNvbnN0IHNleG9TZWxlY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNleG9cIik7XG5jb25zdCBhY3RpdmlkYWRTZWxlY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFjdGl2aWRhZFwiKTtcbmNvbnN0IHBlc29JbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGVzb1wiKTtcbmNvbnN0IGFsdHVyYUlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhbHR1cmFcIik7XG5jb25zdCBlZGFkSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVkYWRcIik7XG5jb25zdCBLY2FsT3B0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJLY2FsT3B0XCIpO1xuY29uc3QgYm90b25DYWxjdWxvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJib3RvbkNhbGN1bG9cIik7XG5mdW5jdGlvbiBjYWxjdWxhclRNQihwZXNvLCBhbHR1cmEsIGVkYWQsIHNleG8pIHtcbiAgICBpZiAoc2V4byA9PSAxKSB7XG4gICAgICAgIHJldHVybiAoKDEwICogcGVzbykgKyAoNi4yNSAqIGFsdHVyYSkgLSAoNSAqIGVkYWQpIC0gMTYxKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiAoKDEwICogcGVzbykgKyAoNi4yNSAqIGFsdHVyYSkgLSAoNSAqIGVkYWQpICsgNSk7XG4gICAgfVxufVxuZnVuY3Rpb24gY2FsY3VsYXJLY2FsKGFjdGl2aWRhZCwgdG1iKSB7XG4gICAgaWYgKGFjdGl2aWRhZCA9PSAxKVxuICAgICAgICByZXR1cm4gKHRtYiAqIDEuMzc1KSAvIDEwMDA7XG4gICAgZWxzZSBpZiAoYWN0aXZpZGFkID09IDIpXG4gICAgICAgIHJldHVybiAodG1iICogMS41NSkgLyAxMDAwO1xuICAgIGVsc2VcbiAgICAgICAgcmV0dXJuICh0bWIgKiAxLjcyNSkgLyAxMDAwO1xufVxuZnVuY3Rpb24gdHJhbnNmb3JtYXIoZWxlbWVudG8pIHtcbiAgICBsZXQgdmFsb3I7XG4gICAgdmFsb3IgPSBwYXJzZUZsb2F0KGVsZW1lbnRvLnZhbHVlKTtcbiAgICBpZiAoaXNOYU4odmFsb3IpKVxuICAgICAgICB2YWxvciA9IDA7XG4gICAgcmV0dXJuIHZhbG9yO1xufVxuZnVuY3Rpb24gdHJhbnNmb3JtYXJTZWxlY3QoZWxlbWVudG8pIHtcbiAgICBsZXQgdmFsb3I7XG4gICAgdmFsb3IgPSBwYXJzZUZsb2F0KGVsZW1lbnRvLm9wdGlvbnNbc2V4b1NlbGVjdC5zZWxlY3RlZEluZGV4XS52YWx1ZSk7XG4gICAgaWYgKGlzTmFOKHZhbG9yKSlcbiAgICAgICAgdmFsb3IgPSAwO1xuICAgIHJldHVybiB2YWxvcjtcbn1cbmZ1bmN0aW9uIHJlY29naWRhRGF0b3MoZXZlbnQpIHtcbiAgICBsZXQgcGVzbztcbiAgICBsZXQgYWx0dXJhO1xuICAgIGxldCBlZGFkO1xuICAgIGxldCBzZXhvO1xuICAgIGxldCBhY3RpdmlkYWQ7XG4gICAgbGV0IHRtYjtcbiAgICBsZXQga2NhbG1pbjtcbiAgICBldmVudCA9PT0gbnVsbCB8fCBldmVudCA9PT0gdm9pZCAwID8gdm9pZCAwIDogZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBwZXNvID0gdHJhbnNmb3JtYXIocGVzb0lucHV0KTtcbiAgICBhbHR1cmEgPSB0cmFuc2Zvcm1hcihhbHR1cmFJbnB1dCk7XG4gICAgZWRhZCA9IHRyYW5zZm9ybWFyKGVkYWRJbnB1dCk7XG4gICAgc2V4byA9IHRyYW5zZm9ybWFyU2VsZWN0KHNleG9TZWxlY3QpO1xuICAgIGFjdGl2aWRhZCA9IHRyYW5zZm9ybWFyU2VsZWN0KGFjdGl2aWRhZFNlbGVjdCk7XG4gICAgY29uc29sZS5sb2cocGVzbyk7XG4gICAgY29uc29sZS5sb2coYWx0dXJhKTtcbiAgICBjb25zb2xlLmxvZyhlZGFkKTtcbiAgICBjb25zb2xlLmxvZyhzZXhvKTtcbiAgICBjb25zb2xlLmxvZyhhY3RpdmlkYWQpO1xuICAgIHRtYiA9IGNhbGN1bGFyVE1CKHBlc28sIGFsdHVyYSwgZWRhZCwgc2V4byk7XG4gICAga2NhbG1pbiA9IGNhbGN1bGFyS2NhbChhY3RpdmlkYWQsIHRtYik7XG4gICAgY29uc29sZS5sb2codG1iKTtcbiAgICBjb25zb2xlLmxvZyhrY2FsbWluKTtcbiAgICBLY2FsT3B0LnZhbHVlID0ga2NhbG1pbi50b1N0cmluZygpO1xufVxuYm90b25DYWxjdWxvLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCByZWNvZ2lkYURhdG9zKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5QbGF0b0NhdGVnb3J5ID0gdm9pZCAwO1xudmFyIFBsYXRvQ2F0ZWdvcnk7XG4oZnVuY3Rpb24gKFBsYXRvQ2F0ZWdvcnkpIHtcbiAgICBQbGF0b0NhdGVnb3J5W1BsYXRvQ2F0ZWdvcnlbXCJFTlRSQU5URVNcIl0gPSAwXSA9IFwiRU5UUkFOVEVTXCI7XG4gICAgUGxhdG9DYXRlZ29yeVtQbGF0b0NhdGVnb3J5W1wiUFJJTUVST1NcIl0gPSAxXSA9IFwiUFJJTUVST1NcIjtcbiAgICBQbGF0b0NhdGVnb3J5W1BsYXRvQ2F0ZWdvcnlbXCJTRUdVTkRPU1wiXSA9IDJdID0gXCJTRUdVTkRPU1wiO1xuICAgIFBsYXRvQ2F0ZWdvcnlbUGxhdG9DYXRlZ29yeVtcIlBPU1RSRVNcIl0gPSAzXSA9IFwiUE9TVFJFU1wiO1xufSkoUGxhdG9DYXRlZ29yeSB8fCAoUGxhdG9DYXRlZ29yeSA9IHt9KSk7XG5leHBvcnRzLlBsYXRvQ2F0ZWdvcnkgPSBQbGF0b0NhdGVnb3J5O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuU2VsZWN0b3JBbGltZW50byA9IHZvaWQgMDtcbmNvbnN0IHBsYXRvSW50ZXJmYWNlXzEgPSByZXF1aXJlKFwiLi9pbnRlcmZhY2VzL3BsYXRvSW50ZXJmYWNlXCIpO1xuY29uc3QgZGF0b3NQbGF0b3NfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2RhdG9zUGxhdG9zXCIpO1xuY2xhc3MgU2VsZWN0b3JBbGltZW50byB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuX21lbnUgPSBbXTtcbiAgICAgICAgdGhpcy5fY2VzdGFBbGltZW50b3MgPSBbXTtcbiAgICAgICAgdGhpcy5fdG90YWxDYWxvcmlhcyA9IDA7XG4gICAgfVxuICAgIHNldFBsYXRvKHBsYXRvKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICAvLyBCdXNjYXIgc2kgeWEgZXhpc3RlIHVuIHBsYXRvIGRlIGxhIG1pc21hIGNhdGVnb3LDrWFcbiAgICAgICAgICAgIGNvbnN0IGluZGV4RXhpc3RlbnRlID0gdGhpcy5fbWVudS5maW5kSW5kZXgocCA9PiBwLmNhdGVnb3J5ID09PSBwbGF0by5jYXRlZ29yeSk7XG4gICAgICAgICAgICBpZiAoaW5kZXhFeGlzdGVudGUgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgLy8gUmVlbXBsYXphciBlbCBwbGF0byBleGlzdGVudGUgZGUgbGEgbWlzbWEgY2F0ZWdvcsOtYVxuICAgICAgICAgICAgICAgIHRoaXMuX21lbnVbaW5kZXhFeGlzdGVudGVdID0gcGxhdG87XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBMaW1pdGFyIGEgNCBwbGF0b3MgY29tbyBtw6F4aW1vXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX21lbnUubGVuZ3RoID49IDQpIHtcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoJ0VsIG1lbsO6IHlhIHRpZW5lIDQgcGxhdG9zLiBTZWxlY2Npb25hIHVuIHBsYXRvIGRlIHVuYSBjYXRlZ29yw61hIHlhIGVsZWdpZGEgcGFyYSByZWVtcGxhemFybG8uJyk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gQWdyZWdhciBlbCBudWV2byBwbGF0b1xuICAgICAgICAgICAgICAgIHRoaXMuX21lbnUucHVzaChwbGF0byk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgbGlFbGVnaWRvO1xuICAgICAgICAgICAgc3dpdGNoIChwbGF0by5jYXRlZ29yeSkge1xuICAgICAgICAgICAgICAgIGNhc2UgcGxhdG9JbnRlcmZhY2VfMS5QbGF0b0NhdGVnb3J5LkVOVFJBTlRFUzpcbiAgICAgICAgICAgICAgICAgICAgbGlFbGVnaWRvID0gdGhpcy5tZW51RW50cmFudGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgcGxhdG9JbnRlcmZhY2VfMS5QbGF0b0NhdGVnb3J5LlBSSU1FUk9TOlxuICAgICAgICAgICAgICAgICAgICBsaUVsZWdpZG8gPSB0aGlzLm1lbnVQcmltZXJvO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIHBsYXRvSW50ZXJmYWNlXzEuUGxhdG9DYXRlZ29yeS5TRUdVTkRPUzpcbiAgICAgICAgICAgICAgICAgICAgbGlFbGVnaWRvID0gdGhpcy5tZW51U2VndW5kbztcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBwbGF0b0ludGVyZmFjZV8xLlBsYXRvQ2F0ZWdvcnkuUE9TVFJFUzpcbiAgICAgICAgICAgICAgICAgICAgbGlFbGVnaWRvID0gdGhpcy5tZW51UG9zdHJlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxpRWxlZ2lkby5pbm5lckhUTUwgPSBgPGltZyBzcmM9XCIke3BsYXRvLmltYWdlfVwiIGFsdD1cIiR7cGxhdG8udGl0bGV9XCIgd2lkdGg9XCIxMDBcIj4gPHA+JHtwbGF0by50aXRsZX08L3A+YDtcbiAgICAgICAgICAgIHlpZWxkIHRoaXMucmVjb25zdHJ1aXJMaXN0YUFsaW1lbnRvcygpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgc2V0IGNlc3RhQWxpbWVudG9zKGFsaW1lbnRvKSB7XG4gICAgICAgIHRoaXMuX2Nlc3RhQWxpbWVudG9zLnB1c2goYWxpbWVudG8pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZWNvbnN0cnV5ZSBsYSBsaXN0YSBkZSBhbGltZW50b3MgYmFzw6FuZG9zZSBlbiBsb3MgcGxhdG9zIGFjdHVhbG1lbnRlIHNlbGVjY2lvbmFkb3NcbiAgICAgKi9cbiAgICByZWNvbnN0cnVpckxpc3RhQWxpbWVudG9zKCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgdGhpcy5fY2VzdGFBbGltZW50b3MgPSBbXTtcbiAgICAgICAgICAgIHRoaXMuX3RvdGFsQ2Fsb3JpYXMgPSAwO1xuICAgICAgICAgICAgY29uc3QgcHJvbWVzYXMgPSB0aGlzLl9tZW51Lm1hcCgocGxhdG8pID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICB5aWVsZCAoMCwgZGF0b3NQbGF0b3NfMS5nZXRBbGltZW50b0FwaSkodGhpcywgcGxhdG8uaWQpO1xuICAgICAgICAgICAgICAgIGNvbnN0IG51dHJpdGlvbiA9IHlpZWxkICgwLCBkYXRvc1BsYXRvc18xLmdldE51dHJpdGlvbkFwaSkocGxhdG8uaWQpO1xuICAgICAgICAgICAgICAgIGlmIChudXRyaXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgcGxhdG8uY2Fsb3JpZXMgPSBudXRyaXRpb24uY2Fsb3JpZXM7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3RvdGFsQ2Fsb3JpYXMgKz0gbnV0cml0aW9uLmNhbG9yaWVzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIHlpZWxkIFByb21pc2UuYWxsKHByb21lc2FzKTtcbiAgICAgICAgICAgIHRoaXMuYWN0dWFsaXphclRvdGFsQ2Fsb3JpYXMoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIG1vc3RyYXJBbGltZW50b3MoKSB7XG4gICAgICAgIGlmICghdGhpcy5saXN0YUFsaW1lbnRvcylcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdGhpcy5saXN0YUFsaW1lbnRvcy5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgdGhpcy5fY2VzdGFBbGltZW50b3MuZm9yRWFjaChhbGltZW50byA9PiB7XG4gICAgICAgICAgICBjb25zdCBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgICAgICAgICBsaS50ZXh0Q29udGVudCA9IGFsaW1lbnRvLm5hbWU7XG4gICAgICAgICAgICB0aGlzLmxpc3RhQWxpbWVudG9zLmFwcGVuZENoaWxkKGxpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMubW9zdHJhckxpc3RhRW5Db25zb2xhKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE11ZXN0cmEgbGEgbGlzdGEgZGUgYWxpbWVudG9zIGFncnVwYWRvcyBwb3IgcGxhdG8gZW4gY29uc29sYVxuICAgICAqL1xuICAgIG1vc3RyYXJMaXN0YUVuQ29uc29sYSgpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ1xcbvCfk4sgTGlzdGEgZGUgYWxpbWVudG9zIHBvciBwbGF0bzonKTtcbiAgICAgICAgY29uc29sZS5sb2coJz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09Jyk7XG4gICAgICAgIHRoaXMuX21lbnUuZm9yRWFjaCgocGxhdG8sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjYXRlZ29yaWEgPSB0aGlzLm9idGVuZXJOb21icmVDYXRlZ29yaWEocGxhdG8uY2F0ZWdvcnkpO1xuICAgICAgICAgICAgY29uc3QgYWxpbWVudG9zRGVsUGxhdG8gPSB0aGlzLl9jZXN0YUFsaW1lbnRvc1xuICAgICAgICAgICAgICAgIC5maWx0ZXIoYWxpbWVudG8gPT4gYWxpbWVudG8ucGxhdG9JZCA9PT0gcGxhdG8uaWQpXG4gICAgICAgICAgICAgICAgLm1hcChhbGltZW50byA9PiBhbGltZW50by5uYW1lKVxuICAgICAgICAgICAgICAgIC5qb2luKCcsICcpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coYCR7aW5kZXggKyAxfS4gJHtjYXRlZ29yaWF9IC0gJHtwbGF0by50aXRsZX06ICR7YWxpbWVudG9zRGVsUGxhdG99YCk7XG4gICAgICAgIH0pO1xuICAgICAgICBjb25zb2xlLmxvZygnPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cXG4nKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogT2J0aWVuZSBlbCBub21icmUgZGUgbGEgY2F0ZWdvcsOtYSBlbiBmb3JtYXRvIGxlZ2libGVcbiAgICAgKi9cbiAgICBvYnRlbmVyTm9tYnJlQ2F0ZWdvcmlhKGNhdGVnb3JpYSkge1xuICAgICAgICBzd2l0Y2ggKGNhdGVnb3JpYSkge1xuICAgICAgICAgICAgY2FzZSBwbGF0b0ludGVyZmFjZV8xLlBsYXRvQ2F0ZWdvcnkuRU5UUkFOVEVTOlxuICAgICAgICAgICAgICAgIHJldHVybiAnRW50cmFudGUnO1xuICAgICAgICAgICAgY2FzZSBwbGF0b0ludGVyZmFjZV8xLlBsYXRvQ2F0ZWdvcnkuUFJJTUVST1M6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdQcmltZXJvJztcbiAgICAgICAgICAgIGNhc2UgcGxhdG9JbnRlcmZhY2VfMS5QbGF0b0NhdGVnb3J5LlNFR1VORE9TOlxuICAgICAgICAgICAgICAgIHJldHVybiAnU2VndW5kbyc7XG4gICAgICAgICAgICBjYXNlIHBsYXRvSW50ZXJmYWNlXzEuUGxhdG9DYXRlZ29yeS5QT1NUUkVTOlxuICAgICAgICAgICAgICAgIHJldHVybiAnUG9zdHJlJztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdEZXNjb25vY2lkbyc7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQWN0dWFsaXphIGVsIGVsZW1lbnRvIEhUTUwgY29uIGVsIHRvdGFsIGRlIGNhbG9yw61hc1xuICAgICAqL1xuICAgIGFjdHVhbGl6YXJUb3RhbENhbG9yaWFzKCkge1xuICAgICAgICBpZiAoIXRoaXMudG90YWxDYWxvcmlhc0VsZW1lbnQpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHRoaXMudG90YWxDYWxvcmlhc0VsZW1lbnQuaW5uZXJIVE1MID0gYFxuICAgICAgICAgICAgPHN0cm9uZz5Ub3RhbCBkZSBjYWxvcsOtYXMgZGVsIG1lbsO6Ojwvc3Ryb25nPiBcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiY2Fsb3JpYS12YWxvclwiPiR7dGhpcy5fdG90YWxDYWxvcmlhcy50b0ZpeGVkKDApfSBrY2FsPC9zcGFuPlxuICAgICAgICBgO1xuICAgICAgICBjb25zb2xlLmxvZyhgXFxu8J+UpSBUb3RhbCBkZSBjYWxvcsOtYXMgZGVsIG1lbsO6OiAke3RoaXMuX3RvdGFsQ2Fsb3JpYXMudG9GaXhlZCgwKX0ga2NhbGApO1xuICAgICAgICB0aGlzLl9tZW51LmZvckVhY2gocGxhdG8gPT4ge1xuICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgY29uc3QgY2F0ZWdvcmlhID0gdGhpcy5vYnRlbmVyTm9tYnJlQ2F0ZWdvcmlhKHBsYXRvLmNhdGVnb3J5KTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGAgICAke2NhdGVnb3JpYX0gLSAke3BsYXRvLnRpdGxlfTogJHsoKF9hID0gcGxhdG8uY2Fsb3JpZXMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS50b0ZpeGVkKDApKSB8fCAnTi9BJ30ga2NhbGApO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5leHBvcnRzLlNlbGVjdG9yQWxpbWVudG8gPSBTZWxlY3RvckFsaW1lbnRvO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlNlbGVjdG9yTWVudSA9IHZvaWQgMDtcbmNvbnN0IGRhdG9zUGxhdG9zXzEgPSByZXF1aXJlKFwiLi4vdXRpbC9kYXRvc1BsYXRvc1wiKTtcbmNvbnN0IHBsYXRvSW50ZXJmYWNlXzEgPSByZXF1aXJlKFwiLi9pbnRlcmZhY2VzL3BsYXRvSW50ZXJmYWNlXCIpO1xuY29uc3QgdXRpbERPTV8xID0gcmVxdWlyZShcIi4uL3V0aWwvdXRpbERPTVwiKTtcbi8qKlxuICogQ2xhc2UgcGFyYSBnZXN0aW9uYXIgbGEgc2VsZWNjacOzbiB5IHZpc3VhbGl6YWNpw7NuIGRlIHBsYXRvcyBkZWwgbWVuw7pcbiAqL1xuY2xhc3MgU2VsZWN0b3JNZW51IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5fcGxhdG9zID0gW107XG4gICAgICAgICgwLCBkYXRvc1BsYXRvc18xLmdldFBsYXRvc0FwaSkodGhpcyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNldHRlciBwYXJhIGFzaWduYXIgcGxhdG9zIGFsIHNlbGVjdG9yXG4gICAgICogQHBhcmFtIHBsYXRvcyAtIEFycmF5IGRlIHBsYXRvcyBhIGHDsWFkaXJcbiAgICAgKi9cbiAgICBzZXQgcGxhdG9zKHBsYXRvcykge1xuICAgICAgICBwbGF0b3MuZm9yRWFjaChwbGF0byA9PiB0aGlzLl9wbGF0b3MucHVzaChwbGF0bykpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBNdWVzdHJhIGxvcyBwbGF0b3MgZGUgdW5hIGNhdGVnb3LDrWEgZXNwZWPDrWZpY2EgZW4gZWwgY29udGVuZWRvciBjb3JyZXNwb25kaWVudGVcbiAgICAgKiBAcGFyYW0gY2F0ZWdvcmlhIC0gQ2F0ZWdvcsOtYSBkZSBwbGF0b3MgYSBtb3N0cmFyXG4gICAgICovXG4gICAgbW9zdHJhclBsYXRvcyhjYXRlZ29yaWEpIHtcbiAgICAgICAgY29uc3QgY29udGVuZWRvciA9IHRoaXMub2J0ZW5lckNvbnRlbmVkb3JQb3JDYXRlZ29yaWEoY2F0ZWdvcmlhKTtcbiAgICAgICAgaWYgKCFjb250ZW5lZG9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGBDb250ZW5lZG9yIG5vIGVuY29udHJhZG8gcGFyYSBsYSBjYXRlZ29yw61hOiAke2NhdGVnb3JpYX1gKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9wbGF0b3MuZm9yRWFjaCgocGxhdG8pID0+IHtcbiAgICAgICAgICAgIGlmIChwbGF0by5jYXRlZ29yeSA9PT0gY2F0ZWdvcmlhKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbGlFbG0gPSB0aGlzLmNyZWFyRWxlbWVudG9QbGF0byhwbGF0byk7XG4gICAgICAgICAgICAgICAgY29udGVuZWRvci5hcHBlbmRDaGlsZChsaUVsbSk7XG4gICAgICAgICAgICAgICAgbGlFbG0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHV0aWxET01fMS5hbnlhZGlyTWVudSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhIHVuIGVsZW1lbnRvIGxpIGNvbiBsYSBpbmZvcm1hY2nDs24gZGVsIHBsYXRvXG4gICAgICogQHBhcmFtIHBsYXRvIC0gUGxhdG8gYSByZW5kZXJpemFyXG4gICAgICogQHJldHVybnMgRWxlbWVudG8gbGkgY29uIGxhIGVzdHJ1Y3R1cmEgZGVsIHBsYXRvXG4gICAgICovXG4gICAgY3JlYXJFbGVtZW50b1BsYXRvKHBsYXRvKSB7XG4gICAgICAgIGNvbnN0IGxpRWxtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuICAgICAgICBsaUVsbS5zZXRBdHRyaWJ1dGUoXCJkYXRhLWlkXCIsIGAke3BsYXRvLmlkfWApO1xuICAgICAgICBjb25zdCBpbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuICAgICAgICBpbWcuc3JjID0gcGxhdG8uaW1hZ2U7XG4gICAgICAgIGltZy5hbHQgPSBwbGF0by50aXRsZTtcbiAgICAgICAgaW1nLndpZHRoID0gNTA7XG4gICAgICAgIGltZy5zZXRBdHRyaWJ1dGUoXCJkYXRhLWlkXCIsIGAke3BsYXRvLmlkfWApO1xuICAgICAgICBjb25zdCBwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgICAgIHAudGV4dENvbnRlbnQgPSBwbGF0by50aXRsZTtcbiAgICAgICAgcC5zZXRBdHRyaWJ1dGUoXCJkYXRhLWlkXCIsIGAke3BsYXRvLmlkfWApO1xuICAgICAgICBsaUVsbS5hcHBlbmRDaGlsZChpbWcpO1xuICAgICAgICBsaUVsbS5hcHBlbmRDaGlsZChwKTtcbiAgICAgICAgcmV0dXJuIGxpRWxtO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBPYnRpZW5lIGVsIGNvbnRlbmVkb3IgSFRNTCBjb3JyZXNwb25kaWVudGUgYSB1bmEgY2F0ZWdvcsOtYVxuICAgICAqIEBwYXJhbSBjYXRlZ29yaWEgLSBDYXRlZ29yw61hIGRlbCBwbGF0b1xuICAgICAqIEByZXR1cm5zIEVsZW1lbnRvIEhUTUwgY29udGVuZWRvciBvIHVuZGVmaW5lZCBzaSBubyBleGlzdGVcbiAgICAgKi9cbiAgICBvYnRlbmVyQ29udGVuZWRvclBvckNhdGVnb3JpYShjYXRlZ29yaWEpIHtcbiAgICAgICAgc3dpdGNoIChjYXRlZ29yaWEpIHtcbiAgICAgICAgICAgIGNhc2UgcGxhdG9JbnRlcmZhY2VfMS5QbGF0b0NhdGVnb3J5LkVOVFJBTlRFUzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5lbnRyYW50ZXNVTDtcbiAgICAgICAgICAgIGNhc2UgcGxhdG9JbnRlcmZhY2VfMS5QbGF0b0NhdGVnb3J5LlBSSU1FUk9TOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnByaW1lcm9zVUw7XG4gICAgICAgICAgICBjYXNlIHBsYXRvSW50ZXJmYWNlXzEuUGxhdG9DYXRlZ29yeS5TRUdVTkRPUzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zZWd1bmRvc1VMO1xuICAgICAgICAgICAgY2FzZSBwbGF0b0ludGVyZmFjZV8xLlBsYXRvQ2F0ZWdvcnkuUE9TVFJFUzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wb3N0cmVzVUw7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogT2J0aWVuZSB1biBwbGF0byBwb3Igc3UgSURcbiAgICAgKiBAcGFyYW0gaWQgLSBJRCBkZWwgcGxhdG8gYSBidXNjYXJcbiAgICAgKiBAcmV0dXJucyBQbGF0byBlbmNvbnRyYWRvIG8gdW5kZWZpbmVkIHNpIG5vIGV4aXN0ZVxuICAgICAqL1xuICAgIGdldFBsYXRvKGlkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wbGF0b3MuZmluZChwbGF0byA9PiBwbGF0by5pZCA9PT0gaWQpO1xuICAgIH1cbn1cbmV4cG9ydHMuU2VsZWN0b3JNZW51ID0gU2VsZWN0b3JNZW51O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMucmVpbmljaWFyVG9kb0VsQ2FjaGUgPSBleHBvcnRzLmxpbXBpYXJDYWNoZU51dHJpdGlvbiA9IGV4cG9ydHMubGltcGlhckNhY2hlSW5ncmVkaWVudGVzID0gZXhwb3J0cy5saW1waWFyQ2FjaGUgPSBleHBvcnRzLmdldE51dHJpdGlvbkFwaSA9IGV4cG9ydHMuZ2V0QWxpbWVudG9BcGkgPSBleHBvcnRzLmdldFBsYXRvc0FwaSA9IHZvaWQgMDtcbmNvbnN0IHBsYXRvSW50ZXJmYWNlXzEgPSByZXF1aXJlKFwiLi4vbWVudS9pbnRlcmZhY2VzL3BsYXRvSW50ZXJmYWNlXCIpO1xuLyoqXG4gKiBDb25maWd1cmFjacOzbiBkZWwgc2lzdGVtYSBkZSBjYWNow6kgcGFyYSBwbGF0b3NcbiAqL1xuY29uc3QgQ0FDSEVfS0VZID0gJ3dvbmRlcmZvb2RfcGxhdG9zX2NhY2hlJztcbmNvbnN0IENBQ0hFX0VYUElSQVRJT05fTVMgPSAyNCAqIDYwICogNjAgKiAxMDAwO1xuLyoqXG4gKiBDb25maWd1cmFjacOzbiBkZWwgc2lzdGVtYSBkZSBjYWNow6kgcGFyYSBpbmdyZWRpZW50ZXNcbiAqL1xuY29uc3QgQ0FDSEVfS0VZX0lOR1JFRElFTlRFUyA9ICd3b25kZXJmb29kX2luZ3JlZGllbnRlc19jYWNoZSc7XG5jb25zdCBDQUNIRV9FWFBJUkFUSU9OX0lOR1JFRElFTlRFU19NUyA9IDI0ICogNjAgKiA2MCAqIDEwMDA7XG4vKipcbiAqIENvbmZpZ3VyYWNpw7NuIGRlbCBzaXN0ZW1hIGRlIGNhY2jDqSBwYXJhIG51dHJpY2nDs25cbiAqL1xuY29uc3QgQ0FDSEVfS0VZX05VVFJJVElPTiA9ICd3b25kZXJmb29kX251dHJpdGlvbl9jYWNoZSc7XG5jb25zdCBDQUNIRV9FWFBJUkFUSU9OX05VVFJJVElPTl9NUyA9IDI0ICogNjAgKiA2MCAqIDEwMDA7XG4vKipcbiAqIENvbmZpZ3VyYWNpw7NuIGRlIHRpcG9zIGRlIHBsYXRvcyBwb3IgY2F0ZWdvcsOtYVxuICovXG5jb25zdCBUSVBPX1BMQVRPX0NPTkZJRyA9IHtcbiAgICBbcGxhdG9JbnRlcmZhY2VfMS5QbGF0b0NhdGVnb3J5LkVOVFJBTlRFU106ICdhcHBldGl6ZXInLFxuICAgIFtwbGF0b0ludGVyZmFjZV8xLlBsYXRvQ2F0ZWdvcnkuUFJJTUVST1NdOiAnbWFpbiUyMGNvdXJzZScsXG4gICAgW3BsYXRvSW50ZXJmYWNlXzEuUGxhdG9DYXRlZ29yeS5TRUdVTkRPU106ICdzYWxhZCcsXG4gICAgW3BsYXRvSW50ZXJmYWNlXzEuUGxhdG9DYXRlZ29yeS5QT1NUUkVTXTogJ2Rlc3NlcnQnXG59O1xuLyoqXG4gKiBHdWFyZGEgbG9zIHBsYXRvcyBlbiBsb2NhbFN0b3JhZ2UgY29uIHRpbWVzdGFtcFxuICogQHBhcmFtIHBsYXRvcyAtIE9iamV0byBjb24gcGxhdG9zIG9yZ2FuaXphZG9zIHBvciBjYXRlZ29yw61hXG4gKi9cbmNvbnN0IGd1YXJkYXJQbGF0b3NFbkNhY2hlID0gKHBsYXRvcykgPT4ge1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGNhY2hlRGF0YSA9IHtcbiAgICAgICAgICAgIHRpbWVzdGFtcDogRGF0ZS5ub3coKSxcbiAgICAgICAgICAgIHBsYXRvczogcGxhdG9zXG4gICAgICAgIH07XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKENBQ0hFX0tFWSwgSlNPTi5zdHJpbmdpZnkoY2FjaGVEYXRhKSk7XG4gICAgICAgIGNvbnNvbGUubG9nKCfinIUgUGxhdG9zIGd1YXJkYWRvcyBlbiBjYWNow6kgbG9jYWwnKTtcbiAgICB9XG4gICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGFsIGd1YXJkYXIgZW4gY2FjaMOpOicsIGVycm9yKTtcbiAgICB9XG59O1xuLyoqXG4gKiBPYnRpZW5lIGxvcyBwbGF0b3MgZGVzZGUgbG9jYWxTdG9yYWdlIHNpIGV4aXN0ZW4geSBubyBoYW4gZXhwaXJhZG9cbiAqIEByZXR1cm5zIFBsYXRvcyBlbiBjYWNow6kgbyBudWxsIHNpIG5vIGV4aXN0ZW4gbyBlc3TDoW4gZXhwaXJhZG9zXG4gKi9cbmNvbnN0IG9idGVuZXJQbGF0b3NEZUNhY2hlID0gKCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGNhY2hlZCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKENBQ0hFX0tFWSk7XG4gICAgICAgIGlmICghY2FjaGVkKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygn8J+TpiBObyBoYXkgZGF0b3MgZW4gY2FjaMOpJyk7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBjYWNoZURhdGEgPSBKU09OLnBhcnNlKGNhY2hlZCk7XG4gICAgICAgIGNvbnN0IHRpZW1wb1RyYW5zY3VycmlkbyA9IERhdGUubm93KCkgLSBjYWNoZURhdGEudGltZXN0YW1wO1xuICAgICAgICBpZiAodGllbXBvVHJhbnNjdXJyaWRvID4gQ0FDSEVfRVhQSVJBVElPTl9NUykge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ+KPsCBDYWNow6kgZXhwaXJhZG8sIHNlIGVsaW1pbmFyw6EnKTtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKENBQ0hFX0tFWSk7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZygn4pyFIERhdG9zIG9idGVuaWRvcyBkZWwgY2FjaMOpIGxvY2FsJyk7XG4gICAgICAgIHJldHVybiBjYWNoZURhdGEucGxhdG9zO1xuICAgIH1cbiAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgYWwgbGVlciBjYWNow6k6JywgZXJyb3IpO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG59O1xuLyoqXG4gKiBMaW1waWEgZWwgY2FjaMOpIGRlIHBsYXRvc1xuICovXG5jb25zdCBsaW1waWFyQ2FjaGUgPSAoKSA9PiB7XG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oQ0FDSEVfS0VZKTtcbiAgICBjb25zb2xlLmxvZygn8J+Xke+4jyBDYWNow6kgbGltcGlhZG8nKTtcbn07XG5leHBvcnRzLmxpbXBpYXJDYWNoZSA9IGxpbXBpYXJDYWNoZTtcbi8qKlxuICogR3VhcmRhIGxvcyBpbmdyZWRpZW50ZXMgZGUgdW4gcGxhdG8gZW4gbG9jYWxTdG9yYWdlIGNvbiB0aW1lc3RhbXBcbiAqIEBwYXJhbSBpZFBsYXRvIC0gSUQgZGVsIHBsYXRvXG4gKiBAcGFyYW0gaW5ncmVkaWVudGVzIC0gQXJyYXkgZGUgaW5ncmVkaWVudGVzIGRlbCBwbGF0b1xuICovXG5jb25zdCBndWFyZGFySW5ncmVkaWVudGVzRW5DYWNoZSA9IChpZFBsYXRvLCBpbmdyZWRpZW50ZXMpID0+IHtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCBjYWNoZWQgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShDQUNIRV9LRVlfSU5HUkVESUVOVEVTKTtcbiAgICAgICAgbGV0IGNhY2hlRGF0YTtcbiAgICAgICAgaWYgKGNhY2hlZCkge1xuICAgICAgICAgICAgY2FjaGVEYXRhID0gSlNPTi5wYXJzZShjYWNoZWQpO1xuICAgICAgICAgICAgY2FjaGVEYXRhLmluZ3JlZGllbnRlc1tpZFBsYXRvXSA9IGluZ3JlZGllbnRlcztcbiAgICAgICAgICAgIGNhY2hlRGF0YS50aW1lc3RhbXAgPSBEYXRlLm5vdygpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVEYXRhID0ge1xuICAgICAgICAgICAgICAgIHRpbWVzdGFtcDogRGF0ZS5ub3coKSxcbiAgICAgICAgICAgICAgICBpbmdyZWRpZW50ZXM6IHsgW2lkUGxhdG9dOiBpbmdyZWRpZW50ZXMgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShDQUNIRV9LRVlfSU5HUkVESUVOVEVTLCBKU09OLnN0cmluZ2lmeShjYWNoZURhdGEpKTtcbiAgICAgICAgY29uc29sZS5sb2coYOKchSBJbmdyZWRpZW50ZXMgZGVsIHBsYXRvICR7aWRQbGF0b30gZ3VhcmRhZG9zIGVuIGNhY2jDqWApO1xuICAgIH1cbiAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgYWwgZ3VhcmRhciBpbmdyZWRpZW50ZXMgZW4gY2FjaMOpOicsIGVycm9yKTtcbiAgICB9XG59O1xuLyoqXG4gKiBPYnRpZW5lIGxvcyBpbmdyZWRpZW50ZXMgZGUgdW4gcGxhdG8gZGVzZGUgbG9jYWxTdG9yYWdlIHNpIGV4aXN0ZW4geSBubyBoYW4gZXhwaXJhZG9cbiAqIEBwYXJhbSBpZFBsYXRvIC0gSUQgZGVsIHBsYXRvXG4gKiBAcmV0dXJucyBJbmdyZWRpZW50ZXMgZW4gY2FjaMOpIG8gbnVsbCBzaSBubyBleGlzdGVuIG8gZXN0w6FuIGV4cGlyYWRvc1xuICovXG5jb25zdCBvYnRlbmVySW5ncmVkaWVudGVzRGVDYWNoZSA9IChpZFBsYXRvKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgY2FjaGVkID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oQ0FDSEVfS0VZX0lOR1JFRElFTlRFUyk7XG4gICAgICAgIGlmICghY2FjaGVkKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygn8J+TpiBObyBoYXkgaW5ncmVkaWVudGVzIGVuIGNhY2jDqScpO1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY2FjaGVEYXRhID0gSlNPTi5wYXJzZShjYWNoZWQpO1xuICAgICAgICBjb25zdCB0aWVtcG9UcmFuc2N1cnJpZG8gPSBEYXRlLm5vdygpIC0gY2FjaGVEYXRhLnRpbWVzdGFtcDtcbiAgICAgICAgaWYgKHRpZW1wb1RyYW5zY3VycmlkbyA+IENBQ0hFX0VYUElSQVRJT05fSU5HUkVESUVOVEVTX01TKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygn4o+wIENhY2jDqSBkZSBpbmdyZWRpZW50ZXMgZXhwaXJhZG8sIHNlIGVsaW1pbmFyw6EnKTtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKENBQ0hFX0tFWV9JTkdSRURJRU5URVMpO1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFjYWNoZURhdGEuaW5ncmVkaWVudGVzW2lkUGxhdG9dKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhg8J+TpiBObyBoYXkgaW5ncmVkaWVudGVzIGVuIGNhY2jDqSBwYXJhIGVsIHBsYXRvICR7aWRQbGF0b31gKTtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKGDinIUgSW5ncmVkaWVudGVzIGRlbCBwbGF0byAke2lkUGxhdG99IG9idGVuaWRvcyBkZWwgY2FjaMOpYCk7XG4gICAgICAgIHJldHVybiBjYWNoZURhdGEuaW5ncmVkaWVudGVzW2lkUGxhdG9dO1xuICAgIH1cbiAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgYWwgbGVlciBjYWNow6kgZGUgaW5ncmVkaWVudGVzOicsIGVycm9yKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxufTtcbi8qKlxuICogTGltcGlhIGVsIGNhY2jDqSBkZSBpbmdyZWRpZW50ZXNcbiAqL1xuY29uc3QgbGltcGlhckNhY2hlSW5ncmVkaWVudGVzID0gKCkgPT4ge1xuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKENBQ0hFX0tFWV9JTkdSRURJRU5URVMpO1xuICAgIGNvbnNvbGUubG9nKCfwn5eR77iPIENhY2jDqSBkZSBpbmdyZWRpZW50ZXMgbGltcGlhZG8nKTtcbn07XG5leHBvcnRzLmxpbXBpYXJDYWNoZUluZ3JlZGllbnRlcyA9IGxpbXBpYXJDYWNoZUluZ3JlZGllbnRlcztcbi8qKlxuICogR3VhcmRhIGxhIGluZm9ybWFjacOzbiBudXRyaWNpb25hbCBkZSB1biBwbGF0byBlbiBsb2NhbFN0b3JhZ2UgY29uIHRpbWVzdGFtcFxuICogQHBhcmFtIGlkUGxhdG8gLSBJRCBkZWwgcGxhdG9cbiAqIEBwYXJhbSBudXRyaXRpb24gLSBJbmZvcm1hY2nDs24gbnV0cmljaW9uYWwgZGVsIHBsYXRvXG4gKi9cbmNvbnN0IGd1YXJkYXJOdXRyaXRpb25FbkNhY2hlID0gKGlkUGxhdG8sIG51dHJpdGlvbikgPT4ge1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGNhY2hlZCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKENBQ0hFX0tFWV9OVVRSSVRJT04pO1xuICAgICAgICBsZXQgY2FjaGVEYXRhO1xuICAgICAgICBpZiAoY2FjaGVkKSB7XG4gICAgICAgICAgICBjYWNoZURhdGEgPSBKU09OLnBhcnNlKGNhY2hlZCk7XG4gICAgICAgICAgICBjYWNoZURhdGEubnV0cml0aW9uW2lkUGxhdG9dID0gbnV0cml0aW9uO1xuICAgICAgICAgICAgY2FjaGVEYXRhLnRpbWVzdGFtcCA9IERhdGUubm93KCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjYWNoZURhdGEgPSB7XG4gICAgICAgICAgICAgICAgdGltZXN0YW1wOiBEYXRlLm5vdygpLFxuICAgICAgICAgICAgICAgIG51dHJpdGlvbjogeyBbaWRQbGF0b106IG51dHJpdGlvbiB9XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKENBQ0hFX0tFWV9OVVRSSVRJT04sIEpTT04uc3RyaW5naWZ5KGNhY2hlRGF0YSkpO1xuICAgICAgICBjb25zb2xlLmxvZyhg4pyFIE51dHJpY2nDs24gZGVsIHBsYXRvICR7aWRQbGF0b30gZ3VhcmRhZGEgZW4gY2FjaMOpYCk7XG4gICAgfVxuICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBhbCBndWFyZGFyIG51dHJpY2nDs24gZW4gY2FjaMOpOicsIGVycm9yKTtcbiAgICB9XG59O1xuLyoqXG4gKiBPYnRpZW5lIGxhIGluZm9ybWFjacOzbiBudXRyaWNpb25hbCBkZSB1biBwbGF0byBkZXNkZSBsb2NhbFN0b3JhZ2Ugc2kgZXhpc3RlIHkgbm8gaGEgZXhwaXJhZG9cbiAqIEBwYXJhbSBpZFBsYXRvIC0gSUQgZGVsIHBsYXRvXG4gKiBAcmV0dXJucyBJbmZvcm1hY2nDs24gbnV0cmljaW9uYWwgZW4gY2FjaMOpIG8gbnVsbCBzaSBubyBleGlzdGUgbyBlc3TDoSBleHBpcmFkYVxuICovXG5jb25zdCBvYnRlbmVyTnV0cml0aW9uRGVDYWNoZSA9IChpZFBsYXRvKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgY2FjaGVkID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oQ0FDSEVfS0VZX05VVFJJVElPTik7XG4gICAgICAgIGlmICghY2FjaGVkKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygn8J+TpiBObyBoYXkgaW5mb3JtYWNpw7NuIG51dHJpY2lvbmFsIGVuIGNhY2jDqScpO1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY2FjaGVEYXRhID0gSlNPTi5wYXJzZShjYWNoZWQpO1xuICAgICAgICBjb25zdCB0aWVtcG9UcmFuc2N1cnJpZG8gPSBEYXRlLm5vdygpIC0gY2FjaGVEYXRhLnRpbWVzdGFtcDtcbiAgICAgICAgaWYgKHRpZW1wb1RyYW5zY3VycmlkbyA+IENBQ0hFX0VYUElSQVRJT05fTlVUUklUSU9OX01TKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygn4o+wIENhY2jDqSBkZSBudXRyaWNpw7NuIGV4cGlyYWRvLCBzZSBlbGltaW5hcsOhJyk7XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShDQUNIRV9LRVlfTlVUUklUSU9OKTtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmICghY2FjaGVEYXRhLm51dHJpdGlvbltpZFBsYXRvXSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYPCfk6YgTm8gaGF5IGluZm9ybWFjacOzbiBudXRyaWNpb25hbCBlbiBjYWNow6kgcGFyYSBlbCBwbGF0byAke2lkUGxhdG99YCk7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhg4pyFIE51dHJpY2nDs24gZGVsIHBsYXRvICR7aWRQbGF0b30gb2J0ZW5pZGEgZGVsIGNhY2jDqWApO1xuICAgICAgICByZXR1cm4gY2FjaGVEYXRhLm51dHJpdGlvbltpZFBsYXRvXTtcbiAgICB9XG4gICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGFsIGxlZXIgY2FjaMOpIGRlIG51dHJpY2nDs246JywgZXJyb3IpO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG59O1xuLyoqXG4gKiBMaW1waWEgZWwgY2FjaMOpIGRlIG51dHJpY2nDs25cbiAqL1xuY29uc3QgbGltcGlhckNhY2hlTnV0cml0aW9uID0gKCkgPT4ge1xuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKENBQ0hFX0tFWV9OVVRSSVRJT04pO1xuICAgIGNvbnNvbGUubG9nKCfwn5eR77iPIENhY2jDqSBkZSBudXRyaWNpw7NuIGxpbXBpYWRvJyk7XG59O1xuZXhwb3J0cy5saW1waWFyQ2FjaGVOdXRyaXRpb24gPSBsaW1waWFyQ2FjaGVOdXRyaXRpb247XG4vKipcbiAqIExpbXBpYSB0b2RvcyBsb3MgY2FjaMOpcyAocGxhdG9zLCBpbmdyZWRpZW50ZXMgeSBudXRyaWNpw7NuKSB5IHJlY2FyZ2EgbGEgcMOhZ2luYVxuICovXG5jb25zdCByZWluaWNpYXJUb2RvRWxDYWNoZSA9ICgpID0+IHtcbiAgICBjb25zb2xlLmxvZygn8J+UhCBSZWluaWNpYW5kbyB0b2RvIGVsIGNhY2jDqS4uLicpO1xuICAgIGxpbXBpYXJDYWNoZSgpO1xuICAgIGxpbXBpYXJDYWNoZUluZ3JlZGllbnRlcygpO1xuICAgIGxpbXBpYXJDYWNoZU51dHJpdGlvbigpO1xuICAgIGNvbnNvbGUubG9nKCfinIUgVG9kb3MgbG9zIGNhY2jDqXMgaGFuIHNpZG8gbGltcGlhZG9zJyk7XG4gICAgY29uc29sZS5sb2coJ/CflIQgUmVjYXJnYW5kbyBsYSBww6FnaW5hLi4uJyk7XG4gICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xufTtcbmV4cG9ydHMucmVpbmljaWFyVG9kb0VsQ2FjaGUgPSByZWluaWNpYXJUb2RvRWxDYWNoZTtcbi8qKlxuICogT2J0aWVuZSBwbGF0b3MgZGUgdW5hIGNhdGVnb3LDrWEgZXNwZWPDrWZpY2EgZGVzZGUgbGEgQVBJIGRlIFNwb29uYWN1bGFyXG4gKiBAcGFyYW0gdGlwbyAtIFRpcG8gZGUgcGxhdG8gYSBidXNjYXJcbiAqIEBwYXJhbSBjYXRlZ29yaWEgLSBDYXRlZ29yw61hIGRlIHBsYXRvIGEgYXNpZ25hclxuICogQHBhcmFtIG51bWVybyAtIENhbnRpZGFkIGRlIHBsYXRvcyBhIG9idGVuZXJcbiAqIEByZXR1cm5zIFByb21pc2UgY29uIGFycmF5IGRlIHBsYXRvc1xuICovXG5jb25zdCBmZXRjaFBsYXRvc1BvckNhdGVnb3JpYSA9ICh0aXBvLCBjYXRlZ29yaWEsIG51bWVybyA9IDQpID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0geWllbGQgZmV0Y2goYGh0dHBzOi8vYXBpLnNwb29uYWN1bGFyLmNvbS9yZWNpcGVzL2NvbXBsZXhTZWFyY2g/dHlwZT0ke3RpcG99Jm51bWJlcj0ke251bWVyb30mYXBpS2V5PSR7cHJvY2Vzcy5lbnYuU1BPT05BQ1VMQVJfQVBJX0tFWX1gKTtcbiAgICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBFcnJvciBIVFRQOiAke3Jlc3BvbnNlLnN0YXR1c30gLSAke3Jlc3BvbnNlLnN0YXR1c1RleHR9YCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZGF0YSA9IHlpZWxkIHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgY29uc3QgcGxhdG9zID0gZGF0YS5yZXN1bHRzIHx8IFtdO1xuICAgICAgICBwbGF0b3MuZm9yRWFjaCgocGxhdG8pID0+IHtcbiAgICAgICAgICAgIHBsYXRvLmNhdGVnb3J5ID0gY2F0ZWdvcmlhO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHBsYXRvcztcbiAgICB9XG4gICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoYEVycm9yIGFsIG9idGVuZXIgcGxhdG9zIGRlIHRpcG8gJHt0aXBvfTpgLCBlcnJvcik7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICB9XG59KTtcbi8qKlxuICogQ2FyZ2EgdG9kb3MgbG9zIHBsYXRvcyB2ZXJpZmljYW5kbyBwcmltZXJvIGVsIGNhY2jDqSBsb2NhbFxuICogU2kgbm8gZXhpc3RlIGNhY2jDqSBvIGVzdMOhIGV4cGlyYWRvLCBvYnRpZW5lIGRlc2RlIGxhIEFQSSB5IGd1YXJkYSBlbiBjYWNow6lcbiAqIEBwYXJhbSBzTWVudSAtIEluc3RhbmNpYSBkZWwgc2VsZWN0b3IgZGUgbWVuw7ogZG9uZGUgbW9zdHJhciBsb3MgcGxhdG9zXG4gKi9cbmNvbnN0IGdldFBsYXRvc0FwaSA9IChzTWVudSkgPT4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgY29uc3QgY2F0ZWdvcmlhcyA9IFtcbiAgICAgICAgcGxhdG9JbnRlcmZhY2VfMS5QbGF0b0NhdGVnb3J5LkVOVFJBTlRFUyxcbiAgICAgICAgcGxhdG9JbnRlcmZhY2VfMS5QbGF0b0NhdGVnb3J5LlBSSU1FUk9TLFxuICAgICAgICBwbGF0b0ludGVyZmFjZV8xLlBsYXRvQ2F0ZWdvcnkuU0VHVU5ET1MsXG4gICAgICAgIHBsYXRvSW50ZXJmYWNlXzEuUGxhdG9DYXRlZ29yeS5QT1NUUkVTXG4gICAgXTtcbiAgICBjb25zdCBwbGF0b3NDYWNoZSA9IG9idGVuZXJQbGF0b3NEZUNhY2hlKCk7XG4gICAgaWYgKHBsYXRvc0NhY2hlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCfwn5OxIE1vc3RyYW5kbyBwbGF0b3MgZGVzZGUgY2FjaMOpJyk7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgY2F0ZWdvcmlhcy5mb3JFYWNoKGNhdGVnb3JpYSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHBsYXRvc0NhY2hlW2NhdGVnb3JpYV0pIHtcbiAgICAgICAgICAgICAgICAgICAgc01lbnUucGxhdG9zID0gcGxhdG9zQ2FjaGVbY2F0ZWdvcmlhXTtcbiAgICAgICAgICAgICAgICAgICAgc01lbnUubW9zdHJhclBsYXRvcyhjYXRlZ29yaWEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LCAwKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zb2xlLmxvZygn8J+MkCBPYnRlbmllbmRvIHBsYXRvcyBkZXNkZSBBUEkuLi4nKTtcbiAgICBjb25zdCBwcm9tZXNhcyA9IGNhdGVnb3JpYXMubWFwKGNhdGVnb3JpYSA9PiBmZXRjaFBsYXRvc1BvckNhdGVnb3JpYShUSVBPX1BMQVRPX0NPTkZJR1tjYXRlZ29yaWFdLCBjYXRlZ29yaWEpKTtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCByZXN1bHRhZG9zID0geWllbGQgUHJvbWlzZS5hbGwocHJvbWVzYXMpO1xuICAgICAgICBjb25zdCBwbGF0b3NQYXJhQ2FjaGUgPSB7fTtcbiAgICAgICAgcmVzdWx0YWRvcy5mb3JFYWNoKChwbGF0b3MsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjYXRlZ29yaWEgPSBjYXRlZ29yaWFzW2luZGV4XTtcbiAgICAgICAgICAgIHBsYXRvc1BhcmFDYWNoZVtjYXRlZ29yaWFdID0gcGxhdG9zO1xuICAgICAgICAgICAgc01lbnUucGxhdG9zID0gcGxhdG9zO1xuICAgICAgICAgICAgc01lbnUubW9zdHJhclBsYXRvcyhjYXRlZ29yaWEpO1xuICAgICAgICB9KTtcbiAgICAgICAgZ3VhcmRhclBsYXRvc0VuQ2FjaGUocGxhdG9zUGFyYUNhY2hlKTtcbiAgICB9XG4gICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGFsIGNhcmdhciBsb3MgcGxhdG9zOicsIGVycm9yKTtcbiAgICB9XG59KTtcbmV4cG9ydHMuZ2V0UGxhdG9zQXBpID0gZ2V0UGxhdG9zQXBpO1xuLyoqXG4gKiBDYXJnYSB0b2RvcyBsb3MgYWxpbWVudG9zIChpbmdyZWRpZW50ZXMpIG5lY2VzYXJpb3MgcGFyYSBsYSBsaXN0YSBkZSBsYSBjb21wcmEgZGVzZGUgbGEgQVBJIHkgbG9zIG11ZXN0cmEgZW4gZWwgc2VsZWN0b3IgZGUgbWVuw7pcbiAqIFZlcmlmaWNhIHByaW1lcm8gZWwgY2FjaMOpIGFudGVzIGRlIGhhY2VyIGxhIGxsYW1hZGEgYSBsYSBBUElcbiAqIEBwYXJhbSBzQWxpbWVudG9zIC0gSW5zdGFuY2lhIGRlbCBzZWxlY3RvciBkZSBhbGltZW50b3MgZG9uZGUgbW9zdHJhciBsb3MgYWxpbWVudG9zIChpbmdyZWRpZW50ZXMpIG5lY2VzYXJpb3MgcGFyYSBjYWRhIHBsYXRvLlxuICogQHBhcmFtIGlkIC0gSUQgZGVsIHBsYXRvIHNlbGVjY2lvbmFkb1xuICovXG5jb25zdCBnZXRBbGltZW50b0FwaSA9IChzQWxpbWVudG8sIGlkKSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICBjb25zdCBpbmdyZWRpZW50ZXNDYWNoZSA9IG9idGVuZXJJbmdyZWRpZW50ZXNEZUNhY2hlKGlkKTtcbiAgICBpZiAoaW5ncmVkaWVudGVzQ2FjaGUpIHtcbiAgICAgICAgY29uc29sZS5sb2coYPCfk7EgTW9zdHJhbmRvIGluZ3JlZGllbnRlcyBkZWwgcGxhdG8gJHtpZH0gZGVzZGUgY2FjaMOpYCk7XG4gICAgICAgIGluZ3JlZGllbnRlc0NhY2hlLmZvckVhY2goKGFsaW1lbnRvKSA9PiB7XG4gICAgICAgICAgICBhbGltZW50by5wbGF0b0lkID0gaWQ7XG4gICAgICAgICAgICBzQWxpbWVudG8uY2VzdGFBbGltZW50b3MgPSBhbGltZW50bztcbiAgICAgICAgfSk7XG4gICAgICAgIHNBbGltZW50by5tb3N0cmFyQWxpbWVudG9zKCk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc29sZS5sb2coYPCfjJAgT2J0ZW5pZW5kbyBpbmdyZWRpZW50ZXMgZGVsIHBsYXRvICR7aWR9IGRlc2RlIEFQSS4uLmApO1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0geWllbGQgZmV0Y2goYGh0dHBzOi8vYXBpLnNwb29uYWN1bGFyLmNvbS9yZWNpcGVzLyR7aWR9L2luZ3JlZGllbnRXaWRnZXQuanNvbj9hcGlLZXk9JHtwcm9jZXNzLmVudi5TUE9PTkFDVUxBUl9BUElfS0VZfWApO1xuICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEVycm9yIEhUVFA6ICR7cmVzcG9uc2Uuc3RhdHVzfSAtICR7cmVzcG9uc2Uuc3RhdHVzVGV4dH1gKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBkYXRhID0geWllbGQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICBjb25zdCBpbmdyZWRpZW50ZXMgPSBbXTtcbiAgICAgICAgKGRhdGEuaW5ncmVkaWVudHMpLmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGFsaW1lbnRvID0ge1xuICAgICAgICAgICAgICAgIG5hbWU6IGVsZW1lbnQubmFtZSxcbiAgICAgICAgICAgICAgICBpbWFnZTogZWxlbWVudC5pbWFnZSxcbiAgICAgICAgICAgICAgICBwbGF0b0lkOiBpZFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGluZ3JlZGllbnRlcy5wdXNoKGFsaW1lbnRvKTtcbiAgICAgICAgICAgIHNBbGltZW50by5jZXN0YUFsaW1lbnRvcyA9IGFsaW1lbnRvO1xuICAgICAgICB9KTtcbiAgICAgICAgc0FsaW1lbnRvLm1vc3RyYXJBbGltZW50b3MoKTtcbiAgICAgICAgZ3VhcmRhckluZ3JlZGllbnRlc0VuQ2FjaGUoaWQsIGluZ3JlZGllbnRlcyk7XG4gICAgfVxuICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKGBFcnJvciBhbCBvYnRlbmVyIGluZ3JlZGllbnRlcyBkZWwgcGxhdG8gJHtpZH06YCwgZXJyb3IpO1xuICAgIH1cbn0pO1xuZXhwb3J0cy5nZXRBbGltZW50b0FwaSA9IGdldEFsaW1lbnRvQXBpO1xuLyoqXG4gKiBPYnRpZW5lIGxhIGluZm9ybWFjacOzbiBudXRyaWNpb25hbCBkZSB1biBwbGF0byBkZXNkZSBsYSBBUEkgZGUgU3Bvb25hY3VsYXJcbiAqIFZlcmlmaWNhIHByaW1lcm8gZWwgY2FjaMOpIGFudGVzIGRlIGhhY2VyIGxhIGxsYW1hZGEgYSBsYSBBUElcbiAqIEBwYXJhbSBpZCAtIElEIGRlbCBwbGF0b1xuICogQHJldHVybnMgUHJvbWlzZSBjb24gbGEgaW5mb3JtYWNpw7NuIG51dHJpY2lvbmFsIG8gbnVsbCBzaSBoYXkgZXJyb3JcbiAqL1xuY29uc3QgZ2V0TnV0cml0aW9uQXBpID0gKGlkKSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICBjb25zdCBudXRyaXRpb25DYWNoZSA9IG9idGVuZXJOdXRyaXRpb25EZUNhY2hlKGlkKTtcbiAgICBpZiAobnV0cml0aW9uQ2FjaGUpIHtcbiAgICAgICAgY29uc29sZS5sb2coYPCfk7EgTW9zdHJhbmRvIG51dHJpY2nDs24gZGVsIHBsYXRvICR7aWR9IGRlc2RlIGNhY2jDqWApO1xuICAgICAgICByZXR1cm4gbnV0cml0aW9uQ2FjaGU7XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKGDwn4yQIE9idGVuaWVuZG8gbnV0cmljacOzbiBkZWwgcGxhdG8gJHtpZH0gZGVzZGUgQVBJLi4uYCk7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSB5aWVsZCBmZXRjaChgaHR0cHM6Ly9hcGkuc3Bvb25hY3VsYXIuY29tL3JlY2lwZXMvJHtpZH0vbnV0cml0aW9uV2lkZ2V0Lmpzb24/YXBpS2V5PSR7cHJvY2Vzcy5lbnYuU1BPT05BQ1VMQVJfQVBJX0tFWX1gKTtcbiAgICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBFcnJvciBIVFRQOiAke3Jlc3BvbnNlLnN0YXR1c30gLSAke3Jlc3BvbnNlLnN0YXR1c1RleHR9YCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZGF0YSA9IHlpZWxkIHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgY29uc3QgbnV0cml0aW9uID0ge1xuICAgICAgICAgICAgY2Fsb3JpZXM6IHBhcnNlRmxvYXQoZGF0YS5jYWxvcmllcyksXG4gICAgICAgICAgICBjYXJiczogZGF0YS5jYXJicyxcbiAgICAgICAgICAgIGZhdDogZGF0YS5mYXQsXG4gICAgICAgICAgICBwcm90ZWluOiBkYXRhLnByb3RlaW5cbiAgICAgICAgfTtcbiAgICAgICAgZ3VhcmRhck51dHJpdGlvbkVuQ2FjaGUoaWQsIG51dHJpdGlvbik7XG4gICAgICAgIHJldHVybiBudXRyaXRpb247XG4gICAgfVxuICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKGBFcnJvciBhbCBvYnRlbmVyIG51dHJpY2nDs24gZGVsIHBsYXRvICR7aWR9OmAsIGVycm9yKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxufSk7XG5leHBvcnRzLmdldE51dHJpdGlvbkFwaSA9IGdldE51dHJpdGlvbkFwaTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5hbnlhZGlyTWVudSA9IHZvaWQgMDtcbmNvbnN0IGFwcE1lbnVfMSA9IHJlcXVpcmUoXCIuLi9hcHBNZW51XCIpO1xuZnVuY3Rpb24gYW55YWRpck1lbnUoZXZlbnQpIHtcbiAgICBjb25zdCBwbGF0b0VsbSA9IGV2ZW50LnRhcmdldDtcbiAgICBjb25zdCBpZCA9IHBhcnNlSW50KHBsYXRvRWxtLmRhdGFzZXQuaWQpO1xuICAgIGFwcE1lbnVfMS5jb21wQWxpbWVudG9zLnNldFBsYXRvKGFwcE1lbnVfMS5jb21wUGxhdG9zLmdldFBsYXRvKGlkKSk7XG59XG5leHBvcnRzLmFueWFkaXJNZW51ID0gYW55YWRpck1lbnU7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvYXBwVE1CLnRzXCIpO1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2FwcE1lbnUudHNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9