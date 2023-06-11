import axios from 'axios'
import { Category, Character, Gender, Med, Wool } from 'types/IPet'

const url = 'http://158.160.4.84:9000/pet'

const getPets = async (
    id: string,
    page?: number,
    size?: number,
    gender?: Gender,
    category?: Category,
    character?: Character,
    med?: Med,
    wool?: Wool) => {

    const axiosInstance = axios.create();

    axiosInstance.interceptors.request.use(config => {
        if(id !== '') {
            config.url = `${config.url}/${id}`;
        }
        return config;
    })

    const { data } = await axiosInstance(url, {
        params: {
            page: page,
            size: size,
            gender: gender,
            category: category,
            character: character,
            med: med,
            wool: wool
        }
    })
    return data
}
export default getPets