import '../App.css'
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/navbar';

function Home() {
    return (
        <>
            <Navbar />
            <div>
                <img src="/ee.png" className="logo react" alt="ee logo" />
            </div>
            <h1>rcsCTF24</h1>
            
            <div className='about-elements'>
                <h2>Guides</h2>
                <div className="action-card">
                    <a href="https://www.youtube.com/watch?v=9Pzj7Aj25lw">How to use the scoreboard</a>
                </div>
            </div>
        </>
    )
}

export default Home