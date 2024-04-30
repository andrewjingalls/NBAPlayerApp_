
// Function to fetch player data from URL
export async function fetchPlayersData() {
    const res = await fetch('https://raw.githubusercontent.com/MikeYan01/nba2k-player-ratings/master/data/team.json');
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    return res.json();
  }
  
  // Function to fetch player data based on player name
export async function getPlayerData(name) {
    const playersData = await fetchPlayersData();
    const player = playersData.find(player => player.name.toLowerCase() === name.toLowerCase());
    if (!player) {
        throw new Error('Player not found');
    }
    return player;
}
  
  // Function to generate an array of all player names
  export async function getAllPlayerNames() {
    const playersData = await fetchPlayersData();
    return playersData.map(player => ({
      params: {
        name: player.name, 
      },
    }));
  }
  