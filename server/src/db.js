import Sequelize from 'sequelize';

 const sequelize = new Sequelize(
        `postgres://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
        {
            dialect: 'postgres',
            dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
            },
        }
        );


const connectDB = async () => {
    try {
       
        await sequelize.authenticate();
        console.log('✅ Connected to Supabase PostgreSQL');
    } catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1); // Exit the process with failure
        
    }
}

export { connectDB, Sequelize };
export default sequelize;