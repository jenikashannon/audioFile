import "./Footer.scss";

import { NavLink } from "react-router-dom";

function Footer() {
	return (
		<footer className='footer'>
			<svg
				className='footer__icon'
				xmlns='http://localhost:1700/icons/home.svg'
				height='75'
				viewBox='0 -960 960 960'
				width='40'
			>
				<path d='m200-120-80-480h720l-80 480H200Zm67-80h426l51-320H216l51 320Zm133-160h160q17 0 28.5-11.5T600-400q0-17-11.5-28.5T560-440H400q-17 0-28.5 11.5T360-400q0 17 11.5 28.5T400-360ZM240-640q-17 0-28.5-11.5T200-680q0-17 11.5-28.5T240-720h480q17 0 28.5 11.5T760-680q0 17-11.5 28.5T720-640H240Zm80-120q-17 0-28.5-11.5T280-800q0-17 11.5-28.5T320-840h320q17 0 28.5 11.5T680-800q0 17-11.5 28.5T640-760H320Zm-53 560h426-426Z' />
			</svg>
			<svg
				className='footer__icon'
				xmlns='http://localhost:1700/icons/discover.svg'
				height='75'
				viewBox='0 -960 960 960'
				width='40'
			>
				<path d='M480-300q75 0 127.5-52.5T660-480q0-75-52.5-127.5T480-660q-75 0-127.5 52.5T300-480q0 75 52.5 127.5T480-300Zm0-140q-17 0-28.5-11.5T440-480q0-17 11.5-28.5T480-520q17 0 28.5 11.5T520-480q0 17-11.5 28.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z' />
			</svg>
			<svg
				className='footer__icon'
				xmlns='http://localhost:1700/icons/add-crate.svg'
				height='75'
				viewBox='0 -960 960 960'
				width='40'
			>
				<path d='M720-160v-120H600v-80h120v-120h80v120h120v80H800v120h-80Zm-600 40q-33 0-56.5-23.5T40-200v-560q0-33 23.5-56.5T120-840h560q33 0 56.5 23.5T760-760v200h-80v-80H120v440h520v80H120Zm0-600h560v-40H120v40Zm0 0v-40 40Z' />
			</svg>
		</footer>
	);
}

export default Footer;
