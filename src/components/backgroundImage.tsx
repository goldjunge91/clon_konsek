import Image from 'next/image';
import React from 'react';

import background from '../../public/background.jpg';

const BackgroundImage = () => {
	return (
		<div className="background-container">
			<Image
				className="imagebackground"
				src={background}
				alt="Background"
				quality={100}
			/>
		</div>
	);
};
export default BackgroundImage;
