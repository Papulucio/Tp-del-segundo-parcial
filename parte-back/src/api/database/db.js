import {Sequelize} from "sequelize";
import enviroments from "../config/enviroments.js";

const {database} = enviroments;

const sequelize = new Sequelize(database.name, database.user, database.password, {
    host: database.host,
    dialect: "mysql",
    logging: false,
    define: {
        timestamps: false,
        underscored: true
    }
})

const connectDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log("conectado a la BD")
    } catch (error) {
        console.log(error)
        throw error;
    }
}

export default sequelize;