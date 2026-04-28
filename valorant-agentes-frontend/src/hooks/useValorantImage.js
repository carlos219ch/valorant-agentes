import { useState, useEffect } from 'react';

let cache = null;
let promise = null;

const fetchAll = () => {
  if (promise) return promise;
  promise = fetch('https://valorant-api.com/v1/agents?isPlayableCharacter=true')
    .then(r => r.json())
    .then(d => { cache = d.data || []; return cache; })
    .catch(() => { promise = null; return []; });
  return promise;
};

const resolve = (agents, nombre, type) => {
  const match = agents.find(a => a.displayName.toLowerCase() === nombre.toLowerCase());
  if (!match) return null;
  return type === 'full'
    ? (match.fullPortrait || match.bustPortrait || null)
    : (match.bustPortrait || match.displayIcon || null);
};

export const useValorantImage = (agente, type = 'bust') => {
  const [src, setSrc] = useState(agente?.imagen_url || null);

  useEffect(() => {
    if (agente?.imagen_url) { setSrc(agente.imagen_url); return; }
    if (!agente?.nombre) return;

    if (cache) {
      const url = resolve(cache, agente.nombre, type);
      if (url) setSrc(url);
      return;
    }

    fetchAll().then(agents => {
      const url = resolve(agents, agente.nombre, type);
      if (url) setSrc(url);
    });
  }, [agente?.nombre, agente?.imagen_url, type]);

  return src;
};
