import { AuthProvider } from './contexts/auth-context';
import Routers from './routes/Routers';
function App() {
  return (
    <div>
      <AuthProvider>
        <Routers />
      </AuthProvider>
    </div>
  );
}

export default App;
