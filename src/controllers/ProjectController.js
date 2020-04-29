const knex = require('../database')

module.exports = {
    async index (req,res){
        const { user_id, page = 1 } = req.query
        const query = knex('projects').limit(5).offset((page-1) * 5);

        const counts = knex('projects').count();

        if(user_id){
            query
            .join('users', 'users.id', '=', 'projects.user_id')
            .select('projects.*', 'users.username')
            .where({user_id})

            counts
            .where({ user_id })
        }

       
        const [count] = await counts;

        res.header('X-Total-Count',count["count"])

        const results = await query

        return res.json(results);
    },

    async create (req,res,next){
        try {
            const { title, user_id } = req.body;
            await knex('projects').insert({ user_id, title });

            return res.status(201).send();

        } catch (error) {
            next(error)
        }
    },

    async delete (req,res,next){
        try {
            const { id } = req.params;
            
            await knex('projects').delete().where({ id });

            return res.send();
        } catch (error) {
            next(error);
        }
    }

   

    
}