import Totals from './Totals';

function HomePage() {
    return (
        <>
            <div className="container-home">
                {/* <div className="home-totals">
                    <Totals />
                </div> */}
                <h1 className="title">
                    <span className="title-part1 animated">Welcome</span>{' '}
                    <span className="title-part2 animated">to the BANK</span>
                </h1>
                <p className="login-offer animated">
                    <div className="word-1 animated">
                        {' '}
                        <span className="span sp-1 animated">P</span>
                        <span className="span sp-2 animated">l</span>
                        <span className="span sp-3 animated">e</span>
                        <span className="span sp-4 animated">a</span>
                        <span className="span sp-5 animated">s</span>
                        <span className="span sp-6 animated">e</span>
                    </div>
                    <div className="word-2 animated">
                        <span className="span sp-7 animated">l</span>
                        <span className="span sp-8 animated">o</span>
                        <span className="span sp-9 animated">g</span>
                        <span className="span sp-10 animated">i</span>
                        <span className="span sp-11 animated">n</span>
                    </div>
                    <div className="word-3 animated">
                        {' '}
                        <span className="span sp-12 animated">o</span>
                        <span className="span sp-13 animated">r</span>
                    </div>
                    <div className="word-4 animated">
                        {' '}
                        <span className="span sp-14 animated">r</span>
                        <span className="span sp-15 animated">e</span>
                        <span className="span sp-16 animated">g</span>
                        <span className="span sp-17 animated">i</span>
                        <span className="span sp-18 animated">s</span>
                        <span className="span sp-19 animated">t</span>
                        <span className="span sp-20 animated">e</span>
                        <span className="span sp-21 animated">r</span>
                    </div>
                </p>
            </div>
        </>
    );
}

export default HomePage;
