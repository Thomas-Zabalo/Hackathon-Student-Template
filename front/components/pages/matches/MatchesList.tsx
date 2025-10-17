'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

type Team = {
    id: number;
    name: string;
    users: never[];
};

type Match = {
    id: number;
    score_1: number | null;
    score_2: number | null;
    equipe_1: Team;
    equipe_2: Team;
    vitesse_max: number;
    babyfoot: never;
    created_at: string | null;
    goals: never[];
};

const MatchList = () => {
    const router = useRouter();
    const [matches, setMatches] = useState<Match[]>([]);
    const [teams, setTeams] = useState<Team[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [userTeam, setUserTeam] = useState<Team | null>(null);
    const [selectedOpponent, setSelectedOpponent] = useState<number | null>(null);
    const [, setWsConnected] = useState(false);

    const stompClientRef = useRef<Client | null>(null);
    const storedEquipeId = Number(localStorage.getItem('equipe'));
    const userToken = localStorage.getItem('token');

    // Fetch initial data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [teamsRes, matchesRes] = await Promise.all([
                    axios.get<Team[]>('http://localhost:8080/api/teams'),
                    axios.get<Match[]>('http://localhost:8080/api/matches'),
                ]);

                setTeams(teamsRes.data);

                const sortedMatches = matchesRes.data.sort((a, b) =>
                    !a.created_at ? 1 : !b.created_at ? -1 : new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
                );

                setMatches(sortedMatches);

                const foundTeam = teamsRes.data.find(t => t.id === storedEquipeId);
                setUserTeam(foundTeam || null);

                const firstOpponent = teamsRes.data.find(t => t.id !== storedEquipeId);
                if (firstOpponent) setSelectedOpponent(firstOpponent.id);
            } catch (err) {
                console.error('Erreur fetch:', err);
                alert('Erreur lors de la récupération des données');
            }
        };

        fetchData();
    }, [storedEquipeId]);

    // WebSocket connection
    useEffect(() => {
        const socket = new SockJS('http://localhost:8080/ws');
        const stompClient = new Client({
            webSocketFactory: () => socket as never,
            debug: (str) => {
                console.log('STOMP:', str);
            },
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
        });

        stompClient.onConnect = () => {
            console.log('WebSocket connecté');
            setWsConnected(true);

            // S'abonner aux mises à jour des matchs
            stompClient.subscribe('/topic/matches', (message) => {
                console.log('Message reçu:', message.body);
                try {
                    const updatedMatch = JSON.parse(message.body) as Match;

                    setMatches((prev) => {
                        const existingIndex = prev.findIndex(m => m.id === updatedMatch.id);

                        if (existingIndex !== -1) {
                            // Mise à jour d'un match existant
                            const newMatches = [...prev];
                            newMatches[existingIndex] = updatedMatch;
                            return newMatches;
                        } else {
                            // Nouveau match
                            return [updatedMatch, ...prev];
                        }
                    });
                } catch (err) {
                    console.error('Erreur parsing message WS:', err);
                }
            });
        };

        stompClient.onDisconnect = () => {
            console.log('WebSocket déconnecté');
            setWsConnected(false);
        };

        stompClient.onStompError = (frame) => {
            console.error('Erreur STOMP:', frame.headers['message'], frame.body);
            setWsConnected(false);
        };

        stompClient.onWebSocketError = (event) => {
            console.error('Erreur WebSocket:', event);
            setWsConnected(false);
        };

        stompClient.activate();
        stompClientRef.current = stompClient;

        return () => {
            console.log('Déconnexion WebSocket');
            if (stompClientRef.current) {
                stompClientRef.current.deactivate();
            }
        };
    }, []);

    const createMatch = async () => {
        if (!userTeam || !selectedOpponent) return;

        try {
            const response = await axios.post<Match>('http://localhost:8080/api/matches', {
                equipe_1: userTeam.id,
                equipe_2: selectedOpponent,
            });

            // Le match sera aussi ajouté via WebSocket, mais on l'ajoute localement pour feedback immédiat
            setMatches(prev => [response.data, ...prev]);
            setModalOpen(false);
        } catch (err) {
            console.error('Erreur création match:', err);
            alert('Erreur lors de la création du match');
        }
    };

    const handleCardClick = (matchId: number) => {
        router.push(`/pages/matches/${matchId}`);
    };

    return (
        <div className="container mx-auto mt-16 px-4">
            {userToken && userTeam && (
                <div className="flex justify-end mb-8 gap-4">
                    <button
                        onClick={() => setModalOpen(true)}
                        className="mt-6 px-5 py-2 rounded-full flex items-center justify-center gap-2 font-medium cursor-pointer
            text-surface-950 bg-transparent border border-black/24
            hover:bg-black/10 hover:opacity-80 transition-all duration-300
            dark:bg-white dark:text-black dark:border-0 dark:shadow-blue-card"
                    >
                        Créer un match
                    </button>
                </div>
            )}

            {matches.length === 0 ? (
                <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                    Aucun match disponible
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {matches.map(match => {
                        const isFinished = (match.score_1 ?? 0) >= 10 || (match.score_2 ?? 0) >= 10;
                        const isUpcoming = match.score_1 === null && match.score_2 === null;

                        return (
                            <div
                                key={match.id}
                                onClick={() => handleCardClick(match.id)}
                                className="bg-white dark:bg-gray-800 shadow hover:shadow-lg transition-shadow cursor-pointer p-6 rounded-md"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <span
                                        className={`px-3 py-1 text-xs font-medium ${
                                            isFinished
                                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 rounded-md'
                                                : isUpcoming
                                                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 rounded-md'
                                                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 rounded-md'
                                        }`}
                                    >
                                        {isFinished ? 'Terminé' : isUpcoming ? 'À venir' : 'En cours'}
                                    </span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                        {match.created_at ? new Date(match.created_at).toLocaleString('fr-FR') : 'Date non définie'}
                                    </span>
                                </div>

                                <div className="mb-4 text-center">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{match.equipe_1.name}</h3>
                                    <div className="text-gray-400 dark:text-gray-500 text-sm mb-2">vs</div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{match.equipe_2.name}</h3>
                                </div>

                                <div className="text-center mb-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-md">
                                    <div className="text-3xl font-bold text-gray-900 dark:text-white">
                                        {match.score_1 !== null && match.score_2 !== null
                                            ? `${match.score_1} - ${match.score_2}`
                                            : '-'}
                                    </div>
                                </div>

                                {match.vitesse_max > 0 && (
                                    <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                                        Vitesse max: {match.vitesse_max} km/h
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Modal création match */}
            {modalOpen && userTeam && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg w-96">
                        <h2 className="text-lg font-semibold dark:text-white text-gray-900 mb-4">Créer un match</h2>

                        <div className="mb-4">
                            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Ton équipe</label>
                            <select
                                value={userTeam.id}
                                disabled
                                className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
                            >
                                <option value={userTeam.id}>{userTeam.name}</option>
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Équipe adverse</label>
                            <select
                                value={selectedOpponent || ''}
                                onChange={e => setSelectedOpponent(Number(e.target.value))}
                                className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
                            >
                                {teams
                                    .filter(t => t.id !== userTeam.id)
                                    .map(t => (
                                        <option key={t.id} value={t.id}>
                                            {t.name}
                                        </option>
                                    ))}
                            </select>
                        </div>

                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setModalOpen(false)}
                                className="px-4 py-2 rounded-full border text-gray-700 dark:text-gray-200"
                            >
                                Annuler
                            </button>
                            <button
                                onClick={createMatch}
                                className="px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white"
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

export default MatchList;