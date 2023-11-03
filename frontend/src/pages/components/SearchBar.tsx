export default function SearchBar() {
  return (
    <div className="flex ml-5 ">

      <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs mx-10">
      </input>
      <svg className="pointer-events-none absolute z-10 my-3.5 ml-4 stroke-current opacity-60 text-base-content" width="16" height="16" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
    </div>

  );
}