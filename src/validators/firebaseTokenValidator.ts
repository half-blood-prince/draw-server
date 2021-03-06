import { NextFunction, Response } from 'express';
import firebaseAdmin from '../firebase/firebase'
import ErrorResponse from '../models/ErrorResponse';

const firebaseTokenValidator = function (req: any, res: Response, next: NextFunction) {

    const userToken = req.body.userToken

    if (!userToken) {
        res.status(422).json(ErrorResponse.createErrorResponse(422, "Missing user token"))
        return;
    }
    next()
}


export default firebaseTokenValidator;