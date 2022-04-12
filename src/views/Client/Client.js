import React from 'react';
import { HeroUser } from '../../components/Hero';
// import Group from '../../components/Groups';
import AppCard from '../../components/AppCard';
import Paper from '@material-ui/core/Paper'
import { useLocation } from 'react-router-dom';

/**
 * @Component Client
 * @Description This component is the client's view.
 */

function Client() {

    let location = useLocation();
    console.log(location);
  
    useEffect(() => {{
    console.log(location);
      // let queries = queryString.parse(location.pathname)
      // console.log(queries)
    }}, [])
    return (
        <React.Fragment>
            <Paper>
                <HeroUser />
                {/* <Group /> */}
                <AppCard />
            </Paper>
        </React.Fragment>
    );
};

export default Client;