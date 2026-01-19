import Jimp from 'jimp';

async function convertLogo() {
  const image = await Jimp.read('./public/2투명_수정 1.png');

  image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
    const red = this.bitmap.data[idx + 0];
    const green = this.bitmap.data[idx + 1];
    const blue = this.bitmap.data[idx + 2];
    const alpha = this.bitmap.data[idx + 3];

    // 투명한 픽셀은 건너뛰기
    if (alpha === 0) return;

    // 주황색 감지 (R이 높고, G가 중간, B가 낮은 경우)
    const isOrange = red > 180 && green > 50 && green < 150 && blue < 80;

    // 주황색이 아닌 경우 (검정색, 회색 등) -> 흰색으로 변경
    if (!isOrange) {
      this.bitmap.data[idx + 0] = 255; // R
      this.bitmap.data[idx + 1] = 255; // G
      this.bitmap.data[idx + 2] = 255; // B
    }
  });

  await image.writeAsync('./public/logo-white.png');
  console.log('로고 변환 완료: ./public/logo-white.png');
}

convertLogo();
