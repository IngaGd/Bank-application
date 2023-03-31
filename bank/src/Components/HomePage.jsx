import Totals from './Totals';

function HomePage() {
    return (
        <>
            <div className="home-totals">
                <Totals />
            </div>
            <div className="container-home">
                <div className="square"></div>
                <div className="square"></div>
                <h1 className="title">Welcome to the Bank</h1>
            </div>
        </>
    );
}

export default HomePage;
