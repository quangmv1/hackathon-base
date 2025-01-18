import { TarotCard } from '../../assets/data';

export const requestAI = async (data: TarotCard) => {
  // formdata.append(
  //   'text',
  //   `Tôi tên là Phú . Tôi rút được lá bài ${data.name} và nó mang ý nghĩa Taking a leap of faith`
  // );
  const formdata = new FormData();

  const randomMeaning = Math.random() > 0.5 ? 'light' : 'shadow';
  const messageLength = data.meanings[randomMeaning].length;
  const indexMessage = randomIntFromInterval(0, messageLength - 1);
  const message = data.meanings[randomMeaning][indexMessage];

  formdata.append(
    'text',
    `
     Tôi tên là Phú, giới tính Nam sinh năm 1997. 
     Tôi rút được lá bài ${data.name} và nó mang ý nghĩa ${message}
     kèm theo các từ khoá như ${data.keywords.join(', ')}
     Hãy trả lời tôi bằng tiếng Việt và cho tôi kết luận về cuộc đời. Liệt kê ra cho tôi luôn.
     Hãy thêm ký hiệu xuống dòng /n vào các câu trả lời cho tui.
    `
  );
  formdata.append('userId', 'user');
  formdata.append(
    'roomId',
    'default-room-cf28a6f2-d2e9-053e-aead-36686de83008'
  );

  const requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow',
  };

  return fetch(
    'http://10.10.1.44:5173/api/cf28a6f2-d2e9-053e-aead-36686de83008/message',
    requestOptions
  ).then((response) => response.json());
};

export function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function nl2br(str: string, is_xhtml?: boolean): string {
  if (typeof str === 'undefined' || str === null) {
    return '';
  }
  var breakTag =
    is_xhtml || typeof is_xhtml === 'undefined' ? '<br />' : '<br>';
  return (str + '').replace(
    /([^>\r\n]?)(\r\n|\n\r|\r|\n)/g,
    '$1' + breakTag + '$2'
  );
}
