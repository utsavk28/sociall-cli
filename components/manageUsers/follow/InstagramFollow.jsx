import React, { useState, useEffect } from 'react';
import { Text, Box, useInput } from 'ink';
import Link from 'ink-link';
import Loader from '../../../utils/loader';
import { ig } from "../../../utils/api-clients"
const config = require("../../../config.json")

const InstagramFollow = (props) => {
    const [isLoading, setLoading] = useState(true);
    const [feeds, setFeeds] = useState([]);
    const [pg,setPg] = useState(1)

    useEffect( () => {
        (async () => {
            try {
                const auth = await ig.account.login(config['instagram']['username'], config['instagram']['password']);
                const followers = ig.friendship.create();
                const items = await followers;
                // var arr = []
                // for(let i = 0;i<items.length;i++)
                // {
                //     const username = items[i].username,full_name=items[i].full_name
                //     const url="https://www.instagram.com/"+username

                //       const ans = <Box key={arr.length} borderStyle="round" borderColor="red" paddingLeft={2} flexDirection="column" width="90%" alignSelf="center">
                //             <Text bold>{arr.length +1}. <Link url={url} >{username}</Link></Text>
                //             <Text>{full_name}</Text>
                //         </Box>
                //   arr.push(ans)
                // }
                setFeeds(items)
                setLoading(false)
            } catch(e) {
                console.log(e)
            }
        })();
    }, []);


    
    

    if (isLoading) {
        return <Loader message=" Fetching Instagram Followers ..." type="dots" />
    }
    else {
        console.log(feeds);
        return (
            <>
                <Box borderStyle="round" borderColor="#00FFFF" flexDirection="column" width="95%" alignSelf="center" alignItems="center">
                    {/* {feeds.slice((pg-1)*10,(pg*10)).map((x, index) => {
                        return x
                    })}
                    <Text>Page : {pg}</Text> */}
                </Box>
            </>
        );
    }
}

export default InstagramFollow