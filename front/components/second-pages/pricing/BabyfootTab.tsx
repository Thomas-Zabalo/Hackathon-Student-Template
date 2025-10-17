'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

type Babyfoot = {
  id: number;
  name: string;
  gamesPlayed: number;
  condition: string;
  available: boolean;
};

const mockBabyfoots: Babyfoot[] = [
  { id: 1, name: 'Babyfoot Salle A', gamesPlayed: 42, condition: 'Bon', available: true },
  { id: 2, name: 'Babyfoot Salle B', gamesPlayed: 75, condition: 'Moyen', available: false },
];

const BabyfootTab = () => {
  const [babyfoots, setBabyfoots] = useState<Babyfoot[]>([]);
  const [editingBaby, setEditingBaby] = useState<Babyfoot | null>(null);
  const [loading, setLoading] = useState(true);
  const [newBaby, setNewBaby] = useState({
    name: '',
    gamesPlayed: 0,
    condition: 'Bon',
    available: true,
  });

  useEffect(() => {
    const fetchBabyfoots = async () => {
      try {
        const res = await axios.get<Babyfoot[]>('/api/babyfoots');
        setBabyfoots(res.data);
      } catch (err) {
        console.warn('API non dispo, utilisation des mock', err);
        setBabyfoots(mockBabyfoots);
      } finally {
        setLoading(false);
      }
    };
    fetchBabyfoots();
  }, []);

  const handleAddBabyfoot = async () => {
    if (!newBaby.name.trim()) return;
    const newItem: Babyfoot = { id: Date.now(), ...newBaby };
    setBabyfoots((prev) => [...prev, newItem]);
    try {
      const res = await axios.post('/api/babyfoots', newItem);
      setBabyfoots((prev) => prev.map((b) => (b.id === newItem.id ? res.data : b)));
    } catch (err) {
      console.warn('API POST non dispo, mock conservé', err);
    }
    setNewBaby({ name: '', gamesPlayed: 0, condition: 'Bon', available: true });
  };

  const handleDeleteBabyfoot = async (id: number) => {
    setBabyfoots((prev) => prev.filter((b) => b.id !== id));
    try {
      await axios.delete(`/api/babyfoots/${id}`);
    } catch (err) {
      console.warn('API DELETE non dispo', err);
    }
  };

  const handleSaveBabyfoot = async () => {
    if (!editingBaby) return;
    setBabyfoots((prev) => prev.map((b) => (b.id === editingBaby.id ? editingBaby : b)));
    try {
      await axios.put(`/api/babyfoots/${editingBaby.id}`, editingBaby);
    } catch (err) {
      console.warn('API PUT non dispo', err);
    }
    setEditingBaby(null);
  };

  if (loading) {
    return <p className="text-center text-gray-500">Chargement...</p>;
  }

  return (
    <>
      {/* Formulaire d'ajout */}
      <div className="flex flex-col lg:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Nom du babyfoot"
          className="w-full px-3 py-2 rounded-md border dark:border-white/20 border-black/20 bg-white/10 dark:text-white text-black placeholder-dark/40 focus:ring-2 focus:ring-white/30 transition-all"
          value={newBaby.name}
          onChange={(e) => setNewBaby({ ...newBaby, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Nombre de parties"
          className="w-full px-3 py-2 rounded-md border dark:border-white/20 border-black/20 bg-white/10 dark:text-white text-black placeholder-dark/40 focus:ring-2 focus:ring-white/30 transition-all"
          value={newBaby.gamesPlayed}
          onChange={(e) => setNewBaby({ ...newBaby, gamesPlayed: Number(e.target.value) })}
        />
        <select
          className="w-full px-3 py-2 rounded-md border dark:border-white/20 border-black/20 bg-white/10 dark:text-white text-black placeholder-dark/40 focus:ring-2 focus:ring-white/30 transition-all"
          value={newBaby.condition}
          onChange={(e) => setNewBaby({ ...newBaby, condition: e.target.value })}
        >
          <option value="Bon">Bon</option>
          <option value="Moyen">Moyen</option>
          <option value="Usé">Usé</option>
        </select>
        <button className="button-regular" onClick={handleAddBabyfoot}>
          Ajouter
        </button>
      </div>

      {/* Tableau */}
      <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
        <table className="w-full text-sm text-left text-gray-600 dark:text-gray-300">
          <thead className="text-xs uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-4">Nom</th>
              <th className="px-6 py-4 text-center">Parties</th>
              <th className="px-6 py-4 text-center">État</th>
              <th className="px-6 py-4 text-center">Dispo</th>
              <th className="px-6 py-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {babyfoots.map((b) => (
              <tr
                key={b.id}
                className="bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                {editingBaby?.id === b.id ? (
                  <>
                    <td className="px-6 py-4">
                      <input
                        type="text"
                        value={editingBaby.name}
                        onChange={(e) => setEditingBaby({ ...editingBaby, name: e.target.value })}
                        className="w-full bg-gray-100 dark:bg-gray-700 dark:text-white px-2 py-1 rounded"
                      />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <input
                        type="number"
                        value={editingBaby.gamesPlayed}
                        onChange={(e) =>
                          setEditingBaby({ ...editingBaby, gamesPlayed: Number(e.target.value) })
                        }
                        className="w-20 bg-gray-100 dark:bg-gray-700 dark:text-white px-2 py-1 rounded"
                      />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <select
                        value={editingBaby.condition}
                        onChange={(e) => setEditingBaby({ ...editingBaby, condition: e.target.value })}
                        className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white px-2 py-1 rounded"
                      >
                        <option value="Bon">Bon</option>
                        <option value="Moyen">Moyen</option>
                        <option value="Usé">Usé</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        className={`px-4 py-1 rounded-full text-white ${
                          editingBaby.available ? 'bg-green-600' : 'bg-gray-600'
                        }`}
                        onClick={() =>
                          setEditingBaby({ ...editingBaby, available: !editingBaby.available })
                        }
                      >
                        {editingBaby.available ? 'Disponible' : 'Occupé'}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-center flex justify-center gap-2">
                      <button
                        onClick={handleSaveBabyfoot}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full text-sm transition-all"
                      >
                        Enregistrer
                      </button>
                      <button
                        onClick={() => setEditingBaby(null)}
                        className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-full text-sm transition-all"
                      >
                        Annuler
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{b.name}</td>
                    <td className="px-6 py-4 text-center">{b.gamesPlayed}</td>
                    <td className="px-6 py-4 text-center">{b.condition}</td>
                    <td className="px-6 py-4 text-center">
                      <button
                        className={`px-4 py-1 rounded-full text-white ${
                          b.available ? 'bg-green-600' : 'bg-gray-600'
                        }`}
                        disabled
                      >
                        {b.available ? 'Disponible' : 'Occupé'}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-center flex justify-center gap-2">
                      <button
                        onClick={() => setEditingBaby(b)}
                        className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-full text-sm transition-all"
                      >
                        Modifier
                      </button>
                      <button
                        onClick={() => handleDeleteBabyfoot(b.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full text-sm transition-all"
                      >
                        Supprimer
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
            {babyfoots.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-500 dark:text-gray-400">
                  Aucun babyfoot
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default BabyfootTab;
