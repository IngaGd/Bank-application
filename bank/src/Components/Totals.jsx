import { useContext } from 'react';
import { GlobalContext } from './GlobalContext';
import { defaults } from 'chart.js/auto';
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
            color: '#f2fe8d',
        },
        {
            label: 'Accounts with images',
            value: numWithImages,
            color: '#a99db6',
        },
        {
            label: 'Accounts without image',
            value: numWithDefaultImage,
            color: '#b2d0ce',
        },
        {
            label: 'Accounts with 0 balance',
            value: numWithZeroBalance,
            color: '#ff6b6b',
        },
        {
            label: 'Accounts with positive balance',
            value: numWithPositiveBalance,
            color: '#98ddca',
        },
        {
            label: 'Accounts with negative balance',
            value: numWithNegativeBalance,
            color: '#d6a2e8',
        },
    ];

    // console.log(
    //     'Chart data values:',
    //     chartData.map((data) => data.value)
    // );

    return (
        <div className="totals">
            <div className="totals__chart" style={{ width: '30rem' }}>
                <Doughnut
                    data={{
                        labels: chartData.map((data) => data.label),
                        datasets: [
                            {
                                label: 'Count',
                                data: chartData.map((data) => data.value),
                                backgroundColor: chartData.map(
                                    (data) => data.color
                                ),
                                borderColor: 'none',
                            },
                        ],
                    }}
                    options={{
                        plugins: {
                            legend: {
                                display: false,
                            },
                        },
                    }}
                />
            </div>
            <div className="totals__content">
                <div className="totals-data">
                    {' '}
                    <p className="chart-legend__text">
                        {' '}
                        Total balances in currency:
                    </p>
                    <div className="chart-legend__totals">{totalBalances}</div>
                </div>
                <div className="totals-data">
                    <p className="chart-legend__text"> Number of accounts:</p>
                    <div className="chart-legend__totals">{numAccounts}</div>
                    <div className="chart-legend__color--1">\</div>
                </div>
                <div className="totals-data">
                    {' '}
                    <p className="chart-legend__text">
                        Number of accounts with uploaded images:
                    </p>
                    <div className="chart-legend__totals">{numWithImages}</div>
                    <div className="chart-legend__color--2"></div>
                </div>
                <div className="totals-data">
                    <p className="chart-legend__text">
                        Number of accounts with default image:
                    </p>
                    <div className="chart-legend__totals">
                        {numWithDefaultImage}
                    </div>
                    <div className="chart-legend__color--3"></div>
                </div>
                <div className="totals-data">
                    {' '}
                    <p className="chart-legend__text">
                        Number of accounts with zero balance:
                    </p>
                    <div className="chart-legend__totals">
                        {numWithZeroBalance}
                    </div>
                    <div className="chart-legend__color--4"></div>
                </div>
                <div className="totals-data">
                    {' '}
                    <p className="chart-legend__text">
                        Number of accounts with positive balance:
                    </p>
                    <div className="chart-legend__totals">
                        {numWithPositiveBalance}
                    </div>
                    <div className="chart-legend__color--5"></div>
                </div>
                <div className="totals-data">
                    {' '}
                    <p className="chart-legend__text">
                        Number of accounts with negative balance:
                    </p>
                    <div className="chart-legend__totals">
                        {numWithNegativeBalance}
                    </div>
                    <div className="chart-legend__color--6"></div>
                </div>
            </div>
        </div>
    );
}

export default Totals;
