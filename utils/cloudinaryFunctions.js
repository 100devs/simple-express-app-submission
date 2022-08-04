const cloudinary = require('cloudinary').v2;

async function createManyImageTags (arr) {
    return Promise.all(arr.map(async element => {
        const imageTag = await createImageTag(element.CloudinaryId);
        return imageTag;
    }))
}

async function createImageTag (publicId) {
    let imageTag = cloudinary.image(publicId, {
        transformation: [
          { width: 300, height: 300, crop: 'thumb' },
          { radius: 50 } 
        ],
      });
      return imageTag
  };

module.exports = { createManyImageTags, createImageTag }