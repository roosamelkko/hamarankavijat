async function loadBlogPosts() {
  const lang = document.documentElement.lang || "fi";
  const list = document.querySelector("[data-blog-list]");
  if (!list) {
    return;
  }

  const segments = window.location.pathname.split("/").filter(Boolean);
  const reserved = new Set(["fi", "en", "assets", "content", "credits", "index.html"]);
  const basePath = segments.length > 0 && !reserved.has(segments[0]) ? `/${segments[0]}` : "";

  try {
    const response = await fetch(`${basePath}/content/${lang}/blog/posts.json`);
    const data = await response.json();

    list.innerHTML = data.posts
      .map(
        (post) => `
        <article class="blog-card reveal">
          <p class="kicker">${post.date} | ${post.tag}</p>
          <h3>${post.title}</h3>
          <p>${post.summary}</p>
          <p><a href="${post.url}">${post.cta}</a></p>
        </article>
      `
      )
      .join("");

    document.querySelectorAll(".blog-card.reveal").forEach((card, index) => {
      card.style.transitionDelay = `${index * 70}ms`;
    });
  } catch (error) {
    console.error("Blog loading failed", error);
  }
}

loadBlogPosts();
