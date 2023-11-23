'use client';

import '../home.css';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Avatar,
  AvatarGroup,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Chip,
  Spinner,
} from '@nextui-org/react';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaCheck, FaPlus } from 'react-icons/fa';
import { Suspense } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { IoMdClose } from 'react-icons/io';
import { useSupabase } from '@/components/supabase-provider';
import { createClient } from '@supabase/supabase-js';
import TwitterIcon from '@/components/icons/TwitterIcon';
import InstagramIcon from '@/components/icons/InstagramIcon';
import FacebookIcon from '@/components/icons/FacebookIcon';
import LinkedinIcon from '@/components/icons/LinkedInIcon';
import GoogleIcon from '@/components/icons/GoogleIcon';
import TikTokIcon from '@/components/icons/TikTokIcon';
import MagnifyingGlass from '@/components/icons/MagnifyingGlass';
import { useRouter } from 'next/navigation';
// import RedditIcon from '@/components/icons/RedditIcon';
// import PinterestIcon from '@/components/icons/PinterestIcon';
const avatarsData = [
  'https://i.pravatar.cc/150?u=a042581f4e29026024d',
  'https://i.pravatar.cc/150?u=a04258a2462d826712d',
  'https://i.pravatar.cc/150?u=a042581f4e29026704d',
  'https://i.pravatar.cc/150?u=a04258114e29026302d',
  'https://i.pravatar.cc/150?u=a04258114e29026702d',
  'https://i.pravatar.cc/150?u=a04258114e29026708c',
];

const userData = [
  {
    name: 'Bob Marley',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
  },
  {
    name: 'Bob Ross',
    avatar: 'https://i.pravatar.cc/150?u=a04258a2462d826712d',
  },
  {
    name: 'Suyogya Poudel',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
  },
  {
    name: 'John Doe',
    avatar: 'https://i.pravatar.cc/150?u=a04258114e29026302d',
  },
  {
    name: 'Jane Doe',
    // avatar: 'https://i.pravatar.cc/150?u=a04258114e29026702d',
    avatar: '',
  },
];

const socials = [
  {
    name: 'Twitter',
    icon: TwitterIcon,
    color: 'rgba(29,161,242, .2)',
    connected: true,
  },
  {
    name: 'Instagram',
    icon: InstagramIcon,
    color: 'rgba(225,48,108, .2)',
    connected: true,
  },
  {
    name: 'Facebook',
    icon: FacebookIcon,
    color: 'rgba(24,119,242, .2)',
    connected: false,
  },
  {
    name: 'LinkedIn',
    icon: LinkedinIcon,
    color: 'rgba(0,119,181, .2)',
    connected: true,
  },
  {
    name: 'Google',
    icon: GoogleIcon,
    color: 'rgba(66,133,244, .2)',
    connected: false,
  },
  {
    name: 'TikTok',
    icon: TikTokIcon,
    color: 'rgba(0,0,0, .2)',
    connected: false,
  },
];

interface InputInterface {
  username?: string;
  platform: string;
  icon?: string;
}

interface QuickviewItemProps {
  title: string;
  subtitle: string;
  change: string;
}

const quickviewItems = ['relevance_score', 'sentiment_score'];

const QuickviewItem = ({ title, subtitle, change }: QuickviewItemProps) => {
  const positive = parseInt(change) > 0;

  return (
    <div className="flex min-w-[300px] rounded-xl border-[1px] py-4 px-6">
      <span
        className={`${
          positive
            ? '-translate-y-1/4 border-b-green-600'
            : 'translate-y-1/4 border-t-red-600'
        } my-auto mr-5 h-0 w-0 border-8 border-transparent`}
      ></span>
      <div className="my-auto h-max font-medium">
        <h5 className="text-2xl">{title}</h5>
        <h6 className="text-xs uppercase tracking-widest">{subtitle}</h6>
      </div>
      <div className="ml-auto flex flex-col items-center justify-center gap-2">
        <svg
          height="30"
          viewBox="0 0 96 33"
          className="mr-2"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 23.7222C5.92493 23.7505 5.94452 16.1876 8.79778 17.0423C11.651 17.897 12.8458 31.2751 16.1007 30.9087C19.3556 30.5422 20.1031 24.4777 23 23.7222C25.8969 22.9667 26.5194 16.935 30.3394 15.8695C34.1594 14.8039 33.8192 6.66207 37.2595 6.96326C40.6997 7.26444 40.6641 11.8697 44.2158 11.8697C47.7674 11.8697 48.1069 2.28126 51.8605 2.00351C55.614 1.72577 55.6926 18.0027 59.7226 18.0027C63.7525 18.0027 65.0198 29.2955 68.5629 30.0554C72.106 30.8153 71.2252 12.102 74.867 9.41646C78.5088 6.73088 78.0163 25.8293 81.4248 25.3623C84.8334 24.8953 85.0623 20.1142 88 21.2222C90.9377 22.3302 91.6091 25.3623 94.5 25.3623"
            className={positive ? 'stroke-green-600' : 'stroke-red-600'}
            stroke-width="2.62873"
            stroke-linecap="round"
          />
        </svg>

        <span
          className={`${
            positive ? 'text-green-600' : 'text-red-600'
          } text-3xl font-bold`}
        >
          {change}
        </span>
      </div>
    </div>
  );
};

const Home = ({ children }: { children: React.ReactNode }) => {
  const [addInput, setAddInput] = useState<InputInterface[]>([
    {
      username: '',
      platform: '',
    },
  ]);

  const Router = useRouter();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { supabase, session } = useSupabase();

  const [username, setUsername] = useState('');
  const [platform, setPlatform] = useState('');
  const [sessionData, setSessionData] = useState(null);
  const [addedSocials, setAddedSocials] = useState<InputInterface[]>([]);
  const [popOverOpen, setPopOverOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [filteredSocial, setFilteredSocial] = useState(socials);
  const [error, setError] = useState<string | null>(null);
  const [quickviewData, setQuickviewData] = useState<Record<
    string,
    QuickviewItemProps
  > | null>(null);

  const addSocial = () => {
    if (username && platform) {
      const newInput = [
        {
          username: username,
          platform: platform,
        },
      ] as InputInterface[];
      setAddedSocials([...addedSocials, ...newInput]);
      setUsername('');
      setPlatform('');
    }
  };

  const search = (e: any) => {
    const target = e.target as HTMLInputElement;
    const value = target.value;
    const filtered = socials.filter((social) =>
      social.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredSocial(filtered);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await supabase
          .from('data_duplicate')
          .select()
          .filter('company_id', 'in', `(${1 /* GET COMPANY ID */})`)
          .filter('timestamp', 'lte', Date.now())
          .filter('timestamp', 'gte', Date.now() - 8.64e7);
        if (!data['data']) throw new Error('No company data');

        const dailyData = data.data.sort((a, b) => a.timestamp - b.timestamp);
        const earliestDate = dailyData[0].timestamp,
          latestDate = dailyData[dailyData.length - 1].timestamp;

        const earliestData = dailyData.filter(
          (d) => d.timestamp === earliestDate
        );
        const latestData = dailyData.filter((d) => d.timestamp === latestDate);

        quickviewItems.forEach((item) => {
          const earliestValue =
            earliestData.reduce((a, c) => a + c[item], 0) / earliestData.length;
          const latestValue =
            latestData.reduce((a, c) => a + c[item], 0) / latestData.length;

          console.log(earliestValue, latestValue);

          const change = Math.floor(
            ((latestValue - earliestValue) / earliestValue) * 100
          );

          setQuickviewData((p) => ({
            ...p,
            [item]: {
              title:
                item.split('_')[0].substring(0, 1).toUpperCase() +
                item.split('_')[0].substring(1),
              subtitle: 'Daily Change',
              change: `${change > 0 ? '+' : ''}${change}%`,
            },
          }));
        });
      } catch (err) {
        console.error('Could not fetch data: ' + err);
        setError(err as string);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // @ts-ignore
    setSessionData(session);
  }, [session]);

  console.log(sessionData);

  const handleAddSocialMediaClick = () => {
    // Clear the  state
    setAddedSocials([]);
    setUsername('');
    setPlatform('');

    // Open the add social modal
    // @ts-ignore
    onOpenChange(true);
  };

  const handleSubmit = () => {
    // Close the add social media modal
    // @ts-ignore
    onOpenChange(false);

    setIsSubmitted(true);

    setUsername('');
    setPlatform('');
  };

  return (
    <div className="flex min-h-screen w-full flex-col gap-5 p-10">
      <div className="w-full">
        <Suspense fallback={<Spinner size="lg" color="secondary" />}>
          <Image
            className="banner aspect-[5/1] h-full rounded-lg bg-auto object-cover"
            src="/images/banner.jpg"
            id="header-background-id"
            alt="background-img"
            width={1200}
            height={800}
            loading="lazy"
          />
        </Suspense>
      </div>
      <div className="grid grid-cols-[minmax(auto,_1fr)_minmax(auto,_400px)] gap-5">
        <div className="flex flex-col gap-10">
          <div className="flex-rows flex">
            <div className="profile-img z-2">
              <Suspense fallback={<Spinner size="lg" color="secondary" />}>
                <img
                  className="profile-picture object-cover"
                  src="/images/avatar3.png"
                  alt="profile-picture"
                />
              </Suspense>
            </div>
            <div className="profile-info z-2">
              <div className="flex flex-col gap-2">
                <h1 className="text-2xl">
                  👋 Hey{' '}
                  {session?.user.user_metadata.first_name ||
                    session?.user.email}
                  !
                </h1>
                <p className="text-gray-500">
                  Get back to managing your insights.
                </p>
              </div>
            </div>
          </div>
          <div
            style={{ width: '600px' }}
            className="flex h-full w-full flex-col gap-5 overflow-x-scroll"
          >
            <div>
              <div className="text-xl">Connected Social Media</div>
              <div className="flex flex-nowrap items-center gap-4 overflow-x-auto px-2 py-4">
                {/* {socials.map((social) => (
                    <div className='rounded-lg' key={social.name}>
                      <img src={social.icon} className='aspect-[1/1] p-5 rounded-lg' style={{width: '90px', backgroundColor: social.color}}/>
                    </div>
                  ))} */}
                {socials.map((social) => {
                  const IconComponent = social.icon;
                  return social.connected ? (
                    <div className="rounded-lg" key={social.name}>
                      <IconComponent sideLength={100} />
                      <h3 className="mx-auto">{social.name}</h3>
                    </div>
                  ) : null;
                })}
              </div>
            </div>

            <div>
              <div className="text-xl">Other data sources</div>
              <div className="flex flex-nowrap items-center gap-3 overflow-x-auto px-2 py-4">
                <div className="flex flex-row gap-3">
                  {socials.map((social) => {
                    const IconComponent = social.icon;

                    return !social.connected ? (
                      <div className="rounded-lg" key={social.name}>
                        <IconComponent grey={true} sideLength={100} />
                      </div>
                    ) : (
                      ''
                    );
                  })}
                </div>
                <Button
                  isIconOnly
                  color="secondary"
                  radius="full"
                  onClick={handleAddSocialMediaClick}
                >
                  <FaPlus />
                </Button>

                <Modal
                  isOpen={isOpen}
                  onOpenChange={onOpenChange}
                  scrollBehavior="inside"
                >
                  <ModalContent>
                    {(onClick) => (
                      <>
                        <ModalHeader className="flex flex-col gap-1 text-2xl">
                          Add your social media!
                        </ModalHeader>
                        {/* <ModalHeader className='text-2xl sticky top-0'>Add your social media!</ModalHeader> */}
                        <ModalBody className="flex flex-col gap-4">
                          <div>
                            Let us know your social media handles, and
                            we&apos;ll do the rest.
                          </div>
                          <div className="flex flex-col gap-2">
                            <div className="flex flex-row gap-2">
                              <Input
                                label="Username"
                                variant="bordered"
                                height={10}
                                onChange={(e) => setUsername(e.target.value)}
                                value={username}
                              />
                              <Popover
                                isOpen={popOverOpen}
                                onOpenChange={(open) => setPopOverOpen(open)}
                                placement="top"
                                classNames={{
                                  base: 'py-3 px-4 border-2 border-gray-300  rounded-lg',
                                  arrow: 'border-2 border-gray-300',
                                }}
                                showArrow={true}
                              >
                                <PopoverTrigger className="bg-gray-200">
                                  <button className="rounded-lg p-4 text-4xl">
                                    <MagnifyingGlass />
                                  </button>
                                </PopoverTrigger>
                                <PopoverContent>
                                  <div
                                    style={{ width: '300px' }}
                                    className="flex h-full flex-col gap-2 px-1 py-2"
                                  >
                                    <div className="w-full">
                                      <Input
                                        label="Search Platform"
                                        variant="faded"
                                        height={10}
                                        onChange={(e) => search(e)}
                                        endContent={<MagnifyingGlass />}
                                      />
                                    </div>
                                    <div className="text-xl">
                                      Please select a platform
                                    </div>
                                    <hr className="border-2" />
                                    <div
                                      className="flex flex-col overflow-auto"
                                      style={{ height: '200px' }}
                                    >
                                      {filteredSocial.map((social) => {
                                        const IconComponent = social.icon;
                                        return (
                                          <div
                                            className="flex cursor-pointer flex-row gap-2 rounded-lg p-2 hover:bg-gray-100"
                                            key={social.name}
                                            onClick={() => {
                                              setPlatform(social.name);
                                              setPopOverOpen(false);
                                            }}
                                          >
                                            {/* <img
                                            src={social.icon}
                                            className="aspect-[1/1] rounded-lg p-2"
                                            style={{
                                              width: '50px',
                                              backgroundColor: social.color,
                                            }}
                                          /> */}
                                            <IconComponent sideLength={50} />
                                            <div className="flex flex-col">
                                              <div className="text-lg">
                                                {social.name}
                                              </div>
                                              <div className="text-sm">
                                                {social.connected
                                                  ? 'Connected'
                                                  : 'Not connected'}
                                              </div>
                                            </div>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </div>
                                </PopoverContent>
                              </Popover>
                            </div>
                            {platform ? (
                              <div className="w-fit rounded-xl border py-1 px-2 text-sm">
                                Selected Platform: {platform}
                              </div>
                            ) : (
                              ''
                            )}
                          </div>
                        </ModalBody>
                        <div className="flex w-full flex-col gap-2 px-5 py-2">
                          <Button
                            onClick={addSocial}
                            className="text-theme w-fit rounded-full border bg-white text-xs"
                            endContent={<FaPlus size={15} />}
                          >
                            Add
                          </Button>
                          <div className="flex flex-row flex-wrap gap-2 py-3">
                            {addedSocials.map((social, index) => {
                              const SocialIcon = socials.find(
                                (e) => e.name === social.platform
                              );
                              return (
                                <Chip
                                  key={index}
                                  avatar={
                                    SocialIcon && (
                                      <SocialIcon.icon sideLength={19} />
                                    )
                                  }
                                  variant="light"
                                  className="flex flex-row gap-3 px-4 py-2"
                                  onClose={() => {
                                    const newAddedSocials = addedSocials.filter(
                                      (_, i) => i !== index
                                    );
                                    setAddedSocials(newAddedSocials);
                                  }}
                                  style={{
                                    backgroundColor: 'transparent',
                                    border: '1px solid #E5E5E5',
                                  }}
                                >
                                  {social.username}
                                </Chip>
                              );
                            })}
                          </div>
                          <Button
                            disabled={addedSocials.length === 0}
                            className={`button w-full ${
                              addedSocials.length === 0
                                ? 'cursor-not-allowed bg-gray-400'
                                : 'bg-purple-450 text-white'
                            }`}
                            onClick={handleSubmit}
                          >
                            Submit
                          </Button>
                        </div>
                      </>
                    )}
                  </ModalContent>
                </Modal>
                {isSubmitted && (
                  <Modal
                    isOpen={isSubmitted}
                    onClose={() => setIsSubmitted(false)}
                  >
                    <ModalContent>
                      <ModalHeader className="mt-10 flex flex-col items-center justify-center gap-10">
                        <div className="flex rounded-full bg-purple-450 p-4 text-xl text-white">
                          <FaCheck />
                        </div>
                        <div className="text-4xl font-medium text-zinc-900 ">
                          Submitted!
                        </div>
                      </ModalHeader>
                      <ModalBody className="-mt-2 text-center">
                        Pretty soon you’ll be able to explore new analytics and
                        insights.
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          className="button w-full bg-purple-450 text-white"
                          onClick={() => setIsSubmitted(false)}
                        >
                          Close
                        </Button>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 border-l pl-8">
          <div className="mb-2 flex w-full items-center justify-between">
            <span className="text-2xl font-medium">Quickview</span>
            <span className="cursor-pointer text-purple-450">Edit</span>
          </div>
          {(quickviewData && (
            <>
              {quickviewItems.map((item) => {
                return <QuickviewItem {...quickviewData[item]} />;
              })}
              <div className="relative flex w-full gap-6 rounded-xl border-[1px] bg-white py-4 px-6">
                <AiOutlineClose className="absolute right-2 top-2 cursor-pointer" />
                <img
                  alt=""
                  src="/images/HomeTutorialLove.png"
                  className="h-full"
                />
                <div className="flex flex-col gap-1">
                  <h5 className="font-semibold">Welcome!</h5>
                  <h6 className="text-xs">
                    Want to learn how to get the best out of Perceptify? Take a
                    short tutorial.
                  </h6>
                  <div className="mt-2 flex items-center justify-between">
                    <button className="w-max bg-transparent text-purple-450">
                      Start tutorial
                    </button>
                    <span className="text-xs text-neutral-400">1/2</span>
                  </div>
                </div>
              </div>
            </>
          )) || <Spinner />}
        </div>
      </div>
    </div>
  );
};

export default Home;
