import express from "express";
import studyVerifyPassword from "../edit-study-modules/studyVerifyPassword.module.js";
import studyUpdate from "../edit-study-modules/studyUpdate.module.js";
import studyGetRouter from "../study/studyGet.module.js";
import postStudyRouter from "../study/postStudy.module.js";
import healthCheckRouter from "../healthCheck.module.js";
import studyDeleteRouter from "../study/studyDelete.module.js";
import emojiRouter from "../emoji/emojis.module.js";

const studyRouter = express.Router();

studyRouter.use("/study/health-check", healthCheckRouter);
studyRouter.use("/study", studyVerifyPassword); // http://localhost:5090/api/study/{id}/verify-password
studyRouter.use("/study", studyUpdate); // http://localhost:5090/api/study/{studyId}/update
studyRouter.use("/study", studyGetRouter); // http://localhost:5090/api/study
studyRouter.use("/study-create", postStudyRouter); // http://localhost:5090/api/study-create
studyRouter.use("/study", studyDeleteRouter); // http://localhost:5090/api/study/{id}/delete
studyRouter.use("/study", emojiRouter); // http://localhost:5090/api/study/${id}/emojis

export default studyRouter;
