'use client'

import React, { useState, useEffect, Suspense } from 'react';
import { Tabs, Tab, Progress, Spinner, toggle } from '@nextui-org/react';
import Chart from 'react-apexcharts';

import { useSupabase } from '@/components/supabase-provider';

const baseSocials = { twitter: { "enabled": false, value: 0, icon: "https://static-00.iconduck.com/assets.00/linkedin-icon-2048x2048-ya5g47j2.png" }, facebook: { "enabled": false, value: 0, icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/2021_Facebook_icon.svg/2048px-2021_Facebook_icon.svg.png" }, instagram: { "enabled": false, value: 0, icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/1024px-Instagram_logo_2022.svg.png" }, tiktok: { "enabled": false, value: 0, icon: "https://cdn-icons-png.flaticon.com/512/124/124021.png" }, linkedin: { "enabled": false, value: 0, icon: "https://cdn-icons-png.flaticon.com/512/124/124021.png" } }

const Analytics = () => {
    const [timeRange, setTimeRange] = useState('1D');

    const [dataByTimeRange, setDataByTimeRange] = useState({});

    const handleTimeRangeChange = (key: string) => {
        setTimeRange(key);
    };

    const chartOptions = {
        chart: { id: 'area' },
        xaxis: { categories: dataByTimeRange[timeRange]?.categories || [] },
    };

    const currentSocials = dataByTimeRange[timeRange]?.socials || {};
    const currentRelativeStrength = dataByTimeRange[timeRange]?.relativeStrength || {};



    const [firstLoad, setFirstLoad] = useState(true);
    const [error, setError] = useState<string>();
    const [loading, setLoading] = useState(true);
    
    const { supabase } = useSupabase();

    useEffect(() => {
        if (!firstLoad) return;
        setFirstLoad(false);

        const fetchData = async () => {
            try {
                const data = await supabase.from("data").select().filter("company_id", "in", `(${1 /* GET COMPANY ID */})`);
                if (!data["data"]) throw new Error("No company data");

                const ranges = {
                    '1D': {
                        start: new Date().setHours(0, 0, 0, 0),
                        label: "Last 24 hours",
                        categories: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
                        chartData: [],
                        relativeStrengths: {},
                        socials: { ...baseSocials }
                    },
                    '1W': {
                        start: Date.now() - 6.048e8,
                        label: "Past week",
                        categories: ['MON', 'TUES', 'WED', 'THURS', 'FRI', 'SAT', 'SUN'],
                        chartData: [],
                        relativeStrengths: {},
                        socials: { ...baseSocials }
                    },
                    '1M': {
                        start: Date.now() - 2.628e9,
                        label: "Past month",
                        categories: ['Week 1', 'Week 1.5', 'Week 2', 'Week 2.5', 'Week 3', 'Week 3.5', 'Week 4'],
                        chartData: [],
                        relativeStrengths: {},
                        socials: { ...baseSocials }
                    },
                    '3M': {
                        start: Date.now() - 7.884e9,
                        label: "Past 3 months",
                        categories: ['Week 1', 'Week 3', 'Week 5', 'Week 7', 'Week 9', 'Week 11', 'Week 13'],
                        chartData: [],
                        relativeStrengths: {},
                        socials: { ...baseSocials }
                    },
                    '6M': {
                        start: Date.now() - 1.577e10,
                        label: "Past 6 months",
                        categories: ['Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5', 'Month 6', 'Month 7'],
                        chartData: [],
                        relativeStrengths: {},
                        socials: { ...baseSocials }
                    },
                    '1Y': {
                        start: Date.now() - 3.154e10,
                        label: "Past year",
                        categories: ["Month 1", "Month 2", 'Month 3', 'Month 4', 'Month 5', 'Month 6', 'Month 7', 'Month 8', 'Month 9', 'Month 10', 'Month 11', 'Month 12'],
                        chartData: [],
                        relativeStrengths: {},
                        socials: { ...baseSocials }
                    },
                    '3Y': {
                        start: Date.now() - 9.461e+10,
                        label: "Past 3 years",
                        categories: ["Month 1", "Month 2", 'Month 3', 'Month 4', 'Month 5', 'Month 6', 'Month 7', 'Month 8', 'Month 9', 'Month 10', 'Month 11', 'Month 12', "Month 13", "Month 14", 'Month 15', 'Month 16', 'Month 17', 'Month 18', 'Month 19', 'Month 20', 'Month 21', 'Month 22', 'Month 23', 'Month 24', "Month 25", "Month 26", 'Month 27', 'Month 28', 'Month 29', 'Month 30', 'Month 31', 'Month 32', 'Month 33', 'Month 34', 'Month 35', 'Month 36'],
                        chartData: [],
                        relativeStrengths: {},
                        socials: { ...baseSocials }
                    },
                    'YTD': {
                        start: new Date(new Date().setMonth(0, 1)).setHours(0, 0, 0, 0),
                        label: "Year to date",
                        categories: [],
                        chartData: [],
                        relativeStrengths: {},
                        socials: { ...baseSocials }
                    },
                    'ALL': {
                        start: 0,
                        label: "All Time",
                        categories: [],
                        chartData: [],
                        relativeStrengths: {},
                        socials: { ...baseSocials }
                    }
                }

                interface chartDataValue {
                    value: number,
                    period: number
                } 

                data.data.forEach(d => {
                    const social = Object.keys(baseSocials)[d["media_id"]];
                    
                    const t = d.timestamp.split(" ");
                    const date = new Date(t[0]).setDate(t[1]);

                    const validRanges = Object.keys(ranges).filter(r => date > ranges[r].start && date < Date.now());

                    validRanges.forEach(r => {
                        const range = ranges[r];

                        const period = Math.floor((date - range.start) / ((Date.now() - range.start) / range.categories.length));

                        const chart = range.chartData;
                        const existingData = chart.filter((v: chartDataValue) => v.period === period);

                        range.socials[social].enabled = true;
                        // TODO: Do relative strength calculations
                        if (existingData.length > 0) existingData[0].value += parseInt(d["mention_count"]);
                        else chart.push({ value: parseInt(d["mention_count"]), period: period });
                    })
                })

                const padArray = (arr: [], length: number, fill: string | number) => length > arr.length ? arr.concat(Array(length - arr.length).fill(fill)) : arr;

                Object.keys(ranges).forEach(k => ranges[k].chartData = padArray(ranges[k].chartData.map((v: chartDataValue) => v.value), ranges[k].categories.length, 0));
                console.log(ranges);

                setDataByTimeRange(ranges);
                setLoading(false);
            } catch(err) {
                console.error("Could not fetch data: " + err);
                setError(err as string);
            }

            setLoading(false);
        }

        fetchData();
    }, []);


    return (
        <div className=" p-10">
            <h1 className="text-4xl mb-8">Relevance</h1>
            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-8 h-max min-h-[50vh]">
                    <Suspense fallback={<Spinner />}>
                        <Chart
                            options={chartOptions}
                            series={[{ name: 'Series 1', data: dataByTimeRange[timeRange]?.chartData || [] }]}
                            type="area"
                            height="100%"
                            width="100%"
                        />

                        <Tabs
                            variant='bordered'
                            value={timeRange}
                            onSelectionChange={handleTimeRangeChange}
                            classNames={{
                                tabList: "w-full relative overflow-x-auto shadow-none",
                                cursor: "cursor-auto",
                                tab: "rounded-md text-black",
                            }}
                        >
                            {Object.keys(dataByTimeRange).map((key) => (
                                <Tab key={key} title={key}></Tab>
                            ))}
                        </Tabs>
                    </Suspense>
                </div>
                <div className="col-span-4 p-6 rounded-lg shadow-lg h-full">
                    <h2 className="mb-4">Relative Strength</h2>
                    {timeRange !== "ALL" && Object.keys(currentRelativeStrength).map((social) => (
                        <div className="my-4 text-sm" key={social}>
                            <Progress label={social.toUpperCase()} value={currentRelativeStrength[social]} showValueLabel={true} />
                        </div>
                    )) || <h4 className="text-sm">N/A</h4>}
                </div>

                <div className="col-span-12 flex flex-nowrap overflow-auto overflow-x-auto gap-6 p-1 mt-8">
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