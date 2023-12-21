// Ejercicio 1 ✅

import net from 'node:net';
import fs from 'node:fs';
import fsp from 'node:fs/promises';

export const ping = (ip, callback) => {
  const startTime = process.hrtime();

  const client = net.connect({ port: 80, host: ip }, () => {
    client.end();
    callback(null, { time: process.hrtime(startTime), ip });
  });

  client.on('error', (err) => {
    client.end();
    callback(err);
  });
};

// Ejercicio 2 ✅

export function obtenerDatosPromise() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: 'datos importantes' });
    }, 2000);
  });
}

// EJercicio 3 ✅
export function procesarArchivo(callback) {
  const handleReadFile = (error, contenido) => {
    if (error) {
      console.error('Error leyendo archivo:', error.message);
      callback(error);
    }

    const textoProcesado = contenido.toUpperCase();

    fs.writeFile('output.txt', textoProcesado, handleWriteFile);
  };

  const handleWriteFile = (error) => {
    if (error) {
      console.error('Error guardando archivo:', error.message);
      callback(error);
    }
    console.log('Archivo procesado y guardado con éxito');
    callback(null);
  };

  fs.readFile('input.txt', 'utf8', handleReadFile);
}

export async function procesarArchivoPromise() {
  try {
    const content = await fsp.readFile('input.txt', 'utf-8');
    await fsp.writeFile('output.txt', content.toUpperCase());
  } catch (error) {
    throw error;
  }
}

// Ejercicio 4 ✅

export async function leerArchivos() {
  console.time('Tiempo');

  const [archivo1, archivo2, archivo3] = await Promise.allSettled([
    fsp.readFile('../archivo1.txt', 'utf8'),
    fsp.readFile('../archivo2.txt', 'utf8'),
    fsp.readFile('../archivo3.txt', 'utf8'),
  ]);

  console.timeEnd('Tiempo');

  return `${archivo1.value} ${archivo2.value} ${archivo3.value}`;
}

// Ejercicio 5 ✅

export async function delay(n) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, n);
  });
}
