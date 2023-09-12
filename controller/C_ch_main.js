const db = require("../models");
const models = db.User;
// 프로젝트리스트 페이지
const projectlist = (req, res) => {
  res.render("projectlist");
};
//프로젝트 목록 페이지 데이터 가져오기
const projectlist_post = async (req, res) => {
  try {
    let sendInfo = {};
    let arr = {};
    let arr2 = {};
    const response = await Promise.all([
      models.Project.findAll(),
      models.Tag.findAll(),
    ]);
    response[0].forEach((project) => {
      arr[project.title] = [
        project.members,
        project.thumnail,
        project.project_id,
      ];
    });
    response[1].forEach((tag) => {
      arr2[tag.tag_id] = tag.tag_name;
    });
    sendInfo.title = arr;
    sendInfo.tag = arr2;
    console.log("이게뭐지", sendInfo);
    res.json({ data: sendInfo });
  } catch (error) {
    console.error("Sequelize에러 발생: ", error);
  }
};
// 리코프런리스트 페이지
const recoplearnlist = (req, res) => {
  res.render("recoplearn");
};
//리코프런 목록 페이지 데이터 가져오기
const recoplearnlist_post = async (req, res) => {
  try {
    let sendInfo = {};
    let arr = {};
    let arr2 = {};
    const response = await Promise.all([
      models.Recoplearn.findAll({
        include: {
          model: models.Project,
          attributes: ["title", "thumnail"],
        },
      }),
      models.Tag.findAll(),
    ]);
    response[0].forEach((item) => {
      arr[item.Project.title] = {
        front_num: item.font_num,
        back_num: item.back_num,
        current_num: item.current_num,
        goal_num: item.goal_num,
        thumnail: item.Project.thumnail,
      };
    });
    response[1].forEach((tag) => {
      arr2[tag.tag_id] = tag.tag_name;
    });
    sendInfo.project = arr;
    sendInfo.tag = arr2;
    console.log("이게뭐지2", sendInfo);
    res.json({ data: sendInfo });
  } catch (error) {
    console.error("Sequelize에러 발생: ", error);
  }
};
//프로젝트 업로드 페이지
const project = (req, res) => {
  res.render("project");
};
//프로젝트 업로드 하기
const project_upload = async (req, res) => {
  const { title, content, video, period, member, git, tags, thumnail } =
    req.body;
  try {
    const newProject = {
      title: title,
      content: content,
      video: video,
      period: period,
      members: member,
      git_link: git,
      thumnail: thumnail,
    };
    await models.Project.create(newProject);
    let project = await models.Project.findOne({ where: { title: title } });
    if (tags && tags.length > 0) {
      for (const item of tags) {
        let taged = await models.Tag.findOne({ where: { tag_name: item } });
        if (!taged) {
          taged = await models.Tag.create({ tag_name: item });
        }
        await models.ProjectTag.create({
          project_id: project.project_id,
          tag_id: taged.tag_id,
        });
      }
    }
    console.log("새로운프로젝트가 추가되었습니다.");
    res.json({ result: true });
  } catch (error) {
    console.log("프로젝트 추가중 오류 발생", error);
  }
};
module.exports = {
  projectlist,
  projectlist_post,
  recoplearnlist,
  recoplearnlist_post,
  project_upload,
  project,
};
