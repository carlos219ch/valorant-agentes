import { useState, useEffect, useCallback } from 'react';
import { agentesService } from '../services/api';

export const useAgentes = (params = '') => {
  const [data, setData]       = useState({ agentes: [], total: 0, totalPaginas: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  const fetchAgentes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await agentesService.listar(params);
      setData(res);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => { fetchAgentes(); }, [fetchAgentes]);

  return { ...data, loading, error, refetch: fetchAgentes };
};

export const useAgente = (id) => {
  const [agente, setAgente]   = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  const fetchAgente = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    agentesService.obtener(id)
      .then(setAgente)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => { fetchAgente(); }, [fetchAgente]);

  return { agente, loading, error, refetch: fetchAgente };
};
