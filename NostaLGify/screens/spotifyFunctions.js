import AsyncStorage from '@react-native-async-storage/async-storage';

async function fetchWebApi(endpoint, method, body, token) {
    const headers = {
        Authorization: `Bearer ${token}`,
    };
    let url = `https://api.spotify.com/${endpoint}`;
    if (method === 'GET' && body) {
        const queryParams = new URLSearchParams(body).toString();
        url += `?${queryParams}`;
    }
    const res = await fetch(url, {
        headers,
        method,
        body: method !== 'GET' ? JSON.stringify(body) : undefined,
    });
    return await res.json();
}

export async function getCurrentTrack(token) {
    return await fetchWebApi(
        'v1/me/player/currently-playing', 'GET', null, token
    );
}

export async function getUserInfo(token) {
    try {
        const response = await fetch('https://api.spotify.com/v1/me', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return await response.json();
    } catch (error) {
        console.error('Error fetching user info:', error);
        return null;
    }
}

export async function fetchCurrentUserInfo() {
    try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        if (accessToken) {
            return await getUserInfo(accessToken);
        } else {
            console.error('Access token not found in AsyncStorage');
            return null;
        }
    } catch (error) {
        console.error('Error fetching current user info:', error);
        return null;
    }
}

// Add more functions as needed

