"use client"

import '../home.css'
import NavigationButton from '@/components/sidebar/NavigationButton';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useRef, useState } from 'react';
// import Modal from '@/components/modal/modal';
import { Modal, Tabs, Tab } from '@nextui-org/react';


const Home = ({
    children,
  }: {
    children: React.ReactNode;
  }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const modal = useRef<HTMLDivElement>(null);

  const openModal = () => {
    setShow(true);
  }

  const closeModal = () => {
    setShow(false);
  }

  const openSpeedDial = () => {
    if(input.current) {
        input.current.click();
    }
  }

    
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
        <div className='grid xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-1 h-96'>
            <div className='connected relative lg:border-r lg:border-black h-full' >
                <div className='font-bold text-2xl title'>
                    Connected Social Media
                </div>
                <div className="menu z-10 bg-gray-200">
                    <input type="checkbox" id="toggle" defaultChecked ref={input} />
                    <label className='z-3' id="show-menu">
                        <div className="btn company_logo" onClick={() => openSpeedDial()}>
                            <img className=" toggleBtn menuBtn" src="https://static-00.iconduck.com/assets.00/youtube-round-2-icon-512x512-pd38fjru.png" />
                            <img className=" toggleBtn closeBtn" src="https://static-00.iconduck.com/assets.00/youtube-round-2-icon-512x512-pd38fjru.png" />
                        </div>
                        <div className="btn" onClick={() => openModal()}>
                            <img className="image" src="https://static-00.iconduck.com/assets.00/linkedin-icon-2048x2048-ya5g47j2.png" />
                        </div>
                        <div className="btn" onClick={() => openModal()}>
                            <img className="image" src="https://static-00.iconduck.com/assets.00/facebook-v1-icon-512x512-hf7yrmum.png" />
                        </div>
                        <div className="btn" onClick={() => openModal()}>
                            <img className="image" src="https://static-00.iconduck.com/assets.00/br-tiktok-sq-icon-512x512-zq5t0njp.png" />
                        </div>
                        <div className="btn" onClick={() => openModal()}>
                            <img className="image" src="https://static-00.iconduck.com/assets.00/reddit-icon-512x512-q67bvjvq.png" />
                        </div>
                        <div className="btn" onClick={() => openModal()}>
                            <img className="image" src="https://static-00.iconduck.com/assets.00/instagram-icon-512x512-zomml8fn.png" />
                        </div>
                        <div className="btn" onClick={() => openModal()}>
                            <img className="image" src="https://static-00.iconduck.com/assets.00/pinterest-icon-512x512-1rw5biep.png" />
                        </div>
                        <div className="btn" onClick={() => openModal()}>
                            <img className="image" src="https://static-00.iconduck.com/assets.00/snapchat-icon-512x512-2prxdvz0.png" />
                        </div>
                        <div className="btn" onClick={() => openModal()}>
                            <img className="image" src="https://static-00.iconduck.com/assets.00/twitter-icon-512x512-7o66iwws.png" />
                        </div>
                    </label>
                </div>
            </div>
            <div className='lg:px-10 xl:px-10 px-5 xl:mt-0 lg:mt-0 mt-10 w-full h-full'>
                <div className='grid grid-cols-3 gap-2 text-center'>
        <Tabs  variant="underlined" color="secondary" aria-label="Tabs variants">
          <Tab key="Relevance" title="Relevance"/>
          <Tab key="Sentiment" title="Sentiment"/>
          <Tab key="Other" title="Other"/>
        </Tabs>
                </div>
                <div className='mt-3 lg:p-5 xl:p-5 p-3 bg-gray-200 min-h-max rounded'>
                    {children}
                </div>
            </div>
        </div>
        <div>
            {/* <Modal persistant title="My Modal"  onClose={() => closeModal()} show={show}>
                <div ref={modal} className='bg-white w-mix'>
                    <div className='flex w-full p-2'>
                        <p className='basis-10/12 text-2xl'>Add [social media]</p>
                        <button className='basis-2/12 text-white' onClick={() => closeModal()}>Close</button>
                    </div>
                    <hr className='border-black'/>
                    <div className='p-2 flex flex-col gap-5'>
                        <div>
                            Would you like to add [social media] to your list of social medias to get data from?
                        </div>
                        <div className='flex'>
                            <button className='px-5 py-2 text-base font-bold text-white flex-end' >Add</button>
                        </div>
                    </div>
                </div>
            </Modal> */}

<Modal
        // closeButton
        aria-labelledby="modal-title"
        open={show}
        onClose={closeModal}
        blur
      >
        <Modal.Header>
          {/* <Text id="modal-title" size={18}>
            Welcome to
            <Text b size={18}>
              NextUI
            </Text>
          </Text> */}
          <div className='flex w-full p-2'>
                <p className='basis-10/12 text-3xl font-bold text-left'>Add [social media]</p>
                <button className='basis-2/12 text-xl text-black bg-transparent' onClick={() => closeModal()}>Close</button>
            </div>
        </Modal.Header>
        <hr className='border-black'/>
        <Modal.Body>
          <span className='text-xl font-normal'>
            Would you like to add [social media] to your analytics?
          </span>
        </Modal.Body>
        <Modal.Footer>
          <div className='flex gap-1'>
                <button className='px-5 py-2 text-base font-bold text-white flex-end' >Cancel</button>
                <button className='px-5 py-2 text-base font-bold text-white flex-end' >Confirm</button>
            </div>
        </Modal.Footer>
      </Modal>
        </div>
        
    </div>
    )
}

export default Home;