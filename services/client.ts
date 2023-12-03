import axios from 'axios';

const expoUrl = '10.0.65.202';
const mobileHotspotUrl = '192.168.43.119';
const defaultUrl = 'localhost';
const homeUrl = '192.168.68.67';
const outsideUrl = '192.168.0.140';
const outsideUrl2 = '192.168.1.80'

const client = axios.create({ baseURL: `http://${outsideUrl2}:8080` });

export default client;
