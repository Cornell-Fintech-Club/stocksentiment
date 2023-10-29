import FooterComp from '../components/FooterComp';

export default function HomePage() {
  return (
    <div className="">
      <h1 className="text-5xl font-semibold px-4 py-2">Hello World!</h1>
      <button className="btn btn-secondary">Example</button>

      {/* This is how you use a component!*/}
      <FooterComp />
    </div>
  );
}
