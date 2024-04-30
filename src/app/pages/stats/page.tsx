"use client";
import React, { useEffect, useState } from 'react';
import { getAllPlayerNames, getPlayerData } from '../../lib/players';
import PlayerStats from '../../components/PlayerStats';
import Layout from '../../components/Layout';
import Link from 'next/link';
import styles from '../../styles/Layout.module.css';



const fetchPlayers = async () => {
    const res = await fetch('https://raw.githubusercontent.com/MikeYan01/nba2k-player-ratings/master/data/team.json');
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    return res.json();
  
  }
const Page = () => {
    const [playerNames, setPlayerNames] = useState([]);
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [players, setPlayers] = useState([]);
    const [playerFilter, setPlayerFilter] = useState('');


    useEffect(() => {
        const fetchPlayerNames = async () => {
            const names = await getAllPlayerNames();
            setPlayerNames(names);
        };
        fetchPlayerNames();
    }, []);

    const handlePlayerClick = async (name: string) => {
        const player = await getPlayerData(name);
        setSelectedPlayer(player); 
    };

    const closeModal = () => {
        setSelectedPlayer(null); 
    };

    const filteredPlayers = players
        .filter((player: { name: string }) => player.name.toLowerCase().includes(playerFilter.toLowerCase())); // Convert both to lowercase

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchPlayers();
            setPlayers(data);
        };
        fetchData();
    }, []);

    return (
        <Layout>
            <div>
                <h1>Current NBA Players</h1>
                <Link href="/">Go back</Link>
                <h2>Search by player:</h2>
                    <input
                    type="text"
                    placeholder="Player Name"
                    value={playerFilter}
                    onChange={(e) => setPlayerFilter(e.target.value)}
                    />
               <p>Click on a player to view their stats</p>
                <ul>
                    {filteredPlayers.map((player: { name: string }) => (
                        <li className={styles.playername} key={player.name} onClick={() => handlePlayerClick(player.name)}>
                            {player.name}
                        </li>
                    ))}
                </ul>
            </div>
            <div className='modal-container'>
            {selectedPlayer && <PlayerStats player={selectedPlayer} closeModal={closeModal} />} {/* Render PlayerStats if a player is selected */}
            </div>
        </Layout>
    );
};

export default Page;
