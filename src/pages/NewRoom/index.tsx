import { FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button } from '../../components/Button';
import { database } from '../../services/firebase';
import { useAuth } from '../../hooks/useAuth';
import IllustrationImg from '../../assets/images/illustration.svg';
import LogoImg from '../../assets/images/logo.svg';
import './styles.scss';

const NewRoom = () => {
    const { user } = useAuth();
    const history = useHistory();
    const [newRoom, setNewRoom] = useState('');

    const handleCreateRoom = async (e: FormEvent) => {
        e.preventDefault();

        if(newRoom.trim() === '') {
            return;
        }

        const roomRef = database.ref('rooms');

        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id
        });

        history.push(`/rooms/${firebaseRoom.key}`);
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
                    <h2>Create a new room</h2>
                    <form onSubmit={handleCreateRoom}>
                        <input
                            type="text"
                            placeholder="Room name"
                            onChange={e => setNewRoom(e.target.value)}
                            value={newRoom}
                        />
                        <Button type="submit">Create room</Button>
                    </form>
                    <p>
                        wents to enter a room existing? <Link to="/">Click here</Link>
                    </p>
                </div>
            </main>
        </div>
    )
}

export { NewRoom };