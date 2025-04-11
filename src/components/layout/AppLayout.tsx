
import React from 'react';
import TopNavigation from './TopNavigation';
import BottomNavigation from './BottomNavigation';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-bjt-background flex flex-col">
      <TopNavigation />
      <main className="flex-1 p-4 md:p-6 pb-20 md:pb-6">
        {children}
      </main>
      <BottomNavigation />
    </div>
  );
};

export default AppLayout;
