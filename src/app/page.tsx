import Layout from './components/Layout';
import Link from 'next/link';
import styles from './styles/Layout.module.css';




const HomePage = () => {
  return (
    <Layout>
      <div>
        <h1>Welcome to the NBA 2k Player App</h1>
        <p>Draft teams and look up player stats from the latest 2k player data.</p>
        <div className={styles.draftbutton}>
        <Link className={styles.draftbutton} href="../pages/players">Draft Players
        </Link>
        <br />
        <Link className={styles.draftbutton} href="../pages/stats">Player Stats
        </Link>
        </div>
        <img src="https://cdn.vox-cdn.com/thumbor/gsvvXIoMyszW4ssvvF1kUa3kZyY=/0x0:1440x1086/1200x0/filters:focal(0x0:1440x1086):no_upscale()/cdn.vox-cdn.com/uploads/chorus_asset/file/3661550/nba-vector-logos-2137888825.0.jpg" alt="NBA Team Logos" />
      </div>
    </Layout>
  );
};


export default HomePage;
