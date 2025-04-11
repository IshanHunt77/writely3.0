"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Authentication_1 = require("../middlewares/Authentication");
const UserInfo_1 = require("../controllers/UserInfo");
const uploadprofile_1 = require("../uploadprofile");
const Profile_1 = require("../controllers/Profile");
const ProfilePhoto_1 = require("../controllers/ProfilePhoto");
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
const router = express_1.default.Router();
router.get('/user', Authentication_1.authentication, UserInfo_1.UserInfo);
router.get("/profilephoto", Authentication_1.authentication, ProfilePhoto_1.getProfilePhoto);
router.get('/:author', UserInfo_1.UserDetails);
router.post('/updateprofile', Authentication_1.authentication, Profile_1.Profile);
router.post("/upload", uploadprofile_1.uploadProfile.single("images"), (req, res) => {
    if (!req.file) {
        res.status(400).json({ error: "No file uploaded" });
        return;
    }
    const filepath = req.file.path || `/uploadProfile/${req.file.filename}`;
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
exports.default = router;
