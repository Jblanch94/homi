const Tag = require('../models/Tag');

class TagService {
  async insertTag(title) {
    const { tag, created } = Tag.findOrCreate({
      where: { title },
      defaults: { title },
    });
    return tag;
  }

  async insertTags(tags) {
    const processedTags = [];
    tags.forEach(async (tag) => {
      const foundOrCreatedTag = await this.insertTag(tag);
      processedTags.push(foundOrCreatedTag);
    });
    return processedTags;
  }

  async fetchTagById(tagId) {
    const tag = await Tag.findByPk(tagId);
    return tag;
  }
}

module.exports = TagService;
