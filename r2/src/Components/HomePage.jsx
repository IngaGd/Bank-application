import Totals from './Totals';

function HomePage() {
    return (
        <>
            <div className="home-totals">
                <Totals />
            </div>
            <div class="container-home">
                <div class="square"></div>
                <div class="square"></div>
                <h1 class="title">Welcome to the Bank</h1>
            </div>
        </>
    );
}

export default HomePage;
