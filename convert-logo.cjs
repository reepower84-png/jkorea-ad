const { Jimp } = require('jimp');

async function convertLogo() {
  const image = await Jimp.read('./public/2투명_수정 1.png');

  const { width, height, data } = image.bitmap;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const red = data[idx + 0];
      const green = data[idx + 1];
      const blue = data[idx + 2];
      const alpha = data[idx + 3];

      // 투명한 픽셀은 건너뛰기
      if (alpha === 0) continue;

      // 주황색 감지 (R이 높고, G가 중간, B가 낮은 경우)
      const isOrange = red > 180 && green > 50 && green < 150 && blue < 80;

      // 회색 감지 (R, G, B가 비슷하고 중간 밝기인 경우)
      const isGray = Math.abs(red - green) < 30 &&
                     Math.abs(green - blue) < 30 &&
                     Math.abs(red - blue) < 30 &&
                     red > 80 && red < 200;

      // 주황색이나 회색이 아닌 경우 (검정색 텍스트 등) -> 흰색으로 변경
      if (!isOrange && !isGray) {
        data[idx + 0] = 255; // R
        data[idx + 1] = 255; // G
        data[idx + 2] = 255; // B
      }
    }
  }

  await image.write('./public/logo-white.png');
  console.log('로고 변환 완료: ./public/logo-white.png');
}

convertLogo();
