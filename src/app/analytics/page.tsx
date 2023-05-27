"use client"

import { Suspense } from 'react';
import Graph from '../dashboard/Graph';

import './analytics.css'
// import ApexCharts from 'apexcharts'
import DownloadIcon from '@/components/icons/downloadIcon';

import dynamic from 'next/dynamic'
import SidePanel from '@/components/sidepanel';
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
                categories: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023]
            },
            fill: {
                gradient: {
                    enabled: true,
                    opacityFrom: .5,
                    opacityTo: .5
                }
            },
          
        },
        series: [{
            name: 'Twitter',
            data: [31, 40, 28, 51, 42, 109, 100]
          }, {
            name: 'TikTok',
            data: [11, 32, 45, 32, 34, 52, 41]
        }, {
            name: 'LinkedIn',
            data: [20, 36, 60, 80, 60, 45, 90]
          },
        ],
        stroke: {
            curve: 'smooth'
        },
    };

    const socials = [
        {
            name: 'Twitter',
            color: '#1DA1F2',
            value: 62,
        },
        {
            name: 'Facebook',
            color: '#4267B2',
            value: 37,
        },
        {
            name: 'Instagram',
            color: '#E1306C',
            value: 44,
        },
        {
            name: 'Linkedin',
            color: '#2867B2',
            value: 50,
        },
    ]
    
    return (
        <div className='analytics'>
            <div className='relavance'>
                <div className='flex '>
                    <h1 className='text-3xl basis-9/12 font-bold flex-start'>Relevance</h1>
                    <select className='text-center basis-2/12' defaultValue={"month"}>
                        <option value="all">All</option>
                        <option value="year">Yearly</option>
                        <option value="quartly">Quartly</option>
                        <option value="month">Monthly</option>
                    </select>
                    <button className='ml-1 basis-1/12'>
                        <DownloadIcon stroke="#e855e8" size="20px"/>
                    </button>
                </div>
                <div className='rest grid grid-cols-12 gap-5'>
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
                        <SidePanel
                            title="Panel Title"
                            icon="X"
                            tooltip="Panel Tooltip"
                            caption="Lorem ipsum dolor sit amet, consectetur adipiscing elit, "
                            aggVal={62}
                            socials={socials}
                        />
                    </div>
                    <div className='col-span-12 icons flex flex-nowrap overflow-auto overflow-x-scroll gap-6 p-1'>
                        {/* <h1>Icons will be here</h1> */}
                        <div className='icon flex-initial flex flex-col shrink-0'>
                            <img className='' src="https://static-00.iconduck.com/assets.00/linkedin-icon-2048x2048-ya5g47j2.png"/>
                            <h6 className='text-center text-sm'>This Month</h6>
                            <h6 className='text-center text-sm'>+8%</h6>
                        </div>
                        <div className='icon flex-initial flex flex-col shrink-0'>
                            <img className='' src="https://static-00.iconduck.com/assets.00/linkedin-icon-2048x2048-ya5g47j2.png"/>
                            <h6 className='text-center text-sm'>This Month</h6>
                            <h6 className='text-center text-sm'>+8%</h6>
                        </div>
                        <div className='icon flex-initial flex flex-col shrink-0'>
                            <img className='' src="https://static-00.iconduck.com/assets.00/linkedin-icon-2048x2048-ya5g47j2.png"/>
                            <h6 className='text-center text-sm'>This Month</h6>
                            <h6 className='text-center text-sm'>+8%</h6>
                        </div>
                        <div className='icon flex-initial flex flex-col shrink-0'>
                            <img className='grid-flow-col-dense  col-span-12' src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/1024px-Instagram_logo_2022.svg.png"/>
                            <h6 className='text-center text-sm'>This Month</h6>
                            <h6 className='text-center text-sm'>+8%</h6>
                        </div>
                        <div className='icon flex-initial flex flex-col shrink-0'>
                            <img className=' col-span-12' src="https://cdn-icons-png.flaticon.com/512/124/124021.png"/>
                            <h6 className='text-center text-sm'>This Month</h6>
                            <h6 className='text-center text-sm'>+8%</h6>
                        </div>
                        <div className='icon flex-initial flex flex-col shrink-0'>
                            <img className=' col-span-12' src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/2021_Facebook_icon.svg/2048px-2021_Facebook_icon.svg.png"/>
                            <h6 className='text-center text-sm'>This Month</h6>
                            <h6 className='text-center text-sm'>+8%</h6>
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
                <div className='rest grid grid-cols-12 gap-4'>
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

                        <SidePanel
                            title="Panel Title"
                            icon="X"
                            tooltip="Panel Tooltip"
                            caption="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pellentesque habitant morbi tristique senectus et netus et."
                            aggVal={62}
                            socials={socials}
                        />
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