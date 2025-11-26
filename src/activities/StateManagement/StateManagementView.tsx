import { useStore } from './StateManagementUtils';

function StateManagementView() {
  const { user, theme, setUser, toggleTheme } = useStore();

  const handleLogin = () => {
    setUser({ id: '123', name: 'John Doe' });
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: theme === 'light' ? '#fff' : '#333',
      color: theme === 'light' ? '#000' : '#fff',
      minHeight: '100vh'
    }}>
      <h1>State Management Demo</h1>
      
      <section>
        <h2>Theme: {theme}</h2>
        <button onClick={toggleTheme}>Toggle Theme</button>
      </section>

      <section style={{ marginTop: '20px' }}>
        <h2>User Status</h2>
        {user ? (
          <div>
            <p>Logged in as: <strong>{user.name}</strong></p>
            <p>User ID: {user.id}</p>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <div>
            <p>Not logged in</p>
            <button onClick={handleLogin}>Login</button>
          </div>
        )}
      </section>

      <section style={{ marginTop: '20px' }}>
        <h2>Component Using Specific State</h2>
        <ThemeDisplay />
        <UserDisplay />
      </section>
    </div>
  );
}

// Example of selecting only specific state
function ThemeDisplay() {
  const theme = useStore((state) => state.theme);
  return <p>Current theme (from child component): {theme}</p>;
}

function UserDisplay() {
  const user = useStore((state) => state.user);
  return <p>Current user (from child component): {user?.name || 'None'}</p>;
}

export default StateManagementView;