import { ReactNode } from 'react';
import { AppSidebar } from './_components/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

const ProtectedLayout = ({ children }: { children: ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar>{children}</AppSidebar>
    </SidebarProvider>
  );
};

export default ProtectedLayout;
