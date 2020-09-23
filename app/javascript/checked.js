function check() {
  // 表示されているすべてのメモを取得している
  const posts = document.querySelectorAll(".post");
  posts.forEach(function (post) {
    // 既読になったら処理を終える
    if (post.getAttribute("data-load") != null) {
      return null;
    }
    post.setAttribute("data-load", "true");
    // メモをクリックした場合に実行する処理を定義している
    post.addEventListener('click', () => {
      // どのメモをクリックしたのか、カスタムデータを利用して取得している
      const postId = post.getAttribute("data-id");
      // Ajaxに必要なオブジェクトを生成している
      const XHR = new XMLHttpRequest();
      // openでリクエストを初期化する
      XHR.open("GET", `/posts/${postId}`, true);
      // レスポンスタイプを指定する
      XHR.responseType = "json";
      // リクエストの送信
      XHR.send();
      // レスポンスを受け取ったときの処理
      XHR.onload = () => {
        // エラー時の処理
        if (XHR.status != 200) {
          alert(`Error ${XHR.status}: ${XHR.statusText}`);
          return null;
        }
        // レスポンスされたデータを代入
        const item = XHR.response.post;
        // 既読と未読状態の処理
        if (item.checked === true) {
          post.setAttribute("data-check", "true");
        } else if (item.checked === false) {
          post.removeAttribute("data-check");
        }
      };
    });
  });
}

setInterval(check, 1000);