import axios from "axios";

/**
 * Get all projects from AWS DynamoDB
 *
 * @return {*} 
 */
export const getAllMenuItems = async () => {
    const URL = '/api/menu'
    try {
        const response = await axios.get(URL);
        return response.data;
    } catch (err) {
        console.log("Error", err);
    }
}