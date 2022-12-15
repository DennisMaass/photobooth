const sharp = require('sharp');
const { single } = require('rxjs');

const singleField = {
  width:400,
  height: 300
};
const doubleField={
  width:200,
  height: 150
}


async function createCollage(images){
  const imageBuffers = []
  for (let i = 0; i < images.length; i++) {

    const image = images[i]
    let buffer
    if(i === 0){
      buffer = await sharp(image)
        .resize(singleField.width,singleField.height)
        .withMetadata()
        .toBuffer();
    }else if(i === 1){
      buffer = await sharp(image)
        .resize(doubleField.width,doubleField.height)
        .withMetadata()
        .toBuffer();
    }else if(i === 2){
      buffer = await sharp(image)
        .resize(doubleField.width,doubleField.height)
        .withMetadata()
        .toBuffer();
    }

      imageBuffers.push(buffer)

  }

  // Create something to overlay the images on
  let background = await sharp({
    create: {
      width: singleField.width + doubleField.width,
      height: singleField.height,
      channels: 3,
      background: {r: 0, g: 0, b: 0}
    }
  }).jpeg().toBuffer();



  const composites= []
  for (let i = 0; i < imageBuffers.length; i++) {
    const imageBuffer = imageBuffers[i]

    if(i===0){
      composites.push({
        input: imageBuffer,
        top: 0, left: 0
      })
    }else if(i===1){
      composites.push({
        input: imageBuffer,
        top: 0, left: singleField.width
      })
    }else if(i===2){
      composites.push({
        input: imageBuffer,
        top: doubleField.height, left: singleField.width
      })
    }
  }

  const finishedImageBuffer = await sharp(background)
    .composite(composites)
    .withMetadata()
    .toBuffer();

  await sharp(finishedImageBuffer)
    .jpeg({
      quality: 95
    })
    .toFile('output.jpg')
}



const images = [
  '/Users/dennis.maass/projects/fotobox/sourcecode/packages/nest-backend/previews/D-R-Hochzeit_1654542833683.webp',
  '/Users/dennis.maass/projects/fotobox/sourcecode/packages/nest-backend/previews/D-R-Hochzeit_1654545542739.webp',
  '/Users/dennis.maass/projects/fotobox/sourcecode/packages/nest-backend/previews/D-R-Hochzeit_1654545542739.webp'
];

createCollage(images)
