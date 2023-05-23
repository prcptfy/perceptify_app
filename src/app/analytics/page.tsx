"use client"

import { Suspense } from 'react';
import Graph from '../dashboard/Graph';

import './analytics.css'
// import ApexCharts from 'apexcharts'

import dynamic from 'next/dynamic'
// import Chart from "react-apexcharts";
const Chart = dynamic(() => import("react-apexcharts"), {
    ssr: false,
    loading: () => <div>Loading</div>// Replace <Loading /> with your custom loading component
  });


// const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const Analytics = () => {
    const chart = {
        options: {
            chart: {
                id: "area",
            },
            xaxis: {
                categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
            },
            fill: {
                gradient: {
                    enabled: true,
                    opacityFrom: .8,
                    opacityTo: 0
                }
            },
          
        },
        series: [
          {
            // type: 'area',
            name: "series-1",
            data: [30, 40, 45, 50, 49, 60, 70, 91],
          }
        ],
        stroke: {
            curve: 'smooth'
        },
    };
    
    return (
        <div className='analytics'>
            <div className='relavance'>
                <div className='top'>
                    <h1 className='header'>Relevance</h1>
                    <select className='text-center' defaultValue={"month"}>
                        <option value="all">All</option>
                        <option value="year">Yearly</option>
                        <option value="quartly">Quartly</option>
                        <option value="month">Monthly</option>
                    </select>
                    <button>Download</button>
                </div>
                <div className='rest grid grid-cols-12 gap-5 p-10'>
                    <div className='col-span-8'>
                        
                        <Suspense fallback={<div>Loading...</div>}>
                            <Chart
                                options={chart.options}
                                series={chart.series}
                                type="area"
                                width={'100%'}
                                
                            />
                        </Suspense>
                    </div>
                    <div className='information col-span-4'>
                        <div className='side-pannel grid gap-1'>
                            <div className='header p-2 grid grid-cols-12'>
                                <h3 className='col-span-11'>Relative Strength</h3>
                                <h3 className='col-span-1'>X</h3>
                            </div>
                            <div className='caption p-2'>
                                <p className='caption'>
                                    Platform strength compared to historical performance.
                                </p>
                            </div>
                            <div className='aggregate p-2'>
                                <h6 className=''>Aggregate</h6>
                                <progress max="100" value="80"></progress>
                            </div>
                            <div className='stats grid grid-cols-1 gap-4'>
                                <div className='grid grid-cols-12 twitter'>
                                    <h6 className='col-span-11'>Twitter</h6>
                                    <h6 className='col-span-1'>62</h6>
                                    <progress className='col-span-12 ' max="100" value="80"></progress>
                                </div>
                                <div className='grid grid-cols-12 facebook'>
                                    <h6 className='col-span-11'>Facebook</h6>
                                    <h6 className='col-span-1'>62</h6>
                                    <progress className='col-span-12' max="100" value="80"></progress>
                                </div>
                                <div className='grid grid-cols-12 instagram'>
                                    <h6 className='col-span-11'>Instagram</h6>
                                    <h6 className='col-span-1'>62</h6>
                                    <progress className='col-span-12' max="100" value="80"></progress>
                                </div>
                                <div className='grid grid-cols-12 linkedin'>
                                    <h6 className='col-span-11'>LinkedIn</h6>
                                    <h6 className='col-span-1'>62</h6>
                                    <progress className='col-span-12' max="100" value="80"></progress>
                                </div>
                            </div>

                        </div>
                        <div>

                        </div>
                    </div>
                    <div className='col-span-12 icons grid grid-cols-12 gap-4'>
                        {/* <h1>Icons will be here</h1> */}
                        <div className='icon grid col-span-2 gap-1'>
                            <img className='col-span-12' src="https://static-00.iconduck.com/assets.00/linkedin-icon-2048x2048-ya5g47j2.png"/>
                            <h3 className='col-span-12'>This Month</h3>
                            <h6 className='col-span-12'>+8%</h6>
                        </div>
                        <div className='grid icon col-span-2 gap-1 grid-cols-12'>
                            <img className='grid-flow-col-dense  col-span-12' src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/1024px-Instagram_logo_2022.svg.png"/>
                            <h3 className='col-span-12'>This Month</h3>
                            <h6 className='col-span-12'>+8%</h6>
                        </div>
                        <div className='grid icon col-span-2 gap-1 grid-cols-12'>
                            <img className=' col-span-12' src="https://cdn-icons-png.flaticon.com/512/124/124021.png"/>
                            <h3 className='col-span-12'>This Month</h3>
                            <h6 className='col-span-12'>+8%</h6>
                        </div>
                        <div className='grid icon col-span-2 gap-1 grid-cols-12'>
                            <img className=' col-span-12' src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/2021_Facebook_icon.svg/2048px-2021_Facebook_icon.svg.png"/>
                            <h3 className='col-span-12'>This Month</h3>
                            <h6 className='col-span-12'>+8%</h6>
                        </div>
                    </div>
                </div>
            </div>
            <div className='sentiment'>
                <div className='top'>
                    <h1 className='header'>Sentiment</h1>
                    <select className='text-center' defaultValue={"month"}>
                        <option value="all">All</option>
                        <option value="year">Yearly</option>
                        <option value="quartly">Quartly</option>
                        <option value="month">Monthly</option>
                    </select>
                    <button>Download</button>
                </div>
                <div className='rest grid grid-cols-12 gap-4 p-10'>
                    <div className='col-span-9'>
                    {/* {(typeof window !== 'undefined') &&
                        <Chart
                            options={chart.options}
                            series={chart.series}
                            type="line"
                            width={'100%'}
                        />
                    } */}
                    </div>
                    <div className='col-span-3'>
                        <h3></h3>
                    </div>
                    <div className='col-span-12'>
                        <h1>Icons will be here</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Analytics;