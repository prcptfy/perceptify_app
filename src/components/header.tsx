'use client';

import React from 'react';
import { AvatarGroup, Avatar } from '@nextui-org/react';
import { FaPlus } from 'react-icons/fa';

interface HeaderProps {
  userData: Array<{ name: string; avatar: string }>;
}

const Header: React.FC<HeaderProps> = ({ userData }) => {
  return (
    <div className="absolute top-0 right-0 z-50 mt-4 mr-4 mb-4 flex items-center space-x-2 p-4">
      <AvatarGroup max={5} total={5} className="flex items-center">
        {userData.map((user) => (
          <Avatar
            key={user.name}
            style={{ width: '40px', height: '40px' }}
            name={user.name}
            src={user.avatar}
          />
        ))}
      </AvatarGroup>
      <button className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-450">
        <FaPlus color="white" size={15} />
      </button>
    </div>
  );
};


export default Header;
