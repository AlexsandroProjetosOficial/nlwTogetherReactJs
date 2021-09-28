import CopyImg from '../assets/images/copy.svg';
import '../styles/roomCode.scss';

type RoomCodeProps = {
    code: string;
}

const RoomCode = ({ code }: RoomCodeProps) => {
    const copyRoomCodeToClipBoard = () => {
        navigator.clipboard.writeText(code)
    }

    return (
        <button className="room-code" onClick={copyRoomCodeToClipBoard}>
            <div>
                <img src={CopyImg} alt="Copy room code" />
            </div>
            <span>Room #{code}</span>
        </button>
    );
}

export { RoomCode };