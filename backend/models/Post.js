import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
    {
        comunidade: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Comunidade', 
            required: true 
        },
        
        autor: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User', 
            required: true 
        },
        
        titulo: { 
            type: String, 
            required: true 
        },
        
        conteudo: { 
            type: String, 
            required: true 
        },
    },
    { 
        timestamps: true 
    }
);

const Post = mongoose.model('Post', postSchema);

export default Post;
