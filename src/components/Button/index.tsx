import { ButtonHTMLAttributes } from "react";
import './styles.scss';

type IButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    isOutlined?: boolean
};

const Button = ({ isOutlined = false, ...rest }: IButtonProps) => {
    return (
        <button 
        className={`button ${isOutlined ? 'outlined' : ''}`}
        {...rest} />
    );
}

export { Button };