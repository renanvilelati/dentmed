import { ReactNode } from 'react';

const PageContainer = ({ children }: { children: ReactNode }) => {
  return <div className="mx-auto px-2">{children}</div>;
};

export default PageContainer;
