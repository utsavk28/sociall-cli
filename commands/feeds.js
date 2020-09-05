import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Text} from 'ink';
import Loader from '../utils/loader';
import { octokit, twit} from '../utils/api-clients';

/**
    Fetch Latest Twitter Feeds
 */
const TwitterFeeds = () => {
    const [isLoading, setLoading] = useState(true);
    const [feeds, setFeeds] = useState({});

    useEffect(() => {
        twit.get('statuses/home_timeline', {count: 20})
        .then(res => {
            console.log(res.data);
            setFeeds(res.data);
            setLoading(false);
        })
        .catch(err => {
            console.log(err);
        });
    });

    // if(isLoading) {
        return <Loader message=" Fetching Twitter feeds..." type="dots" />;
    // }
}

/**
    Fetch Latest Github Feeds
 */
const GithubFeeds = () => {
    const [isLoading, setLoading] = useState(true);
    const [feeds, setFeeds] = useState({});

    useEffect(() => {
        octokit.request('GET /events')  /* GET /feeds --> to get feeds */
        .then(res => {
            console.log(res.data);
            setFeeds(res.data);
            setLoading(false);
        })
        .catch(err => {
            console.log(err);
        });
    });

    // if(isLoading) {
        return <Loader message=" Fetching Github feeds..." type="dots" />
    // }
}

/// Get Latest Feeds command
const Feeds = ({platform}) => {
    if(platform.includes('github')) {
        return <GithubFeeds />;
    }
    else if(platform.includes('twitter')) {
        return <TwitterFeeds />
    }
    return <Text>Hello, {platform} </Text>;
};

Feeds.propTypes = {
	/// Name of the Platform to fetch Feeds
	platform: PropTypes.string.isRequired
};

Feeds.shortFlags = {
    platform: 'pf'
};

export default Feeds;