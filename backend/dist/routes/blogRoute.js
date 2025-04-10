"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Blogs_1 = require("../controllers/Blogs");
const Authentication_1 = require("../middlewares/Authentication");
const CreateBlog_1 = require("../controllers/CreateBlog");
const blog_1 = require("../controllers/blog");
const blogComments_1 = require("../controllers/blogComments");
const updateVote_1 = require("../controllers/updateVote");
const upload_1 = require("../upload");
const UserBlogs_1 = require("../controllers/UserBlogs");
const Search_1 = require("../controllers/Search");
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
const router = express_1.default.Router();
router.get("/", Authentication_1.authentication, Blogs_1.Blogs);
router.get("/search", Search_1.searchBlogs);
router.post("/createBlogs", Authentication_1.authentication, CreateBlog_1.CreatBlog);
router.get("/userblogs", Authentication_1.authentication, UserBlogs_1.UserBlogs);
router.get("/comments/:blogId", Authentication_1.authentication, blogComments_1.blogComments);
router.get("/:blogId", Authentication_1.authentication, blog_1.blog);
router.post("/b/:blogId", Authentication_1.authentication, updateVote_1.updateVoteBlog);
router.post("/upload", upload_1.upload.single("image"), (req, res) => {
    var _a, _b;
    if (!req.file) {
        res.status(400).json({ error: "No file uploaded" });
        return;
    }
    const filepath = ((_a = req.file) === null || _a === void 0 ? void 0 : _a.path) || `/uploads/${(_b = req.file) === null || _b === void 0 ? void 0 : _b.filename}`;
    cloudinary_1.default.uploader.upload(filepath, function (err, result) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                success: false,
                message: "Error"
            });
        }
        res.status(200).json({
            success: true,
            message: "Uploaded!",
            imageLink: result === null || result === void 0 ? void 0 : result.url,
        });
    });
});
router.get("/search", Authentication_1.authentication, Search_1.searchBlogs);
exports.default = router;
