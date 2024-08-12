import axios from 'axios';

export const saveData = async (mappedData) => {
    try {
        const response = await axios.post('http://localhost:5000/api/saveData', { mappedData });
        return response.data;
    } catch (error) {
        console.error('Error saving data:', error);
        throw error;
    }
};
