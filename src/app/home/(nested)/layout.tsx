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
} from '@nextui-org/react';
import { useEffect, useState } from 'react';
// import { FaPlus } from "react-icons/ai";
import { FaPlus, FaSearch } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';

interface InputInterface {
  username?: string;
  platform?: string;
}

const Home = ({ children }: { children: React.ReactNode }) => {
  const [addInput, setAddInput] = useState<InputInterface[]>([
    {
      username: '',
      platform: '',
    },
  ]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [username, setUsername] = useState('');
  const [platform, setPlatform] = useState('');

  const [addedSocials, setAddedSocials] = useState<InputInterface[]>([]);

  const [popOverOpen, setPopOverOpen] = useState(false);

  useEffect(() => {}, [username, platform]);

  const socials = [
    {
      name: 'Twitter',
      icon: 'https://cdn-icons-png.flaticon.com/512/5968/5968958.png',
      color: 'rgba(29,161,242, .2)',
      connected: true,
    },
    {
      name: 'Instagram',
      icon: 'https://cdn-icons-png.flaticon.com/512/1409/1409946.png',
      color: 'rgba(225,48,108, .2)',
      connected: true,
    },
    {
      name: 'Facebook',
      icon: 'https://cdn-icons-png.flaticon.com/512/3128/3128304.png',
      color: 'rgba(24,119,242, .2)',
      connected: true,
    },
    {
      name: 'Reddit',
      icon: 'https://cdn-icons-png.flaticon.com/512/2111/2111589.png',
      color: 'rgba(255,69,0, .2)',
      connected: false,
    },
    {
      name: 'Pinterest',
      icon: 'https://cdn-icons-png.flaticon.com/512/145/145808.png',
      color: 'rgba(189,8,28, .2)',
      connected: false,
    },
  ];

  const [filteredSocial, setFilteredSocial] = useState(socials);

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

  return (
    <div className="flex min-h-screen w-full flex-col gap-5 p-10">
      <div className="ml-auto flex flex-row gap-1">
        <AvatarGroup className="avatar_group" max={5} total={5}>
          {userData.map((user) => (
            <Avatar
              key={user.name}
              style={{ width: '40px', height: '40px' }}
              showFallback
              name={user.name}
              src={user.avatar}
            />
          ))}
        </AvatarGroup>
        <button className="rounded-full bg-purple-450 px-3 py-3">
          <FaPlus color="white" size={15} />
        </button>
      </div>
      <div className="w-full">
        <img
          className="banner aspect-[5/1] h-full w-full rounded-lg bg-auto"
          src="https://picsum.photos/500/100"
          id="header-background-id"
          alt="background-img"
        />
      </div>
      <div className="grid grid-cols-[minmax(auto,_1fr)_minmax(auto,_400px)] gap-5">
        <div className="flex flex-col gap-10 border-r">
          <div className="flex-rows flex">
            <div className="profile-img z-2">
              <img
                className="profile-picture"
                src="https://unsplash.it/100/100/?random&pic=1(14 kB)"
                alt="profile-picture"
              />
            </div>
            <div className="profile-info z-2">
              <div className="flex flex-col gap-2">
                <h1 className="text-2xl">👋 Hey John!</h1>
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
                  return social.connected ? (
                    <div className="rounded-lg" key={social.name}>
                      <img
                        src={social.icon}
                        className="aspect-[1/1] rounded-lg p-5"
                        style={{ width: '90px', backgroundColor: social.color }}
                      />
                    </div>
                  ) : (
                    ''
                  );
                })}
              </div>
            </div>

            <div>
              <div className="text-xl">Other data sources</div>
              <div className="flex flex-nowrap items-center gap-3 overflow-x-auto px-2 py-4">
                <div className="flex flex-row gap-3">
                  {socials.map((social) => {
                    return !social.connected ? (
                      <div
                        className={'gray-scale-1 rounded-lg'}
                        key={social.name}
                      >
                        <img
                          src={social.icon}
                          className="aspect-[1/1] rounded-lg p-5"
                          style={{
                            width: '90px',
                            backgroundColor: social.color,
                          }}
                        />
                      </div>
                    ) : (
                      ''
                    );
                  })}
                </div>
                <button
                  className="button rounded-full bg-purple-450 p-5"
                  onClick={onOpen}
                >
                  <FaPlus size={20} color="white" />
                </button>
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
                            Let us know your social media handles, and we’ll do
                            the rest.
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
                                    <FaSearch size={20} />
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
                                        endContent={<FaSearch size={20} />}
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
                                      {filteredSocial.map((social) => (
                                        <div
                                          className="flex cursor-pointer flex-row gap-2 rounded-lg p-2 hover:bg-gray-100"
                                          key={social.name}
                                          onClick={() => {
                                            setPlatform(social.name);
                                            setPopOverOpen(false);
                                          }}
                                        >
                                          <img
                                            src={social.icon}
                                            className="aspect-[1/1] rounded-lg p-2"
                                            style={{
                                              width: '50px',
                                              backgroundColor: social.color,
                                            }}
                                          />
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
                                      ))}
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
                            Add social media
                          </Button>
                          <div className="flex flex-row flex-wrap gap-2 py-3">
                            {/* {socials.map((social, index) => (
                                <Chip
                                  key={social.name}
                                  avatar={
                                    <Avatar
                                      name={social.name}
                                      src={social.icon}
                                      style={{backgroundColor: 'transparent'}}
                                    />
                                  }
                                  variant="light"
                                  className='px-5 py-2 flex flex-row gap-3'
                                  onClose={() => {}}
                                  style={{backgroundColor: social.color}}
                                >
                                  Username
                                </Chip>
                              ))} */}
                            {addedSocials.map((social, index) => (
                              <Chip
                                key={index}
                                avatar={
                                  <Avatar
                                    // name={social.name}
                                    src={
                                      socials.find(
                                        (i) => social.platform == i.name
                                      )?.icon
                                    }
                                    style={{ backgroundColor: 'transparent' }}
                                  />
                                }
                                variant="light"
                                className="flex flex-row gap-3 px-5 py-2"
                                onClose={() => {}}
                                style={{
                                  backgroundColor: socials.find(
                                    (i) => social.platform == i.name
                                  )?.color,
                                }}
                              >
                                {social.username}
                              </Chip>
                            ))}
                          </div>
                          <Button className="button w-full text-white">
                            Submit
                          </Button>
                        </div>
                      </>
                    )}
                  </ModalContent>
                </Modal>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="w-full px-4">
            <span className="w-full">Quickview</span>
            <span className="float-right">Edit</span>
          </div>
          <div
            className="aspect-[3/1] rounded-xl bg-red-50"
            style={{ minWidth: '300px' }}
          ></div>
          <div
            className="aspect-[3/1] rounded-xl bg-red-50"
            style={{ minWidth: '300px' }}
          ></div>
          <div
            className="aspect-[3/1] rounded-xl bg-red-50"
            style={{ minWidth: '300px' }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Home;
