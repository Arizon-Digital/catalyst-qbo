import { redirect } from 'next/navigation';

module.exports = {
    async redirects() {
      return [
        {
          source: '/',        
          destination: '/home', 
          permanent: true,    
        },
      ];
    },
  };
  