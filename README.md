# Commander App

Una aplicación simple creada con React y Vite para llevar el control de la vida de 4 jugadores en partidas de Commander.

## Descripción

`commander-app` es una herramienta ligera para partidas de Magic: The Gathering formato Commander. Permite:

- Ver la vida de hasta 4 jugadores
- Aumentar o disminuir la vida de cada jugador en +1 / -1
- Jugar de forma local en el navegador con una interfaz mínima

## Características

- Basada en React 19 con Vite
- Control de estado local con `useState`
- Interfaz limpia y centrada
- Configuración de ESLint para mantener el código ordenado

## Estructura del proyecto

- `src/main.jsx` - Punto de entrada de la aplicación
- `src/app/App.jsx` - Componente principal que renderiza `GamePage`
- `src/features/game/GamePage.jsx` - Lógica y presentación del contador de vida
- `src/index.css` - Estilos globales básicos
- `package.json` - Dependencias y scripts del proyecto

## Requisitos

- Node.js 18+ recomendado
- npm o yarn

## Instalación

```bash
npm install
```

## Uso

```bash
npm run dev
```

Abre `http://localhost:5173` en tu navegador para usar la app.

## Scripts disponibles

- `npm run dev` - Inicia el servidor de desarrollo de Vite
- `npm run build` - Genera una versión de producción en `dist`
- `npm run preview` - Previsualiza el build de producción
- `npm run lint` - Ejecuta ESLint para revisar el código

## Mejoras sugeridas

- Añadir botones para valores de vida diferentes (+5, -5)
- Guardar el estado de la partida en `localStorage`
- Permitir nombres personalizados para los jugadores
- Añadir modo oscuro
- Mejorar diseño con CSS o librería UI

## Licencia

Proyecto personal. Usa y modifica libremente.
