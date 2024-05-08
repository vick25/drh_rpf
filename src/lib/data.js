import axios from 'axios';

const token = process.env.TOKEN;
const assetID = process.env.ASSETID;

export const fetchKoboForms = async () => {
    const url = "https://kf.kobotoolbox.org/api/v2/assets.json"; // Replace with your actual kpi URL
    const headers = { "Authorization": `Token ${token}` };
    try {
        // const response = await axios.get(url, { headers: headers });
        const response = await fetch(url, { headers: headers });
        const data = await response.json();
        // console.log(await response.json());
        // console.log(response.data);
        return data.results;
    } catch (error) {
        if (!error.response)
            console.error(`Error: ${error.message}`);

        console.error(error.response.data);
        console.error(error.response.status);
        console.error(error.response.headers);
    }
};

export const fetchFormData = async (formId, q, page, itemsPerPage) => {
    //Search
    const regex = new RegExp(q, 'i');

    // Filter the array to find objects where the name property matches the regular expression
    // const filteredArray = paginatedData.filter(obj => regex.test(obj['group_hs1kr38/province']));

    //https://kf.kobotoolbox.org/api/v2/assets/${formId}/data.json
    const headers = { "Authorization": `Token ${token}` };
    try {
        const response = await axios.get(`https://kf.kobotoolbox.org/api/v2/assets/${formId}/data/`, { headers: headers });
        const count = await response.data.results.filter(obj => regex.test(obj['group_hs1kr38/province'])).length;
        const forms = await response.data.results.filter(obj => regex.test(obj['group_hs1kr38/province']));

        // console.log(count, forms)

        const paginatedData = forms.slice(
            (page - 1) * itemsPerPage,
            page * itemsPerPage
        );
        // console.log(paginatedData);

        // console.log(response.data); 
        return { count, paginatedData };
        // return response.data;
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

export const fetchGeoJsonData = async () => {
    const headers = { "Authorization": `Token ${token}` };
    try {
        const response = await fetch(`https://kf.kobotoolbox.org/api/v2/assets/${assetID}/data.geojson/`, { headers: headers });
        const assets = await response.json();
        return assets;
    } catch (error) {
        console.error('Error fetching form data:', error);
    }
}