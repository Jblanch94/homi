const Tag = require('../models/Tag');

class TagService {
  async insertTag(title) {
    const [tag, created] = await Tag.findOrCreate({
      where: { title },
      defaults: { title },
    });
    return tag;
  }

  async insertTags(tags) {
    const processedTags = [];
    for (let i = 0; i < tags.length; i++) {
      const foundOrCreatedTag = await this.insertTag(tags[i]);
      processedTags.push(foundOrCreatedTag);
    }

    return processedTags;
  }

  async fetchTagById(tagId) {
    const tag = await Tag.findByPk(tagId);
    return tag;
  }

  async fetchTags(recipeTags) {
    const tags = [];
    for (let i = 0; i < recipeTags.length; i++) {
      const tag = await this.fetchTagById(recipeTags[i].TagId);
      tags.push(tag);
    }
    return tags;
  }
}

module.exports = TagService;
