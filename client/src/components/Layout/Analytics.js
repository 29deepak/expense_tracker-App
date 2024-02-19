import React from 'react'
import { Progress } from 'antd';
const Analytics = ({ allTransactions }) => {


    const categories = ["salary", "tip", "project", "food", "movie", "bills", "gym", "medical", "tax", "fees"]

    const totalTransaction = allTransactions.length;
    const totalIncomeTransactions = allTransactions.filter(transaction => transaction.type === "income")
    const totalExpenseTransactions = allTransactions.filter(transaction => transaction.type === "expense")
    const totalIncomePercent = (totalIncomeTransactions.length / totalTransaction) * 100
    const totalExpensePercent = (totalExpenseTransactions.length / totalTransaction) * 100

    // total turn over

    const totalTurnOver = allTransactions.reduce((acc, transaction) => acc + Number(transaction.amount), 0)
    const totalIncomeTurnOver = totalIncomeTransactions.reduce((acc, transaction) => acc + Number(transaction.amount), 0)
    const totalExpenseTurnOver = totalExpenseTransactions.reduce((acc, transaction) => acc + Number(transaction.amount), 0)
    //percome turn over
    const totalIncomeTurnOverPercent = (totalIncomeTurnOver / totalTurnOver) * 100
    const totalExpenseTurnOverPercent = (totalExpenseTurnOver / totalTurnOver) * 100

    return (
        <>
            {console.log(totalTurnOver)}
            <div className='row'>
                <div className='col-md-4'>
                    <div className='card'>
                        <div className='card-header'>
                            Total Transactions:{totalTransaction}
                        </div>
                        <div className='card-body'>
                            <h5 className='text-success'>Income :{totalIncomeTransactions.length}</h5>
                            <h5 className='text-danger'>Expense:{totalExpenseTransactions.length}</h5>
                            <div>
                                <Progress type="circle" strokeColor={'green'} className='mx-2' percent={totalIncomePercent.toFixed(0)} />
                                <Progress type="circle" strokeColor={'red'} className='mx-2' percent={totalExpensePercent.toFixed(0)} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-md-4'>
                    <div className='card'>
                        <div className='card-header'>
                            Total TurnOver:{totalTurnOver}
                        </div>
                        <div className='card-body'>
                            <h5 className='text-success'>Income :{totalIncomeTurnOver}</h5>
                            <h5 className='text-danger'>Expense:{totalExpenseTurnOver}</h5>
                            <div>
                                <Progress type="circle" strokeColor={'green'} className='mx-2' percent={totalIncomeTurnOverPercent.toFixed(0)} />
                                <Progress type="circle" strokeColor={'red'} className='mx-2' percent={totalExpenseTurnOverPercent.toFixed(0)} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row mt-3'>
                <div className='col-md-5'>
                    <h4>CategoryWise Income</h4>
                    {
                        categories.map((category) => {
                            const amount = allTransactions.filter(transaction => transaction.type === "income" && transaction.category === category).reduce((acc, transaction) => acc + Number(transaction.amount), 0)
                            return (
                                amount > 0 &&
                                <div className='card'>
                                    <div className='card-body'>
                                        <h5>{category}</h5>
                                        <h4>{amount}</h4>
                                        <Progress percent={((amount / totalIncomeTurnOver) * 100).toFixed(0)} />
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className='col-md-5'>
                    <h4>CategoryWise Expense</h4>
                    {
                        categories.map((category) => {
                            const amount = allTransactions.filter(transaction => transaction.type === "expense" && transaction.category === category).reduce((acc, transaction) => acc + Number(transaction.amount), 0)
                            return (
                                amount > 0 &&
                                <div className='card'>
                                    <div className='card-body'>
                                        <h5>{category}</h5>
                                        <Progress percent={((amount / totalExpenseTurnOver) * 100).toFixed(0)} />
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Analytics