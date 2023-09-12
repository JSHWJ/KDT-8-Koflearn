const express = require("express");
const router = express.Router();
const controller = require("../controller/C_ch_main");
const hi_controller = require("../controller/C_hi_main");
//////////////////////////////////////////////////
// GET

//메인페이지
router.get("/", hi_controller.main);

//마이페이지
router.get("/mypage", hi_controller.mypage);

// 회원가입
router.get("/signup", hi_controller.signup);

// 로그인 모달
router.get("/login_modal", hi_controller.login_modal);

//프로젝트 목록페이지
router.get("/project-list", controller.projectlist);

//리코프런 목록페이지
router.get("/recoplearn-list", controller.recoplearnlist);

//프로젝트업로드 페이지
router.get("/project", controller.project);

// 상세페이지
router.get("/detailPage/:id", hi_controller.detail);

router.get("/detailPage/:id/tags", hi_controller.detailPage_tags);

// 상세페이지 프로젝트 소개
router.get("/detailPage/:id/intro", hi_controller.detailGet_intro);

// 상세페이지 후기
router.get("/detailPage/:id/review", hi_controller.detailGet_review);
// 상세페이지 커뮤니티detailGet_review
router.get(
  "/detailPage/:id/community/write",
  hi_controller.detailGet_community
);
//////////////////////////////////////////////////
// POST
router.post("/detailPage/:id/review", hi_controller.detailPost_review);

router.post(
  "/detailPage/:id/community/write",
  hi_controller.detailPost_community
);

//프로젝트 목록 페이지 데이터 가져오기
router.post("/api/project-list", controller.projectlist_post);

//리코프런 목록 페이지 데이터 가져오기
router.post("/api/recoplearn-list", controller.recoplearnlist_post);

//프로젝트 업로드
router.post("/api/project/write", controller.project_upload);

// 로그인 마이페이지

module.exports = router;
