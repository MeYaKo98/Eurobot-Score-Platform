import { Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import eurobotLogo from '../assets/eurobot_tn.svg';

function Home() {
	const buttonList = [
		{ btnContent: 'Control Center', link: '/controlCenter' },
		{ btnContent: 'Referee', link: '/referee' },
		{ btnContent: 'Dashboard AV', link: '/dashboard' },
	];
	return (
		<Container
			className='d-flex flex-column align-items-center justify-content-center'
			style={{ height: '100svh' }}
		>
			<Container className='d-flex flex-column w-auto'>
				<img
					src={eurobotLogo}
					alt=''
					className='mb-5'
				/>
				{buttonList.map((buttonData) => (
					<Link
						to={buttonData.link}
						key={buttonData.btnContent + '_link'}
					>
						<Button
							variant='outline-primary'
							size='lg my-2 w-100 px-5'
							key={buttonData.btnContent + '_button'}
						>
							{buttonData.btnContent}
						</Button>
					</Link>
				))}
			</Container>
		</Container>
	);
}

export default Home;
