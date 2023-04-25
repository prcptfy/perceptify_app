"use client"

import Container from "../Container";
import Logo from "../Logo";

const Sidebar = () => {
    return (
        <div className="fixed w-96 bg-white z-10 shadow-sm h-full">
            <div className="px-2 border-b-[1px]">
                <Container>
                    <div className="flex flex-col gap-3">
                        <Logo />
                        {/* <HomeButton />
                        <AnalyticsButton />
                        <InsightsButton />
                        <IntegrationsButton /> */}
                    </div>
                </Container>
            </div>
        </div>
    )
}

export default Sidebar;
