"use client"

import { useRouter } from "next/navigation";
import Container from "../Container";
import Logo from "../Logo";
import NavigationButton from "./NavigationButton";
import BottomButton from "./BottomButton";

const Sidebar = () => {
    const router = useRouter();
    return (
        <div className="fixed flex flex-col w-96 bg-white z-10 shadow-sm h-full border=blue border-[1px]">
            <div className="px-2 border-b-[1px]">
                <Container>
                    <div className="flex flex-col gap-4 border-black border-[1px] pr-8 pl-2">
                        <Logo />
                        <div>
                            <NavigationButton
                                label="Home"
                                subtext="Your data at a glance"
                                onClick={() => router.push('/home')}
                            />
                            <NavigationButton
                                label="Analytics"
                                subtext="Data-driven success, simplified"
                                onClick={() => router.push('/analytics')}
                            />
                            <NavigationButton
                                label="Insights"
                                subtext="Insights for informed decisions"
                                onClick={() => router.push('/insights')}
                            />
                            <NavigationButton
                                label="Integrations"
                                subtext="Coming soon"
                                onClick={() => router.push('/integrations')}
                            />
                        </div>
                        <div
                            className="flex flex-col divide-y py-4"
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
        </div>
    )
}

export default Sidebar;
