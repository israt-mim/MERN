import React from 'react'
import TopProductsChart from '../components/TopTenProducts'
import YearlyProfitGraph from '../components/YarlyProfitGraph'
import SalesProfitForm from '../components/SalesProfitForm'
import RecentOrders from '../components/RecentOrders'

const AdminOverview = () => {
    return (
        <div className='bg-white rounded border p-4'>
            <div className="w-full">
                <h1 className="text-2xl font-bold text-gray-800">Overview</h1>
                <hr className='mb-4 mt-1' />

                <section className="mb-10">
                    <h2 className="text-xl mb-2">Sales and Profit Report</h2>
                    <SalesProfitForm />
                </section>

                <section className="mb-10">
                    <h2 className="text-xl mb-2">Top 10 Products of Last Month</h2>
                    <TopProductsChart />
                </section>

                <section className="mb-8">
                    <h2 className="text-xl mb-2">Recent Orders</h2>
                    <RecentOrders />
                </section>
            </div>
        </div>
    )
}

export default AdminOverview