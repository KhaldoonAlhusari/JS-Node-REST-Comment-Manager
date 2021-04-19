const { render } = require("ejs");
const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

let comments = [
    {
        id: 1,
        username: "Todd",
        comment: "can you guys just please stop talking thank you"
    },
    {
        id: 2,
        username: "John",
        comment: "Hello guys my name is john pls check my yt channel i play among us "
    },
    {
        id: 3,
        username: "soundCloudRapper34",
        comment: "ahaha my name is in camel case because i do be droppin code-bars... get it? code? cold? code-bars? nevermind please send help"
    },
    {
        id: 4,
        username: "jimmy138",
        comment: "Can we all just pretend to not see todd's comments?"
    }
]

app.get("/comments", (req, res) => {
    // LIST ALL COMMENTS
    res.render("comments/index", { comments });
});

app.get("/comments/new", (req, res) => {
    // FORM TO CREATE A NEW COMMENT
    res.render("comments/new");
});

app.post("/comments", (req, res) => {
    // CREATE A NEW COMMENT
    let newComment = req.body;
    newComment.id = comments.length + 1;
    console.log(newComment)
    comments.push(newComment);
    res.redirect("/comments");
});

app.get("/comments/:id", (req, res) => {
    // DISPLAY CERTAIN COMMENT USING ID
    const { id } = req.params;
    const comment = comments.find(comment => comment.id === parseInt(id));
    res.render("comments/comment", { comment });
});

app.get("/comments/:id/edit", (req, res) => {
    // FORM TO UPDATE CERTAIN COMMENT USING ID
    const { id } = req.params;
    const comment = comments.find(comment => comment.id === parseInt(id));
    res.render("comments/update", { comment });
});

app.patch("/comments/:id", (req, res) => {
    // UPDATE CERTAIN COMMENT USING ID
    const { id } = req.params;
    const newCommentText = req.body.comment;
    const comment = comments.find(comment => comment.id === parseInt(id));
    comment.comment = newCommentText;
    res.redirect("/comments");
});

app.delete("/comments/:id", (req, res) => {
    // DELETE CERTAIN COMMENT USING ID
    const { id } = req.params;
    comments = comments.filter(comment => comment.id !== parseInt(id));
    res.redirect("/comments");
});

app.delete("/comments", (req, res) => {
    // DELETE ALL COMMENTS
    comments = [];
    res.redirect("/comments");
});

app.listen(3000, () => {
    console.log("Listening on port 3000.");
});