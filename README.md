# Commander App 🧙‍♂️

![React](https://img.shields.io/badge/React-19+-61dafb?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-5+-646cff?style=for-the-badge&logo=vite)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-f7df1e?style=for-the-badge&logo=javascript)
![ESLint](https://img.shields.io/badge/ESLint-9+-4b32c3?style=for-the-badge&logo=eslint)

Una aplicación web moderna y completa para gestionar y disfrutar de partidas de **Magic: The Gathering** en formato Commander. Diseñada con una interfaz intuitiva y visualmente atractiva, permite a los jugadores crear mazos, gestionar cartas, simular batallas y controlar el estado del juego de manera eficiente.

## ✨ Características Principales

### 🎴 Gestión de Cartas y Mazos
- **Visualización de Cartas**: Componente `CardDisplay` para mostrar detalles de cartas individuales.
- **Selector de Mazos**: `DeckSelector` para elegir entre mazos predefinidos o personalizados.
- **Vista Previa de Mazos**: `DeckPreview` para inspeccionar composiciones de mazos.
- **Mazos de Muestra**: Colección de mazos de ejemplo incluidos en `sampleDecks.js`.

### ⚔️ Mecánicas de Juego
- **Tablero de Juego**: `GameBoard` con zonas estratégicas (`GameZones`).
- **Campo de Batalla**: `Battlefield` para posicionar criaturas y permanentes.
- **Mano del Jugador**: `Hand` para gestionar cartas en mano.
- **Contador de Vida**: `LifeCounter` con controles intuitivos (+1/-1).
- **Daño de Commander**: `CommanderDamage` para rastrear daño de comandantes.
- **Información de Jugadores**: `PlayerInfo` y `PlayerCard` para detalles de cada jugador.
- **Controles de Juego**: `GameControls` para acciones como pasar turno, mulligan, etc.
- **Configuración Inicial**: `GameSetup` para preparar la partida.

### 👥 Gestión de Jugadores
- **Avatares de Jugadores**: `PlayerAvatar` para personalización visual.
- **Ayudantes de Jugadores**: Utilidades en `PlayerHelpers.js` para lógica relacionada.

### ⚙️ Configuraciones y Personalización
- **Panel de Configuraciones**: `SettingsPanel` para ajustes del juego.
- **Alternancia de Tema**: `ThemeToggle` con soporte para modo oscuro/claro.
- **Contexto de Tema**: `ThemeContext` para gestión global de temas.

### 🛠️ Componentes Compartidos
- **Botones y Entradas**: `Button` y `Input` reutilizables.
- **Modales**: `Modal` para diálogos y confirmaciones.
- **Almacenamiento Local**: Hook `useLocalStorage` para persistencia de datos.
- **Estado del Juego**: Hook `useGameState` para gestión de estado complejo.

### 🎨 Diseño y UX
- **Estilos Globales**: CSS modular con variables en `variables.css`.
- **Constantes de Diseño**: `designConstants.js` para consistencia visual.
- **Utilidades**: `formatNumber.js` para formateo de números.

## 🛠️ Tecnologías Utilizadas

- **Frontend**: React 19 con JSX
- **Build Tool**: Vite 5 para desarrollo rápido y optimización
- **Linter**: ESLint 9 para calidad de código
- **Estilos**: CSS puro con variables CSS
- **Estado**: React Hooks (useState, useContext)
- **Ruteo**: React Router (basado en `routes.jsx`)

## 📋 Requisitos del Sistema

- Node.js 18+ recomendado
- npm o yarn para gestión de dependencias
- Navegador moderno con soporte para ES6+

## 🚀 Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/ShadouDev-Pro/commander-app.git
   cd commander-app
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

4. Abre `http://localhost:5173` en tu navegador.

## 📖 Uso

- **Crear un Mazo**: Usa el selector de mazos para elegir o crear composiciones personalizadas.
- **Configurar Partida**: En la pantalla de configuración, establece el número de jugadores y reglas.
- **Jugar**: Gestiona tu mano, campo de batalla y vida mientras interactúas con otros jugadores.
- **Personalizar**: Cambia temas y ajustes en el panel de configuraciones.

## 🏗️ Estructura del Proyecto

```
src/
├── app/                 # Componentes principales de la app
│   ├── App.jsx         # Componente raíz
│   ├── providers.jsx   # Proveedores de contexto
│   └── routes.jsx      # Configuración de rutas
├── features/           # Funcionalidades por dominio
│   ├── card/           # Gestión de cartas
│   ├── deck/           # Gestión de mazos
│   ├── game/           # Lógica del juego
│   ├── player/         # Gestión de jugadores
│   └── settings/       # Configuraciones
├── shared/             # Componentes y utilidades compartidas
│   ├── components/     # Componentes reutilizables
│   ├── constants/      # Constantes de la app
│   ├── context/        # Contextos de React
│   ├── hooks/          # Hooks personalizados
│   └── utils/          # Utilidades generales
└── styles/             # Estilos CSS
```

## 📜 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo de Vite
- `npm run build` - Genera una versión de producción optimizada
- `npm run lint` - Ejecuta ESLint para verificar el código
- `npm run preview` - Vista previa de la build de producción

## 🤝 Contribución

¡Las contribuciones son bienvenidas! Si deseas mejorar la app:

1. Haz un fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Agrega nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Contacto

Para preguntas o sugerencias, abre un issue en el repositorio de GitHub.

---

¡Disfruta jugando Commander con esta herramienta completa y moderna! 🃏✨
- `npm run preview` - Previsualiza el build de producción
- `npm run lint` - Ejecuta ESLint para revisar el código

## Mejoras sugeridas

- Añadir botones para valores de vida diferentes (+5, -5)
- Guardar el estado de la partida en `localStorage`
- Permitir nombres personalizados para los jugadores
- Añadir modo oscuro
- Mejorar diseño con CSS o librería UI

## Autor

**ShadouDev**

GitHub: https://github.com/ShadouDev-Pro

## Licencia

Este proyecto está bajo la licencia MIT.
Puedes usarlo, modificarlo y distribuirlo libremente.
