import { CardTitle } from '@/components/ui/card';
import { ReactNode } from 'react';

const PageTitle = ({ children }: { children: ReactNode }) => {
  return <CardTitle className="text-3xl text-gray-500">{children}</CardTitle>;
};

export default PageTitle;
