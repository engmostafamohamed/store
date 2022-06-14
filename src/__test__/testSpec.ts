import supertest from "supertest";
import app from '../index';

//create a request object
const request=supertest(app);

describe('Test End Endpoint server',()=>{
    it('Get the/endpoint',async ()=>{
        const response =await request.get('/');
        // console.log(response);
        expect(response.status).toBe(200);
        
    });
})