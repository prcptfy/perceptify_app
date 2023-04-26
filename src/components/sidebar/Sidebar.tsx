"use client"

import { useRouter } from "next/navigation";
import Container from "../Container";
import Logo from "../Logo";
import NavigationButton from "./NavigationButton";
import BottomButton from "./BottomButton";

const Sidebar = () => {
    const router = useRouter();
    return (
        <div className="fixed flex flex-col w-96 z-10 h-full">
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
