import { FC, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { NavigationPanel } from '../../widgets/navigationPanel';
import { HideNavigationPanelButton } from '../../features';

export const Layout: FC = () => {
    const [isNavVisible, setIsNavVisible] = useState(true);

    return (
        <div className='flex h-svh bg-neutral-200'>
            <div className={`flex relative transition-all duration-300 ease-in-out ${isNavVisible ? 'translate-x-0' : '-translate-x-full'}`}>
                <NavigationPanel />
                <HideNavigationPanelButton
                    state={isNavVisible}
                    setState={setIsNavVisible} 
                />
            </div>
            <div className='py-[30px] px-[20px] flex items-center w-full'>
                <Outlet />
            </div>         
            
        </div>
    );
};