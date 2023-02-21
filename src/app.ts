import express from 'express'
import cors from 'cors'
import { userRouter } from './Routes/userRouter'

export const app = express()

app.use(express.json())
app.use(cors())
app.use('/Users', userRouter)

app.listen(3003,()=>{console.log(`SERVER IS RUNNING IN PORT 3003`);
})