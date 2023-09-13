'use client'

import React, { useState, Suspense } from 'react';
import { Tabs, Tab, Progress, Spinner } from '@nextui-org/react';
import Chart from 'react-apexcharts';
const Analytics = () => {
    const [timeRange, setTimeRange] = useState('1D');
    const generateMockData = (n) => {
        return Array.from({ length: n }, () => Math.floor(Math.random() * 100));
    };
    const generateSingleRandomNumber = () => Math.floor(Math.random() * 100) + 1;

    const dataByTimeRange = {
        '1D': {
            label: "Last 24 Hours",
            categories: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
            chartData: generateMockData(7),
            relativeStrength: { "agg": generateSingleRandomNumber(), "twitter": generateSingleRandomNumber(), "instagram": generateSingleRandomNumber(), "facebook": generateSingleRandomNumber(), "google": generateSingleRandomNumber() },
            socials: { twitter: { "enabled": true, value: generateSingleRandomNumber(), icon: "https://static-00.iconduck.com/assets.00/linkedin-icon-2048x2048-ya5g47j2.png" }, facebook: { "enabled": true, value: generateSingleRandomNumber(), icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/2021_Facebook_icon.svg/2048px-2021_Facebook_icon.svg.png" }, "instagram": { "enabled": true, value: generateSingleRandomNumber(), icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/1024px-Instagram_logo_2022.svg.png" }, "tiktok": { "isenabled": true, value: generateSingleRandomNumber(), icon: "https://cdn-icons-png.flaticon.com/512/124/124021.png" }, "linkedin": { "isenabled": false, icon: "https://cdn-icons-png.flaticon.com/512/124/124021.png" } }
        },
        '1W': {
            label: "past week",
            categories: ['MON', 'TUES', 'WED', 'THURS', 'FRI', 'SAT', 'SUN'],
            chartData: generateMockData(7),
            relativeStrength: { "agg": generateSingleRandomNumber(), "twitter": generateSingleRandomNumber(), "instagram": generateSingleRandomNumber(), "facebook": generateSingleRandomNumber(), "google": generateSingleRandomNumber() },
            socials: { twitter: { "enabled": true, value: generateSingleRandomNumber(), icon: "https://static-00.iconduck.com/assets.00/linkedin-icon-2048x2048-ya5g47j2.png" }, facebook: { "enabled": true, value: generateSingleRandomNumber(), icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/2021_Facebook_icon.svg/2048px-2021_Facebook_icon.svg.png" }, "instagram": { "enabled": true, value: generateSingleRandomNumber(), icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/1024px-Instagram_logo_2022.svg.png" }, "tiktok": { "isenabled": true, value: generateSingleRandomNumber(), icon: "https://cdn-icons-png.flaticon.com/512/124/124021.png" }, "linkedin": { "isenabled": false, icon: "https://cdn-icons-png.flaticon.com/512/124/124021.png" } }
        },
        '1M': {
            label: "Past month",
            categories: ['Week 1', 'Week 1.5', 'Week 2', 'Week 2.5', 'Week 3', 'Week 3.5', 'Week 4'],
            chartData: generateMockData(7),
            relativeStrength: { "agg": generateSingleRandomNumber(), "twitter": generateSingleRandomNumber(), "instagram": generateSingleRandomNumber(), "facebook": generateSingleRandomNumber(), "google": generateSingleRandomNumber() },
            socials: { twitter: { "enabled": true, value: generateSingleRandomNumber(), icon: "https://static-00.iconduck.com/assets.00/linkedin-icon-2048x2048-ya5g47j2.png" }, facebook: { "enabled": true, value: generateSingleRandomNumber(), icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/2021_Facebook_icon.svg/2048px-2021_Facebook_icon.svg.png" }, "instagram": { "enabled": true, value: generateSingleRandomNumber(), icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/1024px-Instagram_logo_2022.svg.png" }, "tiktok": { "isenabled": true, value: generateSingleRandomNumber(), icon: "https://cdn-icons-png.flaticon.com/512/124/124021.png" }, "linkedin": { "isenabled": false, icon: "https://cdn-icons-png.flaticon.com/512/124/124021.png" } }
        },
        '3M': {
            label: "Past 3 months",
            categories: ['Week 1', 'Week 3', 'Week 5', 'Week 7', 'Week 9', 'Week 11', 'Week 13'],
            chartData: generateMockData(7),
            relativeStrength: { "agg": generateSingleRandomNumber(), "twitter": generateSingleRandomNumber(), "instagram": generateSingleRandomNumber(), "facebook": generateSingleRandomNumber(), "google": generateSingleRandomNumber() },
            socials: { twitter: { "enabled": true, value: generateSingleRandomNumber(), icon: "https://static-00.iconduck.com/assets.00/linkedin-icon-2048x2048-ya5g47j2.png" }, facebook: { "enabled": true, value: generateSingleRandomNumber(), icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/2021_Facebook_icon.svg/2048px-2021_Facebook_icon.svg.png" }, "instagram": { "enabled": true, value: generateSingleRandomNumber(), icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/1024px-Instagram_logo_2022.svg.png" }, "tiktok": { "isenabled": true, value: generateSingleRandomNumber(), icon: "https://cdn-icons-png.flaticon.com/512/124/124021.png" }, "linkedin": { "isenabled": false, icon: "https://cdn-icons-png.flaticon.com/512/124/124021.png" } }
        },

        '6M': {
            label: "Past 6 months",
            categories: ['Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5', 'Month 6', 'Month 7'],
            chartData: generateMockData(7),
            relativeStrength: { "agg": generateSingleRandomNumber(), "twitter": generateSingleRandomNumber(), "instagram": generateSingleRandomNumber(), "facebook": generateSingleRandomNumber(), "google": generateSingleRandomNumber() },
            socials: { twitter: { "enabled": true, value: generateSingleRandomNumber(), icon: "https://static-00.iconduck.com/assets.00/linkedin-icon-2048x2048-ya5g47j2.png" }, facebook: { "enabled": true, value: generateSingleRandomNumber(), icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/2021_Facebook_icon.svg/2048px-2021_Facebook_icon.svg.png" }, "instagram": { "enabled": true, value: generateSingleRandomNumber(), icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/1024px-Instagram_logo_2022.svg.png" }, "tiktok": { "isenabled": true, value: generateSingleRandomNumber(), icon: "https://cdn-icons-png.flaticon.com/512/124/124021.png" }, "linkedin": { "isenabled": false, icon: "https://cdn-icons-png.flaticon.com/512/124/124021.png" } }
        },

        '1Y': {
            label: "Past year",
            categories: ["Month 1", "Month 2", 'Month 3', 'Month 4', 'Month 5', 'Month 6', 'Month 7', 'Month 8', 'Month 9', 'Month 10', 'Month 11', 'Month 12'],
            chartData: generateMockData(12),
            relativeStrength: { "agg": generateSingleRandomNumber(), "twitter": generateSingleRandomNumber(), "instagram": generateSingleRandomNumber(), "facebook": generateSingleRandomNumber(), "google": generateSingleRandomNumber() },
            socials: { twitter: { "enabled": true, value: generateSingleRandomNumber(), icon: "https://static-00.iconduck.com/assets.00/linkedin-icon-2048x2048-ya5g47j2.png" }, facebook: { "enabled": true, value: generateSingleRandomNumber(), icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/2021_Facebook_icon.svg/2048px-2021_Facebook_icon.svg.png" }, "instagram": { "enabled": true, value: generateSingleRandomNumber(), icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/1024px-Instagram_logo_2022.svg.png" }, "tiktok": { "isenabled": true, value: generateSingleRandomNumber(), icon: "https://cdn-icons-png.flaticon.com/512/124/124021.png" }, "linkedin": { "isenabled": false, icon: "https://cdn-icons-png.flaticon.com/512/124/124021.png" } }
        },

        '3Y': {
            label: "3 Years",
            categories: ["Month 1", "Month 2", 'Month 3', 'Month 4', 'Month 5', 'Month 6', 'Month 7', 'Month 8', 'Month 9', 'Month 10', 'Month 11', 'Month 12', "Month 13", "Month 14", 'Month 15', 'Month 16', 'Month 17', 'Month 18', 'Month 19', 'Month 20', 'Month 21', 'Month 22', 'Month 23', 'Month 24', "Month 25", "Month 26", 'Month 27', 'Month 28', 'Month 29', 'Month 30', 'Month 31', 'Month 32', 'Month 33', 'Month 34', 'Month 35', 'Month 36'],
            chartData: generateMockData(36),
            relativeStrength: { "agg": generateSingleRandomNumber(), "twitter": generateSingleRandomNumber(), "instagram": generateSingleRandomNumber(), "facebook": generateSingleRandomNumber(), "google": generateSingleRandomNumber() },
            socials: { twitter: { "enabled": true, value: generateSingleRandomNumber(), icon: "https://static-00.iconduck.com/assets.00/linkedin-icon-2048x2048-ya5g47j2.png" }, facebook: { "enabled": true, value: generateSingleRandomNumber(), icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/2021_Facebook_icon.svg/2048px-2021_Facebook_icon.svg.png" }, "instagram": { "enabled": true, value: generateSingleRandomNumber(), icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/1024px-Instagram_logo_2022.svg.png" }, "tiktok": { "isenabled": true, value: generateSingleRandomNumber(), icon: "https://cdn-icons-png.flaticon.com/512/124/124021.png" }, "linkedin": { "isenabled": false, icon: "https://cdn-icons-png.flaticon.com/512/124/124021.png" } }
        },

        'YTD': {
            label: "Year to date",
            categories: ["Month 1", "Month 2", 'Month 3', 'Month 4', 'Month 5', 'Month 6', 'Month 7', 'Month 8', 'Month 9', 'Month 10', 'Month 11', 'Month 12'],
            chartData: generateMockData(12),
            relativeStrength: { "agg": generateSingleRandomNumber(), "twitter": generateSingleRandomNumber(), "instagram": generateSingleRandomNumber(), "facebook": generateSingleRandomNumber(), "google": generateSingleRandomNumber() },
            socials: { twitter: { "enabled": true, value: generateSingleRandomNumber(), icon: "https://static-00.iconduck.com/assets.00/linkedin-icon-2048x2048-ya5g47j2.png" }, facebook: { "enabled": true, value: generateSingleRandomNumber(), icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/2021_Facebook_icon.svg/2048px-2021_Facebook_icon.svg.png" }, "instagram": { "enabled": true, value: generateSingleRandomNumber(), icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/1024px-Instagram_logo_2022.svg.png" }, "tiktok": { "isenabled": true, value: generateSingleRandomNumber(), icon: "https://cdn-icons-png.flaticon.com/512/124/124021.png" }, "linkedin": { "isenabled": false, icon: "https://cdn-icons-png.flaticon.com/512/124/124021.png" } }
        },

        'ALL': {
            label: "All Time",
            categories: ["Month 1", "Month 2", 'Month 3', 'Month 4', 'Month 5', 'Month 6', 'Month 7', 'Month 8', 'Month 9', 'Month 10', 'Month 11', 'Month 12', "Month 13", "Month 14", 'Month 15', 'Month 16', 'Month 17', 'Month 18', 'Month 19', 'Month 20', 'Month 21', 'Month 22', 'Month 23', 'Month 24', "Month 25", "Month 26", 'Month 27', 'Month 28', 'Month 29', 'Month 30', 'Month 31', 'Month 32', 'Month 33', 'Month 34', 'Month 35', 'Month 36'],
            chartData: generateMockData(36),
            relativeStrength: { "agg": generateSingleRandomNumber(), "twitter": generateSingleRandomNumber(), "instagram": generateSingleRandomNumber(), "facebook": generateSingleRandomNumber(), "google": generateSingleRandomNumber() },
            socials: { twitter: { "enabled": true, value: generateSingleRandomNumber(), icon: "https://static-00.iconduck.com/assets.00/linkedin-icon-2048x2048-ya5g47j2.png" }, facebook: { "enabled": true, value: generateSingleRandomNumber(), icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/2021_Facebook_icon.svg/2048px-2021_Facebook_icon.svg.png" }, "instagram": { "enabled": true, value: generateSingleRandomNumber(), icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/1024px-Instagram_logo_2022.svg.png" }, "tiktok": { "isenabled": true, value: generateSingleRandomNumber(), icon: "https://cdn-icons-png.flaticon.com/512/124/124021.png" }, "linkedin": { "isenabled": false, icon: "https://cdn-icons-png.flaticon.com/512/124/124021.png" } }
        },


    };

    const handleTimeRangeChange = (key) => {
        setTimeRange(key);
    };

    const chartOptions = {
        chart: { id: 'area' },
        xaxis: { categories: dataByTimeRange[timeRange]?.categories || [] },
    };

    const currentSocials = dataByTimeRange[timeRange]?.socials || {};
    const currentRelativeStrength = dataByTimeRange[timeRange]?.relativeStrength || {};



    return (
        <div className=" p-10">
            <h1 className="text-4xl mb-8">Relevance</h1>
            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-8 h-[70vh]">
                    <Suspense fallback={<Spinner />}>
                        <Chart
                            options={chartOptions}
                            series={[{ name: 'Series 1', data: dataByTimeRange[timeRange]?.chartData || [] }]}
                            type="area"
                            height="100%"
                            width="100%"
                        />
                    </Suspense>
                </div>
                <div className="col-span-4 h-[70vh] p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl mb-4">Relative Strength</h2>
                    {Object.keys(currentRelativeStrength).map((social) => (
                        <div className="my-2" key={social}>
                            <label>{social.toUpperCase()}</label>
                            <Progress value={currentRelativeStrength[social]} />
                        </div>
                    ))}
                </div>
                <div className="col-span-12 mt-8 w-full">
                    <Tabs
                        variant='bordered'
                        value={timeRange}
                        onSelectionChange={handleTimeRangeChange}
                        classNames={{
                            tabList: " w-full relative border-b border-divider",
                            cursor: "cursor-none",
                            tab: "border rounded-md hover:border-purple-custom group-data-[selected=true]:bg-purple-custom",
                            tabContent: "text-black group-data-[selected=true]:text-black"
                        }}
                    >
                        {Object.keys(dataByTimeRange).map((key) => (
                            <Tab key={key} title={key}></Tab>
                        ))}
                    </Tabs>
                </div>

                <div className="col-span-12 flex flex-nowrap overflow-auto overflow-x-scroll gap-6 p-1 mt-8">
                    {Object.keys(currentSocials).map((key) => (
                        currentSocials[key].enabled && (
                            <div className="icon flex-initial flex flex-col justify-center items-center shrink-0" key={key}>
                                <img src={currentSocials[key].icon} alt={`${key} icon`} className="w-12 h-12 mb-2" />
                                <h6 className="text-center text-sm">{currentSocials[key].label}</h6>
                                <h6 className="text-center text-sm">{`+${currentSocials[key].value}%`}</h6>
                            </div>
                        )
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Analytics;