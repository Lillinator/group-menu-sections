import { apiInitializer } from "discourse/lib/api";
import I18n from "I18n";

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
