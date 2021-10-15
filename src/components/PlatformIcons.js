import React from 'react';
import styles from '../styles/PlatformIcons.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDesktop } from '@fortawesome/free-solid-svg-icons';
import {
	faPlaystation,
	faXbox,
	faApple,
} from '@fortawesome/free-brands-svg-icons';

export default function PlatformIcons({ platforms }) {
	let platformsNames = [];
	let iconsToShow = [];

	platforms?.map((item) => platformsNames.push(item.name));

	const icons = {
		PC: <FontAwesomeIcon key="pcIcon" icon={faDesktop} />,
		PlayStation: <FontAwesomeIcon key="psIcon" icon={faPlaystation} />,
		Xbox: <FontAwesomeIcon key="xboxIcon" icon={faXbox} />,
		Apple: <FontAwesomeIcon key="appleIcon" icon={faApple} />,
	};

	const platformsToIcons = {
		'Microsoft Windows': icons['PC'],
		Xbox: icons['Xbox'],
		'Xbox 360': icons['Xbox'],
		'Xbox One': icons['Xbox'],
		macOS: icons['Apple'],
		PlayStation: icons['Playstation'],
		'PlayStation 2': icons['Playstation'],
		'PlayStation 3': icons['Playstation'],
		'PlayStation 4': icons['Playstation'],
		'PlayStation 5': icons['Playstation'],
		'PlayStation Portable': icons['Playstation'],
	};

	for (let i = 0; i < platformsNames.length; i++) {
		iconsToShow.push(platformsToIcons[platformsNames[i]]);
	}

	return <div className={styles.platformsIcons}>{iconsToShow}</div>;
}
