'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';


type Team = {
    id: number;
    name: string;
    users: any[];
};

type Goal = {
    id: number;
    team: Team;
    vitesse: number;
    created_at: string;
};

type MatchDetail = {
    id: number;
    score_1: number | null;
    score_2: number | null;
    equipe_1: Team;
    equipe_2: Team;
    vitesse_max: number;
    babyfoot: any;
    created_at: string | null;
    goals: Goal[];
};

const MatchDetailPage = () => {
    const router = useRouter();
    const params = useParams();
    const matchId = params.id;

    const [match, setMatch] = useState<MatchDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [wsConnected, setWsConnected] = useState(false);

    const stompClientRef = useRef<Client | null>(null);

    const fetchMatchDetail = async () => {
        if (!matchId) return;

        try {
            setLoading(true);
            const response = await axios.get<MatchDetail>(`http://localhost:8080/api/matches/${matchId}`);
            setMatch(response.data);
            setError(null);
        } catch (err) {
            console.error('Erreur récupération match :', err);
            setError('Impossible de charger les détails du match');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMatchDetail();
    }, [matchId]);

    // Fonction pour lancer le match
    const handleStartMatch = async () => {
        if (!matchId) return;
        try {
            setLoading(true);
            const response = await axios.put<MatchDetail>(`http://localhost:8080/api/matches/${matchId}/start`);
            setMatch(response.data);
            setError(null);
        } catch (err) {
            console.error('Erreur lancement match :', err);
            setError('Impossible de lancer le match');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!matchId) return;

        const socket = new SockJS('http://localhost:8080/ws');
        const stompClient = new Client({
            webSocketFactory: () => socket as never,
            debug: (str) => console.log('STOMP:', str),
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
        });

        stompClient.onConnect = () => {
            console.log('WebSocket connecté');
            setWsConnected(true);
            // S'abonner aux mises à jour du match spécifique
            stompClient.subscribe(`/topic/matches/${matchId}`, (message) => {
                try {
                    const updatedMatch = JSON.parse(message.body) as MatchDetail;
                    setMatch(updatedMatch);
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
            if (stompClientRef.current) {
                stompClientRef.current.deactivate();
            }
        };
    }, [matchId]);


    if (loading) {
        return (
            <div className="min-h-screen py-12">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="text-center py-12 text-gray-500 dark:text-gray-400">Chargement du match...</div>
                </div>
            </div>
        );
    }

    if (error || !match) {
        return (
            <div className="min-h-screen py-12">
                <div className="container mx-auto px-4 max-w-5xl">
                    <button onClick={() => router.back()} className="mb-8 flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Retour
                    </button>
                    <div className="text-center py-12 text-red-500">{error || 'Match introuvable'}</div>
                </div>
            </div>
        );
    }

    const isFinished = (match.score_1 ?? 0) >= 10 || (match.score_2 ?? 0) >= 10;
    const isUpcoming = match.score_1 === null && match.score_2 === null;

    const userTeamId = Number(localStorage.getItem('equipe'));
    const canStartMatch = isUpcoming && userTeamId && (userTeamId === match.equipe_1.id || userTeamId === match.equipe_2.id);

    return (
        <div className="min-h-screen py-12">
            <div className="container mx-auto px-4 max-w-5xl">
                <div className="flex justify-between mb-8">
                    <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Retour
                    </button>

                    {canStartMatch && (
                        <button
                            onClick={handleStartMatch}
                            className="px-5 py-2 rounded-full font-medium cursor-pointer
        text-surface-950 bg-transparent border border-black/24
        hover:bg-black/10 hover:opacity-80 transition-all duration-300
        dark:bg-white dark:text-black dark:border-0 dark:shadow-blue-card"
                        >
                            Lancer le match
                        </button>
                    )}
                </div>

                {/* En-tête du match */}
                <div className="bg-white dark:bg-gray-800 shadow-sm p-8 mb-6 rounded-md">
                    <div className="flex justify-between items-center mb-8">
                        <span className="text-sm text-gray-500 dark:text-gray-400">{match.created_at ? new Date(match.created_at).toLocaleString('fr-FR') : 'Date non définie'}</span>
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
                    </div>

                    {/* Score */}
                    <div className="grid grid-cols-3 items-center gap-6 mb-8">
                        <div className="text-center">
                            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">{match.equipe_1.name}</h2>
                            <div className="text-5xl font-bold text-gray-900 dark:text-white">{match.score_1 ?? '-'}</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl text-gray-400 dark:text-gray-500">-</div>
                        </div>
                        <div className="text-center">
                            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">{match.equipe_2.name}</h2>
                            <div className="text-5xl font-bold text-gray-900 dark:text-white">{match.score_2 ?? '-'}</div>
                        </div>
                    </div>

                    {match.vitesse_max && (
                        <div className="text-center pt-6 border-t border-gray-200 dark:border-gray-700">
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Vitesse max</p>
                            <p className="text-2xl font-semibold text-gray-900 dark:text-white">{match.vitesse_max} km/h</p>
                        </div>
                    )}
                </div>

                {/* Liste des buts */}
                <div className="bg-white dark:bg-gray-800 shadow-sm rounded-md">
                    <div className="px-8 py-5 border-b border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Buts ({match.goals?.length || 0})</h3>
                    </div>
                    <div className="p-8">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-gray-200 dark:border-gray-700">
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Équipe</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Vitesse</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {!match.goals || match.goals.length === 0 ? (
                                        <tr>
                                            <td colSpan={3} className="px-4 py-12 text-center text-gray-500 dark:text-gray-400">
                                                Aucun but pour le moment
                                            </td>
                                        </tr>
                                    ) : (
                                        match.goals.map((goal) => (
                                            <tr key={goal.id} className="border-b border-gray-100 dark:border-gray-700 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                                <td className="px-4 py-4 text-gray-700 dark:text-gray-300">{goal.team?.name || 'Équipe inconnue'}</td>
                                                <td className="px-4 py-4 text-gray-900 dark:text-white font-medium">{goal.vitesse} km/h</td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MatchDetailPage;
