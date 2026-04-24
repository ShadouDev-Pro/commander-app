import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3001;
const savesDir = path.join(__dirname, 'saves');

// Asegurar que la carpeta de guardado existe
if (!fs.existsSync(savesDir)) {
  fs.mkdirSync(savesDir);
}

app.use(cors());
app.use(express.json());

// Listar todas las partidas
app.get('/api/saves', (req, res) => {
  console.log('Petición recibida: Listar partidas');
  try {
    const files = fs.readdirSync(savesDir);
    const games = {};
    files.forEach(file => {
      if (file.endsWith('.json')) {
        const content = fs.readFileSync(path.join(savesDir, file), 'utf8');
        const name = file.replace('.json', '');
        games[name] = JSON.parse(content);
      }
    });
    res.json(games);
  } catch (err) {
    console.error('Error al listar:', err);
    res.status(500).json({ error: 'Error al leer las partidas' });
  }
});

// Guardar una partida
app.post('/api/saves', (req, res) => {
  const { name, data } = req.body;
  console.log(`Petición recibida: Guardar partida "${name}"`);
  if (!name || !data) {
    return res.status(400).json({ error: 'Nombre o datos faltantes' });
  }
  try {
    const filePath = path.join(savesDir, `${name}.json`);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`Archivo guardado con éxito: ${filePath}`);
    res.json({ success: true });
  } catch (err) {
    console.error('Error al guardar:', err);
    res.status(500).json({ error: 'Error al guardar el archivo' });
  }
});


// Eliminar una partida
app.delete('/api/saves/:name', (req, res) => {
  const { name } = req.params;
  try {
    const filePath = path.join(savesDir, `${name}.json`);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      res.json({ success: true });
    } else {
      res.status(404).json({ error: 'Archivo no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar el archivo' });
  }
});

app.listen(port, () => {
  console.log(`Servidor de guardado corriendo en http://localhost:${port}`);
});
