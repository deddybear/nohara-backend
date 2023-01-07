import Caraousel from "../models/Caraousel";

export const getListData = async(req, res) => {
    try {
        const response = await Caraousel.query();
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
    }
}