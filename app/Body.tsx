'use client';

import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false },
  },
});

const Body = ({ children }: { children: React.ReactNode }) => {
  return (
    <body>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </body>
  );
};

export default Body;
