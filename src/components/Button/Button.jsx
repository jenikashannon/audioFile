import "./Button.scss";

function Button({ text, type, handleClick }) {
	return (
		<button
			className={`button ${type ? `button--${type}` : ""}`}
			onClick={handleClick}
		>
			{text}
		</button>
	);
}

export default Button;
