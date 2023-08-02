import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const usePathHistory = () => {
  //const history = useHistory();


  let location = useLocation();
  useEffect(() => {
     console.log('NAV', location);
  }, [location]);
  
 return () => {
  console.log('listening')
 }, [location]
  

}

export default usePathHistory;