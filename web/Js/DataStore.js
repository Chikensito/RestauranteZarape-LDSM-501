(function () {
    const STORAGE_KEYS = {
        alimentos: "zarape.alimentos",
        bebidas: "zarape.bebidas",
        combos: "zarape.combos"
    };

    const sampleAlimentos = [
        {
            idAlimento: 1,
            idProducto: 1,
            nombre: "Torta de chilaquiles",
            descripcion: "Bolillo con chilaquiles verdes, crema y queso",
            foto: "torta-chilaquiles.png",
            precio: 58.00,
            idCategoria: 1,
            activo: 1
        },
        {
            idAlimento: 2,
            idProducto: 2,
            nombre: "Molletes especiales",
            descripcion: "Pan gratinado con frijoles, queso y pico de gallo",
            foto: "molletes.png",
            precio: 52.00,
            idCategoria: 1,
            activo: 1
        },
        {
            idAlimento: 3,
            idProducto: 3,
            nombre: "Fruta de temporada",
            descripcion: "Porcion de fruta fresca con yogurt y granola",
            foto: "fruta.png",
            precio: 36.00,
            idCategoria: 2,
            activo: 1
        },
        {
            idAlimento: 4,
            idProducto: 4,
            nombre: "Chilaquiles rojos",
            descripcion: "Chilaquiles con pollo, crema, queso y cebolla",
            foto: "chilaquiles-rojos.png",
            precio: 68.00,
            idCategoria: 1,
            activo: 1
        }
    ];

    const sampleBebidas = [
        {
            idBebida: 1,
            idProducto: 101,
            nombre: "Cafe de olla",
            descripcion: "Cafe tradicional con canela",
            foto: "cafe-olla.png",
            precio: 24.00,
            categoria: "Cafes",
            activo: 1
        },
        {
            idBebida: 2,
            idProducto: 102,
            nombre: "Jugo de naranja",
            descripcion: "Jugo natural recien exprimido",
            foto: "jugo-naranja.png",
            precio: 28.00,
            categoria: "Jugos",
            activo: 1
        },
        {
            idBebida: 3,
            idProducto: 103,
            nombre: "Chocolate caliente",
            descripcion: "Chocolate espumoso con leche",
            foto: "chocolate.png",
            precio: 30.00,
            categoria: "Calientes",
            activo: 1
        },
        {
            idBebida: 4,
            idProducto: 104,
            nombre: "Agua fresca del dia",
            descripcion: "Bebida natural de fruta",
            foto: "agua-fresca.png",
            precio: 22.00,
            categoria: "Aguas",
            activo: 1
        }
    ];

    function clone(value) {
        return JSON.parse(JSON.stringify(value));
    }

    function nextId(items, fieldName) {
        return items.reduce(function (max, item) {
            const currentValue = Number(item[fieldName]) || 0;
            return currentValue > max ? currentValue : max;
        }, 0) + 1;
    }

    function readArray(key, fallback) {
        const rawValue = localStorage.getItem(key);
        if (!rawValue) {
            return clone(fallback);
        }

        try {
            const parsedValue = JSON.parse(rawValue);
            return Array.isArray(parsedValue) ? parsedValue : clone(fallback);
        } catch (error) {
            return clone(fallback);
        }
    }

    function saveArray(key, items) {
        localStorage.setItem(key, JSON.stringify(items));
    }

    function buildSampleCombos() {
        return [
            {
                idCombo: 1,
                nombre: "Desayuno Ranchero",
                descripcion: "Incluye chilaquiles, fruta y cafe de olla.",
                precio: 110.00,
                activo: 1,
                ticketsRelacionados: 2,
                detalles: [
                    {
                        idDetalleCombo: 1,
                        idCombo: 1,
                        idAlimento: 4,
                        idBebida: null,
                        tipoComponente: "ALIMENTO",
                        nombreProducto: "Chilaquiles rojos",
                        precioUnitario: 68.00
                    },
                    {
                        idDetalleCombo: 2,
                        idCombo: 1,
                        idAlimento: 3,
                        idBebida: null,
                        tipoComponente: "ALIMENTO",
                        nombreProducto: "Fruta de temporada",
                        precioUnitario: 36.00
                    },
                    {
                        idDetalleCombo: 3,
                        idCombo: 1,
                        idAlimento: null,
                        idBebida: 1,
                        tipoComponente: "BEBIDA",
                        nombreProducto: "Cafe de olla",
                        precioUnitario: 24.00
                    }
                ]
            },
            {
                idCombo: 2,
                nombre: "Combo Torta y Jugo",
                descripcion: "Paquete rapido de torta de chilaquiles con jugo natural.",
                precio: 79.00,
                activo: 1,
                ticketsRelacionados: 0,
                detalles: [
                    {
                        idDetalleCombo: 1,
                        idCombo: 2,
                        idAlimento: 1,
                        idBebida: null,
                        tipoComponente: "ALIMENTO",
                        nombreProducto: "Torta de chilaquiles",
                        precioUnitario: 58.00
                    },
                    {
                        idDetalleCombo: 2,
                        idCombo: 2,
                        idAlimento: null,
                        idBebida: 2,
                        tipoComponente: "BEBIDA",
                        nombreProducto: "Jugo de naranja",
                        precioUnitario: 28.00
                    }
                ]
            }
        ];
    }

    function seedIfNeeded() {
        if (!localStorage.getItem(STORAGE_KEYS.alimentos)) {
            saveArray(STORAGE_KEYS.alimentos, sampleAlimentos);
        }

        if (!localStorage.getItem(STORAGE_KEYS.bebidas)) {
            saveArray(STORAGE_KEYS.bebidas, sampleBebidas);
        }

        if (!localStorage.getItem(STORAGE_KEYS.combos)) {
            saveArray(STORAGE_KEYS.combos, buildSampleCombos());
        }
    }

    function formatCurrency(value) {
        return new Intl.NumberFormat("es-MX", {
            style: "currency",
            currency: "MXN"
        }).format(Number(value) || 0);
    }

    function showMessage(title, text, icon) {
        if (window.Swal) {
            window.Swal.fire({
                title: title,
                text: text,
                icon: icon || "info",
                confirmButtonColor: "#A11F0C"
            });
            return;
        }

        window.alert(title + "\n" + text);
    }

    seedIfNeeded();

    window.zarapeStore = {
        keys: STORAGE_KEYS,
        clone: clone,
        nextId: nextId,
        seedIfNeeded: seedIfNeeded,
        formatCurrency: formatCurrency,
        showMessage: showMessage,
        getAlimentos: function () {
            seedIfNeeded();
            return readArray(STORAGE_KEYS.alimentos, sampleAlimentos);
        },
        saveAlimentos: function (items) {
            saveArray(STORAGE_KEYS.alimentos, items);
        },
        getBebidas: function () {
            seedIfNeeded();
            return readArray(STORAGE_KEYS.bebidas, sampleBebidas);
        },
        saveBebidas: function (items) {
            saveArray(STORAGE_KEYS.bebidas, items);
        },
        getCombos: function () {
            seedIfNeeded();
            return readArray(STORAGE_KEYS.combos, buildSampleCombos());
        },
        saveCombos: function (items) {
            saveArray(STORAGE_KEYS.combos, items);
        }
    };
}());
