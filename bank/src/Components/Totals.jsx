import { useContext } from 'react';
import { GlobalContext } from './GlobalContext';
import { Chart as ChartJS, defaults } from 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';

//defaults.maintainAspectRatio = false;
defaults.responsive = true;
defaults.backgroundColor = '#1f1f1f';
defaults.borderColor = '#1f1f1f';
defaults.color = '#e9e9e9';
defaults.scaleLineColor = 'rgba(0,0,0,0)';

function Totals() {
    const {
        totalBalances,
        numAccounts,
        numWithImages,
        numWithDefaultImage,
        numWithZeroBalance,
        numWithPositiveBalance,
        numWithNegativeBalance,
    } = useContext(GlobalContext);

    const chartData = [
        {
            label: 'Total accounts',
            value: numAccounts,
        },
        {
            label: 'Accounts with images',
            value: numWithImages,
        },
        {
            label: 'Accounts without image',
            value: numWithDefaultImage,
        },
        {
            label: 'Accounts with 0 balance',
            value: numWithZeroBalance,
        },
        {
            label: 'Accounts with positive balance',
            value: numWithPositiveBalance,
        },
        {
            label: 'Accounts with negative balance',
            value: numWithNegativeBalance,
        },
    ];

    console.log(
        'Chart data values:',
        chartData.map((data) => data.value)
    );

    return (
        <div className="totals">
            <div className="totals__chart">
                <Doughnut
                    data={{
                        labels: chartData.map((data) => data.label),
                        datasets: [
                            {
                                label: 'Count',
                                data: chartData.map((data) => data.value),
                                backgroundColor: [
                                    'yellow',
                                    'green',
                                    'crimson',
                                    'blue',
                                    'pink',
                                    'orange',
                                    'violet',
                                ],
                                borderColor: 'rgb(31, 31, 31)',
                            },
                        ],
                        // options={{
                        //     layout: {
                        //         padding: 20,
                        //     },
                        // }}
                    }}
                    // options={{
                    //     layout: {
                    //         padding: 20,
                    //     },
                    // }}
                />
            </div>
            {/* <div className="totals__content">
                Total balances: <span>{totalBalances}</span>
                <br />
                Number of accounts: <span>{numAccounts}</span>
                <br />
                Number of accounts with uploaded images:{' '}
                <span>{numWithImages}</span>
                <br />
                Number of accounts with default image:{' '}
                <span>{numWithDefaultImage}</span>
                <br />
                Number of accounts with zero balance:{' '}
                <span>{numWithZeroBalance}</span> <br />
                Number of accounts with positive balance:{' '}
                <span>{numWithPositiveBalance}</span>
                <br />
                Number of accounts with negative balance:{' '}
                <span>{numWithNegativeBalance}</span>
                <br />
            </div> */}
        </div>
    );
}

export default Totals;
