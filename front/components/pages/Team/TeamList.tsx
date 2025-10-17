'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

type Team = {
    id: number;
    name: string;
};

// Configuration axios
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';
;
const TeamList = () => {
    const [teams, setTeams] = useState<Team[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [newTeamName, setNewTeamName] = useState('');
    const [userTeam, setUserTeam] = useState<Team | null>(null);
    const [loading, setLoading] = useState(true);
    const [team, setTeam] = useState<string | null>(null);

    useEffect(() => {
        const storedEquipe = localStorage.getItem('equipe');
        if (storedEquipe) setTeam(storedEquipe);
    }, []);

    // Récupération des équipes depuis l'API
    useEffect(() => {
        const fetchTeams = async () => {
            try {
                setLoading(true);
                const response = await axios.get<Team[]>('http://localhost:8080/api/teams');

                // Trier par nom alphabétique
                const sortedTeams = response.data.sort((a, b) =>
                    a.name.localeCompare(b.name)
                );

                setTeams(sortedTeams);
            } catch (err) {
                console.error('Erreur récupération équipes :', err);
                alert('Erreur lors de la récupération des équipes');
            } finally {
                setLoading(false);
            }
        };

        fetchTeams();
    }, []);

    const createTeam = async () => {
        if (!newTeamName.trim()) {
            alert('Veuillez entrer un nom d\'équipe');
            return;
        }

        try {
            const response = await axios.post<Team>(
                'http://localhost:8080/api/teams',
                { name: newTeamName.trim() },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            const updatedTeams = [...teams, response.data].sort((a, b) =>
                a.name.localeCompare(b.name)
            );
            setTeams(updatedTeams);

            setUserTeam(response.data);
            setNewTeamName('');
            setModalOpen(false);
            alert(`Équipe "${response.data.name}" créée et rejointe !`);
        } catch (err: any) {
            console.error('Erreur création équipe :', err);
            const errorMsg = err.response?.data?.message || 'Erreur lors de la création de l\'équipe';
            alert(errorMsg);
        }
    };

    const joinTeam = (team: Team) => {
        setUserTeam(team);
    };

    const leaveTeam = () => {
        if (userTeam)
        setUserTeam(null);
    };

    if (loading) {
        return (
            <div className="container mx-auto mt-16 px-4">
                <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                    Chargement des équipes...
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto mt-16 px-4">
            <div className="flex justify-end mb-4">
                <button
                    onClick={() => setModalOpen(true)}
                    className={`mt-6 px-5 py-2 rounded-full flex items-center justify-center gap-2 font-medium cursor-pointer
            text-surface-950 bg-transparent border border-black/24
            hover:bg-black/10 hover:opacity-80 transition-all duration-300
            dark:bg-white dark:text-black dark:border-0 dark:shadow-blue-card
            ${teams == null ? "opacity-50 cursor-not-allowed" : ""}`}
                    disabled={teams == null}
                >
                    Créer une équipe
                </button>
            </div>


            {userTeam && (
                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg mb-6 flex justify-between items-center">
                    <span className="text-gray-900 dark:text-white font-medium">
                        Équipe actuelle : {userTeam.name}
                    </span>
                    <button
                        onClick={leaveTeam}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-all"
                    >
                        Quitter l'équipe
                    </button>
                </div>
            )}

            {teams.length === 0 ? (
                <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                    <p className="mb-4">Aucune équipe disponible</p>
                    <button
                        onClick={() => setModalOpen(true)}
                        className="button-regular"
                    >
                        Créer la première équipe
                    </button>
                </div>
            ) : (
                <div className="relative overflow-x-auto rounded-xl shadow-lg bg-white dark:bg-gray-800">
                    <table className="w-full text-sm text-left text-gray-600 dark:text-gray-300">
                        <thead className="text-xs uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-4">Nom de l'équipe</th>
                            <th scope="col" className="px-6 py-4 text-center">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {teams.map((team) => (
                            <tr key={team.id} className="bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {team.name}
                                </th>
                                <td className="px-6 py-4 text-center">
                                    <button
                                        className={`${
                                            userTeam?.id === team.id
                                                ? 'bg-gray-400 cursor-not-allowed'
                                                : 'bg-blue-600 hover:bg-blue-700'
                                        } text-white px-4 py-2 rounded-full text-sm font-medium transition-all`}
                                        disabled={userTeam?.id === team.id}
                                        onClick={() => joinTeam(team)}
                                    >
                                        {userTeam?.id === team.id ? 'Dans ton équipe' : 'Rejoindre'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}

            {modalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg w-80">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Créer une équipe</h2>
                        <input
                            type="text"
                            placeholder="Nom de l'équipe"
                            value={newTeamName}
                            onChange={(e) => setNewTeamName(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && createTeam()}
                            className="w-full px-3 py-2 mb-4 border rounded text-gray-900 dark:text-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                            autoFocus
                        />
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => {
                                    setModalOpen(false);
                                    setNewTeamName('');
                                }}
                                className="px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200"
                            >
                                Annuler
                            </button>
                            <button
                                onClick={createTeam}
                                disabled={!newTeamName.trim()}
                                className={`px-4 py-2 rounded-full ${
                                    newTeamName.trim()
                                        ? 'bg-blue-600 hover:bg-blue-700'
                                        : 'bg-gray-400 cursor-not-allowed'
                                } text-white`}
                            >
                                Créer
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TeamList;