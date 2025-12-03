import { useState } from "react";
import { Church } from "lucide-react";

function LoginPage({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!username || !password) {
      setError("Please enter both username and password");
      setLoading(false);
      return;
    }

    try {
      const result = await window.electronAPI.login(username, password);

      if (result.success) {
        onLoginSuccess(result.user);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
     
      <div className="w-full max-w-4xl bg-white shadow-2xl rounded-3xl overflow-hidden flex min-h-[500px]">

        
        <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-[#144BB8] text-white p-10 rounded-l-3xl md:rounded-r-3xl">
          <div className="w-20 h-20 bg-white rounded-full flex justify-center items-center mb-6 shadow-lg">
            <Church size={40} className="text-[#144BB8]" />
          </div>

          <h2 className="text-2xl font-semibold mb-2 text-center">
            Welcome to the community Hub
          </h2>

          <p className="text-center text-sm opacity-80">
            Manage Church activities and connect with your community
          </p>
        </div>

        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center rounded-r-3xl">
          <h2 className="text-xl font-semibold mb-6">Log in to your Account</h2>

          {error && (
            <div className="mb-4 p-3 text-sm text-red-700 bg-red-100 rounded-md">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
           
            <div>
              <label className="block text-sm font-medium mb-1">Username *</label>
              <input
                type="text"
                value={username}
                disabled={loading}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#144BB8] text-sm"
              />
            </div>

           
            <div>
              <label className="block text-sm font-medium mb-1">Password *</label>
              <input
                type="password"
                value={password}
                disabled={loading}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#144BB8] text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#144BB8] text-white py-2 rounded-md font-medium hover:bg-[#0f3f9e] transition disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

         
          <div className="mt-3">
            <button className="text-sm text-[#144BB8] hover:underline">
              Forgot password?
            </button>
          </div>

         
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
