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

  console.log()
    
    return (
    <div>
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
        <div className='flex'>
            <div className='connected'>
                <div className="parent">
                    <img className="image1" src="https://via.placeholder.com/50" />
                    <img className="image2" src="https://via.placeholder.com/50" />
                    <img className="image3" src="https://via.placeholder.com/50" />
                    <img className="image4" src="https://via.placeholder.com/50" />
                    <img className="image5" src="https://via.placeholder.com/50" />
                    <img className="image6" src="https://via.placeholder.com/50" />
                    <img className="image7" src="https://via.placeholder.com/50" />
                    <img className="image8" src="https://via.placeholder.com/50" />
                    <img className="image9" src="https://via.placeholder.com/50" />
                </div>
            </div>
            <div>
                <div className='flex gap-2'>
                    <Link href={{ pathname: "/home"}}>
                        Overview
                    </Link>
                    <Link href={{ pathname: "/home/relevance" }}>
                        Relevance
                    </Link>
                    <Link href={{ pathname: "/home/sentiment"}}>
                        Sentiment
                    </Link>
                </div>
                <div>
                    {children}
                </div>
            </div>
        </div>
    </div>
    )
}

export default Home;