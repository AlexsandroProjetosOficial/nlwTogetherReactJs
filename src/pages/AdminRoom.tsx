import { useParams, useHistory } from 'react-router-dom';
import { Button } from '../components/Button';
import { Question } from '../components/Question';
import { RoomCode } from '../components/RoomCode';
import { useRoom } from '../hooks/useRoom';
import LogoImg from '../assets/images/logo.svg';
import DeleteImg from '../assets/images/delete.svg';
import '../styles/room.scss';
import { database } from '../services/firebase';

type RoomParamsProsp = {
    idRoom: string;
}

const AdminRoom = () => {
    const { idRoom } = useParams<RoomParamsProsp>();
    const { questions, title } = useRoom(idRoom);
    const history = useHistory();

    const handleDeleteQuestion = async (idQuestion: string) => {
        if(window.confirm('Are you sure you want to delete this question?')) {
            await database.ref(`rooms/${idRoom}/questions/${idQuestion}`).remove();
        }
    }

    const handleCloseRoom = async () => {
        await database.ref(`rooms/${idRoom}`).update({
            closedAt: new Date(),
        });

        history.push('/');
    }

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={LogoImg} alt="Letmeask" />
                    <div>
                        <RoomCode code={idRoom} />
                        <Button isOutlined onClick={handleCloseRoom}>Close room</Button>
                    </div>
                </div>
            </header>
            <main>
                <div className="room-title">
                    <h1>Room {title}</h1>
                    {questions.length > 0 && <span>{questions.length} question(s)</span>}
                </div>
                <div className="question-list">
                    {questions.map(item => (
                        <Question
                            author={item.author}
                            content={item.content}
                            key={item.id}
                        >
                            <button
                                type="button"
                                onClick={() => handleDeleteQuestion(item.id)}
                            >
                                <img src={DeleteImg} alt="Delete question" />
                            </button>
                        </Question>
                    ))
                    }
                </div>
            </main>
        </div >
    )
}

export { AdminRoom };