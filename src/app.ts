import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import globalErrorHandler from './app/middlewares/globalErrorHandlers'
import routes from './app/routes'
import httpStatus from 'http-status'
// import ApiErrors from './errors/ApiErrors'
const app: Application = express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Application Route.
app.use('/api/v1/', routes);

// Global Error handler
app.use(globalErrorHandler);

// Handle not found route
app.use((req:Request, res: Response, next: NextFunction)=>{
    res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: 'API is not found',
        errorMessages: [
            {
                path: req.originalUrl,
                message: `${req.originalUrl} is not found`
            }
        ]
    })
    next();
})


// const testId = async () =>{
//     const testId = await generateFacultyId();
//     console.log(testId);
// }
// testId();


export default app
