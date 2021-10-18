import { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Detail from './pages/Detail';
import Footer from './components/Footer';

function App() {
	const [page, setPage] = useState('home');
	const [postId, setPostId] = useState(undefined);
	const [user, setUser] = useState(null);

	const handleToHome = (home) => {
		setPage(home);
	};

	const handleToDetail = (postId) => {
		setPage('detail');
		setPostId(postId);
	};

	const handleLoggedUser = (loggedUser) => {
		setUser(loggedUser);
	};

	return (
		<div className="App">
			<Navbar
				toHome={handleToHome}
				onLoggedUser={handleLoggedUser}
				user={user}
			/>

			{page === 'home' && <Home toDetail={handleToDetail} />}

			{page === 'detail' && <Detail postId={postId} user={user} />}

			<Footer />
		</div>
	);
}

export default App;
