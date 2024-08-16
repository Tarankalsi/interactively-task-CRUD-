import express, { Application } from 'express';
import contactRoutes from './routes/contact';
import connection from './db';


const PORT = 3000;

const app: Application = express();


app.use(express.json());

// Routes
app.use('/api', contactRoutes);

connection.query('SELECT 1').then(() => {
    console.log("MySQL database connected")
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}).catch((error)=>{
    console.log(error)
})




