import { useAuth } from "../context/AuthProviders";

const Dashboard = () => {
  const { user, role, logout } = useAuth();

  if (!user || !role) return <div>Loading...</div>;
//   console.log(role);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user.displayName}</h1>

      {role === "admin" ? (
        <>
          <h2 className="text-xl mb-2">Create New Notice</h2>
          {/* Show notice creation form here */}
        </>
      ) : (
        <>
          <h2 className="text-xl mb-2">Notice Board</h2>
          {/* Show notices only */}
        </>
      )}
      <button
        onClick={logout}
        className="bg-blue-600 text-white px-6 py-2 rounded"
      >
        Sign out from Google
      </button>
    </div>
  );
};

export default Dashboard;
