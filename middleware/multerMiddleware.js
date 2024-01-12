import multer from "multer";

const storage=multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, "public/uploadimg")
    },
    filename:(req, file, cb)=>{
        const filename=file.originalname
        cb(null, filename)
    },
})
const upload=multer({storage});
export default upload