import axios from "axios";

export const fetchOneUserPermission = async (id) => {
    try {
        const oneData = await axios.get(`http://localhost:8050/ctoc/usermanage/user/permission/${id}`);
        return oneData;
    } catch (error) {
        return console.log(error.message);
    }
};
