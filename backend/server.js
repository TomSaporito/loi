const Hapi = require('hapi');
const Inert = require('inert');//utilities for serving files
const path = require('path');
const Vision = require('vision');
const Boom = require('boom');
const pg = require('pg');
const conString = "postgres://tom:today@localhost:5432/lords_of_insanity";

const client = new pg.Client(conString);
client.connect();

const server = Hapi.server({
    port: 4000
});

let utilities = async (param) => {
    console.log('in ut ', param )
    if (param){
        return await client.query(`SELECT * from utility WHERE ID = ${param}`);
    } else {
        return await client.query("SELECT * from utility ORDER BY id ASC");
    }
};

let ministries = async (param) => {
    if (param){
        return await client.query(`SELECT * from ministry WHERE ID = ${param}`);
    } else {
        return await client.query("SELECT * from ministry ORDER BY id ASC");
    }
};

let updateUtility = async (id, col, val) => {
    await client.query(`UPDATE utility SET ${col}=${val} WHERE id = ${id}`);
    return await utilities();
};







const start = async ()=> {
    await server.register(Inert);
    await server.register(Vision);

    // server.views({
    //     relativeTo: path.join(__dirname, '../frontend/public')//,
    //     // engines: {
    //     //     hbs: require('handlebars')
    //     // },
    //     // isCached: false
    // })

    await server.start();
    console.log(`Starting server listening on %s ${server.info.uri}`);
    registerRoutes();
}

function registerRoutes(){


    server.route({
        method: 'GET',
        path: '/{p*}',
        handler: {
            directory: {
                path: path.join(__dirname, 'public')
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/ministries/{id?}',
        handler: async function(req, res){
            let id = parseInt(req.params.id) > 0 ? encodeURIComponent(parseInt(req.params.id)) : null;
            console.log(id);
            let min = await ministries(id);
            // console.log(ut.rows);
            //with v 17+ of hapi you just return the js object and it return json
            return{
                ministries: min.rows
            };
        }
    });


    server.route({
        method: 'POST',
        path: '/utilities/{id?}',
        handler: async function(req, res){
            const id = parseInt(req.params.id) > 0 ? encodeURIComponent(parseInt(req.params.id)) : null;
            const col = Object.keys(req.payload)[0];
            const val = req.payload[col];
            const ut = await updateUtility(id, col, val);
            //with v 17+ of hapi you just return the js object and it return json
            return{
                utilities: ut.rows
            };
        }
    });


    server.route({
        method: 'GET',
        path: '/utilities/{id?}',
        handler: async function(req, res){
            
            let id = parseInt(req.params.id) > 0 ? encodeURIComponent(parseInt(req.params.id)) : null;
            console.log(id);
            let ut = await utilities(id);
    
            // console.log(ut.rows);
            //with v 17+ of hapi you just return the js object and it return json
            return{
                utilities: ut.rows
            };
        }
    });


    server.route({
        method: 'GET',
        path: '/about',
        handler: function(req, res){
            return res.view('about', {title: 'About'});
        }
    });

    server.route({
        method: 'GET',
        path: '/posts/{id}',
        handler: (req, res) => {
            console.log(req.params.id)
            const id = req.params.id;
            const post = posts[id -1];

            if (!post){
                throw Boom.notFound();
            }

            console.log(post)

            return res.view('home');
        }
    });
}

start();