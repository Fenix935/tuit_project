import connectDB from "../../../utils/connectDB";
import Routes from '../../../models/routesModel'

connectDB();

export default async (req, res) => {
    switch(req.method){
        case "POST":
            await createRoute(req, res)
            break;
        case "GET":
            await getRouteById(req, res)
            break;
    }
}

const createRoute = async (req, res) => {
    try {
        // const result = await auth(req, res)
        // if(result.role !== 'admin')
        //     return res.status(400).json({err: "Authentication is not valid."})

        const data = req.body;
        console.log(data)
        // if(!name) return res.status(400).json({err: "Name can not be left blank."})
        //
        const newCategory = new Routes(data)

        await newCategory.save()
        res.json({
            msg: 'Success! Created a new category.',
            newCategory
        })

    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}

const getRouteById = async (req, res) => {
    try {
        const {id} = req.query;
        console.log(id, 'id')

        const routes = await Routes.findById(id);
        console.log(routes, 'routes')

        res.json({routes})

    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}