import "./Button.scss";

function Button({ text, type, onClick }) {
	return (
		<button
			className={`button ${type ? `button--${type}` : ""}`}
			onClick={onClick}
		>
			{text}
		</button>
	);
}

export default Button;
