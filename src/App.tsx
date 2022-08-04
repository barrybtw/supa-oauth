import "./App.css";
import { useAuth } from "./AuthInstance";
import { supabase } from "./Supabase";

function App() {
  function login(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    supabase.auth.signIn({
      provider: "google",
    });
  }

  function logout() {
    supabase.auth.signOut();
  }

  const { getUser } = useAuth();
  const user = getUser();

  console.log(user);

  return (
    <div className="App flex flex-col gap-16 justify-center items-center">
      <h1>Login</h1>
      <div className="flex flex-row gap-4 items-center">
        <button onClick={login}>Login with google</button>
        {user && <button onClick={logout}>Logout</button>}
      </div>
      {user !== null && (
        <p>
          Logged in as{" "}
          <span className="font-bold">
            {user.user?.user_metadata.name ?? user.user?.email}
          </span>
        </p>
      )}
    </div>
  );
}

export default App;
