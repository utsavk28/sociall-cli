import React, { useState, useEffect } from 'react';
import { Text, Box, useInput } from 'ink';
import Link from 'ink-link';
import Loader from '../../../utils/loader';
import { ig } from "../../../utils/api-clients"
const config = require("../../../config.json")

const InstagramFollowers = () => {
    const [isLoading, setLoading] = useState(true);
    const [followers, setFollowers] = useState([]);
    const [pg, setPg] = useState(1);
    const [totalPageLength, setTotalPageLength] = useState(1)


    useEffect(() => {
        (async () => {
            try {
                const auth = await ig.account.login(config['instagram']['username'], config['instagram']['password']);
                const followers = ig.feed.accountFollowers(auth.pk);
                const items = await followers.items();
                var arr = []
                for (let i = 0; i < items.length; i++) {
                    const username = items[i].username, full_name = items[i].full_name
                    const url = "https://www.instagram.com/" + username

                    const ans = <Box key={arr.length} borderStyle="round" borderColor="red" paddingLeft={2} flexDirection="column" width="90%" alignSelf="center">
                        <Text bold>{arr.length + 1}. <Link url={url} >{username}</Link></Text>
                        <Text>{full_name}</Text>
                    </Box>
                    arr.push(ans)
                }
                setFollowers(arr)
                const totalPages = Math.ceil(arr.length / 5);
                setTotalPageLength(totalPages);
                setLoading(false)
            } catch (e) {
                console.log(e)
            }
        })();
    }, []);


    useInput((input, key) => {
        if (input === "q" || input === "Q") {
            process.exit();
        } else if (key.upArrow) {
            setPg(Math.max(1, pg - 1));
        } else if (key.downArrow) {
            setPg(Math.min(pg + 1, totalPageLength));
        }
    });



    if (isLoading) {
        return <Loader message=" Fetching Instagram Followers ..." type="dots" />
    }
    else {
        return (
            <>
                <Box borderStyle="round" borderColor="#00FFFF" flexDirection="column" width="95%" alignSelf="center" alignItems="center">
                    {followers.slice((pg - 1) * 5, pg * 5).map((x, index) => {
                        return x;
                    })}
                    <Text>{pg != 1 && "\u25C0\uFE0F"}  Page : {pg} {pg != totalPageLength && "\u25B6\uFE0F"}</Text>
                </Box>
            </>
        );
    }
}

export default InstagramFollowers