import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState("eve.holt@reqres.in");
  const [password, setPassword] = useState("cityslicka");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await fetch("https://reqres.in/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json(); // response into JSON
      
      console.log(data);

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      localStorage.setItem("token", data.token);
      
      // Show success notification
      setSuccess(true);
      
      // Use navigate instead of router.push
      setTimeout(() => navigate("/UserCard"), 1500);  // Redirect to UserCard after 1.5 seconds
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const [success, setSuccess] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-50 to-blue-100 p-4">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-20">
        <div className="absolute top-10 left-10 w-32 h-32 bg-purple-300 rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-indigo-300 rounded-full"></div>
        <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-blue-300 rounded-full"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Success notification */}
        {success && (
          <div className="mb-4 p-4 bg-green-100 border-l-4 border-green-500 text-green-700 rounded shadow animate-pulse">
            <p className="font-medium">Login successful!</p>
            <p className="text-sm">Redirecting you to the dashboard...</p>
          </div>
        )}

        <div className="bg-white shadow-xl rounded-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
            <h2 className="text-2xl font-bold">Welcome Back</h2>
            <p className="text-indigo-100 mt-1">Sign in to access your account</p>
          </div>

          {/* Form Area */}
          <div className="p-6">
            {error && (
              <div className="mb-6 p-3 text-red-700 bg-red-50 border-l-4 border-red-500 rounded-md flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span>{error}</span>
              </div>
            )}
            
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">Remember me</label>
                </div>
                <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">Forgot password?</a>
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Logging in...</span>
                  </div>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            <div className="text-center mt-6">
              <p className="text-sm text-gray-500">Demo credentials are pre-filled for testing</p>
              <p className="mt-4 text-sm">
                Don't have an account? 
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500 ml-1">Sign up now</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;