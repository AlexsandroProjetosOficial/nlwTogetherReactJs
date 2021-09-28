import { FormEvent, useState } from 'react';
import { Button } from '../components/Button';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import IllustrationImg from '../assets/images/illustration.svg';
import LogoImg from '../assets/images/logo.svg';
import GoogleIconImg from '../assets/images/google-icon.svg';
import '../styles/auth.scss';
import { database } from '../services/firebase';

const Home = () => {
    const history = useHistory();
    const { user, singInWithGoogle } = useAuth();
    const [ roomCode, setRoomCode ] = useState('');

    const handleCreateRoom = async () => {
        if(!user) {
            await singInWithGoogle();
        }

        history.push('/rooms/new');
    };

    const handleJoinRoom = async (e: FormEvent) => {
        e.preventDefault();

        if(roomCode.trim() === '') {
            return;
        }

        const roomRef = await database.ref(`rooms/${roomCode}`).get();

        if(!roomRef.exists()) {
            alert('Room does not exists.');
            return;
        }

        if(roomRef.val().closedAt) {
            alert('Room alredy closed.');
            return;
        }

        history.push(`/rooms/${roomCode}`);
    }

    return (
        <div id="page-auth">
            <aside>
                <img src={IllustrationImg} alt="Illustration symbolizing question and answers" />
                <strong>Create rooms of Question &amp; Answers live</strong>
                <p>Answer your audience's questions in real-time</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={LogoImg} alt="Letmeask" />
                    <button className="create-room" onClick={handleCreateRoom}>
                        <img src={GoogleIconImg} alt="Google logo" />
                        Create your rooms with Google
                    </button>
                    <div className="separator">
                        or enter a room
                    </div>
                    <form onSubmit={handleJoinRoom}>
                        <input
                            type="text"
                            placeholder="Type the room code"
                            onChange={e => setRoomCode(e.target.value)}
                            value={roomCode}
                        />
                        <Button type="submit">Enter a room</Button>
                    </form>
                </div>
            </main>
        </div>
    )
}

export { Home };