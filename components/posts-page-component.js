import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage } from "../index.js";
import { getListPosts } from "../list-posts.js"
import { deletePost, putLikes, removeLikes } from "../index.js"

export function renderPostsPageComponent({ appEl }) {
  // TODO: реализовать рендер постов из api
  console.log("Актуальный список постов:", posts);

  /**
   * TODO: чтобы отформатировать дату создания поста в виде "19 минут назад"
   * можно использовать https://date-fns.org/v2.29.3/docs/formatDistanceToNow
   */

  const postsHTML = posts.map((post, index) => getListPosts(post, index)).join("");
  const appHtml = `
              <div class="page-container">
                <div class="header-container"></div>
                <ul class="posts">
                ${postsHTML}
                </ul>
              </div>`;

  appEl.innerHTML = appHtml;

  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });

  for (let userEl of document.querySelectorAll(".post-header")) {
    userEl.addEventListener("click", () => {
      goToPage(USER_POSTS_PAGE, {
        userId: userEl.dataset.userId,
      });
    });

  };


  const deleteButtons = document.querySelectorAll(".delete-button");

  for (const deleteButton of deleteButtons) {
    deleteButton.addEventListener("click", (event) => {
      event.stopPropagation();
      const id = deleteButton.dataset.id;
      deletePost (id);
    });
  }




  //счетчик лайков у каждого комментария
  function getLikePost() {

    const likesButton = document.querySelectorAll('.like-button');
    for (const like of likesButton) {
      like.addEventListener("click", (event) => {
        event.stopPropagation();
        const id = like.dataset.id;
        const liked = like.dataset.liked;
        
       if (liked == 'false') {
        putLikes (id);
       } else {
       removeLikes (id);
       }      

      })
    }
  };
  getLikePost();


}
