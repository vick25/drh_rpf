import axios from 'axios';

const token = process.env.TOKEN;
const assetID = process.env.ASSETID;

export const fetchKoboForms = async () => {
    const url = "https://kf.kobotoolbox.org/api/v2/assets.json"; // Replace with your actual kpi URL
    const headers = { "Authorization": `Token ${token}` };
    try {
        const response = await axios.get(url, { headers: headers });
        // console.log(response.data);
        return response.data.results;
    } catch (error) {
        if (!error.response)
            console.error(`Error: ${error.message}`);

        console.error(error.response.data);
        console.error(error.response.status);
        console.error(error.response.headers);
    }
};

export const fetchFormData = async (formId) => {
    //https://kf.kobotoolbox.org/api/v2/assets/${formId}/data.json
    const headers = { "Authorization": `Token ${token}` };
    try {
        const response = await axios.get(`https://kf.kobotoolbox.org/api/v2/assets/${formId}/data/`, { headers: headers });
        return response.data;
    } catch (error) {
        console.error('Error fetching form data:', error);
    }
};

export const fetchFormUniqueData = async (formUniqueId) => {
    const headers = { "Authorization": `Token ${token}` };
    try {
        const response = await axios.get(`https://kf.kobotoolbox.org/api/v2/assets/${assetID}/data/`, { headers: headers });
        const assets = response.data.results;
        // console.log(assets.find(res => res._id === Number(formUniqueId)));

        return assets.find((asset) => asset._id == Number(formUniqueId));
    } catch (error) {
        console.error('Error fetching form data:', error);
    }
};