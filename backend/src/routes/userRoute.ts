import express, { Request, Response } from "express";
import { authentication } from "../middlewares/Authentication";
import { UserDetails, UserInfo } from "../controllers/UserInfo";
import { uploadProfile } from "../uploadprofile";
import { Profile } from "../controllers/Profile";
import { getProfilePhoto } from "../controllers/ProfilePhoto";
import cloudinary from "../utils/cloudinary";

const router = express.Router();

router.get('/user',authentication,UserInfo)
router.get("/profilephoto",authentication,getProfilePhoto)

router.get('/:author',UserDetails)
router.post('/updateprofile',authentication,Profile)


router.post("/upload", uploadProfile.single("images"), (req: Request, res: Response):void => {
    if (!req.file) {
        res.status(400).json({ error: "No file uploaded" });
        return;
      }
    

  const filepath = req.file.path || `/uploadProfile/${req.file.filename}`;
  cloudinary.uploader.upload(filepath, function (err, result){
      if(err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: "Error"
        })
      }
  
      res.status(200).json({
        success: true,
        message:"Uploaded!",
        imageLink: result?.url,
        
  
      })
    })
  
});



export default router