export default function Login() {
  return (
    <div className="relative flex flex-col justify-center h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md ring-2 ring-gray-100/50 lg:max-w-lg">
        <h1 className="text-3xl font-semibold text-center text-red-800">Log On</h1>
        <form className="space-y-4">
          <div>
            <label className="label">
              <span className="text-base label-text">User ID</span>
            </label>
            <input type="text" placeholder="User ID" className="w-full input input-bordered" />
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text">Password</span>
            </label>
            <input type="password" placeholder="Enter Password"
              className="w-full input input-bordered" />
          </div>
          <a href="#" className="text-xs text-gray-600 hover:underline hover:text-blue-600">Forget Password?</a>
          <div>
            <button className="btn btn-active btn-ghost">Login</button>
          </div>
        </form>
      </div>
    </div>

  );
}