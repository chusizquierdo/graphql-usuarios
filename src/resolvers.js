import { tasks } from './sample';

import User from './models/User';

export const resolvers = {
    /**Consultamos los datos en el servidor */
    Query: {
        hello: () => {
            return "Hola Mundo con Graphql"
        },
        greet(root, args, context) {
            console.log(context);
            return `Hello ${args.name}`;
        },
        tasks() {
            return tasks;
        }, 
        async Users(){
            return await User.find();
        }       
    },

    /**Esto no es una consulta, es para modificar los datos en el servidor */

    Mutation: {
        createTask(_, { input }) {
            input._id = tasks.length; /**generamos un id basado en la longitud del arrelglo de tareas */
            tasks.push(input); /**con push agrego un elemento al final del arreglo */
            return input;
        },
        async createUser(_,{input}){
            const newUser=new User(input)            
            await newUser.save();
            return newUser;
        },
        async deleteUser(_,{_id}){
            return await User.findByIdAndDelete(_id);
        },
        async updateUser(_,{_id, input}){
            return await User.findByIdAndUpdate(_id,input, {new: true});
        }
    }
};