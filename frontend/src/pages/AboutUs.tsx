import { Link } from "react-router-dom";
import Table from "../components/table";

export default function AboutUs() {
    return (
        <div className="h-full">
            <div className="hero min-h-screen">
                <div
                    className="relative inset-x-0 -top-20 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                    aria-hidden="true"
                >
                    <div
                        className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-primary opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                    />
                </div>
                <div className="mx-auto max-w-2xl py-16 sm:py-20 lg:py-24">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-6xl">
                            About Us
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            Maximize your trading effectiveness with Cornell FinTech Club's Stock Sentiment Analysis Tool!
                            Harness the insights from our analysis tools to pinpoint optimal buying opportunities
                            and identify the precise moments shield yourself from potential losses.
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <Link
                                to="/"
                                className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                            >
                                Get started
                            </Link>
                            <a href="#learnmore" className="text-sm font-semibold leading-6 text-primary">
                                Learn more <span aria-hidden="true">→</span>
                            </a>
                        </div>
                    </div>
                </div>
                <div
                    className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
                    aria-hidden="true"
                >
                    <div
                        className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-primary opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                    />
                </div>
            </div>
            <div id="learnmore" className="mt-5 flex gap-x-2" >
                <div className="text-center mx-auto max-w-2xl lg:py-20">
                    <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-6xl ">
                        Who are we?
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        Cornell FinTech Club (CFT) is the first all-encompassing, undergraduate-led club that aims to create spaces and opportunities for students in fintech through projects in the investment and engineering teams, weekly discussions, new member education, and corporate events. We open select events to both undergraduate and graduate students to help foster a community for fintech at Cornell University. CFT is supported by Fintech at Cornell, an Initiative of the SC Johnson College of Business.<span> </span><Link to="https://www.cornellfintechclub.com/" className="semibold underline mt-6 text-lg leading-8 text-primary">
                            See more
                        </Link></p>
                    <br></br>
                    <br></br>
                    <br></br>
                    <h1 className="font-bold tracking-tight text-primary sm:text-4xl ">
                        Members
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-gray-600">PM: <a className="underline" href="https://www.linkedin.com/in/emna-sadkaoui-336450224/">Emna</a></p>
                    <p className="mt-6 text-lg leading-8 text-gray-600">TPMs: Diego and <a className="underline" href="https://www.linkedin.com/in/neil-gidwani/">Neil</a></p>
                    <p className="mt-6 text-lg leading-8 text-gray-600">Business: Farhan, Goretti, and <a className="underline" href="https://www.linkedin.com/in/khu22/">Kevin</a></p>
                    <p className="mt-6 text-lg leading-8 text-gray-600">Devs: Kevin, Chloe, Rishi, and Zachary</p>
                </div>
            </div>
        </div >
    );
}
