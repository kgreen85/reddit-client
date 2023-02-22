import './App.css';
import Navbar from './components/Navbar/navbar';
import Home from './components/Home/home';
import Subreddits from './features/Subreddit/subreddit';

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Home />
      </main>
      <aside>
        <Subreddits />
      </aside>
    </>
  );
}

export default App;
