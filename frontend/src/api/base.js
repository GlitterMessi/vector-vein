/**
 * @Author: Bi Ying
 * @Date:   2023-07-06 17:21:20
 * @Last Modified by:   Bi Ying
 * @Last Modified time: 2023-07-06 17:29:06
 */
// export default async function baseAPI(path, parameter) {
//     // if (!window.pywebview) {
//     //     await new Promise(resolve => setTimeout(resolve, 100))
//     // }
//
// }
// export default async function baseAPI(path, parameter) {
//   const proxyTarget = 'http://127.0.0.1:8000/api/'; // 获取 Vite 配置的代理目标
//   return new Promise((resolve, reject) => {
//     fetch(`${proxyTarget}${path}`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(parameter)
//     })
//       .then(response => {
//         if (response.ok) {
//           resolve(response.json());
//         } else {
//           reject(new Error(`Request failed with status ${response.status}`));
//         }
//       })
//       .catch(error => {
//         reject(error);
//       });
//   });
// }
