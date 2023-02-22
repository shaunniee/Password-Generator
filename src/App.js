import './App.scss';
import PasswordGenerator from './components/Password/PasswordGenerator';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <div className="App">
<PasswordGenerator/>
<ToastContainer/>
    </div>
  );
}

export default App;
