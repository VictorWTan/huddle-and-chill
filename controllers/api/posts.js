const Post = require('../../models/post')
const User = require('../../models/user')
const Reply = require('../../models/post')

const index = async (req, res) => {
    console.log('Get current user posts')
    // Find the user in the collection with the name matching session user
    User.findOne({name: req.user.name}, (error, user) => {
        // If error, show error
        if (error) {
            console.log(error)
            res.json(error)
        }
        // Otherwise render all of the user's posts
        else {
            console.log(res.json(user.posts))
        }
    })
}

const show = async (req, res) => {
    console.log('Get single post')
    // Find the post with the id in the parameters
    Post.findOne({_id: req.params.id}, (error, data) => {
        if (error) {
            console.log(error)
            res.json(error)
        }
        else {
            console.log(data)
            res.json(data)
        }
    })
}

const savePost = async (req, res) => {
    console.log('Saving post')
    console.log(req.user.name)
    console.log(req.body)

    // Create a post with the name of the user and the content from the form
    Post.create({
        name: req.user.name,
        content: req.body.content,
    }, (error, post) => {
        if (error) {
            console.log(error)
            res.json(error)
        }
        else {
            // If it's created, push the id of the post into the user's post collection
            User.updateOne({name: req.user.name}, {$push : {posts: post._id}}, (error) => {
                if (error) {
                    console.log(error)
                    res.json(error)
                }
                else {
                    console.log('Saved post id to user')
                    console.log(post._id)
                }
            })
        }
    })
}

const editPost = async (req, res) => {
    console.log(req.body)
    Post.updateOne({_id: req.body._id}, {$set: {content: req.body.content}}, (error) => {
        if (error) {
            console.log(error)
            res.json(error)
        }
        else {
            console.log('Updated Post')
        }
    })
}

const deletePost = async (req, res) => {
    console.log('Running delete')
    Post.findOneAndDelete({_id:req.params.id}, (error, data) => {
        if (error) {
            console.log(error)
            res.json(error)
        }
        else {
            console.log(data)
            res.json(data)
        }
    })
}

const deletePostFromUser = async(req, res) => {
    console.log('Deleting Post Id from User')
    User.updateOne({name: req.user.name}, {$pull: {posts: req.params.id}}, (error, data) => {
        if (error) {
            console.log(error)
            res.json(error)
        }
        else {
            console.log(data)
            res.json(data)
        }
    })
}

const getAllPosts = async (req, res) => {
    console.log('Getting all current posts')
    Post.find({}, (error, data) => {
        if (error) {
            console.log(error)
            res.json(error)
        }
        else {
            console.log(data)
            res.json(data)
        }
    })
}

const addReply = async (req, res) => {
    console.log('Adding Reply')
    console.log(req.body)
    Post.updateOne({_id: req.params.id}, {$push: {replies: {name: req.body.name, content: req.body.content}}}, (error, data) => {
        if (error) {
            console.log(error)
            res.json(error)
        }
        else {
            console.log(data)
            res.json(data)
        }
    })
} 

module.exports = {
    index,
    show,
    savePost, 
    editPost,
    deletePost,
    getAllPosts,
    addReply,
    deletePostFromUser
}

