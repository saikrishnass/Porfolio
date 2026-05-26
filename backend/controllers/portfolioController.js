const Skill = require('../models/Skill');
const Project = require('../models/Project');
const Experience = require('../models/Experience');
const Education = require('../models/Education');

// --- SKILLS CONTROLLERS ---

const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find({});
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createSkill = async (req, res) => {
  const { name, category } = req.body;
  try {
    const skill = new Skill({ name, category });
    const createdSkill = await skill.save();
    res.status(201).json(createdSkill);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (skill) {
      await Skill.deleteOne({ _id: req.params.id });
      res.json({ message: 'Skill removed' });
    } else {
      res.status(404).json({ message: 'Skill not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// --- PROJECTS CONTROLLERS ---

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({}).sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createProject = async (req, res) => {
  const { title, description, tags, githubLink, liveLink, image } = req.body;
  try {
    const project = new Project({
      title,
      description,
      tags: Array.isArray(tags) ? tags : tags.split(',').map(t => t.trim()),
      githubLink,
      liveLink,
      image
    });
    const createdProject = await project.save();
    res.status(201).json(createdProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateProject = async (req, res) => {
  const { title, description, tags, githubLink, liveLink, image } = req.body;
  try {
    const project = await Project.findById(req.params.id);
    if (project) {
      project.title = title || project.title;
      project.description = description || project.description;
      project.tags = tags ? (Array.isArray(tags) ? tags : tags.split(',').map(t => t.trim())) : project.tags;
      project.githubLink = githubLink !== undefined ? githubLink : project.githubLink;
      project.liveLink = liveLink !== undefined ? liveLink : project.liveLink;
      project.image = image !== undefined ? image : project.image;

      const updatedProject = await project.save();
      res.json(updatedProject);
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (project) {
      await Project.deleteOne({ _id: req.params.id });
      res.json({ message: 'Project removed' });
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// --- EXPERIENCE CONTROLLERS ---

const getExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find({}).sort({ orderIndex: 1 });
    res.json(experiences);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createExperience = async (req, res) => {
  const { role, company, duration, description, orderIndex } = req.body;
  try {
    const experience = new Experience({
      role,
      company,
      duration,
      description,
      orderIndex: orderIndex || 0
    });
    const createdExperience = await experience.save();
    res.status(201).json(createdExperience);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateExperience = async (req, res) => {
  const { role, company, duration, description, orderIndex } = req.body;
  try {
    const experience = await Experience.findById(req.params.id);
    if (experience) {
      experience.role = role || experience.role;
      experience.company = company || experience.company;
      experience.duration = duration || experience.duration;
      experience.description = description || experience.description;
      experience.orderIndex = orderIndex !== undefined ? orderIndex : experience.orderIndex;

      const updatedExperience = await experience.save();
      res.json(updatedExperience);
    } else {
      res.status(404).json({ message: 'Experience not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteExperience = async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    if (experience) {
      await Experience.deleteOne({ _id: req.params.id });
      res.json({ message: 'Experience removed' });
    } else {
      res.status(404).json({ message: 'Experience not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// --- EDUCATION CONTROLLERS ---

const getEducation = async (req, res) => {
  try {
    const educations = await Education.find({}).sort({ orderIndex: 1 });
    res.json(educations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createEducation = async (req, res) => {
  const { degree, institution, duration, description, orderIndex } = req.body;
  try {
    const education = new Education({
      degree,
      institution,
      duration,
      description,
      orderIndex: orderIndex || 0
    });
    const createdEducation = await education.save();
    res.status(201).json(createdEducation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateEducation = async (req, res) => {
  const { degree, institution, duration, description, orderIndex } = req.body;
  try {
    const education = await Education.findById(req.params.id);
    if (education) {
      education.degree = degree || education.degree;
      education.institution = institution || education.institution;
      education.duration = duration || education.duration;
      education.description = description || education.description;
      education.orderIndex = orderIndex !== undefined ? orderIndex : education.orderIndex;

      const updatedEducation = await education.save();
      res.json(updatedEducation);
    } else {
      res.status(404).json({ message: 'Education record not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteEducation = async (req, res) => {
  try {
    const education = await Education.findById(req.params.id);
    if (education) {
      await Education.deleteOne({ _id: req.params.id });
      res.json({ message: 'Education record removed' });
    } else {
      res.status(404).json({ message: 'Education record not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getSkills,
  createSkill,
  deleteSkill,
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  getExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
  getEducation,
  createEducation,
  updateEducation,
  deleteEducation
};
