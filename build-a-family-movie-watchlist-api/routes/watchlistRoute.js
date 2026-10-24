import { authenticate } from "../middleware/authenticate.js";
import { getWatchlist, addMovie, updateMovie, deleteMovie } from "../utils/db.js";
import { authorizeModification } from "../middleware/authorize.js";
import express from "express";
const router = express.Router();

router.use(authenticate);

router.get("/:userId", (req, res) => {
    const userWatchList = getWatchlist(parseInt(req.params.userId));
    return res.status(200).json({ userWatchList })
})

router.post("/:userId/movies", authorizeModification, (req, res) => {
    const targetUserId = Number(req.params.userId);
    const requesterId = Number(req.user.id);
    const role = req.user.role;

    // Parents can modify any user's watchlist.
    // Children can modify only their own watchlist.
    if (role !== "parent" && targetUserId !== requesterId) {
        return res.status(403).json({
            error: "Not authorized"
        });
    }

    const movieData = req.body;

    addMovie(targetUserId, movieData);

    return res.status(201).json({
        message: "Movie added to watchlist"
    });
})


router.put("/:userId/movies/:movieId", authorizeModification, (req, res) => {
    const requesterId = Number( req.user.id);  
    const targetUserId = Number(req.params.userId);
    const movieId = Number(req.params.movieId);
    const role = req.user.role; 

    if(role !== "parent" && requesterId !== targetUserId){
        return res.status(403).json({ message : "unauthorized request"})
    }
    updateMovie(targetUserId, movieId, req.body)
    return res.status(200).json({ message : "update successful"});
})


router.delete("/:userId/movies/:movieId", authorizeModification , (req, res) => {
    const requesterId = Number(req.user.id);
    const targetUserId = Number(req.params.userId)
    const movieId = Number(req.params.movieId)
    const role = req.user.role;

    if( role !== "parent" && requesterId !== targetUserId){
        return res.status(403).json({ error : "cannot delete this at moment"})
    }
    deleteMovie(targetUserId, movieId);
    res.status(200).json({ message : "movie succesfully removed"})
})



export default router;