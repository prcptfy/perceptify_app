"use client"

interface Aggregate {
    name: string,
    value: number,
    color: string,
}

type SidePanelProps = {
    title: string,
    icon: string,
    tooltip: string,
    caption: string,
    aggVal: number,
    socials: Array<Aggregate>,
}

const SidePanel: React.FC<SidePanelProps> = ({title, icon, tooltip, caption, aggVal, socials}) => {
    return (
            <div className='side-pannel grid gap-1'>
                <div className='header p-2 grid grid-cols-12'>
                    <h3 className='col-span-11'>{title}</h3>
                    <h3 className='col-span-1'>{icon}</h3>
                </div>
                <div className='caption p-2'>
                    <p className='caption'>
                        {caption}
                    </p>
                </div>
                <div className='aggregate p-2'>
                    <h6 className=''>Aggregate</h6>
                    <progress max="100" value={aggVal}></progress>
                </div>
                <div className='stats grid grid-cols-1 gap-4'>
                    {
                        socials.map((social) => {
                            return (
                                <div className={'grid grid-cols-12 ' + social.name.toLowerCase()}>
                                    <h6 className='col-span-11'>{social.name}</h6>
                                    <h6 className='col-span-1'>{social.value}</h6>
                                    <progress className='col-span-12 ' max="100" value={social.value}></progress>
                                </div>
                            )
                        })
                    }
                    {/* <div className='grid grid-cols-12 twitter'>
                        <h6 className='col-span-11'>Twitter</h6>
                        <h6 className='col-span-1'>62</h6>
                        <progress className='col-span-12 ' max="100" value="80"></progress>
                    </div> */}
                    {/* <div className='grid grid-cols-12 facebook'>
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
                    </div> */}
                </div>

            </div>
    )
}

export default SidePanel;