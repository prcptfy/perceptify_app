"use client"

import '../home.css'
import NavigationButton from '@/components/sidebar/NavigationButton';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

const Home = ({
    children,
  }: {
    children: React.ReactNode;
  }) => {
  const router = useRouter();
  const pathname = usePathname();

    
    return (
    <div className='min-h-screen'>
        <div className='profile '>
            <div className='banner w-full z-1'>
                <img className="h-full w-full" src="https://unsplash.it/1000/1000/?random&pic=1" id="header-background-id" alt="background-img"/>
            </div>
            <div className="profile-img z-2">
                <img className="profile-picture" src="https://unsplash.it/300/300/?random&pic=1(14 kB)" alt="profile-picture"/>
            </div>
            <div className="profile-info z-2">
                <div className="profile-name">
                    <h1 className="text-2xl">👋 Hey John!</h1>
                    <p className="text-gray-500">Get back to managing your insights.</p>
                </div>
            </div>
        </div>
        <div className='grid grid-cols-2 relative h-full'>
            <div className='connected relative' style={{borderRight: '1px solid black'}}>
                <div className='font-bold text-2xl text-center'>
                    Connected Social Media
                </div>
                <div className="menu z-100">
                    <input type="checkbox" id="toggle" />
                    <label id="show-menu" htmlFor="toggle">
                        <div className="btn company_logo">
                            <img className=" toggleBtn menuBtn" src="https://static-00.iconduck.com/assets.00/youtube-round-2-icon-512x512-pd38fjru.png" />
                            <img className=" toggleBtn closeBtn" src="https://static-00.iconduck.com/assets.00/youtube-round-2-icon-512x512-pd38fjru.png" />
                        </div>
                        <div className="btn">
                            <img className="image" src="https://static-00.iconduck.com/assets.00/linkedin-icon-2048x2048-ya5g47j2.png" />
                        </div>
                        <div className="btn">
                            <img className="image" src="https://static-00.iconduck.com/assets.00/facebook-v1-icon-512x512-hf7yrmum.png" />
                        </div>
                        <div className="btn">
                            <img className="image" src="https://static-00.iconduck.com/assets.00/br-tiktok-sq-icon-512x512-zq5t0njp.png" />
                        </div>
                        <div className="btn">
                            <img className="image" src="https://static-00.iconduck.com/assets.00/reddit-icon-512x512-q67bvjvq.png" />
                        </div>
                        <div className="btn">
                            <img className="image" src="https://static-00.iconduck.com/assets.00/instagram-icon-512x512-zomml8fn.png" />
                        </div>
                        <div className="btn">
                            <img className="image" src="https://static-00.iconduck.com/assets.00/pinterest-icon-512x512-1rw5biep.png" />
                        </div>
                        <div className="btn">
                            <img className="image" src="https://static-00.iconduck.com/assets.00/snapchat-icon-512x512-2prxdvz0.png" />
                        </div>
                        <div className="btn">
                            <img className="image" src="https://static-00.iconduck.com/assets.00/twitter-icon-512x512-7o66iwws.png" />
                        </div>
                    </label>
                </div>
            </div>
            <div className='px-10 w-full h-full'>
                <div className='grid grid-cols-3 gap-2 text-center'>
                    <Link className={(pathname == "/home/overview" ? "active" : "")} href={{ pathname: "/home/overview"}}>
                        <div className='p-2'>Overview</div>
                    </Link>
                    <Link className={pathname == "/home/relevance" ? "active" : ""} href={{ pathname: "/home/relevance" }}>
                    <div className='p-2'>Relevance</div>
                    </Link>
                    <Link className={pathname == "/home/sentiment" ? "active" : ""} href={{ pathname: "/home/sentiment"}}>
                    <div className='p-2'>Sentiment</div>
                    </Link>
                </div>
                <div className='mt-3 p-5 bg-gray-100 min-h-max'>
                    {children}
                </div>
            </div>
        </div>
    </div>
    )
}

export default Home;