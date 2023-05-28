"use client"


import InfoIcon from "./icons/infoIcon"
import ToolTip from './tooltip/tooltip'

interface Aggregate {
    name: string,
    value: number,
    color: string,
}

type SidePanelProps = {
    title: string,
    tooltip: string,
    caption: string,
    aggVal: number,
    socials: Array<Aggregate>,
}

const SidePanel: React.FC<SidePanelProps> = ({title, tooltip, caption, aggVal, socials}) => {
    return (
            <div className='side-pannel grid gap-1'>
                <div className="px-5 pt-8 flex flex-col">
                    <div className='flex flex-auto'>
                        <h3 className='basis-11/12 text-2xl font-bold'>{title}</h3>
                        {/* <h3 className='basis-1/12'>{icon}</h3> */}
                        <ToolTip icon={<InfoIcon stroke="#8915E4" size="25px"/>} tooltip="Some information here"/>
                        {/* <InfoIcon stroke="#e855e8" size="30px"/> */}
                    </div>
                    <div className='caption my-2 flex-auto'>
                        <p className='text-sm'>
                            {caption}
                        </p>
                    </div>
                    <div className='grid grid-cols-12 gap-1 mt-2 flex-auto'>
                        <h6 className='font-bold col-span-11'>Aggregate</h6>
                        <h6 className="col-span-1">{aggVal}</h6>
                        <progress className="col-span-12" max="100" value={aggVal}></progress>
                    </div>
                </div>
                
                <div className="hr-with-text text-xs font-bold my-4"> Scroll Down </div>
                <div className='grid gap-2 px-2 overflow-auto oveflow-y-scroll max-h-40 '>
                    {
                        socials.map((social) => {
                            return (
                                <div className={'grid grid-cols-12 mx-2 ' + social.name.toLowerCase()}>
                                    <h6 className='col-span-11'>{social.name}</h6>
                                    <h6 className='col-span-1'>{social.value}</h6>
                                    <progress className='col-span-12 ' max="100" value={social.value}></progress>
                                </div>
                            )
                        })
                    }

{
                        socials.map((social) => {
                            return (
                                <div className={'grid grid-cols-12 mx-2 ' + social.name.toLowerCase()}>
                                    <h6 className='col-span-11'>{social.name}</h6>
                                    <h6 className='col-span-1'>{social.value}</h6>
                                    <progress className='col-span-12 ' max="100" value={social.value}></progress>
                                </div>
                            )
                        })
                    }
                </div>

            </div>
    )
}

export default SidePanel;