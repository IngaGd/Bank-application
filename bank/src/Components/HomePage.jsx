import Totals from './Totals';

function HomePage() {
    return (
        <>

            <div className="container-home">
                <div className="home-totals">
                    <Totals />
                </div>
                <h1 className="title">Welcome to the Multidimensional <br/> BANK</h1>
            </div>
        </>
    );
}

export default HomePage;
