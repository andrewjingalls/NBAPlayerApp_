"use client";
import Link from 'next/link';
import Layout from '../../components/Layout';
import React, { useEffect, useState } from 'react';
import styles from '../../styles/Layout.module.css';



const fetchPlayers = async () => {
  const res = await fetch('https://raw.githubusercontent.com/MikeYan01/nba2k-player-ratings/master/data/team.json');
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();

}

export default function PlayersPage() {
  const [players, setPlayers] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [teamFilter, setTeamFilter] = useState('');
  const [playerFilter, setPlayerFilter] = useState('');
  const [playerStats, setPlayerStats] = useState(null);
  const [averageOverall, setAverageOverall] = useState(0);




  const handleSelectPlayer = (playerName) => {
    setSelectedPlayers(prevPlayers => [...prevPlayers, playerName]);
  };
  const handleRemovePlayer = (playerToRemove) => {
    setSelectedPlayers(prevPlayers => prevPlayers.filter(player => player.name !== playerToRemove.name));
  };

  const filteredPlayers = players
  .filter(player => player.team.toLowerCase().includes(teamFilter.toLowerCase()))
  .filter(player => player.name.toLowerCase().includes(playerFilter.toLowerCase())); // Convert both to lowercase
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPlayers();
      setPlayers(data);
    }
    fetchData();
  }, []);

  //added
  useEffect(() => {
    if (selectedPlayers.length > 0) {
      const totalOverall = selectedPlayers.reduce((total, player) => total + player.overallAttribute, 0);
      setAverageOverall(Math.round(totalOverall / selectedPlayers.length));
    } else {
      setAverageOverall(0);
    }
  }, [selectedPlayers]);

  return (
    <Layout>
    <div>
      <h1>Players</h1>
      <Link href="/">Go back</Link>

      <div className={styles.filtercontainer}>
        <div>
          <h2>Filter by team:</h2>
          <input
            type="text"
            placeholder="Filter by team"
            value={teamFilter}
            onChange={(e) => setTeamFilter(e.target.value)}
          />
        </div>
        <div>
          <h2>Filter by player:</h2>
          <input
            type="text"
            placeholder="Filter by player"
            value={playerFilter}
            onChange={(e) => setPlayerFilter(e.target.value)}
          />
        </div>
      </div>
    <div>
      <h3>Teams:</h3>
      <p className={styles.teams}>
          Atlanta Hawks |
          Boston Celtics |
          Brooklyn Nets |
          Charlotte Hornets |
          Chicago Bulls |
          Cleveland Cavaliers |
          Dallas Mavericks |
          Denver Nuggets |
          Detroit Pistons |
          Golden State Warriors |
          Houston Rockets |
          Indiana Pacers |
          LA Clippers |
          Los Angeles Lakers |
          Memphis Grizzlies |
          Miami Heat |
          Milwaukee Bucks |
          Minnesota Timberwolves |
          New Orleans Pelicans |
          New York Knicks |
          Oklahoma City Thunder |
          Orlando Magic |
          Philadelphia 76ers |
          Phoenix Suns |
          Portland Trail Blazers |
          Sacramento Kings |
          San Antonio Spurs |
          Toronto Raptors |
          Utah Jazz |
          Washington Wizards |
      </p>
      </div>
      <h2>Drafted Players:</h2>
      <p>Average Overall: {averageOverall}</p>
      <ul>
        {selectedPlayers.map((player, index) => (
          <li key={index}>
            {player.name} - {player.team}
            <button onClick={() => handleRemovePlayer(player)}>Remove from list</button>
          </li>
        ))}
      </ul>
      <h2>All Players:</h2>
      <ol>
      {filteredPlayers.map((player, index) => (
            <li className='playerlistitem' key={player.name}>
            {player.name} - {player.team} - Overall: {player.overallAttribute}
            <button onClick={() => handleSelectPlayer(player)}>Add to Team</button>
          </li>
        ))}
      </ol>
    </div>
    </Layout>
  );
}


// "use client";
// import Link from 'next/link';
// import Layout from '../../components/Layout';
// import React, { useEffect, useState } from 'react';
// import styles from '../../styles/Layout.module.css';

// const fetchPlayers = async () => {
//   const res = await fetch('https://raw.githubusercontent.com/MikeYan01/nba2k-player-ratings/master/data/team.json');
//   if (!res.ok) {
//     throw new Error('Failed to fetch data');
//   }
//   return res.json();
// }

// export default function PlayersPage() {
//   const [players, setPlayers] = useState([]);
//   const [selectedPlayers, setSelectedPlayers] = useState([]);
//   const [selectedTeams, setSelectedTeams] = useState([]);
//   const [teamCheckboxes, setTeamCheckboxes] = useState({});
//   const [selectAll, setSelectAll] = useState(false); // New state variable for select all checkbox
//   const [averageOverall, setAverageOverall] = useState(0);



//   useEffect(() => {
//     const fetchData = async () => {
//       const data = await fetchPlayers();
//       setPlayers(data);
//       // Extract unique team names from player data
//       const teams = Array.from(new Set(data.map(player => player.team)));
//       setSelectedTeams(teams);
//       // Initialize team checkboxes state
//       const initialCheckboxes = {};
//       teams.forEach(team => {
//         initialCheckboxes[team] = true;
//       });
//       setTeamCheckboxes(initialCheckboxes);
//     }
//     fetchData();
//   }, []);

//   const handleSelectPlayer = (player) => {
//     setSelectedPlayers(prevPlayers => [...prevPlayers, player]);
//   };

//   const handleRemovePlayer = (playerToRemove) => {
//     setSelectedPlayers(prevPlayers => prevPlayers.filter(player => player.name !== playerToRemove.name));
//   };

//   const handleTeamCheckboxChange = (team) => {
//     setTeamCheckboxes(prevCheckboxes => {
//       const newCheckboxes = { ...prevCheckboxes, [team]: !prevCheckboxes[team] };
//       if (!newCheckboxes[team]) {
//         // If the team checkbox is deselected, remove players from that team from the selected players
//         setSelectedPlayers(prevPlayers => prevPlayers.filter(player => player.team !== team));
//       }
//       return newCheckboxes;
//     });
//   };


//   const handleSelectAllChange = () => {
//     setSelectAll(prevSelectAll => !prevSelectAll); // Toggle the select all state
//     setSelectedTeams(prevTeams => {
//       const newTeams = { ...prevTeams };
//       for (const team of teams) {
//         newTeams[team] = !prevSelectAll; // Set all teams to the new select all state
//       }
//       return newTeams;
//     });
//   };

//   useEffect(() => {
//     // Filter players based on selected teams
//     const filteredPlayers = players.filter(player => teamCheckboxes[player.team]);
//     // Update selected players if they belong to the filtered players
//     setSelectedPlayers(prevPlayers => prevPlayers.filter(player => filteredPlayers.find(p => p.name === player.name)));
//   }, [teamCheckboxes]);

//   useEffect(() => {
//     if (selectedPlayers.length > 0) {
//       const totalOverall = selectedPlayers.reduce((total, player) => total + player.overallAttribute, 0);
//       setAverageOverall(Math.round(totalOverall / selectedPlayers.length));
//     } else {
//       setAverageOverall(0);
//     }
//   }, [selectedPlayers]);

  
//   return (
//     <div>
//       <h1>Players</h1>
//       <Link href="/pages/home">Go back to home page</Link>
//       <h2>Filter by team:</h2>

//       {/* {selectedTeams.map((team, index) => (
//         <div key={index}>
//           <input
//             type="checkbox"
//             id={`team-${index}`}
//             checked={teamCheckboxes[team]}
//             onChange={() => handleTeamCheckboxChange(team)}
//           />
//           <label htmlFor={`team-${index}`}>{team}</label>
//         </div>
//       ))} */}
      
//       <div className={styles.teamCheckboxContainer}> {/* Apply styling container */}
//         {selectedTeams.map((team, index) => (
          
//           <div key={index} className={styles.teamCheckboxItem}> {/* Apply styling item */}
//             <input
//               type="checkbox"
//               id={`team-${index}`}
//               checked={teamCheckboxes[team]}
//               onChange={() => handleTeamCheckboxChange(team)}
//             />
//             <label htmlFor={`team-${index}`}>{team}</label>
//           </div>
//         ))}
//       </div>

//       <h2>Selected Players:</h2>
//       <p>Average Overall: {averageOverall}</p>
//       <ul>
//         {selectedPlayers.map((player, index) => (
//           <li key={index}>
//             {player.name} - {player.team}
//             <button onClick={() => handleRemovePlayer(player)}>Remove from list</button>
//           </li>
//         ))}
//       </ul>
//       <h2>All Players:</h2>
//       <ol>
//         {players.filter(player => teamCheckboxes[player.team]).map((player) => (
//           <li key={player.name}>
//             {player.name} - {player.team}
//             {!selectedPlayers.some(p => p.name === player.name) && (
//               <button onClick={() => handleSelectPlayer(player)}>Add to list</button>
//             )}
//           </li>
//         ))}
//       </ol>
//     </div>
//   );


// }
