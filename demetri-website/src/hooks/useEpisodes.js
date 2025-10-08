// src/hooks/useEpisodes.js
import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export const useEpisodes = () => {
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEpisodes = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error: fetchError } = await supabase
        .from('episodes')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;
      
      setEpisodes(data || []);
    } catch (err) {
      console.error('Error fetching episodes:', err);
      setError('Failed to load episodes. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEpisodes();

    // Set up real-time subscription
    const subscription = supabase
      .channel('episodes-channel')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'episodes' },
        () => {
          fetchEpisodes();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { episodes, loading, error, refetch: fetchEpisodes };
};