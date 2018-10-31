const request = require('supertest');
const { Planet } = require('../../models/planet');
let server;

describe('/api/planets', () => {
    beforeEach(() => { server = require('../../index'); })
    afterEach(async () => { 
        server.close(); 
        await Planet.deleteMany({});
    })

    let addAPlanet = async () =>{
        const planet = new Planet({ name: 'Alderaan', climate: 'temperate', terrain: 'grasslands, mountain'});
        return await planet.save();
    }

    describe('GET /', () => {
        it('should return all planets', async () => {
            await Planet.collection.insertMany([
                { name: 'Alderaan', climate: 'temperate', terrain: 'grasslands, mountain'},
                { name: 'Yavin IV', climate: 'temperate, tropical', terrain: 'jungle, rainforest'},
                { name: 'Hoth', climate: 'frozen', terrain: 'tundra, ice caves, mountain ranges'}
            ]);
            const res = await request(server).get('/api/planets');
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(3);
        });
    });
    
    describe('GET /?name=[name]', () => {
        it('should return a planet with the same name informed', async () => {
            const planet = await addAPlanet();
            const res = await request(server).get(`/api/planets/?name=${planet.name}`);

            expect(res.status).toBe(200);
            expect(res.body.length).toBe(1);
            expect(res.body[0]).toHaveProperty('name', planet.name);
        });
    });

    describe('GET /:id', () => {
        it('should return a planet if valid id is passed', async () => {
            const planet = await addAPlanet();
            const res = await request(server).get(`/api/planets/${planet._id}`);
            
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('name', planet.name);
            expect(res.body).toHaveProperty('climate', planet.climate);
            expect(res.body).toHaveProperty('terrain', planet.terrain);
        });
        
        it('should return 404 if invalid id is passed', async () => {
            const res = await request(server).get('/api/planets/1');
            expect(res.status).toBe(404);
        });
    })
    
    describe('POST /', () => {
        it('should return the planet if it is valid', async () => {

            const res = await request(server)
                .post('/api/planets/')
                .send({ name: 'Alderaan', climate: 'temperate', terrain: 'grasslands, mountain'})
            
            expect(res.body).toHaveProperty('_id');
            expect(res.body).toHaveProperty('name', 'Alderaan');
        });
        
        it('should return 400 if the planet is already registered', async () => {
            const planet = await addAPlanet();
            const res = await request(server)
                .post('/api/planets/')
                .send({ name: 'Alderaan', climate: 'temperate', terrain: 'grasslands, mountain'})
            
            expect(res.status).toBe(400);
        });
    });
    
    describe('DELETE /:id', () => {
        it('should return the deleted planet', async () => {
            const planet = await addAPlanet();
            const res = await request(server)
                .delete(`/api/planets/${planet._id}`);
            
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('name', planet.name);
            expect(res.body).toHaveProperty('climate', planet.climate);
            expect(res.body).toHaveProperty('terrain', planet.terrain);
        });

        it('should return 404 if invalid id is passed', async () => {
            const res = await request(server)
                .delete('/api/planets/1');
                
            expect(res.status).toBe(404);
        });
    });
});