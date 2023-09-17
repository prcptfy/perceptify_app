'use client'

import React, { useState, useEffect, Suspense } from 'react';
import { Tabs, Tab, Progress, Spinner, toggle } from '@nextui-org/react';
import Chart from 'react-apexcharts';
import FacebookIcon from '@/components/icons/FacebookIcon';
import InstagramIcon from '@/components/icons/InstagramIcon';
import LinkedInIcon from '@/components/icons/LinkedInIcon';
import TikTokIcon from '@/components/icons/TikTokIcon';
import TwitterIcon from '@/components/icons/TwitterIcon';
import { useSupabase } from '@/components/supabase-provider';


const Analytics = () => {
    const socials = {
        Twitter: { enabled: false, colorIcon: TwitterIcon, toggled: true, chartData: [] },
        Facebook: { enabled: false, colorIcon: FacebookIcon, toggled: true, chartData: [] },
        Instagram: { enabled: false, colorIcon: InstagramIcon, toggled: true, chartData: [] },
        Linkedin: { enabled: false, colorIcon: LinkedInIcon, toggled: true, chartData: [] },
        TikTok: { enabled: false, colorIcon: TikTokIcon, toggled: true, chartData: [] },
    };
    
    const [timeRange, setTimeRange] = useState('1D');
    const [dataByTimeRange, setDataByTimeRange] = useState({});
    const [currentSocials, setCurrentSocials] = useState({});

    const handleTimeRangeChange = (key: string) => {
        setTimeRange(key);
        setCurrentSocials(dataByTimeRange[key]?.socials || {});
    };

    const handleSocialChange = (key: string) => {
        const social = currentSocials[key];
        setCurrentSocials({ 
          ...currentSocials, 
          [key]: { 
            ...social, 
            toggled: !social.toggled,
          } 
        });
      }
    const chartOptions = {
        chart: { id: 'area' },
        xaxis: { categories: dataByTimeRange[timeRange]?.categories || [] },
    };

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
                        relativeStrengths: {},
                        socials: { ...socials }
                    },
                    '1W': {
                        start: Date.now() - 6.048e8,
                        label: "Past week",
                        categories: ['MON', 'TUES', 'WED', 'THURS', 'FRI', 'SAT', 'SUN'],
                        relativeStrengths: {},
                        socials: { ...socials }
                    },
                    '1M': {
                        start: Date.now() - 2.628e9,
                        label: "Past month",
                        categories: ['Week 1', 'Week 1.5', 'Week 2', 'Week 2.5', 'Week 3', 'Week 3.5', 'Week 4'],
                        relativeStrengths: {},
                        socials: { ...socials }
                    },
                    '3M': {
                        start: Date.now() - 7.884e9,
                        label: "Past 3 months",
                        categories: ['Week 1', 'Week 3', 'Week 5', 'Week 7', 'Week 9', 'Week 11', 'Week 13'],
                        relativeStrengths: {},
                        socials: { ...socials }
                    },
                    '6M': {
                        start: Date.now() - 1.577e10,
                        label: "Past 6 months",
                        categories: ['Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5', 'Month 6', 'Month 7'],
                        relativeStrengths: {},
                        socials: { ...socials }
                    },
                    '1Y': {
                        start: Date.now() - 3.154e10,
                        label: "Past year",
                        categories: ["Month 1", "Month 2", 'Month 3', 'Month 4', 'Month 5', 'Month 6', 'Month 7', 'Month 8', 'Month 9', 'Month 10', 'Month 11', 'Month 12'],
                        relativeStrengths: {},
                        socials: { ...socials }
                    },
                    '3Y': {
                        start: Date.now() - 9.461e+10,
                        label: "Past 3 years",
                        categories: ["Month 1", "Month 2", 'Month 3', 'Month 4', 'Month 5', 'Month 6', 'Month 7', 'Month 8', 'Month 9', 'Month 10', 'Month 11', 'Month 12', "Month 13", "Month 14", 'Month 15', 'Month 16', 'Month 17', 'Month 18', 'Month 19', 'Month 20', 'Month 21', 'Month 22', 'Month 23', 'Month 24', "Month 25", "Month 26", 'Month 27', 'Month 28', 'Month 29', 'Month 30', 'Month 31', 'Month 32', 'Month 33', 'Month 34', 'Month 35', 'Month 36'],
                        relativeStrengths: {},
                        socials: { ...socials }
                    },
                    'YTD': {
                        start: new Date(new Date().setMonth(0, 1)).setHours(0, 0, 0, 0),
                        label: "Year to date",
                        categories: [],
                        relativeStrengths: {},
                        socials: { ...socials }
                    },
                    'ALL': {
                        start: 0,
                        label: "All Time",
                        categories: [],
                        relativeStrengths: {},
                        socials: { ...socials }
                    }
                }

                interface chartDataValue {
                    value: number,
                    period: number
                } 

                data.data.forEach(d => {
                    const social = Object.keys(socials)[d["media_id"]];
                    
                    const t = d.timestamp.split(" ");
                    const date = new Date(t[0]).setDate(t[1]);

                    const validRanges = Object.keys(ranges).filter(r => date > ranges[r].start && date < Date.now());

                    validRanges.forEach(r => {
                        const range = ranges[r];

                        const period = Math.floor((date - range.start) / ((Date.now() - range.start) / range.categories.length));

                        const chart = range.socials[social].chartData;
                        const existingData = chart.filter((v: chartDataValue) => v.period === period);

                        range.socials[social].enabled = true;
                        // TODO: Do relative strength calculations
                        if (existingData.length > 0) existingData[0].value += parseInt(d["mention_count"]);
                        else chart.push({ value: parseInt(d["mention_count"]), period: period });
                    })
                })

                const padArray = (arr: [], length: number, fill: string | number) => length > arr.length ? arr.concat(Array(length - arr.length).fill(fill)) : arr;

                Object.keys(ranges).forEach(r => {
                    const range = ranges[r];
                    const socials = range.socials;

                    Object.keys(socials).filter(s => socials[s].enabled).forEach(s =>  socials[s] = { ...socials[s], chartData: padArray(socials[s].chartData.map((v: chartDataValue) => v.value || 0), range.categories.length, 0) } );
                })
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

    const getSeries = (key: string) => {
        
        console.log({name: key, data: dataByTimeRange[timeRange]?.socials[key].chartData || []});
        return {name: key, data: dataByTimeRange[timeRange]?.socials[key].chartData || []}
    }

    return (
        <div className=" p-10">
            <h1 className="text-4xl mb-8">Relevance</h1>
            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-8 h-max min-h-[50vh]">
                    <Suspense fallback={<Spinner />}>
                        <Chart
                            options={chartOptions}
                            series={Object.keys(currentSocials).filter(key => currentSocials[key].enabled && currentSocials[key].toggled).map((key) => getSeries(key))}
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
                            color="secondary"
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
                    {Object.keys(currentSocials).filter(key => currentSocials[key].enabled).map((key) => (
                        <div onClick={() => handleSocialChange(key)} className="icon cursor-pointer flex-initial flex flex-col justify-center items-center shrink-0" key={key}>
                            {React.createElement(currentSocials[key].colorIcon, { sideLength: 50, grey: !currentSocials[key].toggled })}
                            <h6 className="text-center text-sm">{key}</h6>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default Analytics;