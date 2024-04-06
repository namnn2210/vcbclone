export function convertToCurrencyString(input) {
  const words = ['', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín'];
  const units = ['', 'nghìn', 'triệu', 'tỷ'];

  const numberString = input.replace(/,/g, '');
  const groups = [];
  let remainingDigits = numberString.length % 3;

  if (remainingDigits > 0) {
    groups.push(Number(numberString.substr(0, remainingDigits)));
  }

  for (let i = remainingDigits; i < numberString.length; i += 3) {
    groups.push(Number(numberString.substr(i, 3)));
  }

  let result = '';
  for (let i = 0; i < groups.length; i++) {
    const group = groups[i];
    if (group > 0) {
      const groupString = convertGroupOfThreeDigits(group);
      result += groupString + ' ' + units[groups.length - 1 - i] + ' ';
    }
  }

  // Viết hoa chữ cái đầu tiên
  result = result.trim();
  result = result.charAt(0).toUpperCase() + result.slice(1);

  return result + ' đồng';
}

function convertGroupOfThreeDigits(group) {
  const words = ['', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín'];
  
  const hundred = Math.floor(group / 100);
  const remainder = group % 100;

  let result = '';
  if (hundred > 0) {
    result += words[hundred] + ' trăm';
    if (remainder > 0) {
      result += ' ';
    }
  }

  if (remainder > 0) {
    if (remainder < 10) {
      result += words[remainder];
    } else if (remainder < 20) {
      result += words[remainder - 10] + ' mười';
    } else {
      const tens = Math.floor(remainder / 10);
      const ones = remainder % 10;
      result += words[tens] + ' mươi';
      if (ones > 0) {
        result += ' ' + words[ones];
      }
    }
  }

  return result;
}