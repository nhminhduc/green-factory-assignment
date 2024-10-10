import { useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import { useUniversitiesStore } from "../store/universitiesStore";

const Header = () => {
  const { isAuthenticated, login, logout } = useAuthStore();
  const averageDuration = useUniversitiesStore((state) =>
    state.getAverageSearchDuration()
  ).toFixed(2);

  useEffect(() => {
    localStorage.setItem("isAuthenticated", isAuthenticated.toString());
  }, [isAuthenticated]);

  return (
    <header className="bg-blue-400 text-white shadow-md z-10">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <h1 className="text-2xl font-bold">University Search</h1>
        </div>

        <div className="flex items-center space-x-6">
          {isAuthenticated ? (
            <button className="flex items-center space-x-2" onClick={logout}>
              <span className="text-lg">Welcome, User!</span>
              <span>Log out</span>
            </button>
          ) : (
            <button
              className="flex items-center space-x-2 bg-white text-blue-600 px-4 py-2 rounded-md shadow hover:bg-blue-50"
              onClick={login}
            >
              <span>Login</span>
            </button>
          )}
        </div>
      </div>
      <div className="bg-blue-500 text-center py-2">
        Average Search Duration:{" "}
        <span className="font-semibold">{averageDuration} ms</span>
      </div>
    </header>
  );
};

export default Header;
