import './Dashboard.css'

function Dashboard({ user, onLogout }) {
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Church Management System</h1>
        <div className="user-info">
          <span>Welcome, <strong>{user.username}</strong>!</span>
          <button onClick={onLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </header>

      <main className="dashboard-content">
        <div className="dashboard-card">
          <h2>Dashboard</h2>
          <p>Welcome to the Church Management System!</p>
          <p>You have successfully logged in.</p>
          <p>Next: Members Management (Coming Soon)</p>
        </div>
      </main>
    </div>
  )
}

export default Dashboard