import { ReactNode } from 'react';
import { SidebarProvider } from '@/shared/components/ui/sidebar';
import { AppSidebar } from '@/shared/layout/protected/app-sidebar';

const ProtectedLayout = ({ children }: { children: ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar>{children}</AppSidebar>
    </SidebarProvider>
  );
};

export default ProtectedLayout;
