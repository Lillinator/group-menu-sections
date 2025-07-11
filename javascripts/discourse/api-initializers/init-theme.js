import { apiInitializer } from "discourse/lib/api";

export default apiInitializer((api) => {
  const user = api.getCurrentUser();
  const body = document.querySelector('body');

  if (user) {
    user
      .groups
      .map((g) => `group-${g.id}`)
      .forEach((g) => body.classList.add(g));
  }
});
