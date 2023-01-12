import Caraousel from "../models/Caraousel";

export const getListData = async(req, res) => {
    try {
        // const response = await Caraousel.query();
        const response = 'ok';
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json(error);
    }
}