'use client';

import { useRouter, usePathname } from 'next/navigation';
import Logo from '../Logo';
import NavigationButton from './NavigationButton';
import BottomButton from './BottomButton';

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const homeIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="27"
      height="24"
      className={`${
        pathname.startsWith('/home') ? 'stroke-[#8915E4]' : 'stroke-[#D5D5D5]'
      } fill-none`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.3"
        d="M2 13.25 13.5 2 25 13.25M5 14v7.111c0 .491.544.889 1.214.889h3.643c.67 0 1.214-.398 1.214-.889v-3.555c0-.491.544-.89 1.215-.89h2.428c.67 0 1.215.399 1.215.89v3.555c0 .491.543.889 1.214.889h3.643c.67 0 1.214-.398 1.214-.889V14"
      />
    </svg>
  );

  const analyticsIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="18"
      className={`${
        pathname.startsWith('/analytics') ? 'fill-[#8915E4]' : 'fill-[#D5D5D5]'
      } stroke-none`}
    >
      <path
        fillRule="evenodd"
        d="M13.562 18c-.074 0-.15-.003-.226-.011-.968-.098-1.727-.797-1.936-1.78L8.45 2.268 5.41 9.446a1.102 1.102 0 0 1-1.01.679H1.1C.492 10.126 0 9.622 0 9c0-.622.492-1.125 1.1-1.125h2.578l2.757-6.512C6.825.446 7.685-.088 8.664.012c.968.098 1.727.796 1.936 1.78l2.95 13.94 3.04-7.179a1.1 1.1 0 0 1 1.01-.677h3.3c.608 0 1.1.503 1.1 1.125 0 .62-.492 1.125-1.1 1.125h-2.578l-2.757 6.51c-.36.848-1.13 1.364-2.003 1.364Z"
        clipRule="evenodd"
      />
    </svg>
  );

  const insightsIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="24"
      className={`${
        pathname.startsWith('/insights') ? 'fill-[#8915E4]' : 'fill-[#D5D5D5]'
      } stroke-none`}
    >
      <path
        fillRule="evenodd"
        d="M4.654 8.681C1.943 11.615 2 16.264 4.826 19.144a7.185 7.185 0 0 0 5.166 2.188h.007a7.218 7.218 0 0 0 5.183-2.188c2.877-2.932 2.871-7.7-.012-10.628l-3.984-4.07c-.403 3.311-1.645 6.216-3.857 6.216-.678 0-1.783-.301-2.675-1.98ZM9.999 24h-.01a9.825 9.825 0 0 1-7.07-2.99C-.968 17.048-.974 10.602 2.907 6.647L4.22 5.322a1.335 1.335 0 0 1 2.24.606c.307 1.185.672 1.768.874 1.99.474-.5 1.33-2.515 1.33-5.925 0-.197 0-.382-.01-.567a1.335 1.335 0 0 1 .41-1.051c.53-.503 1.379-.503 1.887.02l6.124 6.254c3.896 3.953 3.902 10.4.013 14.362C15.194 22.94 12.677 24 10 24Z"
        clipRule="evenodd"
      />
    </svg>
  );

  const integrationsIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="22"
      className={`${
        pathname.startsWith('/integrations') ? 'stroke-[#8915E4]' : 'stroke-[#D5D5D5]'
      } fill-none`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.3"
        d="M12.835 15.93h4.644M5.096 2h15.478a3.096 3.096 0 0 1 3.096 3.096v12.383a3.096 3.096 0 0 1-3.096 3.095H5.096A3.096 3.096 0 0 1 2 17.478V5.097A3.096 3.096 0 0 1 5.096 2Z"
      />
      <path
        stroke="#D9D9D9"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.3"
        d="m6.644 14.383 3.095-3.096-3.095-3.096"
      />
    </svg>
  );

  const settingsIcon = (
    <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12.011 7.686c.029-.224.05-.448.05-.686 0-.238-.021-.462-.05-.686l1.478-1.155a.353.353 0 0 0 .083-.448l-1.4-2.422a.352.352 0 0 0-.427-.154l-1.742.7a5.113 5.113 0 0 0-1.183-.686L8.554.294A.341.341 0 0 0 8.21 0h-2.8a.341.341 0 0 0-.343.294l-.266 1.855a5.378 5.378 0 0 0-1.183.686l-1.743-.7a.341.341 0 0 0-.427.154l-1.4 2.422a.345.345 0 0 0 .084.448L1.61 6.314A5.551 5.551 0 0 0 1.56 7c0 .231.022.462.05.686L.133 8.841a.353.353 0 0 0-.084.448l1.4 2.422c.084.154.273.21.427.154l1.743-.7c.364.28.756.511 1.183.686l.266 1.855A.341.341 0 0 0 5.41 14h2.8a.341.341 0 0 0 .343-.294l.266-1.855a5.377 5.377 0 0 0 1.182-.686l1.743.7c.162.063.344 0 .428-.154l1.4-2.422a.353.353 0 0 0-.085-.448l-1.476-1.155Zm-5.2 1.764A2.453 2.453 0 0 1 4.36 7a2.453 2.453 0 0 1 2.45-2.45A2.453 2.453 0 0 1 9.26 7a2.453 2.453 0 0 1-2.45 2.45Z"
        fill="#5E6366"
      />
    </svg>
  );

  const logoutIcon = (
    <svg width="15" height="15" xmlns="http://www.w3.org/2000/svg">
      <path
        d="m10.982 10.74 3.02-3.12L10.98 4.5M14.002 7.62h-9.36"
        stroke="#DB4437"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <mask id="a" fill="#fff">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10.363.34 2.56.344a2.082 2.082 0 0 0-2.08 2.08v10.395a2.08 2.08 0 0 0 2.08 2.08h7.802"
        />
      </mask>
      <path
        d="M10.363 1.94a1.6 1.6 0 0 0 0-3.2v3.2ZM2.561.344v-1.6H2.56l.001 1.6Zm-2.08 2.08h-1.6 1.6Zm9.882 14.075a1.6 1.6 0 0 0 0-3.2v3.2Zm0-17.757-7.802.002v3.2l7.802-.002v-3.2Zm-7.803.002a3.682 3.682 0 0 0-3.679 3.68l3.2.001c0-.265.216-.481.482-.481l-.003-3.2Zm-3.679 3.68v10.395h3.2V2.424h-3.2Zm0 10.395a3.68 3.68 0 0 0 3.68 3.68v-3.2a.48.48 0 0 1-.48-.48h-3.2Zm3.68 3.68h7.802v-3.2H2.56v3.2Z"
        fill="#DB4437"
        mask="url(#a)"
      />
    </svg>
  );

  const teamIcon = (
    <svg width="17" height="18" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8.31 7.615a2.77 2.77 0 1 0 0-5.54 2.77 2.77 0 0 0 0 5.54ZM3.809 9.693a1.731 1.731 0 1 0 0-3.463 1.731 1.731 0 0 0 0 3.463ZM14.542 7.96a1.731 1.731 0 1 1-3.462 0 1.731 1.731 0 0 1 3.463 0Zm-6.232.347a3.463 3.463 0 0 1 3.463 3.462v4.155H4.848V11.77A3.462 3.462 0 0 1 8.31 8.308ZM3.463 11.77c0-.48.069-.943.199-1.38l-.118.009a2.423 2.423 0 0 0-2.159 2.41v3.116h2.078V11.77Zm11.772 4.155v-3.116a2.424 2.424 0 0 0-2.277-2.42c.13.438.2.901.2 1.381v4.155h2.077Z"
        fill="#5E6366"
      />
    </svg>
  );

  const supportIcon = (
    <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6.3 11.2h1.4V9.8H6.3v1.4ZM7 0a7 7 0 1 0 0 14A7 7 0 0 0 7 0Zm0 12.6A5.607 5.607 0 0 1 1.4 7c0-3.087 2.513-5.6 5.6-5.6 3.087 0 5.6 2.513 5.6 5.6 0 3.087-2.513 5.6-5.6 5.6Zm0-9.8a2.8 2.8 0 0 0-2.8 2.8h1.4a1.4 1.4 0 0 1 2.8 0c0 1.4-2.1 1.225-2.1 3.5h1.4c0-1.575 2.1-1.75 2.1-3.5A2.8 2.8 0 0 0 7 2.8Z"
        fill="#5E6366"
      />
    </svg>
  );

  return (
    <div className="flex flex-col w-24 hover:w-96 md:w-96 z-10 h-full border-r-[1px] border-[#F1F3F4] transition-all duration-500">
      <div className="p-4">
        <Logo />
        <div className="mt-16">
          <NavigationButton
            label="Home"
            subtext="Your data at a glance"
            link="/home"
            selected={pathname.startsWith('/home')}
            icon={homeIcon}
          />
          <NavigationButton
            label="Analytics"
            subtext="Data-driven success, simplified"
            link="/analytics"
            selected={pathname.startsWith('/analytics')}
            icon={analyticsIcon}
          />
          <NavigationButton
            label="Insights"
            subtext="Insights for informed decisions"
            link="/insights"
            selected={pathname.startsWith('/insights')}
            icon={insightsIcon}
          />
          <NavigationButton
            label="Integrations"
            subtext="Coming soon"
            link="/integrations"
            selected={pathname.startsWith('/integrations')}
            icon={integrationsIcon}
          />
        </div>
        <div className="divide-y mt-16">
          <BottomButton
            label="Manage Team"
            link="/manage"
            icon={teamIcon}
          />
          <BottomButton
            label="Settings"
            link="/settings"
            icon={settingsIcon}
          />
          <BottomButton
            label="Customer Support"
            link="/support"
            icon={supportIcon}
          />
          <BottomButton
            label="Log Out"
            onClick={() => {}}
            link="/logout"
            red
            icon={logoutIcon}
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
