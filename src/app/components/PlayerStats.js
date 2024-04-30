import React from 'react';
import Modal from 'react-modal';
import '../styles/Popup.css';

const PlayerStats = ({ player, closeModal }) => {
    return (
        <Modal
            isOpen={!!player}
            onRequestClose={closeModal}
            contentLabel="Player Stats"
            className="ReactModal__Content"
            overlayClassName="ReactModal__Overlay"
        >
            {player && (
                <div>
                    <h1 className='player-name'>{player.name} Stats</h1>
                    <button className='close-button' onClick={closeModal}>Close</button>
                    <div className='player-info'>
                        <p><strong>Team:</strong> {player.team}</p>
                        <p><strong>Overall Rating:</strong> {player.overallAttribute}</p>
                    </div>
            <div className='player-stats'> 
                <div className= "stat-category">
                    <h2 className="heading">Offense</h2>
                    <p className="stat-item"><strong>Close Shot:</strong> {player.closeShot}</p>
                    <p className="stat-item"><strong>Mid Range Shot:</strong> {player.midRangeShot}</p>
                    <p className="stat-item"><strong>Three Point Shot:</strong> {player.threePointShot}</p>
                    <p className="stat-item"><strong>Free Throw:</strong> {player.freeThrow}</p>
                    <p className="stat-item"><strong>Shot IQ:</strong> {player.shotIQ}</p>
                    <p className="stat-item"><strong>Layup:</strong> {player.layup}</p>
                    <p className="stat-item"><strong>Driving Dunk:</strong> {player.drivingDunk}</p>
                    <p className="stat-item"><strong>Post Hook:</strong> {player.postHook}</p>
                    <p className="stat-item"><strong>Post Fade:</strong> {player.postFade}</p>
                    <p className="stat-item"><strong>Offensive Rebound:</strong> {player.offensiveRebound}</p>
                    <p className="stat-item"><strong>Ball Handle:</strong> {player.ballHandle}</p>
                </div>

                <div className= "stat-category">
                    <h2 className="heading">Defense</h2>
                    <p className="stat-item"><strong>Hands:</strong> {player.hands}</p>
                    <p className="stat-item"><strong>Interior Defense:</strong> {player.interiorDefense}</p>
                    <p className="stat-item"><strong>Perimeter Defense:</strong> {player.perimeterDefense}</p>
                    <p className="stat-item"><strong>Steal:</strong> {player.steal}</p>
                    <p className="stat-item"><strong>Block:</strong> {player.block}</p>
                    <p className="stat-item"><strong>Defensive Rebound:</strong> {player.defensiveRebound}</p>
                </div>

                <div className= "stat-category">
                    <h2 className="heading">Athleticism</h2>
                    <p className="stat-item"><strong>Speed:</strong> {player.speed}</p>
                    <p className="stat-item"><strong>Acceleration:</strong> {player.acceleration}</p>
                    <p className="stat-item"><strong>Strength:</strong> {player.strength}</p>
                    <p className="stat-item"><strong>Vertical:</strong> {player.vertical}</p>
                    <p className="stat-item"><strong>Stamina:</strong> {player.stamina}</p>
                    <p className="stat-item"><strong>Hustle:</strong> {player.hustle}</p>
                </div>
            </div>

              </div>
            )}
        </Modal>
    );
};

export default PlayerStats;
