"use client";

import useV1Login from "@/hooks/api_hooks/usev1login";

const CClientLogin = () => {
  const { credentials, setCredentials, getV1Login } = useV1Login();

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-96 shadow-lg p-6 bg-white rounded-lg">
        <h2 className="text-2xl font-bold text-center text-black mb-4">
          Admin Login
        </h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-black">
            User ID
          </label>
          <input
            type="text"
            value={credentials.username}
            onChange={(e) => {
              setCredentials((prev) => ({
                ...prev,
                username: e.target.value,
              }));
            }}
            required
            placeholder="Enter your User ID"
            className="w-full px-3 py-2 text-black rounded-md border-black border-[1px] focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-black">
            Password
          </label>
          <input
            type="password"
            value={credentials.password}
            onChange={(e) => {
              setCredentials((prev) => ({
                ...prev,
                password: e.target.value,
              }));
            }}
            required
            placeholder="Enter your password"
            className="w-full px-3 py-2 text-black border-black border-[1px] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          onClick={() => {
            getV1Login();
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default CClientLogin;
