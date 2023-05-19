"use client"
import Graph from '../dashboard/Graph';
import './analytics.css'

const Analytics = () => {
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
                <div className='rest grid grid-cols-12 gap-4 p-10'>
                    <div className='col-span-9'>
                        <Graph />
                    </div>
                    <div className='information col-span-3'>
                        <div className='header'>
                            <h3>Relative Strength</h3>
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
                        <Graph />
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