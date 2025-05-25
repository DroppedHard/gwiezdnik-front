export default function LoginForm() {
  return (
    <>
      <h2 className="text-2xl font-bold mb-4 text-center">Welcome, Stargazer ✨</h2>
      <input
        type="email"
        placeholder="Email"
        className="w-full mb-3 p-2 bg-black/30 rounded outline-none border-b-2 border-white"
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full mb-3 p-2 bg-black/30 rounded outline-none border-b-2 border-white"
      />
      <button className="w-full mt-2 bg-purple-600 hover:bg-purple-800 transition rounded p-2">
        Login
      </button>
      <p className="text-xs mt-3 text-center opacity-70">
        Don't have an account?{' '}
        <a href="#" className="underline">
          Register
        </a>
      </p>
    </>
  );
}
