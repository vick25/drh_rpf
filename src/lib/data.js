import axios from 'axios';

const token = process.env.TOKEN;
const assetID = process.env.ASSETID;
const headers = { "Authorization": `Token ${token}` };

export const fetchKoboForms = async () => {
    const endpoint = "https://kf.kobotoolbox.org/api/v2/assets.json"; // Replace with your actual kpi URL
    try {
        // const response = await axios.get(endpoint, { headers: headers });
        const response = await fetch(endpoint, { headers: headers }, { next: { revalidate: 60 } });
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
    try {
        const response = await axios.get(`https://kf.kobotoolbox.org/api/v2/assets/${formId}/data/`, { headers: headers });
        const forms = await response.data.results.filter(obj => regex.test(obj['group_hs1kr38/province']));
        const count = forms.length;

        // console.log(count, forms)

        const paginatedData = forms.slice(
            (page - 1) * itemsPerPage,
            page * itemsPerPage
        );
        // console.log(paginatedData);

        // console.log(response.data); 
        return { count, paginatedData, forms };
        // return response.data;
    } catch (error) {
        console.error('Error fetching form data:', error);
    }
};

export const fetchFormUniqueData = async (formUniqueId) => {
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
    try {
        const response = await fetch(`https://kf.kobotoolbox.org/api/v2/assets/${assetID}/data.geojson/`, { headers: headers }, { next: { revalidate: 600 } });
        const assets = await response.json();
        return assets;
    } catch (error) {
        console.error('Error fetching form data:', error);
    }
}

export const getFormDatas = async () => {
    try {
        const response = await axios.get(`https://kf.kobotoolbox.org/api/v2/assets/${assetID}/data/`, { headers: headers });
        return response.data.results;
    } catch (error) {
        console.error('Error fetching form data:', error);
    }
};