"use client"

import { useRouter, usePathname } from "next/navigation";
import Image from 'next/image';
import Container from "../Container";
import Logo from "../Logo";
import NavigationButton from "./NavigationButton";
import BottomButton from "./BottomButton";

const Sidebar = () => {
    const router = useRouter();
    const pathname = usePathname();
    const homeIcon =
        <svg xmlns="http://www.w3.org/2000/svg" width="27" height="24" className={`${pathname === "/home" ? "stroke-[#8915E4]" : "stroke-[#D5D5D5]"} fill-none`}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.3" d="M2 13.25 13.5 2 25 13.25M5 14v7.111c0 .491.544.889 1.214.889h3.643c.67 0 1.214-.398 1.214-.889v-3.555c0-.491.544-.89 1.215-.89h2.428c.67 0 1.215.399 1.215.89v3.555c0 .491.543.889 1.214.889h3.643c.67 0 1.214-.398 1.214-.889V14"/></svg>

    const analyticsIcon =
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="18" className={`${pathname === "/analytics" ? "fill-[#8915E4]" : "fill-[#D5D5D5]"} stroke-none`}>
            <path  fill-rule="evenodd" d="M13.562 18c-.074 0-.15-.003-.226-.011-.968-.098-1.727-.797-1.936-1.78L8.45 2.268 5.41 9.446a1.102 1.102 0 0 1-1.01.679H1.1C.492 10.126 0 9.622 0 9c0-.622.492-1.125 1.1-1.125h2.578l2.757-6.512C6.825.446 7.685-.088 8.664.012c.968.098 1.727.796 1.936 1.78l2.95 13.94 3.04-7.179a1.1 1.1 0 0 1 1.01-.677h3.3c.608 0 1.1.503 1.1 1.125 0 .62-.492 1.125-1.1 1.125h-2.578l-2.757 6.51c-.36.848-1.13 1.364-2.003 1.364Z" clip-rule="evenodd"/></svg>

    const insightsIcon =
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="24" className={`${pathname === "/insights" ? "fill-[#8915E4]" : "fill-[#D5D5D5]"} stroke-none`}>
            <path fill-rule="evenodd" d="M4.654 8.681C1.943 11.615 2 16.264 4.826 19.144a7.185 7.185 0 0 0 5.166 2.188h.007a7.218 7.218 0 0 0 5.183-2.188c2.877-2.932 2.871-7.7-.012-10.628l-3.984-4.07c-.403 3.311-1.645 6.216-3.857 6.216-.678 0-1.783-.301-2.675-1.98ZM9.999 24h-.01a9.825 9.825 0 0 1-7.07-2.99C-.968 17.048-.974 10.602 2.907 6.647L4.22 5.322a1.335 1.335 0 0 1 2.24.606c.307 1.185.672 1.768.874 1.99.474-.5 1.33-2.515 1.33-5.925 0-.197 0-.382-.01-.567a1.335 1.335 0 0 1 .41-1.051c.53-.503 1.379-.503 1.887.02l6.124 6.254c3.896 3.953 3.902 10.4.013 14.362C15.194 22.94 12.677 24 10 24Z" clip-rule="evenodd"/>
        </svg>

    const integrationsIcon =
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="22" className={`${pathname === "/integrations" ? "stroke-[#8915E4]" : "stroke-[#D5D5D5]"} fill-none`}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.3" d="M12.835 15.93h4.644M5.096 2h15.478a3.096 3.096 0 0 1 3.096 3.096v12.383a3.096 3.096 0 0 1-3.096 3.095H5.096A3.096 3.096 0 0 1 2 17.478V5.097A3.096 3.096 0 0 1 5.096 2Z"/><path stroke="#D9D9D9" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.3" d="m6.644 14.383 3.095-3.096-3.095-3.096"/>
        </svg>


    return (
        <div className="fixed flex flex-col w-96 z-10 h-full border-r-[1px] border-[#F1F3F4]">
            <Container>
                <div className="gap-4 pr-8 pl-2">
                    <Logo />
                    <div
                        className="mt-16"
                    >
                        <NavigationButton
                            label="Home"
                            subtext="Your data at a glance"
                            onClick={() => router.push('/home')}
                            selected={pathname === "/home"}
                            icon={homeIcon}
                        />
                        <NavigationButton
                            label="Analytics"
                            subtext="Data-driven success, simplified"
                            onClick={() => router.push('/analytics')}
                            selected={pathname === "/analytics"}
                            icon={analyticsIcon}
                        />
                        <NavigationButton
                            label="Insights"
                            subtext="Insights for informed decisions"
                            onClick={() => router.push('/insights')}
                            selected={pathname === "/insights"}
                            icon={insightsIcon}
                        />
                        <NavigationButton
                            label="Integrations"
                            subtext="Coming soon"
                            onClick={() => router.push('/integrations')}
                            selected={pathname === "/integrations"}
                            icon={integrationsIcon}
                        />
                    </div>
                    <div
                        className="divide-y py-4 absolute bottom-20 w-[75%]"
                    >
                        <BottomButton
                            label="Manage Team"
                            onClick={() => {}}
                        />
                        <BottomButton
                            label="Settings"
                            onClick={() => {}}
                        />
                        <BottomButton
                            label="Customer Support"
                            onClick={() => {}}
                        />
                        <BottomButton
                            label="Log Out"
                            onClick={() => {}}
                            red
                        />
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Sidebar;
