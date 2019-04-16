
export default {
    list: (req, res, next) => {
      res.status(200).send({
        message: `GET ROUTE FOR COMMENTS - for  postId:${req.postId}`
      })
    },
    create: (req, res, next) => {
      res.status(200).send({
        message: `POST route for comments for postID: ${req.postId}`
      })
    },
    delete: (req, res, next) => {
      res.status(200).send({
        message: `DELETE route for comments for postID: ${req.postId}`
      })
    }
  }